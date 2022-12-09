import "../styles/board.css"
import { useEffect, useState } from "react"
import Piece from "./Piece"
import boardpositions from "./boardpositions.json"
import {v4 as uuid} from "uuid"
import ChooseNewPiece from "./ChooseNewPiece"
import io from "socket.io-client"
import {checkForBlackCheck} from "./checkForCheckmate"
import ShowJoinGame from "./ShowJoinGame"
import WaitingOnSecondPlayer from "./WaitingOnSecondPlayer"

///Stay disconnected until join or create game is clicked
///Emit when creating a game, get the room name from emit
///



///Needs to be set to whichever location the express server is being hosted
const socket = io.connect("http://localhost:3001")


const Board = () =>{
    const [boardPosition, setBoardPosition] = useState(boardpositions)
    const [potentialMovement, setPotentialMovement] = useState([])
    const [lastClickedPosition, setLastClickedPosition] = useState()
    const [mostRecentClickedPosition, setMostRecentClickedPosition] = useState()
    const [blackOrWhitePromotion, setBlackOrWhitePromotion] = useState("")
    ///Variable to decide which SocketIO room to join
    const [room, setRoom] = useState("")
    ///Need to change variables from state if I don't need them as state
    const [kingPositions, setKingPositions] = useState({blackKing: [0,4], whiteKing: [7,4]})

    const [whiteMoveBoolean, setWhiteMoveBoolean] = useState(true)
    const [pieceClicked, setPieceClicked] = useState(false)
    const [isConnectedToRoom, setIsConnectedToRoom] = useState(false)
    const [changeSides, setChangeSides] = useState(false)

    ///States for displaying modals
    const [showJoinGame, setShowJoinGame] = useState(true)
    const [showFailedConnectionModal, setShowFailedConnectionModal] = useState(false)
    const [showWaitingOnSecondPlayer, setShowWaitingOnSecondPlayer] = useState(false)
    const [showPieceModal, setShowPieceModal] = useState(false)


    ///State that displays the board
    const [boardDiv, setBoardDiv] = useState()
    let evenRow = true
    const [socketIDs, setSocketIDs] = useState({})




    ///Runs when a piece is moved
    useEffect(() =>{
        if(isConnectedToRoom){
            socket.emit("piece_moved", {boardPosition: boardPosition, room: room});
        }
    }, [changeSides])



    ///Shows squares it can move
    function updateBoard(){
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
                    <Piece socket={socket} socketIDs={socketIDs} whiteMoveBoolean={whiteMoveBoolean} setLastClickedPosition={setLastClickedPosition} potentialMovementGetsClicked={potentialMovementGetsClicked} 
                        potentialMovement={potentialMovement} setPotentialMovement={setPotentialMovement} boardPosition={boardPosition} key={uuid()} pieceClicked={pieceClicked} 
                        setPieceClicked={setPieceClicked} position={[rowIndex,index]} piece={boardPosition[rowIndex][index]} />
                </div>)
            })}</div>) 
        }))
    }

//setIsConnectedToRoom
    ///Runs whenever new piece is selected, or when a pawn promotes
    useEffect(() =>{ 
        if(boardPosition){
            updateBoard()
            checkForBlackCheck(boardPosition, kingPositions)
        }
    }, [potentialMovement, showPieceModal, JSON.stringify(boardPosition), whiteMoveBoolean])


    ///Where all socket changes take place
    useEffect(() =>{
        ///When create new game button clicked
        socket.on("start_client_board", (data) =>{
            setBoardPosition(data.boardPosition)
            setWhiteMoveBoolean(data.whiteMoveBoolean)
            setShowWaitingOnSecondPlayer(true)
            setSocketIDs(prev => ({
                ...prev,
                whiteSocketID: data.whiteSocketID
            }))
            // whiteSocketID = data.whiteSocketID
            setRoom(data.room)
        })

        ///When piece gets moved
        socket.on("update_client_board", (tempBoardData) =>{
            console.log(tempBoardData)
            setBoardPosition(tempBoardData.boardPosition)
            setWhiteMoveBoolean(tempBoardData.whiteMoveBoolean)
        }) 

        ///Joining existing game failed
        socket.on("existing_connection_failed", () =>{
            ///Show that the connection failed visually, set room back to ""
            setShowFailedConnectionModal(true)
            setRoom("")
        })

        ///Joining existing game succeeded
        socket.on("existing_connection_successful", () =>{
            setShowJoinGame(false)
            setShowWaitingOnSecondPlayer(false)
            setIsConnectedToRoom(true)
            console.log("Existing connection successful")
        })

        console.log(boardPosition)
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
            ///Checks if position clicked is in potentialMovement array and if it causes a checkmate
            ///&& (checkForBlackCheck()) should be added in next line.
            if(JSON.stringify(potentialMovement[i]) === JSON.stringify(clickedSquare) ){
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
                setChangeSides(prev => !prev)
            }
        }
    }

///Need to run the checkForBlackCheck function with updated data while keeping a temporary board. If it causes an illegal check, don't update boardPosition



    // if(socket.id === whiteSocketID && whiteMoveBoolean){

    // }


    if(!boardDiv || !boardPosition) return null

    return(
        <>
            <div className="board">
                {boardDiv}
                {showPieceModal ? <ChooseNewPiece blackOrWhitePromotion={blackOrWhitePromotion} changePawn={changePawn}/> : null}
            </div>     

            {showJoinGame ? <ShowJoinGame setShowFailedConnectionModal={setShowFailedConnectionModal} showFailedConnectionModal={showFailedConnectionModal} socket={socket} room={room} setRoom={setRoom} showJoinGame={showJoinGame}/> : null}

            {showWaitingOnSecondPlayer ? <WaitingOnSecondPlayer room={room} /> : null}
        </>
    )
}

export default Board
