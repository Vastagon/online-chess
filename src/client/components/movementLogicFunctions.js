let potentialMovement = []
///These functions add to the potentialMovement array which is ran through in the canMove function on Board.js. They return all potential movement, which sets the potentialMovement state in Board.js to what it returns

//y = the y position of the selected piece. Ranges from 0-7, 0 being the highest position on the board
//x = the x position of the selected piece. Ranges from 0-7, 0 being the left most position on the board
//boardPosition is the 2D array with all of the piece positions
//piece is the name of the selected piece

export function pawnLogic(position, piece, boardPosition){
    let temp = []
    let x = position[1]
    let y = position[0]
///Check if near an edge before movement

    if(piece === "blackPawn"){
        ///One ahead
        if(y + 1 < 8){
            if(boardPosition[y+1][x] === ""){
                temp.push([y+1,x])
            }            
            ///Two ahead
            if((y === 6 || y === 1)){
                if(boardPosition[y+2][x] === "" && boardPosition[y+1][x] === ""){
                    temp.push([y+2, x])
                }                
            }        
        }

        ///Attacking
        if(y + 1 < 8 && x + 1 < 8){
            if(boardPosition[y+1][x+1].substring(0,1) === "w"){
                temp.push([y+1, x+1])
            }            
        }
        if(y + 1 < 8 && x - 1 >= 0){
            if(boardPosition[y+1][x-1].substring(0,1) === "w"){
                temp.push([y+1, x-1])
            }
        }

    }





    if(piece === "whitePawn"){
        ///One ahead
        if(y - 1 < 8){
            if(boardPosition[y-1][x] === ""){
                ///Allow the piece to move
                temp.push([y-1, x])
            }            
            ///Two ahead
            if((y === 6 || y === 1)){
                if(boardPosition[y-2][x] === "" && boardPosition[y-1][x] === ""){
                    ///Allow the piece to move
                    temp.push([y-2, x])
                }                
            }        
        }

        ///Attacking
        if(y - 1 >= 0 && x - 1 >= 0){
            if(boardPosition[y-1][x-1].substring(0,1) === "b"){
                temp.push([y-1, x-1])
            }        
        }
        if(y - 1 >= 0 && x + 1 < 8){
            if(boardPosition[y-1][x+1].substring(0,1) === "b"){
                temp.push([y-1, x+1])
            }
        }

    }


    return temp 
}




///Using the old potentialMovement. Might have something to do with how data is sent with sockets










