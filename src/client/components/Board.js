import "../styles/board.css"
import { useEffect, useState } from "react"
import Piece from "./Piece"
import boardpositions from "./boardpositions.json"
import {v4 as uuid} from "uuid"
import ChooseNewPiece from "./ChooseNewPiece"
import io from "socket.io-client"
import {checkForBlackCheck, checkForWhiteCheck} from "./checkForCheckmate"
import {updateKingPositionsForMovementFunctions} from "./movementLogicFunctions"
import WaitingOnSecondPlayer from "./WaitingOnSecondPlayer"
import JoinGameModal from "./JoinGameModal"
import JoinedExistingGameModal from "./JoinedExistingGameModal"
import { isCompositeComponent } from "react-dom/test-utils"


let socketUrl

///Needs to be set to whichever location the express server is being hosted
if(process.env.REACT_APP_PRODUCTION === "production"){
    socketUrl = process.env.REACT_APP_PRODUCTION_URL
}else{
    socketUrl = "http://localhost:3001"
}
const socket = io.connect(socketUrl) 


const Board = () =>{
    const [boardPosition, setBoardPosition] = useState(boardpositions)
    const [potentialMovement, setPotentialMovement] = useState([])
    const [lastClickedPosition, setLastClickedPosition] = useState()
    const [mostRecentClickedPosition, setMostRecentClickedPosition] = useState()
    const [blackOrWhitePromotion, setBlackOrWhitePromotion] = useState("")
    ///Variable to decide which SocketIO room to join
    const [room, setRoom] = useState("")

    const [kingPositions, setKingPositions] = useState({blackKing: [0,4], whiteKing: [7,4]})
    const [darkenedSquares, setDarkenedSquares] = useState([])

    const [whiteMoveBoolean, setWhiteMoveBoolean] = useState(true)
    const [pieceClicked, setPieceClicked] = useState(false)
    const [isConnectedToRoom, setIsConnectedToRoom] = useState(false)
    const [changeSides, setChangeSides] = useState(false)

    ///States for displaying modals
    const [showJoinGame, setShowJoinGame] = useState(true)
    const [showFailedConnectionModal, setShowFailedConnectionModal] = useState(false)
    const [showWaitingOnSecondPlayer, setShowWaitingOnSecondPlayer] = useState(false)
    const [showJoinedExistingGameModal, setShowJoinedExistingGameModal] = useState(false)
    const [showPieceModal, setShowPieceModal] = useState(false)


    ///State that displays the board
    const [boardDiv, setBoardDiv] = useState()
    let evenRow = true
    const [socketIDs, setSocketIDs] = useState({})

    ///Runs when a piece is moved
    useEffect(() =>{
        if(isConnectedToRoom){
            // console.log(mostRecentClickedPosition)///Where the piece moved from
            // console.log(lastClickedPosition)///Where the piece moved to
            console.log("THERE")
            socket.emit("piece_moved", {boardPosition: boardPosition, room: room, darkenedSquares: [mostRecentClickedPosition, lastClickedPosition]});
            setPotentialMovement([]) 
        }
    }, [changeSides])


///Need to run the checkForBlackCheck function with updated data while keeping a temporary board. If it causes an illegal check, don't update boardPosition


    useEffect(() =>{ 
        if(boardPosition){
            updateBoard()
        }
    }, [potentialMovement, showPieceModal, JSON.stringify(boardPosition), socketIDs])

    useEffect(() =>{
        if(boardPosition){
            updateBoard()
            if(checkForBlackCheck(boardPosition, kingPositions)) console.log("Black Checks white")
            if(checkForWhiteCheck(boardPosition, kingPositions)) console.log("White Checks black")
        }
    }, [whiteMoveBoolean])



    ///Where all socket changes take place
    useEffect(() =>{
        ///When create new game button clicked
        socket.on("start_client_board", (data) =>{
            setBoardPosition(data.boardPosition)
            setWhiteMoveBoolean(data.whiteMoveBoolean)
            setShowWaitingOnSecondPlayer(true)
            setSocketIDs(prev => ({
                ...prev,
                whiteSocketID: data.whiteSocketID
            }))
            setRoom(data.room)
        })

        ///When piece gets moved
        socket.on("update_client_board", (tempBoardData) =>{
            setBoardPosition(tempBoardData.boardPosition)
            setWhiteMoveBoolean(tempBoardData.whiteMoveBoolean)
            setPotentialMovement([]) 
            setDarkenedSquares(tempBoardData.darkenedSquares)
        }) 

        ///Joining existing game failed
        socket.on("existing_connection_failed", () =>{
            ///Show that the connection failed visually, set room back to ""
            setShowFailedConnectionModal(true)
            setRoom("")
        })

        ///Joining existing game succeeded
        socket.on("existing_connection_successful", (serverSocketIDs) =>{
            setShowJoinGame(false)
            setShowWaitingOnSecondPlayer(false)
            setIsConnectedToRoom(true)
            setSocketIDs({whiteSocketID: serverSocketIDs.whiteSocketID, blackSocketID: serverSocketIDs.blackSocketID})
            setShowJoinedExistingGameModal(true)
            // alert("Both players connected, begin playing")
        })
    }, [socket])



    ///Function that changes pawn to selected piece
    function changePawn(piece){
        ///Choose whether it's black or white pawns
        if(mostRecentClickedPosition[0] === 7){
            boardPosition[mostRecentClickedPosition[0]][mostRecentClickedPosition[1]] = "black" + piece
            setBlackOrWhitePromotion("black")
        }else{
            boardPosition[mostRecentClickedPosition[0]][mostRecentClickedPosition[1]] = "white" + piece
            setBlackOrWhitePromotion("white")
        }

        setPotentialMovement([]) 
        setShowPieceModal(false)
    }


    function potentialMovementGetsClicked(clickedSquare){
        setMostRecentClickedPosition(clickedSquare)
        ///Checks if clicked square is in potentialMovement array
        for(let i = 0; i < potentialMovement.length; i++){
            if(JSON.stringify(potentialMovement[i]) === JSON.stringify(clickedSquare) ){
                let tempBoard = boardPosition

                ///Checks if pawn is near the end of the board / about to be promoted
                if(boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "blackPawn" || "whitePawn"){
                    if((lastClickedPosition[0] === 6 && boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "blackPawn") || (lastClickedPosition[0] === 1 && boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "whitePawn")){
                        setShowPieceModal(true)
                    }
                }
                
                ///Resets potential movement and moves the piece to the proper location while deleting it from previous position
                boardPosition[clickedSquare[0]][clickedSquare[1]] = boardPosition[lastClickedPosition[0]][lastClickedPosition[1]]
                boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] = ""
                setPotentialMovement([])

                ///Check if this movement results in check
                ///If black, then check for black check
                ///Illegal move check working, but piece moves anyways
                if(boardPosition[clickedSquare[0]][clickedSquare[1]].substring(0,1) === "w"){
                    if(checkForBlackCheck(boardPosition, kingPositions)){
                        ///Don't let black move
                        setBoardPosition(tempBoard)
                        alert("Illegal Move")
                    }else{
                        setWhiteMoveBoolean(prev => !prev)
                        setChangeSides(prev => !prev)
                    }                    
                }else{
                    if(checkForWhiteCheck(boardPosition, kingPositions)){
                        ///Don't let white move    
                        setBoardPosition(tempBoard)
                        alert("Illegal Move")
                    }else{
                        setWhiteMoveBoolean(prev => !prev)
                        setChangeSides(prev => !prev)
                    }
                }
            }
        }
    }





    ///Shows squares it can move
    function updateBoard(){
        setBoardDiv(boardPosition.map((prev, rowIndex) =>{
            evenRow = !evenRow
            ///Returns row
            return(<div key={uuid()} className="board-row">{prev.map((prev, index) =>{
                evenRow = !evenRow
                let hasDot
                let darkened = false
                let squareClassName

                ///Shows dots on all potential movement squares
                for(let i = 0; i < potentialMovement?.length; i++){
                    if(JSON.stringify([rowIndex, index]) === JSON.stringify(potentialMovement[i])){
                        hasDot = true 
                    }
                }

                ///Updates state that holds position of kings
                if(prev === "blackKing"){
                    setKingPositions(prev => ({
                        ...prev,
                        blackKing: [rowIndex, index]
                    }))
                    updateKingPositionsForMovementFunctions("black", [rowIndex, index])
                }
                if(prev === "whiteKing"){
                    // console.log([rowIndex,index])
                    setKingPositions(prev => ({
                        ...prev,
                        whiteKing: [rowIndex, index]
                    }))
                    updateKingPositionsForMovementFunctions("white", [rowIndex, index])
                }

                ///Decides if this square should be a different color
                if(darkenedSquares?.length > 1){
                    for(let i = 0; i < 2; i++){
                        if(rowIndex === darkenedSquares[i][0] && index === darkenedSquares[i][1]){
                            ///Make square different color here
                            darkened = true
                        }                    
                    }                    
                }

                if(evenRow){
                    if(darkened){
                        squareClassName = "darkened board-square white-square"
                    }else{
                        squareClassName = "board-square white-square"
                    }
                }else{
                    if(darkened){
                        squareClassName = "darkened board-square green-square"
                    }else{
                        squareClassName = "board-square green-square"
                    }
                }

        ///Returns individual square 64 times
        return (
        <div key={uuid()} className={squareClassName}>
            <div onClick={() => potentialMovementGetsClicked([rowIndex,index])} className={hasDot ? "has-dot" : null} />
                <Piece socket={socket} socketIDs={socketIDs} whiteMoveBoolean={whiteMoveBoolean} setLastClickedPosition={setLastClickedPosition} potentialMovementGetsClicked={potentialMovementGetsClicked} 
                potentialMovement={potentialMovement} setPotentialMovement={setPotentialMovement} boardPosition={boardPosition} key={uuid()} pieceClicked={pieceClicked} 
                setPieceClicked={setPieceClicked} position={[rowIndex,index]} piece={boardPosition[rowIndex][index]} />
            </div>)
            })}
        </div>) 
        }))
    }

    if(!boardDiv || !boardPosition) return null

    return(
        <>
            <div className={socket.id === socketIDs.blackSocketID && isConnectedToRoom ? "black-board board" : "board"}>
                {boardDiv}
                {showPieceModal ? <ChooseNewPiece blackOrWhitePromotion={blackOrWhitePromotion} changePawn={changePawn}/> : null}
            </div>     

            {showJoinGame ? <JoinGameModal setShowFailedConnectionModal={setShowFailedConnectionModal} showFailedConnectionModal={showFailedConnectionModal} socket={socket} room={room} setRoom={setRoom} showJoinGame={showJoinGame}/> : null}

            {showWaitingOnSecondPlayer ? <WaitingOnSecondPlayer room={room} /> : null}
            {showJoinedExistingGameModal ? <JoinedExistingGameModal setShowJoinedExistingGameModal={setShowJoinedExistingGameModal} /> : null}
        </>
    )
}

export default Board
