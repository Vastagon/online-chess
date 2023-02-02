import { checkForExisitingCheckmates } from "./checkForExistingCheckmates";
import {
    pawnLogic,
    rookLogic,
    knightLogic,
    bishopLogic,
    kingLogic,
    queenLogic
} from "./movementLogicFunctions"


export function checkForMate(boardPosition, kingPositions, whiteMoveBoolean){
    let potentialMovement
    let color
    let moveExists = false

    if(whiteMoveBoolean){
        color = "white"
    }else{
        color = "black"
    }

    ///Check if white or black is in mate
    for(let i = 0; i < boardPosition.length; i++){
        for(let j = 0; j < boardPosition[i].length; j++){
            let piece = boardPosition[i][j]

            ///Pawn Logic
            if(piece === `${color}Pawn`){
                potentialMovement = pawnLogic([i, j], piece, boardPosition)
            }
            ///Rook Logic
            if(piece === `${color}Rook`){
                potentialMovement = rookLogic([i, j], piece, boardPosition)
            }

            ///Bishop Logic
            if(piece === `${color}Bishop`){
                potentialMovement = bishopLogic([i, j], piece, boardPosition)
            }

            ///Queen Logic
            if(piece === `${color}Queen`){
                potentialMovement = queenLogic([i, j], piece, boardPosition)
            }
    
            ///King Logic
            if(piece === `${color}King`){
                potentialMovement = kingLogic([i, j], piece, boardPosition)
            }

            ///Knight Logic
            if(piece === `${color}Knight`){
                potentialMovement = knightLogic([i, j], piece, boardPosition)
            }


            let legalMoves = checkForExisitingCheckmates(boardPosition, potentialMovement, piece, kingPositions, [i, j])
            if(legalMoves?.length > 0){
                moveExists = true
                break;
            }
        }
        if(moveExists){
            break;
        }
    }

    if(!moveExists){
        return true
    }else{
        return false
    }
}