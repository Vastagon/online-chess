import { checkForCheck } from "./checkForCheck"

export function checkForMateOrStalemate(boardPosition, kingPositions, whiteMoveBoolean){
    if(!whiteMoveBoolean){
        if(checkForCheck(boardPosition, kingPositions.whiteKing, "black")){
            alert("Stalemate")
            return "stalemate"
        }else{
            alert("White checkmates black")
            return "White checkmates black"
        }
    }else{
        if(checkForCheck(boardPosition, kingPositions.blackKing, "white")){
            alert("Stalemate")
            return "stalemate"
        }else{
            alert("Black checkmates white")
            return "Black checkmates white"
        }        
    }
}