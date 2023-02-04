

export default function WaitingOnSecondPlayer(props){
    
    function openNewGameModal(){
        props.setRoom()
        props.setShowWaitingOnSecondPlayer(false)
        props.setShowNewGameModal(true)
    }

    return(
        <div className="waiting-modal-container modal">
            <h3>Waiting on Second Player</h3>
            <p>Code: {props.room}</p>

            <button className="modal-button" onClick={openNewGameModal}>Back</button>
        </div>
    )
}