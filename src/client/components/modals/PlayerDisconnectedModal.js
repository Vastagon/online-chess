

export default function PlayerDisconnectedModal(){

    function closeReconnectModal(){
        window.location.reload()
    }

    return(
        <div className="center-modal-container">
            <div className="reconnect-modal modal">
                <h1>Player disconnected</h1>
                <button onClick={closeReconnectModal} className="modal-button">Close</button>
            </div>
        </div>
    )
}