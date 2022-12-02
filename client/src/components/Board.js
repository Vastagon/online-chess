import "../styles/board.css"
import { useEffect, useState, useRef } from "react"
import Piece from "./Piece"
import boardpositions from "./boardpositions.json"
import {v4 as uuid} from "uuid"
import ChooseNewPiece from "./ChooseNewPiece"
import io from "socket.io-client"
import {checkForBlackCheck, checkForCheckmate} from "./checkForCheckmate"
import JoinGame from "./JoinGame"


///Needs to be set to whichever location the express server is being hosted
const socket = io.connect("http://localhost:3001")


const Board = () =>{
    const [boardPosition, setBoardPosition] = useState(boardpositions)
    const [potentialMovement, setPotentialMovement] = useState([])
    const [lastClickedPosition, setLastClickedPosition] = useState()
    const [mostRecentClickedPosition, setMostRecentClickedPosition] = useState()
    const [blackOrWhitePromotion, setBlackOrWhitePromotion] = useState("")
    const [room, setRoom] = useState("1")
    ///Need to change variables ffrom state if I don't need them as state
    const [kingPositions, setKingPositions] = useState({blackKing: [0,4], whiteKing: [7,4]})

    const [changeTurn, setChangeTurn] = useState(true)
    const [whiteMoveBoolean, setWhiteMoveBoolean] = useState(true)
    const [showPieceModal, setShowPieceModal] = useState(false)
    const [pieceClicked, setPieceClicked] = useState(false)
    const [joinGame, setJoinGame] = useState(true)


    const [boardDiv, setBoardDiv] = useState()
    let evenRow = true

    function joinRoom(){
        setRoom("2")
    }

    useEffect(() =>{
        // console.log(room)
        if(room !== ""){
            socket.emit("join_room", room)
            // console.log(`Joined room ${room}`)
        }
    }, [room])



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
                    console.log([rowIndex,index])
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



    useEffect(() =>{
        socket.on("start_client_board", (data) =>{
            // console.log("Start client board ran")
            setBoardPosition(data.roomBoardPositions)
            setWhiteMoveBoolean(data.whiteMoveBoolean)
        })

        socket.on("update_client_board", (tempBoardData) =>{
            // console.log("Update client board ran")
            // console.log(tempBoardData.roomBoardPositions)
            let t = tempBoardData

            setBoardPosition(tempBoardData.roomBoardPositions)
            setWhiteMoveBoolean(tempBoardData.whiteMoveBoolean)

            // canMove(tempBoardData.roomBoardPositions)
        })
    }, [socket])


    useEffect(() => {
        ///Sends data to socket

        if(boardPosition){
            socket.emit("piece_moved", {
                room: room,
                whiteMoveBoolean: whiteMoveBoolean,
                boardPosition: boardPosition
            })
           
            ///canMove()
        }
    }, [changeTurn])


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

                ///Changes movement from white to black
                setChangeTurn(prev => !prev)
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

            {/* {joinGame ? <JoinGame joinGame={joinGame}/> : null} */}

            <input type="text" placeholder="Room" />
            <button onClick={joinRoom} type="button">Submit</button>
        </>

    )
}

export default Board
