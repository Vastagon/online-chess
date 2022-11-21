let potentialMovement = []

export function pawnLogic(position, piece, boardPosition){
    // props.setPieceClicked(true)
    if(piece === "whitePawn"){
        ///increase row by one, or two if first move
        if((position[0] === 6 || position[0] === 1) && boardPosition[position[0]-1][position[1]] === "" && boardPosition[position[0]-2][position[1]] === ""){
            potentialMovement = [[position[0]-2, position[1]], [position[0]-1, position[1]]]
        }else{
            if(boardPosition[position[0]-1][position[1]] === ""){
                potentialMovement = [[position[0]-1, position[1]]]
            }
        }
        ///Checking if pawn can take piece diagonally
        if((boardPosition[position[0]-1][position[1]-1]?.substring(0,5)) === "black"){
            potentialMovement = [...potentialMovement, [position[0]-1, position[1]-1]]
        }
        if((boardPosition[position[0]-1][position[1]+1]?.substring(0,5)) === "black"){
            potentialMovement = [...potentialMovement, [position[0]-1, position[1]+1]]
        }
    }
    if(piece === "blackPawn"){
        ///increase row by one, or two if first move
        if((position[0] === 6 || position[0] === 1) && boardPosition[position[0]+1][position[1]] === "" && boardPosition[position[0]+2][position[1]] === ""){
            potentialMovement =([[position[0]+2, position[1]], [position[0]+1, position[1]]])
        }else{
            if(boardPosition[position[0]+1][position[1]] === ""){
                potentialMovement = [[position[0]+1, position[1]]]
            }
        }
        ///Checking if pawn can take piece diagonally
        if((boardPosition[position[0]+1][position[1]+1]?.substring(0,5)) === "white"){
            potentialMovement = [...potentialMovement, [position[0]+1, position[1]+1]]
        }
        if((boardPosition[position[0]+1][position[1]-1]?.substring(0,5)) === "white"){
            potentialMovement = [...potentialMovement, [position[0]+1, position[1]-1]]
        }
    }

    return potentialMovement
}















