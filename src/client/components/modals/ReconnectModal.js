import { UserContext } from "../UserContext"
import { useContext } from "react"

export default function ReconnectModal(){
    const {socket} = useContext(UserContext)

    
    function reconnectToGame(){

    }
    function closeReconnectModal(){

    }

    return(
        <div className="center-modal-container">
            <div className="reconnect-modal modal">
                <button onClick={closeReconnectModal} className="modal-button">Back</button>
                <button onClick={reconnectToGame} className="modal-button">Reconnect</button>
            </div>
        </div>
    )
}

///Once a piece gets moved while the other player is signed out, it breaks