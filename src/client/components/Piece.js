import "../styles/board.css"
import { checkForExisitingCheckmates } from "./checkForExistingCheckmates"
import {
    pawnLogic,
    rookLogic,
    knightLogic,
    bishopLogic,
    kingLogic,
    queenLogic
} from "./movementLogicFunctions"
 
const Piece = (props) =>{
    let tempPotential = []

    function clickPiece(){
        props.setLastClickedPosition(props.position)
        props.setPotentialMovement([])
 
        ///Pawn Logic
        if(props.piece === "blackPawn" || props.piece === "whitePawn"){
            tempPotential = pawnLogic(props.position, props.piece, props.boardPosition)
        }
  
        ///Rook Logic
        if(props.piece === "blackRook" || props.piece === "whiteRook"){
            tempPotential = rookLogic(props.position, props.piece, props.boardPosition)
        }

        ///Bishop Logic
        if(props.piece === "blackBishop" || props.piece === "whiteBishop"){
            tempPotential = bishopLogic(props.position, props.piece, props.boardPosition)
        }

        ///Queen Logic
        if(props.piece === "blackQueen" || props.piece === "whiteQueen"){
            tempPotential = queenLogic(props.position, props.piece, props.boardPosition)

        }
 
        ///King Logic
        if(props.piece === "blackKing" || props.piece === "whiteKing"){
            tempPotential = kingLogic(props.position, props.piece, props.boardPosition)
        }

        ///Knight Logic
        if(props.piece === "blackKnight" || props.piece === "whiteKnight"){
            tempPotential = knightLogic(props.position, props.piece, props.boardPosition)
        }

        props.setPotentialMovement(checkForExisitingCheckmates(props.boardPosition, tempPotential, props.piece, props.kingPositions, props.position))
    }///End of piece movement logic



    ///Function that runs after click to see if it's white or black's turn
    function canIMovePiece(){
        if((props.whiteMoveBoolean && props.piece.substring(0,5) === "white" && props.socket.id === props.socketIDs.whiteSocketID) || (!props.whiteMoveBoolean && props.piece.substring(0,5) === "black" && props.socket.id === props.socketIDs.blackSocketID)){
            props.setPotentialMovement([]) 

            clickPiece()
        }
    }
 
    ///rendering
    if(props.piece !== undefined){
        ///Displays piece
        return(
            <div onClick={canIMovePiece} className={props.socket.id === props.socketIDs.whiteSocketID ? "piece" : "black-piece piece"}>
                {props.piece ? <img className={props.piece !== undefined ? "chess-piece" : "piece"}
                src={require(`../images/${props.piece}.png`)}
                alt="Not here"
            />
            :
                null}
            </div>
        )
    }else{
        return(
            ///Displays empty square
            <div className="piece">
                {props.piece ? <img className={props.piece !== undefined ? "chess-piece" : "piece"}
                src={require(`../images/${props.piece}.png`)}
                alt="Not here"
            />:
                null}
            </div>                
        )
 
    }
 
   
}
 
export default Piece

