import "../styles/board.css"
import { useEffect, useState } from "react"
import Piece from "./Piece"
import boardPositions from "./boardpositions.json"
import {v4 as uuid} from "uuid"




const Board = () =>{
    let boardpositions
    useEffect(() =>{
        boardpositions = boardPositions
    }, [])
    const [boardDiv, setBoardDiv] = useState()
    let evenRow = true


    const [pieceClicked, setPieceClicked] = useState(false)

    ///Shows squares it can move
    function canMove(potentialMovement){

        setBoardDiv(boardpositions.map((prev, rowIndex) =>{
            evenRow = !evenRow
            return(<div key={uuid()} className="board-row">{prev.map((prev, index) =>{
                evenRow = !evenRow
                let hasDot
                ///Initial class for board divs
                // evenRow ? hasDot = "board-square white-square" : hasDot = "board-square green-square"

                ///Shows dots on all potential movement squares
                for(let i = 0; i < potentialMovement.length; i++){
                    if(JSON.stringify([rowIndex, index]) == JSON.stringify(potentialMovement[i])){
                        // hasDot = "has-dot " + hasDot
                        hasDot = true
                    }
                }


                return (<div key={uuid()} className={evenRow ? "board-square white-square" : "board-square green-square"}>
                    <div className={hasDot ? "has-dot" : null} />
                    <Piece key={uuid()} canMove={canMove} setPieceClicked={setPieceClicked} position={[rowIndex,index]} boardpositions={boardpositions} piece={boardpositions[rowIndex][index]}/>
                </div>)
            })}</div>) 
            

        }))
    }


    useEffect(() =>{
        // @ts-expect-error
        setBoardDiv(boardpositions.map((prev, rowIndex) =>{
            evenRow = !evenRow
            return(<div key={uuid()} className="board-row">{prev.map((prev, index) =>{
                evenRow = !evenRow

                return (<div key={uuid()} className={evenRow? "board-square white-square" : "board-square green-square"}>
                    <Piece key={uuid()} canMove={canMove} setPieceClicked={setPieceClicked} position={[rowIndex,index]} boardpositions={boardpositions} piece={boardpositions[rowIndex][index]}/>
                </div>)
            })}</div>) 
            

        }))
    }, [])
    

    if(!boardDiv) return null

    return(
        <div className="board">
            {boardDiv}
        </div>
    )
}

export default Board
