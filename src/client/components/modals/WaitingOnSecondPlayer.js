import { useContext } from "react"
import { UserContext } from "../UserContext"

export default function WaitingOnSecondPlayer(props){
    const {setRoom, room, setShowNewGameModal} = useContext(UserContext)

    function openNewGameModal(){
        setRoom()
        props.setShowWaitingOnSecondPlayer(false)
        setShowNewGameModal(true)
    }

    return(
        <div className="waiting-modal-container modal">
            <h3>Waiting on Second Player</h3>
            <p>Code: {room}</p>

            <button className="modal-button" onClick={openNewGameModal}>Back</button>
        </div>
    )
}