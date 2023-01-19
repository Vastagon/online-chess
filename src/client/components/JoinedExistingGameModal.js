

export default function JoinedExistingGameModal(props){

    function closeJoinedExistingGameModal(){
        props.setShowJoinedExistingGameModal(false)
    }


    return(
        <div className="connection-failed-modal-container">
            <h3>Connected, begin playing</h3>
            <button id="close-join-exisiting-game-modal-button" onClick={closeJoinedExistingGameModal}>Close</button>
        </div>
    )
}