import { checkForBlackCheck, checkForWhiteCheck } from "./checkForCheckmate"

export function checkForExisitingCheckmates(boardPosition, potentialMovement, piece, kingPositions, lastClickedPosition){
    let tempBoardCheck

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
            tempBoardCheck[potentialMovement[i][0]][potentialMovement[i][1]] = piece
            tempBoardCheck[lastClickedPosition[0]][lastClickedPosition[1]] = ""

            if(checkForBlackCheck(tempBoardCheck, kingPositions.whiteKing)){
                potentialMovement.splice(i, 1)
                i--
            }
        }

        // console.log(potentialMovement)
        return potentialMovement        
    }else{
        for(let i = 0; i < potentialMovement.length; i++){
            tempBoardCheck = createNewArray()
            tempBoardCheck[potentialMovement[i][0]][potentialMovement[i][1]] = piece
            tempBoardCheck[lastClickedPosition[0]][lastClickedPosition[1]] = ""

            if(checkForWhiteCheck(tempBoardCheck, kingPositions.blackKing)){
                potentialMovement.splice(i, 1)
                i--
            }
        }

        return potentialMovement        
    }
} 