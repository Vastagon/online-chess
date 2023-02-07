import "../styles/board.css"
import { removeIllegalMoves } from "./helperFunctions/removeIllegalMoves"
import {
    pawnLogic,
    rookLogic,
    knightLogic,
    bishopLogic,
    kingLogic,
    queenLogic
} from "./helperFunctions/movementLogicFunctions"
import { useContext } from "react"
import { UserContext } from "./UserContext"
 
const Piece = (props) =>{
    ///position, piece, and key are still coming from props
    let tempPotential = []
    const {boardPosition, setLastClickedPosition, setPotentialMovement, kingPositions,
        whiteMoveBoolean, socketIDs, socket
    } = useContext(UserContext)

    function findPotentialMovement(){
        setLastClickedPosition(props.position)
        setPotentialMovement([])
 
        ///Pawn Logic
        if(props.piece === "blackPawn" || props.piece === "whitePawn"){
            tempPotential = pawnLogic(props.position, props.piece, boardPosition)
        }
  
        ///Rook Logic
        if(props.piece === "blackRook" || props.piece === "whiteRook"){
            tempPotential = rookLogic(props.position, props.piece, boardPosition)
        }

        ///Bishop Logic
        if(props.piece === "blackBishop" || props.piece === "whiteBishop"){
            tempPotential = bishopLogic(props.position, props.piece, boardPosition)
        }

        ///Queen Logic
        if(props.piece === "blackQueen" || props.piece === "whiteQueen"){
            tempPotential = queenLogic(props.position, props.piece, boardPosition)

        }
 
        ///King Logic
        if(props.piece === "blackKing" || props.piece === "whiteKing"){
            console.log(props.haveKingsMoved)
            tempPotential = kingLogic(props.position, props.piece, boardPosition, props.haveKingsMoved, props.haveRooksMoved)
        }

        ///Knight Logic
        if(props.piece === "blackKnight" || props.piece === "whiteKnight"){
            tempPotential = knightLogic(props.position, props.piece, boardPosition)
        }

        ///Doesn't allow the player to put themselves into check. Needs to force them to stop a check when it happens
        setPotentialMovement(removeIllegalMoves(boardPosition, tempPotential, props.piece, kingPositions, props.position))
    }///End of piece movement logic



    ///Function that runs after click to see if it's their turn to move
    function IsItMyTurn(){
        if((whiteMoveBoolean && props.piece.substring(0,5) === "white" && socket.id === socketIDs.whiteSocketID) || (!whiteMoveBoolean && props.piece.substring(0,5) === "black" && socket.id === socketIDs.blackSocketID)){
            setPotentialMovement([]) 

            findPotentialMovement()
        }
    }
 
    ///rendering
    if(props.piece !== undefined){
        ///Displays piece
        return(
            <div onClick={IsItMyTurn} className={socket.id === socketIDs.whiteSocketID ? "piece" : "black-piece piece"}>
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

