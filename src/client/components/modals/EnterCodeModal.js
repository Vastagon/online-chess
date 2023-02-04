import ConnectionFailedModal from './ConnectionFailedModal'

export default function JoinGameModal(props){

    function changeRoomInput(e){
        props.setRoom(e.target.value)
    }

    async function joinGameClicked(e){
        e.preventDefault()
        props.socket.emit("join_existing_game", {room: props.room, socketID: props.socket.id})
    }

    // function createGameClicked(e){
    //     e.preventDefault()

    //     props.socket.emit("create_new_game", props.socket.id)
    // }

    function openNewGameModal(e){
        e.preventDefault()
        props.setRoom()
        props.setShowEnterCodeModal(false)
        props.setShowNewGameModal(true)
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


///When pressing the create game button, connect to a room that hasn't been created and then a waiting modal until another user joins. This can be with the code
//join game allows them to put in the room, check if the room exists and that there's a spot open in the room, then connect to the room and start the game