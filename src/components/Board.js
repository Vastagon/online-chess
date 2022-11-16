import "../styles/board.css"
import { useEffect, useState } from "react"
import Piece from "./Piece"
import boardpositions from "./boardpositions.json"
import {v4 as uuid} from "uuid"
import ChooseNewPiece from "./ChooseNewPiece"




const Board = () =>{
    const [boardPosition, setBoardPosition] = useState(boardpositions)
    const [potentialMovement, setPotentialMovement] = useState([])
    const [lastClickedPosition, setLastClickedPosition] = useState()
    const [mostRecentClickedPosition, setMostRecentClickedPosition] = useState()

    const [showPieceModal, setShowPieceModal] = useState(false)


    const [boardDiv, setBoardDiv] = useState()
    let evenRow = true

    const [pieceClicked, setPieceClicked] = useState(false)

    ///Shows squares it can move
    function canMove(){
        setBoardDiv(boardPosition.map((prev, rowIndex) =>{
            evenRow = !evenRow
            return(<div key={uuid()} className="board-row">{prev.map((prev, index) =>{
                evenRow = !evenRow
                let hasDot
                ///Initial class for board divs

                ///Shows dots on all potential movement squares
                for(let i = 0; i < potentialMovement?.length; i++){
                    if(JSON.stringify([rowIndex, index]) == JSON.stringify(potentialMovement[i])){
                        // hasDot = "has-dot " + hasDot
                        hasDot = true 
                    }
                }

                ///onClick={() => squareClicked([rowIndex,index])}
                return (<div key={uuid()} className={evenRow ? "board-square white-square" : "board-square green-square"}>
                    <div onClick={() => potentialMovementGetsClicked([rowIndex,index])} className={hasDot ? "has-dot" : null} />
                    <Piece setLastClickedPosition={setLastClickedPosition} potentialMovementGetsClicked={potentialMovementGetsClicked} potentialMovement={potentialMovement} setPotentialMovement={setPotentialMovement} boardPosition={boardPosition} key={uuid()} canMove={canMove} pieceClicked={pieceClicked} setPieceClicked={setPieceClicked} position={[rowIndex,index]} piece={boardpositions[rowIndex][index]}/>
                </div>)
            })}</div>) 
        }))
    }


    ///Runs whenever new piece is selected
    useEffect(() =>{ 
        canMove()
        console.log("Potential Movement Underneath")
        console.log(potentialMovement)
    }, [potentialMovement, showPieceModal])

    ///Function that changes pawn to selected piece
    function changePawn(piece){
        // boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] == "white"
        boardPosition[mostRecentClickedPosition[0]][mostRecentClickedPosition[1]] = "whiteQueen"
        console.log(boardPosition[lastClickedPosition[0]][lastClickedPosition[1]])
        setShowPieceModal(false)
    }

    function potentialMovementGetsClicked(clickedSquare){
        setMostRecentClickedPosition(clickedSquare)
        ///Checks if clicked square is in potentialMovement array
        for(let i = 0; i < potentialMovement.length; i++){
            console.log(JSON.stringify(potentialMovement[i]))
            if(JSON.stringify(potentialMovement[i]) == JSON.stringify(clickedSquare)){
                ///Checks if pawn is near the end
                if(boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "blackPawn" || "whitePawn"){
                    if((lastClickedPosition[0] === 6 && boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "blackPawn") || (lastClickedPosition[0] === 1 && boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "whitePawn")){
                        setShowPieceModal(true)
                    }
                }
                boardPosition[clickedSquare[0]][clickedSquare[1]] = boardPosition[lastClickedPosition[0]][lastClickedPosition[1]]
                boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] = ""
                setPotentialMovement([])
            }
        }
    }
    
    console.log(showPieceModal)

    if(!boardDiv || !boardPosition) return null

    return(
        <div className="board">
            {boardDiv}
            {showPieceModal ? <ChooseNewPiece changePawn={changePawn}/> : null}
        </div>
    )
}

export default Board
