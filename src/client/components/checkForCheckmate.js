///Go through every piece and check if the potential movement === the position of the opposite king
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
    console.log("Checking if white is in check")
    for(let i = 0; i < boardPosition.length; i++){

        for(let j = 0; j < boardPosition[i].length; j++){
            let piece = boardPosition[i][j]
            let position = [i, j]
            let checkPotentialMovement = []
    
            ///Pawn Logic
            if(piece === "blackPawn"){
                ///This is causing a loop
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
    console.log("Checking if black is in check")
    for(let i = 0; i < boardPosition.length; i++){

        for(let j = 0; j < boardPosition[i].length; j++){
            let piece = boardPosition[i][j]
            let position = [i, j]
            let potentialMovement = []
    
            ///Pawn Logic
            if(piece === "whitePawn"){
                potentialMovement = pawnLogic(position, piece, boardPosition)
            }

            ///Rook Logic
            if(piece === "whiteRook"){
                potentialMovement = rookLogic(position, piece, boardPosition)
            }
    
            ///Bishop Logic
            if(piece === "whiteBishop"){
                potentialMovement = bishopLogic(position, piece, boardPosition) 
            }
    
            ///Queen Logic
            if(piece === "whiteQueen"){
                potentialMovement = queenLogic(position, piece, boardPosition)
    
            }
    
            ///King logic
            if(piece === "whiteKing"){
                potentialMovement = kingLogic(position, piece, boardPosition)
            }
    
            ///Knight Logic
            if(piece === "whiteKnight"){
                potentialMovement = knightLogic(position, piece, boardPosition)
            }


            ///Check each potential movement and determine if it's in check
            for(let i = 0; i < potentialMovement.length; i++){
                if(JSON.stringify(oppositeKingPosition.blackKing) === JSON.stringify(potentialMovement[i])){
                    return true
                }
            }
        }
    }
}