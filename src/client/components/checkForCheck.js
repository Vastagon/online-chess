import {
    pawnLogic,
    rookLogic,
    knightLogic,
    bishopLogic,
    kingLogic,
    queenLogic
} from "./movementLogicFunctions"


///White Puts black in check
export function checkForBlackCheck(boardPosition, oppositeKingPosition){
    for(let i = 0; i < boardPosition.length; i++){

        for(let j = 0; j < boardPosition[i].length; j++){
            let piece = boardPosition[i][j]
            let position = [i, j]
            let checkPotentialMovement = []
    
            ///Pawn Logic
            if(piece === "blackPawn"){
                checkPotentialMovement = pawnLogic(position, piece, boardPosition)
            }
    
            ///Rook Logic
            if(piece === "blackRook"){
                checkPotentialMovement = rookLogic(position, piece, boardPosition)
            }
    
            ///Bishop Logic
            if(piece === "blackBishop"){
                checkPotentialMovement = bishopLogic(position, piece, boardPosition) 
            }
    
            ///Queen Logic
            if(piece === "blackQueen"){
                checkPotentialMovement = queenLogic(position, piece, boardPosition)
    
            }
    
            ///King Logic
            if(piece === "blackKing"){
                checkPotentialMovement = kingLogic(position, piece, boardPosition)
            }
    
            ///Knight Logic
            if(piece === "blackKnight"){
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




///White Puts black in check
export function checkForWhiteCheck(boardPosition, oppositeKingPosition){
    for(let i = 0; i < boardPosition.length; i++){

        for(let j = 0; j < boardPosition[i].length; j++){
            let piece = boardPosition[i][j]
            let position = [i, j]
            let checkPotentialMovement = []
    
            ///Pawn Logic
            if(piece === "whitePawn"){
                checkPotentialMovement = pawnLogic(position, piece, boardPosition)
            }

            ///Rook Logic
            if(piece === "whiteRook"){
                checkPotentialMovement = rookLogic(position, piece, boardPosition)
            }
    
            ///Bishop Logic
            if(piece === "whiteBishop"){
                checkPotentialMovement = bishopLogic(position, piece, boardPosition) 
            }
    
            ///Queen Logic
            if(piece === "whiteQueen"){
                checkPotentialMovement = queenLogic(position, piece, boardPosition)
    
            }
    
            ///King logic
            if(piece === "whiteKing"){
                checkPotentialMovement = kingLogic(position, piece, boardPosition)
            }
    
            ///Knight Logic
            if(piece === "whiteKnight"){
                checkPotentialMovement = knightLogic(position, piece, boardPosition)
            }


            ///Check each potential movement and determine if it's in check
            for(let i = 0; i < checkPotentialMovement.length; i++){
                if(JSON.stringify(oppositeKingPosition) === JSON.stringify(checkPotentialMovement[i])){
                    return true
                }
            }
        }
    }
}