export function rookLogic(position, piece, boardPosition){
    let j = 1
    let notBlocked = true
    let temp = []

    let x = position[1]
    let y = position[0]

    ///Checks bottom
    while(notBlocked){
        ///Checks for positions below
        if(y + j < 8){
            if(boardPosition[y+j][x] === ""){
                temp.push([y+j, x])
            }else{
                notBlocked = false
                ///Checks if stoppage is enemy piece
                if((boardPosition[y+j][x]).substring(0,1) === "w" && piece.substring(0,1) === "b"){
                    temp.push([y+j, x])
                }
                if((boardPosition[y+j][x]).substring(0,1) === "b" && piece.substring(0,1) === "w"){
                    temp.push([y+j, x])
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
        if(y - j > 0){
            if(boardPosition[y-j][x] === ""){
                temp.push([y-j, x])
            }else{
                notBlocked = false
                ///Checks if stoppage is enemy piece
                if((boardPosition[y-j][x]).substring(0,1) === "w" && piece.substring(0,1) === "b"){
                    temp.push([y-j, x])
                }
                if((boardPosition[y-j][x]).substring(0,1) === "b" && piece.substring(0,1) === "w"){
                    temp.push([y-j, x])
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
        if(boardPosition[y][x-j] === "" && boardPosition[y][x-j] !== undefined){
            temp.push([y, x-j])
        }else{
            notBlocked = false
            ///Checks if stoppage is enemy piece
            if((boardPosition[y][x-j])?.substring(0,1) === "w" && piece.substring(0,1) === "b"){
                temp.push([y, x-j])
            }
            if((boardPosition[y][x-j])?.substring(0,1) === "b" && piece.substring(0,1) === "w"){
                temp.push([y, x-j])
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
        if(boardPosition[y][x+j] === "" && boardPosition[y][x+j] !== undefined){
            temp.push([y, x+j])
        }else{
            notBlocked = false
            ///Checks if stoppage is enemy piece
            if((boardPosition[y][x+j])?.substring(0,1) === "w" && piece.substring(0,1) === "b"){
                temp.push([y, x+j])
            }
            if((boardPosition[y][x+j])?.substring(0,1) === "b" && piece.substring(0,1) === "w"){
                temp.push([y, x+j])
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

    let x = position[1]
    let y = position[0]
   
    ///Bottom right diagonal 
    while(notBlocked){
        if(y+i < 8 && x+i < 8){
            if(boardPosition[y+i][x+i] === ""){
                temp.push([y+i, x+i])
            }else{ 
                if(checkIfOppositePiece(piece, boardPosition[y+i][x+i])){
                    temp.push([y+i, x+i])
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
        if(y+i < 8 && x-i >= 0){
            if(boardPosition[y+i][x-i] === ""){
                temp.push([y+i, x-i])
            }else{ 
                if(checkIfOppositePiece(piece, boardPosition[y+i][x-i])){
                    temp.push([y+i, x-i])
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
        if(y-i >= 0 && x-i >= 0){
            if(boardPosition[y-i][x-i] === ""){
                temp.push([y-i, x-i])
            }else{ 
                if(checkIfOppositePiece(piece, boardPosition[y-i][x-i])){
                    temp.push([y-i, x-i])
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
        if(y-i >= 0 && x+i < 8){
            if(boardPosition[y-i][x+i] === ""){
                temp.push([y-i, x+i])
            }else{ 
                if(checkIfOppositePiece(piece, boardPosition[y-i][x+i])){
                    temp.push([y-i, x+i])
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

    let x = position[1]
    let y = position[0]

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
    if(topKingCheck(y) && leftKingCheck(x)){
        if(boardPosition[y-1][x-1] === "" || checkIfOppositePiece(piece, boardPosition[y-1][x-1])){
            temp.push([y-1, x-1])
        }                
    }
    //Top Center
    if(topKingCheck(y)){
        if(boardPosition[y-1][x] === "" || checkIfOppositePiece(piece, boardPosition[y-1][x])){
            temp.push([y-1, x])
        }                
    }
    //Top Right
    if(topKingCheck(y) && rightKingCheck(x)){
        if(boardPosition[y-1][x+1] === "" || checkIfOppositePiece(piece, boardPosition[y-1][x+1])){
            temp.push([y-1, x+1])
        }                
    }
    //Center Right
    if(rightKingCheck(x)){
        if(boardPosition[y][x+1] === "" || checkIfOppositePiece(piece, boardPosition[y][x+1])){
            temp.push([y, x+1])
        }                
    }
    //Bottom Right
    if(rightKingCheck(x) && bottomKingCheck(y)){
        if(boardPosition[y+1][x+1] === "" || checkIfOppositePiece(piece, boardPosition[y+1][x+1])){
            temp.push([y+1, x+1])
        }                
    }
    //Bottom Center
    if(bottomKingCheck(y)){
        if(boardPosition[y+1][x] === "" || checkIfOppositePiece(piece, boardPosition[y+1][x])){
            temp.push([y+1, x])
        }                
    }
    //Bottom Left
    if(bottomKingCheck(y) && leftKingCheck(x)){
        if(boardPosition[y+1][x-1] === "" || checkIfOppositePiece(piece, boardPosition[y+1][x-1])){
            temp.push([y+1, x-1])
        }                
    }
    //Center Left
    if(leftKingCheck(x)){
        if(boardPosition[y][x-1] === "" || checkIfOppositePiece(piece, boardPosition[y][x-1])){
            temp.push([y, x-1])
        }                
    }

    potentialMovement = temp
    return potentialMovement    
}

















export function knightLogic(position, piece, boardPosition){
///Knight Logic
    let temp = []

    let x = position[1]
    let y = position[0]

    ///Checks two up, one left
    if(y-2 >= 0 && x-1 >= 0){
        if(boardPosition[y-2][x-1] === "" || checkIfOppositePiece(piece, boardPosition[y-2][x-1])){
            temp.push([y-2, x-1])
        }            
    }
    ///Checks one up, two left
    if(y-1 >= 0 && x-2 >= 0){
        if(boardPosition[y-1][x-2] === "" || checkIfOppositePiece(piece, boardPosition[y-1][x-2])){
            temp.push([y-1, x-2])
        }            
    }

    ///Checks one down, two right
    if(y+1 < 7 && x+2 < 7){
        if(boardPosition[y+1][x+2] === "" || checkIfOppositePiece(piece, boardPosition[y+1][x+2])){
            temp.push([y+1, x+2])
        }
    }
    ///Two down, one right
    if(y+2 < 7 && x+1 < 7){
        if(boardPosition[y+2][x+1] === "" || checkIfOppositePiece(piece, boardPosition[y+2][x+1])){
            temp.push([y+2, x+1])
        }
    }

    ///One down, two left
    if(y+1 < 7 && x-2 >= 0){
        if(boardPosition[y+1][x-2] === "" || checkIfOppositePiece(piece, boardPosition[y+1][x-2])){
            temp.push([y+1, x-2])
        }
    }
    ///Two down, one left
    if(y+2 < 7 && x-1 >= 0){
        if(boardPosition[y+2][x-1] === "" || checkIfOppositePiece(piece, boardPosition[y+2][x-1])){
            temp.push([y+2, x-1])
        }
    }

    ///Checks two up, one right
    if(y-2 >= 0 && x+1 < 8){
        if(boardPosition[y-2][x+1] === "" || checkIfOppositePiece(piece, boardPosition[y-2][x+1])){
            temp.push([y-2, x+1])
        }            
    }
    ///Checks one up, two right
    if(y-1 >= 0 && x+2 < 8){
        if(boardPosition[y-1][x+2] === "" || checkIfOppositePiece(piece, boardPosition[y-1][x+2])){
            temp.push([y-1, x+2])
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