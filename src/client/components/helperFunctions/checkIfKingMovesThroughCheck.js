import {
    pawnLogic,
    rookLogic,
    knightLogic,
    bishopLogic,
    kingLogic,
    queenLogic
} from "./movementLogicFunctions"


export function checkIfKingMovesThroughCheck(positionKingMovesTo, boardPosition){
    if(positionKingMovesTo[0] === 7){
        ///White king
        if(positionKingMovesTo[1] === 2){//Check for 2 positions to left and right
            checkPotentialMovements(boardPosition, 7, [2,3], "black")
        }
    }else{
        ///Black King
    }
}




function checkPotentialMovements(boardPosition, rowNumber, xPositions, color){
    for(let i = 0; i < boardPosition.length; i++){
        for(let j = 0; j < boardPosition[i].length; j++){
            let piece = boardPosition[i][j]
            let position = [i, j]
            let checkPotentialMovement = []
    
            ///Pawn Logic
            if(piece === `${color}Pawn`){
                checkPotentialMovement = pawnLogic(position, piece, boardPosition)
            }
    
            ///Rook Logic
            if(piece === `${color}Rook`){
                checkPotentialMovement = rookLogic(position, piece, boardPosition)
            }
    
            ///Bishop Logic
            if(piece === `${color}Bishop`){
                checkPotentialMovement = bishopLogic(position, piece, boardPosition) 
            }
    
            ///Queen Logic
            if(piece === `${color}Queen`){
                checkPotentialMovement = queenLogic(position, piece, boardPosition)
    
            }
    
            ///King Logic
            if(piece === `${color}King`){
                checkPotentialMovement = kingLogic(position, piece, boardPosition)
            }
    
            ///Knight Logic
            if(piece === `${color}Knight`){
                checkPotentialMovement = knightLogic(position, piece, boardPosition)
            }

            ///UNFINISHED
            for(let i = 0; i < checkPotentialMovement.length; i++){
                for(let j = 0; j < 2; j++){
                    if(JSON.stringify([rowNumber, xPositions[j]]) === JSON.stringify(checkPotentialMovement[j])){
                        return true
                    }                    
                }
            }
        }
    }
}