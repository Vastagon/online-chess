import "../styles/board.css"
import { useEffect, useState } from "react"
import Piece from "./Piece"
import boardpositions from "./boardpositions.json"
import {v4 as uuid} from "uuid"
import ChooseNewPiece from "./ChooseNewPiece"
import io from "socket.io-client"


const socket = io.connect("http://localhost:3001")


const Board = () =>{
    const [boardPosition, setBoardPosition] = useState(boardpositions)
    const [potentialMovement, setPotentialMovement] = useState([])
    const [lastClickedPosition, setLastClickedPosition] = useState()
    const [mostRecentClickedPosition, setMostRecentClickedPosition] = useState()
    const [blackOrWhitePromotion, setBlackOrWhitePromotion] = useState("")
    const [room, setRoom] = useState("1")

    const [whiteMoveBoolean, setWhiteMoveBoolean] = useState(true)
    const [showPieceModal, setShowPieceModal] = useState(false)
    const [pieceClicked, setPieceClicked] = useState(false)

    const [boardDiv, setBoardDiv] = useState()
    let evenRow = true

    function joinRoom(e){
        console.log("HERE")
        setRoom("2")
    }

    useEffect(() =>{
        console.log(room)
        if(room !== ""){
            socket.emit("join_room", room)
            console.log(`Joined ${room}`)
        }
    }, [room])


    ///Shows squares it can move
    function canMove(){
        console.log(boardPosition)
        setBoardDiv(boardPosition.map((prev, rowIndex) =>{
            evenRow = !evenRow
            ///Returns row
            return(<div key={uuid()} className="board-row">{prev.map((prev, index) =>{
                evenRow = !evenRow
                let hasDot

                ///Shows dots on all potential movement squares
                for(let i = 0; i < potentialMovement?.length; i++){
                    if(JSON.stringify([rowIndex, index]) == JSON.stringify(potentialMovement[i])){
                        hasDot = true 
                    }
                }
                
                ///Returns square
                return (<div key={uuid()} className={evenRow ? "board-square white-square" : "board-square green-square"}>
                    <div onClick={() => potentialMovementGetsClicked([rowIndex,index])} className={hasDot ? "has-dot" : null} />
                    <Piece whiteMoveBoolean={whiteMoveBoolean} setLastClickedPosition={setLastClickedPosition} potentialMovementGetsClicked={potentialMovementGetsClicked} potentialMovement={potentialMovement} setPotentialMovement={setPotentialMovement} boardPosition={boardPosition} key={uuid()} pieceClicked={pieceClicked} setPieceClicked={setPieceClicked} position={[rowIndex,index]} piece={boardpositions[rowIndex][index]}/>
                </div>)
            })}</div>) 
        }))
    }


    ///Runs whenever new piece is selected, or when a pawn promotes
    useEffect(() =>{ 
        canMove()
        console.log("render")
    }, [potentialMovement, showPieceModal])

    ///Need to emit piece moved whenever something gets clicked
    ///Need to 

    useEffect(() =>{
        ///Other client gets emit
        socket.on("update_client_board", (data) =>{
            console.log("Received new board")
            setBoardPosition(data.boardPosition)
            setWhiteMoveBoolean(data.whiteMoveBoolean)
        })
        console.log("Net render")

    }, [socket])

    useEffect(() => {
        ///Sends data to socket
        socket.emit("piece_moved", {
            boardPosition: boardPosition,
            whiteMoveBoolean: whiteMoveBoolean,
            room: room
        })

        canMove()
    }, [whiteMoveBoolean])


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
            if(JSON.stringify(potentialMovement[i]) == JSON.stringify(clickedSquare)){
                ///Checks if pawn is near the end
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
                setWhiteMoveBoolean(prev => !prev)
            }
        }
    }
    

    if(!boardDiv || !boardPosition) return null

    return(
        <div className="board">
            {boardDiv}
            {showPieceModal ? <ChooseNewPiece blackOrWhitePromotion={blackOrWhitePromotion} changePawn={changePawn}/> : null}
            
                <input type="text" placeholder="Room" />
                <button onClick={joinRoom} type="button">Submit</button>
        </div>
    )
}

export default Board
