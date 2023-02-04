import {
    pawnLogic,
    rookLogic,
    knightLogic,
    bishopLogic,
    kingLogic,
    queenLogic
} from "./movementLogicFunctions"


export function checkForCheck(boardPosition, oppositeKingPosition, color){
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


            for(let i = 0; i < checkPotentialMovement.length; i++){
                if(JSON.stringify(oppositeKingPosition) === JSON.stringify(checkPotentialMovement[i])){
                    return true
                }
            }
        }
    }
}