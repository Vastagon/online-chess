import ConnectionFailedModal from './ConnectionFailedModal'
import { useContext } from "react"
import { UserContext } from "../UserContext"


export default function JoinGameModal(props){
    const {socket, room, setRoom, setShowEnterCodeModal, setShowNewGameModal} = useContext(UserContext)

    function changeRoomInput(e){
        setRoom(e.target.value)
    }

    async function joinGameClicked(e){
        e.preventDefault()
        socket.emit("join_existing_game", {room: room, socketID: socket.id})
    }

    function openNewGameModal(e){
        e.preventDefault()
        setRoom()
        setShowEnterCodeModal(false)
        setShowNewGameModal(true)
    }

    return(
        <>        
        <div className="modal enter-code-modal-container">
            <form className='enter-code-form'>
                <label className="enter-code-form-label">Enter Code</label>
                <br></br>
                <input onChange={changeRoomInput} />
                <br></br>
                <button className="modal-button" onClick={joinGameClicked}>Join Game</button>
                <br></br>
                <button className="modal-button" onClick={openNewGameModal}>Back</button>
            </form>
        </div>
        {props.showFailedConnectionModal ? <ConnectionFailedModal showFailedConnectionModal={props.showFailedConnectionModal} setShowFailedConnectionModal={props.setShowFailedConnectionModal}/> : null}
        
        </>

    )
}