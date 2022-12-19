///Go through every piece and check if the potential movement === the position of the opposite king
import {
    pawnLogic,
    rookLogic,
    knightLogic,
    bishopLogic,
    kingLogic,
    queenLogic
} from "./movementLogicFunctions"


///Function that runs through every piece on the board and check if it's potential movement overlaps with king's position
export function checkForBlackCheck(boardPosition, oppositeKingPosition){
    for(let i = 0; i < boardPosition.length; i++){

        for(let j = 0; j < boardPosition[i].length; j++){
            let piece = boardPosition[i][j]
            let position = [i, j]
            let potentialMovement = []
    
            ///PAWN LOGIC
            if(piece === "blackPawn"){
                potentialMovement = pawnLogic(position, piece, boardPosition)
            }
    
            ///ROOK LOGIC
            if(piece === "blackRook"){
                potentialMovement = rookLogic(position, piece, boardPosition)
            }
    
            ///Bishop Logic
            if(piece === "blackBishop"){
                potentialMovement = bishopLogic(position, piece, boardPosition) 
            }
    
            ///Queen Logic
            if(piece === "blackQueen"){
                potentialMovement = queenLogic(position, piece, boardPosition)
    
            }
    
            ///King logic
            if(piece === "blackKing"){
                potentialMovement = kingLogic(position, piece, boardPosition)
            }
    
            ///Knight Logic
            if(piece === "blackKnight"){
                potentialMovement = knightLogic(position, piece, boardPosition)
            }
    
            for(let i = 0; i < potentialMovement.length; i++){
                if(JSON.stringify(oppositeKingPosition.whiteKing) === JSON.stringify(potentialMovement[i])){
                    return true
                }
            }
        }
    }
}





export function checkForWhiteCheck(boardPosition, oppositeKingPosition){
    for(let i = 0; i < boardPosition.length; i++){

        for(let j = 0; j < boardPosition[i].length; j++){
            let piece = boardPosition[i][j]
            let position = [i, j]
            let potentialMovement = []
    
            ///PAWN LOGIC
            if(piece === "whitePawn"){
                potentialMovement = pawnLogic(position, piece, boardPosition)
            }
    
            ///ROOK LOGIC
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
    
            for(let i = 0; i < potentialMovement.length; i++){
                if(JSON.stringify(oppositeKingPosition.blackKing) === JSON.stringify(potentialMovement[i])){
                    return true
                }
            }
        }
    }
}