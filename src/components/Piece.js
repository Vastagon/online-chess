import { useEffect } from "react"
import "../styles/board.css"
import boardPosition from "./boardpositions.json"

const Piece = (props) =>{
    
    function clickPiece(){
        ///Global state to save last clicked position
        props.setLastClickedPosition(props.position)
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
            let j = 1
            let notBlocked = true
            let temp = []
            ///Guessing using state is what's causing this problem. It's using the last J to manipulate these
            ///Using temp variable and pushing to state at the end
            while(notBlocked){
                ///Checks for positions below
                if(props.boardPosition[props.position[0]+j][props.position[1]] === ""){ 
                    temp.push([props.position[0]+j, props.position[1]])
                }else{
                    notBlocked = false
                    ///Checks if stoppage is enemy piece
                    if((props.boardPosition[props.position[0]+j][props.position[1]]).substring(0,1) === "w"){
                        temp.push([props.position[0]+j, props.position[1]])
                    }
                    props.setPotentialMovement(temp)
                }
                j++
            }
        }
    }

    // useEffect(() =>{
    //     console.log(props.potentialMovement)
    // }, [props.potentialMovement])

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