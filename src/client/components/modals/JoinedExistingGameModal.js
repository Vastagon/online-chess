

export default function JoinedExistingGameModal(props){

    function closeJoinedExistingGameModal(){
        props.setShowJoinedExistingGameModal(false)
    }


    return(
        <div className="center-modal-container">
            <div className="connected-modal modal">
                <h3>Connected, begin playing</h3>
                <button className="connected-modal-button modal-button" onClick={closeJoinedExistingGameModal}>Close</button>
            </div>
        </div>
    )
}