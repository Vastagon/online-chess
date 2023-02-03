import io from "socket.io-client"
import {useEffect, useState} from "react"
import {v4 as uuid} from "uuid"

import "../styles/board.css"
import boardpositions from "../../boardpositions.json"
import moveSound from "../styles/move-piece.mp3"
import { updateKingPositionsForMovementFunctions } from "./movementLogicFunctions"
import { checkForMate } from "./checkForMate"
import { checkForCheck } from "./checkForCheck"

import WaitingOnSecondPlayer from "./WaitingOnSecondPlayer"
import JoinGameModal from "./JoinGameModal"
import JoinedExistingGameModal from "./JoinedExistingGameModal"
import WinScreen from "./WinScreen"
import ChooseNewPiece from "./ChooseNewPiece"
import Piece from "./Piece"

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
    const [lastClickedPosition, setLastClickedPosition] = useState()///Where the piece moved to
    const [mostRecentClickedPosition, setMostRecentClickedPosition] = useState()///Where the piece moved from
    const [blackOrWhitePromotion, setBlackOrWhitePromotion] = useState("")
    const [room, setRoom] = useState("")

    const [kingPositions, setKingPositions] = useState({blackKing: [0,5], whiteKing: [7,4]})
    const [darkenedSquares, setDarkenedSquares] = useState([])

    const [whiteMoveBoolean, setWhiteMoveBoolean] = useState(true)
    const [pieceClicked, setPieceClicked] = useState(false)
    const [isConnectedToRoom, setIsConnectedToRoom] = useState(false)
    const [changeSides, setChangeSides] = useState(false)
    const [checkOrStale, setCheckOrStale] = useState()


    ///States for displaying modals
    const [showJoinGame, setShowJoinGame] = useState(true)
    const [showFailedConnectionModal, setShowFailedConnectionModal] = useState(false)
    const [showWaitingOnSecondPlayer, setShowWaitingOnSecondPlayer] = useState(false)
    const [showJoinedExistingGameModal, setShowJoinedExistingGameModal] = useState(false)
    const [showPieceModal, setShowPieceModal] = useState(false)
    const [showWinScreen, setShowWinScreen] = useState(false)


    const [boardDiv, setBoardDiv] = useState()
    const [socketIDs, setSocketIDs] = useState({})
    let evenRow = true

    function checkForMateOrStalemate(boardPosition, kingPositions, whiteMoveBoolean){
        if(!whiteMoveBoolean){
            if(checkForCheck(boardPosition, kingPositions.whiteKing, "black")){
                alert("Stalemate")
                return "stalemate"
            }else{
                alert("White checkmates black")
                return "checkmate"
            }
        }else{
            if(checkForCheck(boardPosition, kingPositions.blackKing, "white")){
                alert("Stalemate")
                return "stalemate"
            }else{
                alert("Black checkmates white")
                return "checkmate"
            }        
        }
    }

    ///Runs when a piece is moved
    useEffect(() =>{
        if(isConnectedToRoom){
            if(checkForMate(boardPosition, kingPositions, whiteMoveBoolean)){
                setCheckOrStale(checkForMateOrStalemate(boardPosition, kingPositions, whiteMoveBoolean))
                setShowWinScreen(true)
            }
            socket.emit("piece_moved", {boardPosition: boardPosition, room: room, darkenedSquares: [mostRecentClickedPosition, lastClickedPosition]});
            setPotentialMovement([]) 

            new Audio(moveSound).play()
        }
    }, [changeSides])

    useEffect(() =>{ 
        if(boardPosition){
            updateBoard()
        }
    }, [whiteMoveBoolean, potentialMovement, showPieceModal, JSON.stringify(boardPosition), socketIDs])


    ///Where all socket changes take place
    useEffect(() =>{
        ///When create new game button clicked
        socket.on("start_client_board", (data) =>{
            console.log("Start client board")
            setBoardPosition(data.boardPosition)
            setWhiteMoveBoolean(data.whiteMoveBoolean)
            setShowWaitingOnSecondPlayer(true)
            setSocketIDs(prev => ({
                ...prev,
                whiteSocketID: data.whiteSocketID
            }))
            setRoom(data.room)
        })

        ///When piece gets moved on other player's board
        socket.on("update_client_board", (tempBoardData) =>{
            console.log("Update Client Board")
            setBoardPosition(tempBoardData.boardPosition)
            setWhiteMoveBoolean(tempBoardData.whiteMoveBoolean)
            setPotentialMovement([]) 
            setDarkenedSquares(tempBoardData.darkenedSquares)
            new Audio(moveSound).play()
        }) 

        ///Joining existing game failed
        socket.on("existing_connection_failed", () =>{
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
        socket.emit("piece_promoted", {boardPosition: boardPosition, room: room, darkenedSquares: [mostRecentClickedPosition, lastClickedPosition]});
    }

    function potentialMovementGetsClicked(clickedSquare){
        setMostRecentClickedPosition(clickedSquare)
        ///Checks if clicked square is in potentialMovement array
        for(let i = 0; i < potentialMovement.length; i++){
            if(JSON.stringify(potentialMovement[i]) === JSON.stringify(clickedSquare) ){

                ///Checks if pawn is near the end of the board / about to be promoted
                if(boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "blackPawn" || "whitePawn"){
                    if(lastClickedPosition[0] === 6 && boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "blackPawn"){
                        setBlackOrWhitePromotion("black")
                        setShowPieceModal(true)
                    }
                    if(lastClickedPosition[0] === 1 && boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] === "whitePawn"){
                        setBlackOrWhitePromotion("white")
                        setShowPieceModal(true)
                    }
                }

                setDarkenedSquares([clickedSquare, lastClickedPosition])

                ///Moves the piece to the proper location while deleting it from previous position
                boardPosition[clickedSquare[0]][clickedSquare[1]] = boardPosition[lastClickedPosition[0]][lastClickedPosition[1]]
                boardPosition[lastClickedPosition[0]][lastClickedPosition[1]] = ""

                ///Move piece
                setWhiteMoveBoolean(prev => !prev)
                setChangeSides(prev => !prev)
                setPotentialMovement([])
            }
        }
    }

    function chooseSquareClassName(evenRow, darkened){
        if(evenRow){
            if(darkened){
                return "darkened board-square white-square"
            }else{
                return "board-square white-square"
            }
        }else{
            if(darkened){
                return "darkened board-square green-square"
            }else{
                return "board-square green-square"
            }
        }
    }

    function updateKingPositions(piece, position){
        if(piece === "blackKing"){
            setKingPositions(prev => ({
                ...prev,
                blackKing: position
            }))
            updateKingPositionsForMovementFunctions("black", position)
        }
        if(piece === "whiteKing"){
            setKingPositions(prev => ({
                ...prev,
                whiteKing: position
            }))
            updateKingPositionsForMovementFunctions("white", position)
        }
    }


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

                updateKingPositions(prev, [rowIndex, index])

                ///Decides if this square should be a different color
                if(darkenedSquares?.length > 1){
                    for(let i = 0; i < 2; i++){
                        if(rowIndex === darkenedSquares[i][0] && index === darkenedSquares[i][1]){
                            ///Make square different color here
                            darkened = true
                        }                    
                    }                    
                }
                ///Determines classname for square
                squareClassName = chooseSquareClassName(evenRow, darkened)


                ///Returns individual square 64 times
                return (
                <div key={uuid()} className={squareClassName}>
                    {/* Determines if square should have a dot */}
                    <div onClick={() => potentialMovementGetsClicked([rowIndex,index])} className={hasDot ? "has-dot" : null} />

                    <Piece socket={socket} socketIDs={socketIDs} whiteMoveBoolean={whiteMoveBoolean} lastClickedPosition={lastClickedPosition} setLastClickedPosition={setLastClickedPosition} 
                    potentialMovement={potentialMovement} setPotentialMovement={setPotentialMovement} boardPosition={boardPosition} key={uuid()} pieceClicked={pieceClicked} 
                    setPieceClicked={setPieceClicked} position={[rowIndex,index]} piece={boardPosition[rowIndex][index]} kingPositions={kingPositions} />
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

            {showWinScreen ? <WinScreen /> : null}
            {showWaitingOnSecondPlayer ? <WaitingOnSecondPlayer room={room} /> : null}
            {showJoinedExistingGameModal ? <JoinedExistingGameModal setShowJoinedExistingGameModal={setShowJoinedExistingGameModal} /> : null}
        </>
    )
}

export default Board