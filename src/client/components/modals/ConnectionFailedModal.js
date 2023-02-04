

export default function ConnectionFailedModal(props){


    function closeConnectionFailedModal(){
        props.setShowFailedConnectionModal(false)
    }

    return(
        <div className="connection-failed-modal-container">
            <h3>Room full or not found</h3>
            <button onClick={closeConnectionFailedModal}>Close</button>
        </div>
    )
}