export function rookLogic(position, piece, boardPosition){
    let j = 1
    let notBlocked = true
    let temp = []

    ///Checks bottom
    while(notBlocked){
        ///Checks for positions below
        if(position[0] + j < 8){
            console.log(position[0]+j)
            if(boardPosition[position[0]+j][position[1]] === ""){
                temp.push([position[0]+j, position[1]])
                console.log(1)
            }else{
                console.log(2)
                notBlocked = false
                ///Checks if stoppage is enemy piece
                if((boardPosition[position[0]+j][position[1]]).substring(0,1) === "w" && piece.substring(0,1) === "b"){
                    temp.push([position[0]+j, position[1]])
                }
                if((boardPosition[position[0]+j][position[1]]).substring(0,1) === "b" && piece.substring(0,1) === "w"){
                    temp.push([position[0]+j, position[1]])
                }
            }                    
        }else{
            notBlocked = false
        }
        
        j++
    }
    notBlocked = true
    j = 1
    
    ///Checks top
    while(notBlocked){
        ///Checks for positions below
        if(position[0] - j > 0){
            if(boardPosition[position[0]-j][position[1]] === ""){
                temp.push([position[0]-j, position[1]])
            }else{
                notBlocked = false
                ///Checks if stoppage is enemy piece
                if((boardPosition[position[0]-j][position[1]]).substring(0,1) === "w" && piece.substring(0,1) === "b"){
                    temp.push([position[0]-j, position[1]])
                }
                if((boardPosition[position[0]-j][position[1]]).substring(0,1) === "b" && piece.substring(0,1) === "w"){
                    temp.push([position[0]-j, position[1]])
                }
                potentialMovement = temp
            }
        }else{
            notBlocked = false
        }

        j++                
    }
    notBlocked = true
    j = 1

    ///Checks left
    while(notBlocked){
        ///Checks for positions below
        if(boardPosition[position[0]][position[1]-j] === "" && boardPosition[position[0]][position[1]-j] !== undefined){
            temp.push([position[0], position[1]-j])
        }else{
            notBlocked = false
            ///Checks if stoppage is enemy piece
            if((boardPosition[position[0]][position[1]-j])?.substring(0,1) === "w" && piece.substring(0,1) === "b"){
                temp.push([position[0], position[1]-j])
            }
            if((boardPosition[position[0]][position[1]-j])?.substring(0,1) === "b" && piece.substring(0,1) === "w"){
                temp.push([position[0], position[1]-j])
            }
            potentialMovement = temp
        }
        j++
    }
    notBlocked = true
    j = 1

    ///Checks right
    while(notBlocked){
        ///Checks for positions righy
        if(boardPosition[position[0]][position[1]+j] === "" && boardPosition[position[0]][position[1]+j] !== undefined){
            temp.push([position[0], position[1]+j])
        }else{
            notBlocked = false
            ///Checks if stoppage is enemy piece
            if((boardPosition[position[0]][position[1]+j])?.substring(0,1) === "w" && piece.substring(0,1) === "b"){
                temp.push([position[0], position[1]+j])
            }
            if((boardPosition[position[0]][position[1]+j])?.substring(0,1) === "b" && piece.substring(0,1) === "w"){
                temp.push([position[0], position[1]+j])
            }
            // potentialMovement = temp
            return temp
        }
        j++
    }
    ///End of Rook Logic export function
}


























   export function bishopLogic(position, piece, boardPosition){
    let i = 1
    let notBlocked = true
    let temp = []
   
    ///Bottom right diagonal 
    while(notBlocked){
        if(position[0]+i < 8 && position[1]+i < 8){
            if(boardPosition[position[0]+i][position[1]+i] === ""){
                temp.push([position[0]+i, position[1]+i])
            }else{ 
                if(checkIfOppositePiece(piece, boardPosition[position[0]+i][position[1]+i])){
                    temp.push([position[0]+i, position[1]+i])
                }
                notBlocked = false
            }
        }else{
            notBlocked = false
        }
   
        i++
    }
   
    i = 1
    notBlocked = true
   
    ///Bottom left diagonal 
    while(notBlocked){
        if(position[0]+i < 8 && position[1]-i >= 0){
            if(boardPosition[position[0]+i][position[1]-i] === ""){
                temp.push([position[0]+i, position[1]-i])
            }else{ 
                if(checkIfOppositePiece(piece, boardPosition[position[0]+i][position[1]-i])){
                    temp.push([position[0]+i, position[1]-i])
                }
                notBlocked = false
            }
        }else{
            notBlocked = false
        }
   
        i++
    }
   
    i = 1
    notBlocked = true
   
    ///Top left diagonal 
    while(notBlocked){
        if(position[0]-i >= 0 && position[1]-i >= 0){
            if(boardPosition[position[0]-i][position[1]-i] === ""){
                temp.push([position[0]-i, position[1]-i])
            }else{ 
                if(checkIfOppositePiece(piece, boardPosition[position[0]-i][position[1]-i])){
                    temp.push([position[0]-i, position[1]-i])
                }
                notBlocked = false
            }
        }else{
            notBlocked = false
        }
   
        i++
    }
   
    i = 1
    notBlocked = true
   
    ///Top right diagonal 
    while(notBlocked){
        if(position[0]-i >= 0 && position[1]+i < 8){
            if(boardPosition[position[0]-i][position[1]+i] === ""){
                temp.push([position[0]-i, position[1]+i])
            }else{ 
                if(checkIfOppositePiece(piece, boardPosition[position[0]-i][position[1]+i])){
                    temp.push([position[0]-i, position[1]+i])
                }
                notBlocked = false
            }
        }else{
            notBlocked = false
        }
   
        i++
    }
   
    return temp 
   }



export function queenLogic(position, piece, boardPosition){
    let rookAndBishop = bishopLogic(position, piece, boardPosition).concat(rookLogic(position, piece, boardPosition))
    potentialMovement = rookAndBishop
    return potentialMovement
}


















