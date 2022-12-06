import ConnectionFailedModal from './ConnectionFailedModal'

export default function ShowJoinGame(props){

    function changeCodeInput(e){
        props.setRoom(e.target.value)
    }

    async function joinGameClicked(e){
        e.preventDefault()


        props.socket.emit("join_existing_game", {room: props.room, socketid: props.socket.id})
        
    }

    function createGameClicked(e){
        e.preventDefault()

        props.socket.emit("create_new_game")
    }

    return(
        <>        <div className="join-game-modal-container">
            <form>
                <label>Enter code to join an existing game</label>
                <input onChange={changeCodeInput}></input>
                <button onClick={joinGameClicked}>Join Game</button>
                <br></br>
                <button onClick={createGameClicked}>Create Game</button>
            </form>
        </div>
        {props.showFailedConnectionModal ? <ConnectionFailedModal showFailedConnectionModal={props.showFailedConnectionModal} setShowFailedConnectionModal={props.setShowFailedConnectionModal}/> : null}
        
        </>

    )
}


///When pressing the create game button, connect to a room that hasn't been created and then a waiting modal until another user joins. This can be with the code
//join game allows them to put in the room, check if the room exists and that there's a spot open in the room, then connect to the room and start the game