

export default function JoinedExistingGameModal(props){

    function closeJoinedExistingGameModal(){
        props.setShowJoinedExistingGameModal(false)
    }


    return(
        <div className="modal connection-failed-modal-container">
            <h3>Connected, begin playing</h3>
            <button className="modal-button" onClick={closeJoinedExistingGameModal}>Close</button>
        </div>
    )
}