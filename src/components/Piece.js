import { useEffect } from "react"
import "../styles/board.css"
import boardPosition from "./boardpositions.json"
 
const Piece = (props) =>{
   
    function clickPiece(){
        ///Global state to save last clicked position
        props.setLastClickedPosition(props.position)
        let isBlack = true
        if(props.piece.substring(0,1) === "w"){
            isBlack = false
        }
        props.setPotentialMovement([])
 
        console.log("Clicked piece position: " + props.position)
        ///PAWN LOGIC
        props.setPieceClicked(true)
        if(props.piece === "whitePawn"){
            ///increase row by one, or two if first move
            if((props.position[0] === 6 || props.position[0] === 1) && boardPosition[props.position[0]-1][props.position[1]] === "" && boardPosition[props.position[0]-2][props.position[1]] === ""){
                props.setPotentialMovement([[props.position[0]-2, props.position[1]], [props.position[0]-1, props.position[1]]])
            }else{
                if(boardPosition[props.position[0]-1][props.position[1]] === ""){
                    props.setPotentialMovement([[props.position[0]-1, props.position[1]]])
                }
            }
            ///Checking if pawn can take piece diagonally
            if((props.boardPosition[props.position[0]-1][props.position[1]-1]?.substring(0,5)) === "black"){
                props.setPotentialMovement(prev => [...prev, ([props.position[0]-1, props.position[1]-1])])
            }
            if((props.boardPosition[props.position[0]-1][props.position[1]+1]?.substring(0,5)) === "black"){
                props.setPotentialMovement(prev => [...prev, ([props.position[0]-1, props.position[1]+1])])
            }
        }
        if(props.piece === "blackPawn"){
            ///increase row by one, or two if first move
            if((props.position[0] === 6 || props.position[0] === 1) && boardPosition[props.position[0]+1][props.position[1]] === "" && boardPosition[props.position[0]+2][props.position[1]] === ""){
                props.setPotentialMovement([[props.position[0]+2, props.position[1]], [props.position[0]+1, props.position[1]]])
            }else{
                if(boardPosition[props.position[0]+1][props.position[1]] === ""){
                    props.setPotentialMovement([[props.position[0]+1, props.position[1]]])
                }
            }
            ///Checking if pawn can take piece diagonally
            if((props.boardPosition[props.position[0]+1][props.position[1]+1]?.substring(0,5)) === "white"){
                props.setPotentialMovement(prev => [...prev, [props.position[0]+1, props.position[1]+1]])
            }
            if((props.boardPosition[props.position[0]+1][props.position[1]-1]?.substring(0,5)) === "white"){
                props.setPotentialMovement(prev => [...prev, [props.position[0]+1, props.position[1]-1]])
            }
        }
 
        ///Runs function on Board that shows potential movement
        // props.canMove(props.potentialMovement)
 
        ///ROOK LOGIC
        if(props.piece === "blackRook" || props.piece === "whiteRook"){
            props.setPotentialMovement(rookLogic())
        }

        ///Bishop Logic
        if(props.piece === "blackBishop" || props.piece === "whiteBishop"){
            props.setPotentialMovement(bishopLogic())
        }///End of Bishop logic


        if(props.piece === "blackQueen" || props.piece === "whiteQueen"){
            let rookAndBishop = bishopLogic().concat(rookLogic())
            props.setPotentialMovement(rookAndBishop)

        }///End of queen logic
 
        ///King logic
        if(props.piece === "blackKing" || props.piece === "whiteKing"){
            let temp = []

            ///Functions created to return true or false depending on where king is
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
            if(topKingCheck(props.position[0]) && leftKingCheck(props.position[1])){
                if(props.boardPosition[props.position[0]-1][props.position[1]-1] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]-1][props.position[1]-1])){
                    temp.push([props.position[0]-1, props.position[1]-1])
                }                
            }
            //Top Center
            if(topKingCheck(props.position[0])){
                if(props.boardPosition[props.position[0]-1][props.position[1]] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]-1][props.position[1]])){
                    temp.push([props.position[0]-1, props.position[1]])
                }                
            }
            //Top Right
            if(topKingCheck(props.position[0]) && rightKingCheck(props.position[1])){
                if(props.boardPosition[props.position[0]-1][props.position[1]+1] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]-1][props.position[1]+1])){
                    temp.push([props.position[0]-1, props.position[1]+1])
                }                
            }
            //Center Right
            if(rightKingCheck(props.position[1])){
                if(props.boardPosition[props.position[0]][props.position[1]+1] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]][props.position[1]+1])){
                    temp.push([props.position[0], props.position[1]+1])
                }                
            }
            //Bottom Right
            if(rightKingCheck(props.position[1]) && bottomKingCheck(props.position[0])){
                if(props.boardPosition[props.position[0]+1][props.position[1]+1] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]+1][props.position[1]+1])){
                    temp.push([props.position[0]+1, props.position[1]+1])
                }                
            }
            //Bottom Center
            if(bottomKingCheck(props.position[0])){
                if(props.boardPosition[props.position[0]+1][props.position[1]] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]+1][props.position[1]])){
                    temp.push([props.position[0]+1, props.position[1]])
                }                
            }
            //Bottom Left
            if(bottomKingCheck(props.position[0]) && leftKingCheck(props.position[1])){
                if(props.boardPosition[props.position[0]+1][props.position[1]-1] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]+1][props.position[1]-1])){
                    temp.push([props.position[0]+1, props.position[1]-1])
                }                
            }
            //Center Left
            if(leftKingCheck(props.position[1])){
                if(props.boardPosition[props.position[0]][props.position[1]-1] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]][props.position[1]-1])){
                    temp.push([props.position[0], props.position[1]-1])
                }                
            }
 
            props.setPotentialMovement(temp)
        ///End of King logic
        }

        ///Knight Logic
        if(props.piece === "blackKnight" || props.piece === "whiteKnight"){
            let temp = []

            ///Checks two up, one left
            if(props.position[0]-2 >= 0 && props.position[1]-1 >= 0){
                if(props.boardPosition[props.position[0]-2][props.position[1]-1] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]-2][props.position[1]-1])){
                    temp.push([props.position[0]-2, props.position[1]-1])
                }            
            }
            ///Checks one up, two left
            if(props.position[0]-1 >= 0 && props.position[1]-2 >= 0){
                if(props.boardPosition[props.position[0]-1][props.position[1]-2] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]-1][props.position[1]-2])){
                    temp.push([props.position[0]-1, props.position[1]-2])
                }            
            }

            ///Checks one down, two right
            if(props.position[0]+1 < 7 && props.position[1]+2 < 7){
                if(props.boardPosition[props.position[0]+1][props.position[1]+2] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]+1][props.position[1]+2])){
                    temp.push([props.position[0]+1, props.position[1]+2])
                }
            }
            ///Two down, one right
            if(props.position[0]+2 < 7 && props.position[1]+1 < 7){
                if(props.boardPosition[props.position[0]+2][props.position[1]+1] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]+2][props.position[1]+1])){
                    temp.push([props.position[0]+2, props.position[1]+1])
                }
            }

            ///One down, two left
            if(props.position[0]+1 < 7 && props.position[1]-2 >= 0){
                if(props.boardPosition[props.position[0]+1][props.position[1]-2] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]+1][props.position[1]-2])){
                    temp.push([props.position[0]+1, props.position[1]-2])
                }
            }
            ///Two down, one left
            if(props.position[0]+2 < 7 && props.position[1]-1 >= 0){
                if(props.boardPosition[props.position[0]+2][props.position[1]-1] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]+2][props.position[1]-1])){
                    temp.push([props.position[0]+2, props.position[1]-1])
                }
            }

            ///Checks two up, one right
            if(props.position[0]-2 >= 0 && props.position[1]+1 < 8){
                if(props.boardPosition[props.position[0]-2][props.position[1]+1] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]-2][props.position[1]+1])){
                    temp.push([props.position[0]-2, props.position[1]+1])
                }            
            }
            ///Checks one up, two right
            if(props.position[0]-1 >= 0 && props.position[1]+2 < 8){
                if(props.boardPosition[props.position[0]-1][props.position[1]+2] === "" || checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]-1][props.position[1]+2])){
                    temp.push([props.position[0]-1, props.position[1]+2])
                }            
            }


            props.setPotentialMovement(temp)
        ///End of Knight Logic
        }
    }///End of piece movement logic


 
    function checkIfOppositePiece(movingPiece, takenPiece){
        if(movingPiece.substring(0,1) !== takenPiece.substring(0,1)){
            return true
        }else{
            return false
        }
    }


    function rookLogic(){
        let j = 1
            let notBlocked = true
            let temp = []
            ///Guessing using state is what's causing this problem. It's using the last J to manipulate these
            ///Using temp variable and pushing to state at the end
 
            ///Checks bottom
            while(notBlocked){
                ///This is running infinitely
                console.log("Not blocked")
                ///Checks for positions below
                // console.log(props.position[0]+j)
                if(props.position[0] + j < 8){
                    console.log(props.position[0]+j)
                    if(props?.boardPosition[props.position[0]+j][props.position[1]] === ""){
                        temp.push([props.position[0]+j, props.position[1]])
                        console.log(1)
                    }else{
                        console.log(2)
                        notBlocked = false
                        ///Checks if stoppage is enemy piece
                        if((props.boardPosition[props.position[0]+j][props.position[1]]).substring(0,1) === "w" && props.piece.substring(0,1) === "b"){
                            temp.push([props.position[0]+j, props.position[1]])
                        }
                        if((props.boardPosition[props.position[0]+j][props.position[1]]).substring(0,1) === "b" && props.piece.substring(0,1) === "w"){
                            temp.push([props.position[0]+j, props.position[1]])
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
                console.log("Top Not blocked")
                ///Checks for positions below
                if(props.position[0] - j > 0){
                    if(props?.boardPosition[props.position[0]-j][props.position[1]] === ""){
                        temp.push([props.position[0]-j, props.position[1]])
                    }else{
                        notBlocked = false
                        ///Checks if stoppage is enemy piece
                        if((props.boardPosition[props.position[0]-j][props.position[1]]).substring(0,1) === "w" && props.piece.substring(0,1) === "b"){
                            temp.push([props.position[0]-j, props.position[1]])
                        }
                        if((props.boardPosition[props.position[0]-j][props.position[1]]).substring(0,1) === "b" && props.piece.substring(0,1) === "w"){
                            temp.push([props.position[0]-j, props.position[1]])
                        }
                        props.setPotentialMovement(temp)
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
                console.log("Left Not blocked")
                ///Checks for positions below
                if(props.boardPosition[props.position[0]][props.position[1]-j] === "" && props.boardPosition[props.position[0]][props.position[1]-j] !== undefined){
                    temp.push([props.position[0], props.position[1]-j])
                }else{
                    notBlocked = false
                    ///Checks if stoppage is enemy piece
                    if((props.boardPosition[props.position[0]][props.position[1]-j])?.substring(0,1) === "w" && props.piece.substring(0,1) === "b"){
                        temp.push([props.position[0], props.position[1]-j])
                    }
                    if((props.boardPosition[props.position[0]][props.position[1]-j])?.substring(0,1) === "b" && props.piece.substring(0,1) === "w"){
                        temp.push([props.position[0], props.position[1]-j])
                    }
                    props.setPotentialMovement(temp)
                }
                j++
            }
            notBlocked = true
            j = 1
 
            ///Checks right
            while(notBlocked){
                console.log("Right Not blocked")
                ///Checks for positions righy
                if(props.boardPosition[props.position[0]][props.position[1]+j] === "" && props.boardPosition[props.position[0]][props.position[1]+j] !== undefined){
                    temp.push([props.position[0], props.position[1]+j])
                }else{
                    notBlocked = false
                    ///Checks if stoppage is enemy piece
                    if((props.boardPosition[props.position[0]][props.position[1]+j])?.substring(0,1) === "w" && props.piece.substring(0,1) === "b"){
                        temp.push([props.position[0], props.position[1]+j])
                    }
                    if((props.boardPosition[props.position[0]][props.position[1]+j])?.substring(0,1) === "b" && props.piece.substring(0,1) === "w"){
                        temp.push([props.position[0], props.position[1]+j])
                    }
                    // props.setPotentialMovement(temp)
                    return temp
                }
                j++
            }
        ///End of Rook Logic function
    }

    function bishopLogic(){
        let i = 1
        let notBlocked = true
        let temp = []

        ///Bottom right diagonal 
        while(notBlocked){
            if(props.position[0]+i < 8 && props.position[1]+i < 8){
                if(props.boardPosition[props.position[0]+i][props.position[1]+i] === ""){
                    temp.push([props.position[0]+i, props.position[1]+i])
                }else{ 
                    if(checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]+i][props.position[1]+i])){
                        temp.push([props.position[0]+i, props.position[1]+i])
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
            if(props.position[0]+i < 8 && props.position[1]-i >= 0){
                if(props.boardPosition[props.position[0]+i][props.position[1]-i] === ""){
                    temp.push([props.position[0]+i, props.position[1]-i])
                }else{ 
                    if(checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]+i][props.position[1]-i])){
                        temp.push([props.position[0]+i, props.position[1]-i])
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
            if(props.position[0]-i >= 0 && props.position[1]-i >= 0){
                if(props.boardPosition[props.position[0]-i][props.position[1]-i] === ""){
                    temp.push([props.position[0]-i, props.position[1]-i])
                }else{ 
                    if(checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]-i][props.position[1]-i])){
                        temp.push([props.position[0]-i, props.position[1]-i])
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
            if(props.position[0]-i >= 0 && props.position[1]+i < 8){
                if(props.boardPosition[props.position[0]-i][props.position[1]+i] === ""){
                    temp.push([props.position[0]-i, props.position[1]+i])
                }else{ 
                    if(checkIfOppositePiece(props.piece, props.boardPosition[props.position[0]-i][props.position[1]+i])){
                        temp.push([props.position[0]-i, props.position[1]+i])
                    }
                    notBlocked = false
                }
            }else{
                notBlocked = false
            }

            i++
        }

        ///props.setPotentialMovement(temp)
        return temp 
    }



 
    ///rendering
    if(props.piece !== undefined){
        ///Displays piece
        return(
            <div onClick={clickPiece} className="piece">
                {props.piece ? <img className={props.piece !== undefined ? "chess-piece" : "piece"}
                src={props.color === "white" ? require(`../images/${props.piece}.png`) : require(`../images/${props.piece}.png`)}
                alt="Not here"
            />:
                null}
            </div>
        )
    }else{
        return(
            ///Displays empty square
            <div className="piece">
                {props.piece ? <img className={props.piece !== undefined ? "chess-piece" : "piece"}
                src={props.color === "white" ? require(`../images/${props.piece}.png`) : require(`../images/${props.piece}.png`)}
                alt="Not here"
            />:
                null}
            </div>                
        )
 
    }
 
   
}
 
export default Piece

