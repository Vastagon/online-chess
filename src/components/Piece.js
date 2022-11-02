import "../styles/board.css"
import boardPosition from "./boardpositions.json"

const Piece = (props) =>{
    let hasMoved = false

    ///easy check for color
    let isWhite = true
    if(props.color?.substring(0,1) === "b"){
        isWhite = false
    }

    
    function clickPiece(){
        props.setLastClickedPosition(props.position)
        console.log("Clicked piece position: " + props.position)
        ///PAWN LOGIC
        props.setPieceClicked(true) 
        if(props.piece === "whitePawn"){
            ///increase row by one, or two if first move
            if(!hasMoved && boardPosition[props.position[0]-1][props.position[1]] === ""){/// && boardPosition[props.position[0]-2][props.position[1]] === ""
                props.setPotentialMovement([[props.position[0]-2, props.position[1]], [props.position[0]-1, props.position[1]]])
            }else{
                if(boardPosition[props.position[0]-1][props.position[1]] === ""){
                    props.setPotentialMovement([[props.position[0]-1, props.position[1]]])
                }
            }
            ///Checking if pawn can take piece diagonally
            if((props.boardpositions[props.position[0]-1][props.position[1]-1]?.substring(0,5)) === "black"){
                props.setPotentialMovement(prev => [...prev, ([props.position[0]-1, props.position[1]-1])])
            }
            if((props.boardpositions[props.position[0]-1][props.position[1]+1]?.substring(0,5)) === "black"){
                props.setPotentialMovement(prev => [...prev, ([props.position[0]-1, props.position[1]+1])])
            }
        }
        if(props.piece === "blackPawn"){///HERE NOW
            ///increase row by one, or two if first move
            if(!hasMoved && boardPosition[props.position[0]+1][props.position[1]] === ""){
                props.setPotentialMovement([[props.position[0]+2, props.position[1]], [props.position[0]+1, props.position[1]]])
            }else{
                if(boardPosition[props.position[0]+1][props.position[1]] === ""){
                    props.setPotentialMovement([[props.position[0]+1, props.position[1]]])
                }
            }
            ///Checking if pawn can take piece diagonally
            if((props.boardpositions[props.position[0]+1][props.position[1]+1]?.substring(0,5)) === "white"){
                props.setPotentialMovement(prev => [...prev, [props.position[0]+1, props.position[1]+1]])
            }
            if((props.boardpositions[props.position[0]+1][props.position[1]-1]?.substring(0,5)) === "white"){
                props.setPotentialMovement(prev => [...prev, [props.position[0]+1, props.position[1]-1]])
            }
        }

        ///Runs function on Board that shows potential movement
        // props.canMove(props.potentialMovement)

        ///ROOK LOGIC

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