export function kingLogic(position, piece, boardPosition){
    let temp = []

    ///export Functions created to return true or false depending on where king is
    function topKingCheck(num){
        return num !== 0
    }
    function bottomKingCheck(num){
        return num !== 7
    }
    function leftKingCheck(num){
        return num !== 0
    }
    function rightKingCheck(num){
        return num !== 7
    }

    //Top Left
    if(topKingCheck(position[0]) && leftKingCheck(position[1])){
        if(boardPosition[position[0]-1][position[1]-1] === "" || checkIfOppositePiece(piece, boardPosition[position[0]-1][position[1]-1])){
            temp.push([position[0]-1, position[1]-1])
        }                
    }
    //Top Center
    if(topKingCheck(position[0])){
        if(boardPosition[position[0]-1][position[1]] === "" || checkIfOppositePiece(piece, boardPosition[position[0]-1][position[1]])){
            temp.push([position[0]-1, position[1]])
        }                
    }
    //Top Right
    if(topKingCheck(position[0]) && rightKingCheck(position[1])){
        if(boardPosition[position[0]-1][position[1]+1] === "" || checkIfOppositePiece(piece, boardPosition[position[0]-1][position[1]+1])){
            temp.push([position[0]-1, position[1]+1])
        }                
    }
    //Center Right
    if(rightKingCheck(position[1])){
        if(boardPosition[position[0]][position[1]+1] === "" || checkIfOppositePiece(piece, boardPosition[position[0]][position[1]+1])){
            temp.push([position[0], position[1]+1])
        }                
    }
    //Bottom Right
    if(rightKingCheck(position[1]) && bottomKingCheck(position[0])){
        if(boardPosition[position[0]+1][position[1]+1] === "" || checkIfOppositePiece(piece, boardPosition[position[0]+1][position[1]+1])){
            temp.push([position[0]+1, position[1]+1])
        }                
    }
    //Bottom Center
    if(bottomKingCheck(position[0])){
        if(boardPosition[position[0]+1][position[1]] === "" || checkIfOppositePiece(piece, boardPosition[position[0]+1][position[1]])){
            temp.push([position[0]+1, position[1]])
        }                
    }
    //Bottom Left
    if(bottomKingCheck(position[0]) && leftKingCheck(position[1])){
        if(boardPosition[position[0]+1][position[1]-1] === "" || checkIfOppositePiece(piece, boardPosition[position[0]+1][position[1]-1])){
            temp.push([position[0]+1, position[1]-1])
        }                
    }
    //Center Left
    if(leftKingCheck(position[1])){
        if(boardPosition[position[0]][position[1]-1] === "" || checkIfOppositePiece(piece, boardPosition[position[0]][position[1]-1])){
            temp.push([position[0], position[1]-1])
        }                
    }

    potentialMovement = temp
    return potentialMovement    
}

















export function knightLogic(position, piece, boardPosition){
///Knight Logic
    let temp = []

    ///Checks two up, one left
    if(position[0]-2 >= 0 && position[1]-1 >= 0){
        if(boardPosition[position[0]-2][position[1]-1] === "" || checkIfOppositePiece(piece, boardPosition[position[0]-2][position[1]-1])){
            temp.push([position[0]-2, position[1]-1])
        }            
    }
    ///Checks one up, two left
    if(position[0]-1 >= 0 && position[1]-2 >= 0){
        if(boardPosition[position[0]-1][position[1]-2] === "" || checkIfOppositePiece(piece, boardPosition[position[0]-1][position[1]-2])){
            temp.push([position[0]-1, position[1]-2])
        }            
    }

    ///Checks one down, two right
    if(position[0]+1 < 7 && position[1]+2 < 7){
        if(boardPosition[position[0]+1][position[1]+2] === "" || checkIfOppositePiece(piece, boardPosition[position[0]+1][position[1]+2])){
            temp.push([position[0]+1, position[1]+2])
        }
    }
    ///Two down, one right
    if(position[0]+2 < 7 && position[1]+1 < 7){
        if(boardPosition[position[0]+2][position[1]+1] === "" || checkIfOppositePiece(piece, boardPosition[position[0]+2][position[1]+1])){
            temp.push([position[0]+2, position[1]+1])
        }
    }

    ///One down, two left
    if(position[0]+1 < 7 && position[1]-2 >= 0){
        if(boardPosition[position[0]+1][position[1]-2] === "" || checkIfOppositePiece(piece, boardPosition[position[0]+1][position[1]-2])){
            temp.push([position[0]+1, position[1]-2])
        }
    }
    ///Two down, one left
    if(position[0]+2 < 7 && position[1]-1 >= 0){
        if(boardPosition[position[0]+2][position[1]-1] === "" || checkIfOppositePiece(piece, boardPosition[position[0]+2][position[1]-1])){
            temp.push([position[0]+2, position[1]-1])
        }
    }

    ///Checks two up, one right
    if(position[0]-2 >= 0 && position[1]+1 < 8){
        if(boardPosition[position[0]-2][position[1]+1] === "" || checkIfOppositePiece(piece, boardPosition[position[0]-2][position[1]+1])){
            temp.push([position[0]-2, position[1]+1])
        }            
    }
    ///Checks one up, two right
    if(position[0]-1 >= 0 && position[1]+2 < 8){
        if(boardPosition[position[0]-1][position[1]+2] === "" || checkIfOppositePiece(piece, boardPosition[position[0]-1][position[1]+2])){
            temp.push([position[0]-1, position[1]+2])
        }            
    }

    potentialMovement = temp
    return potentialMovement
}




 

 



function checkIfOppositePiece(movingPiece, takenPiece){
 if(movingPiece.substring(0,1) !== takenPiece.substring(0,1)){
     return true
 }else{
     return false
 }
}