import "../styles/board.css"
import {
    pawnLogic,
    rookLogic,
    knightLogic,
    bishopLogic,
    kingLogic,
    queenLogic
} from "./movementLogicFunctions"
 
const Piece = (props) =>{
    function clickPiece(){
        ///Global state to save last clicked position
        props.setLastClickedPosition(props.position)
        props.setPotentialMovement([])
 
        console.log("Clicked piece position: " + props.position)

        ///PAWN LOGIC
        props.setPotentialMovement(pawnLogic(props.position, props.piece, props.boardPosition))
  
        ///ROOK LOGIC
        if(props.piece === "blackRook" || props.piece === "whiteRook"){
            props.setPotentialMovement(rookLogic(props.position, props.piece, props.boardPosition))
        }

        ///Bishop Logic
        if(props.piece === "blackBishop" || props.piece === "whiteBishop"){
            props.setPotentialMovement(bishopLogic(props.position, props.piece, props.boardPosition))
        }

        ///Queen Logic
        if(props.piece === "blackQueen" || props.piece === "whiteQueen"){
            props.setPotentialMovement(queenLogic(props.position, props.piece, props.boardPosition))

        }
 
        ///King logic
        if(props.piece === "blackKing" || props.piece === "whiteKing"){
            props.setPotentialMovement(kingLogic(props.position, props.piece, props.boardPosition))
        }

        ///Knight Logic
        if(props.piece === "blackKnight" || props.piece === "whiteKnight"){
            props.setPotentialMovement(knightLogic(props.position, props.piece, props.boardPosition))
        }


    }///End of piece movement logic


///Remove onclick for one side whenever whiteMoveBoolean changes

    ///Function that runs after click to see if it's white or black's turn
    function canIMovePiece(){
        console.log(`White move boolean: ${props.whiteMoveBoolean}`)
        console.log(`props.socket.id: ${props.socket.id}`)
        console.log(`props.socketIDs.whiteSocketID: ${props.socketIDs.whiteSocketID}`)
        console.log(`props.socketIDs.blackSocketID: ${props.socketIDs.blackSocketID}`)
        if((props.whiteMoveBoolean && props.piece.substring(0,5) === "white" && props.socket.id === props.socketIDs.whiteSocketID) || (!props.whiteMoveBoolean && props.piece.substring(0,5) === "black" && props.socket.id === props.socketIDs.blackSocketID)){
            clickPiece()
        }
    }
 
    ///rendering
    if(props.piece !== undefined){
        ///Displays piece
        return(
            <div onClick={canIMovePiece} className="piece">
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

