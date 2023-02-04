

export default function NewGameModal(props){

    function joinGameClicked(){
        props.setShowEnterCodeModal(true)
        props.setShowNewGameModal(false)
    }

    function createGameClicked(){
        props.socket.emit("create_new_game", props.socket.id)
        props.setShowNewGameModal(false)
    }

    return(
        <div className="center-modal-container">
            <div className="new-game-modal modal">
                <button onClick={createGameClicked} className="modal-button">Create Game</button>
                <button onClick={joinGameClicked} className="modal-button">Join Game</button>
            </div>            
        </div>
    )
}