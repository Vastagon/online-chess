import { checkForBlackCheck, checkForWhiteCheck } from "./checkForCheckmate"

export function checkForExisitingCheckmates(boardPosition, potentialMovement, piece, kingPositions, lastClickedPosition){
    let tempBoardCheck
    let tempKingPosition

    function createNewArray(){
        let tempNewBoard = []

        for(let i = 0; i < 8; i++){
            let rowArray = []
            for(let j = 0; j < 8; j++){
                rowArray.push(boardPosition[i][j])
            }
            tempNewBoard.push(rowArray)
        }

        return tempNewBoard
    }

    if(piece.substring(0,1) === "w"){
        console.log("Checking if white is in check")

        for(let i = 0; i < potentialMovement.length; i++){
            tempBoardCheck = createNewArray()
            if(piece === "whiteKing"){
                tempKingPosition = [potentialMovement[i][0], potentialMovement[i][1]]
            }else{
                tempKingPosition = kingPositions.whiteKing
            }

            tempBoardCheck[potentialMovement[i][0]][potentialMovement[i][1]] = piece
            tempBoardCheck[lastClickedPosition[0]][lastClickedPosition[1]] = ""

            if(checkForBlackCheck(tempBoardCheck, tempKingPosition)){
                potentialMovement.splice(i, 1)
                i--
            }
        }

        return potentialMovement        
    }else{
        console.log("Checking if black is in check")

        for(let i = 0; i < potentialMovement.length; i++){
            tempBoardCheck = createNewArray()
            if(piece === "blackKing"){
                tempKingPosition = [potentialMovement[i][0], potentialMovement[i][1]]
            }else{
                tempKingPosition = kingPositions.blackKing
            }

            tempBoardCheck[potentialMovement[i][0]][potentialMovement[i][1]] = piece
            tempBoardCheck[lastClickedPosition[0]][lastClickedPosition[1]] = ""

            if(checkForWhiteCheck(tempBoardCheck, tempKingPosition)){
                potentialMovement.splice(i, 1)
                i--
            }
        }

        return potentialMovement        
    }
} 