import "../styles/board.css"
import { useEffect, useState, useRef } from "react"
import Piece from "./Piece"
import boardpositions from "./boardpositions.json"
import {v4 as uuid} from "uuid"
import ChooseNewPiece from "./ChooseNewPiece"
import io from "socket.io-client"
import {checkForBlackCheck, checkForCheckmate} from "./checkForCheckmate"
import ShowJoinGame from "./ShowJoinGame"
import WaitingOnSecondPlayer from "./WaitingOnSecondPlayer"

///Stay disconnected until join or create game is clicked



///Needs to be set to whichever location the express server is being hosted
const socket = io.connect("http://localhost:3001")


const Board = () =>{
    const [boardPosition, setBoardPosition] = useState(boardpositions)
    const [potentialMovement, setPotentialMovement] = useState([])
    const [lastClickedPosition, setLastClickedPosition] = useState()
    const [mostRecentClickedPosition, setMostRecentClickedPosition] = useState()
    const [blackOrWhitePromotion, setBlackOrWhitePromotion] = useState("")
    ///Variable to decide which SocketIO room to join
    const [room, setRoom] = useState("1")
    ///Need to change variables from state if I don't need them as state
    const [kingPositions, setKingPositions] = useState({blackKing: [0,4], whiteKing: [7,4]})

    const [whiteMoveBoolean, setWhiteMoveBoolean] = useState(true)
    const [showPieceModal, setShowPieceModal] = useState(false)
    const [pieceClicked, setPieceClicked] = useState(false)

    ///States for displaying modals
    const [showJoinGame, setShowJoinGame] = useState(true)
    const [showFailedConnectionModal, setShowFailedConnectionModal] = useState(false)
    const [showWaitingOnSecondPlayer, setShowWaitingOnFailedPlayer] = useState(false)

    ///State that displays the board
    const [boardDiv, setBoardDiv] = useState()
    let evenRow = true


    // useEffect(() =>{
    //     // console.log(room)
    //     if(room !== ""){
    //         socket.emit("create_new_game", room)
    //         // console.log(`Joined room ${room}`)
    //     }
    // }, [room])



    ///Shows squares it can move
    function canMove(){
        console.log("Can move run")
        console.log(boardPosition)

        setBoardDiv(boardPosition.map((prev, rowIndex) =>{
            evenRow = !evenRow
            ///Returns row
            return(<div key={uuid()} className="board-row">{prev.map((prev, index) =>{
                evenRow = !evenRow
                let hasDot

                ///Shows dots on all potential movement squares
                for(let i = 0; i < potentialMovement?.length; i++){
                    if(JSON.stringify([rowIndex, index]) === JSON.stringify(potentialMovement[i])){
                        hasDot = true 
                    }
                }

                ///Updates state that holds position of kings
                if(prev === "blackKing"){
                    setKingPositions(prev => ({
                        ...prev,
                        blackKing: [rowIndex,index]
                    }))
                }
                if(prev === "whiteKing"){
                    // console.log([rowIndex,index])
                    setKingPositions(prev => ({
                        ...prev,
                        whiteKing: [rowIndex,index]
                    }))
                }
                
                ///Returns square
                return (<div key={uuid()} className={evenRow ? "board-square white-square" : "board-square green-square"}>
                    <div onClick={() => potentialMovementGetsClicked([rowIndex,index])} className={hasDot ? "has-dot" : null} />
                    <Piece whiteMoveBoolean={whiteMoveBoolean} setLastClickedPosition={setLastClickedPosition} potentialMovementGetsClicked={potentialMovementGetsClicked} potentialMovement={potentialMovement} setPotentialMovement={setPotentialMovement} boardPosition={boardPosition} key={uuid()} pieceClicked={pieceClicked} setPieceClicked={setPieceClicked} position={[rowIndex,index]} piece={boardPosition[rowIndex][index]}/>
                </div>)
            })}</div>) 
        }))
    }


    ///Runs whenever new piece is selected, or when a pawn promotes
    useEffect(() =>{ 
        if(boardPosition){
            canMove()
            checkForBlackCheck(boardPosition, kingPositions)
        }
    }, [potentialMovement, showPieceModal, JSON.stringify(boardPosition)])


    ///Where all socket changes take place
    useEffect(() =>{
        socket.on("start_client_board", (data) =>{
            setBoardPosition(data.roomBoardPositions)
            setWhiteMoveBoolean(data.whiteMoveBoolean)
        })

        socket.on("update_client_board", (tempBoardData) =>{
            let t = tempBoardData

            setBoardPosition(tempBoardData.roomBoardPositions)
            setWhiteMoveBoolean(tempBoardData.whiteMoveBoolean)
        })

        socket.on("connection_failed", () =>{
            ///Show that the connection failed visually, set room back to ""
            setShowFailedConnectionModal(true)
        })

        socket.on("connection_successful", () =>{
            setShowJoinGame(false)
        })
    }, [socket])



    ///Function that changes pawn to selected piece
    function changePawn(piece){
        ///Choose whether it's black or white pawns
        if(mostRecentClickedPosition[0] === 7){
            boardPosition[mostRecentClickedPosition[0]][mostRecentClickedPosition[1]] = "black" + piece
            setBlackOrWhitePromotion("black")
        }else{
            boardPosition[mostRecentClickedPosition[0]][mostRecentClickedPosition[1]] = "white" + piece
            setBlackOrWhitePromotion("white")
        }

        setShowPieceModal(false)
    }


    function potentialMovementGetsClicked(clickedSquare){
        setMostRecentClickedPosition(clickedSquare)
        ///Checks if clicked square is in potentialMovement array
        for(let i = 0; i < potentialMovement.length; i++){
            ///Checks if position clicked is in potentialMovement array
            if(JSON.stringify(potentialMovement[i]) === JSON.stringify(clickedSquare)){
                ///Checks if pawn is near the end of the board / about to be promoted
                if(boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "blackPawn" || "whitePawn"){
                    if((lastClickedPosition[0] === 6 && boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "blackPawn") || (lastClickedPosition[0] === 1 && boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "whitePawn")){
                        setShowPieceModal(true)
                    }
                }
                ///Resets potential movement and moves the piece to the proper location while deleting it from previous position
                boardPosition[clickedSquare[0]][clickedSquare[1]] = boardPosition[lastClickedPosition[0]][lastClickedPosition[1]]
                boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] = ""
                setPotentialMovement([])
            }
        }
    }
    


    if(!boardDiv || !boardPosition) return null

    return(
        <>
            <div className="board">
                {boardDiv}
                {showPieceModal ? <ChooseNewPiece blackOrWhitePromotion={blackOrWhitePromotion} changePawn={changePawn}/> : null}
            </div>     

            {showJoinGame ? <ShowJoinGame setShowFailedConnectionModal={setShowFailedConnectionModal} showFailedConnectionModal={showFailedConnectionModal} socket={socket} room={room} setRoom={setRoom} showJoinGame={showJoinGame}/> : null}

            {showWaitingOnSecondPlayer ? <WaitingOnSecondPlayer /> : null}
        </>
    )
}

export default Board
