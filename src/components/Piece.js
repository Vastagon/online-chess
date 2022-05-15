import { useEffect } from "react"
import "../styles/board.css"

// export interface Props{
//     color?: string 
//     piece?: string
//     position: number[]
//     boardpositions: string[][]
//     pieceClicked: boolean
// }

const Piece = (props) =>{
    ///Array of all positions that a piece can move
    let potentialMovement
    ///for pawns and kings
    let hasMoved = false

    ///easy check for color
    let isWhite = true
    if(props.color?.substring(0,1) === "b"){
        isWhite = false
    }

    function clickPiece(){
        ///PAWN LOGIC
        props.setPieceClicked(true) 
        if(props.piece == "whitePawn"){
            ///increase row by one, or two if first move
            if(!hasMoved){
                potentialMovement = [[props.position[0]-2, props.position[1]], [props.position[0]-1, props.position[1]]]
            }else{
                potentialMovement = [[props.position[0]-1, props.position[1]]]
            }
            ///Checking if pawn can take piece diagonally
            if((props.boardpositions[props.position[0]-1][props.position[1]-1]?.substring(0,5)) === "white"){
                potentialMovement.push([props.position[0]-1, props.position[1]-1])
            }
            if((props.boardpositions[props.position[0]-1][props.position[1]+1]?.substring(0,5)) === "white"){
                potentialMovement.push([props.position[0]-1, props.position[1]+1])
            }
        }
        if(props.piece === "blackPawn"){
            ///increase row by one, or two if first move
            if(!hasMoved){
                potentialMovement = [[props.position[0]+2, props.position[1]], [props.position[0]+1, props.position[1]]]
            }else{
                potentialMovement = [[props.position[0]+1, props.position[1]]]
            }
            ///Checking if pawn can take piece diagonally
            if((props.boardpositions[props.position[0]+1][props.position[1]+1]?.substring(0,5)) === "white"){
                potentialMovement.push([props.position[0]+1, props.position[1]+1])
            }
            if((props.boardpositions[props.position[0]+1][props.position[1]-1]?.substring(0,5)) === "white"){
                potentialMovement.push([props.position[0]+1, props.position[1]-1])
            }
        }

        ///Runs function on Board that shows potential movement
        props.canMove(potentialMovement)

        ///ROOK LOGIC


        ///Will check if piece can move using potential movement 2d array
        // movePiece(potentialMovement)
    }

    function movePiece(potentialMovement){
        // console.log(potentialMovement)
        // console.log(props.position)
    }
    



    ///rendering
    if(props.piece !== undefined){
        return(
        <div onClick={clickPiece} className="piece">
            {props.piece ? <img className={props.piece !== undefined ? "chess-piece" : "piece"} src={props.color === "white" ? require(`../images/${props.piece}.png`) : require(`../images/${props.piece}.png`)} alt="Not here" />:
            null}
        </div>
        )
    }else{
        return(
            <div className="piece">
                {props.piece ? <img className={props.piece !== undefined ? "chess-piece" : "piece"} src={props.color === "white" ? require(`../images/${props.piece}.png`) : require(`../images/${props.piece}.png`)} alt="Not here" />:
                null}
            </div>                
        )

    }

    
}

export default Piece