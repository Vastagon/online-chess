import "../styles/board.css"
import { useEffect, useState } from "react"
import Piece from "./Piece"
import boardpositions from "./boardpositions.json"
import {v4 as uuid} from "uuid"




const Board = () =>{
    const [boardPositions, setBoardPosition] = useState(boardpositions)
    const [potentialMovement, setPotentialMovement] = useState([])
    const [lastClickedPosition, setLastClickedPosition] = useState()

    const [boardDiv, setBoardDiv] = useState()
    let evenRow = true

    const [pieceClicked, setPieceClicked] = useState(false)

    ///Shows squares it can move
    function canMove(){
        setBoardDiv(boardPositions.map((prev, rowIndex) =>{
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
                    <Piece setLastClickedPosition={setLastClickedPosition} potentialMovementGetsClicked={potentialMovementGetsClicked} potentialMovement={potentialMovement} setPotentialMovement={setPotentialMovement} boardPositions={boardPositions} key={uuid()} canMove={canMove} pieceClicked={pieceClicked} setPieceClicked={setPieceClicked} position={[rowIndex,index]} boardpositions={boardpositions} piece={boardpositions[rowIndex][index]}/>
                </div>)
            })}</div>) 
             

        }))
    }


    ///Runs whenever new piece is selected
    useEffect(() =>{ 
        canMove()
    }, [potentialMovement])


    function potentialMovementGetsClicked(clickedSquare){
        console.log(clickedSquare)
        console.log(potentialMovement)

        ///Checks if clicked square is in potentialMovement array
        for(let i = 0; i < potentialMovement.length; i++){
            console.log(JSON.stringify(potentialMovement[i]))
            if(JSON.stringify(potentialMovement[i]) == JSON.stringify(clickedSquare)){
                boardPositions[clickedSquare[0]][clickedSquare[1]] = boardPositions[lastClickedPosition[0]][lastClickedPosition[1]]
            }
        }
    }
    
    if(!boardDiv) return null

    return(
        <div className="board">
            {boardDiv}
        </div>
    )
}

export default Board
