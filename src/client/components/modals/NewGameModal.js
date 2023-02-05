import { useContext } from "react"
import { UserContext } from "../UserContext"

export default function NewGameModal(props){
    const {socket, setShowNewGameModal} = useContext(UserContext)

    function joinGameClicked(){
        props.setShowEnterCodeModal(true)
        setShowNewGameModal(false)
    }

    function createGameClicked(){
        socket.emit("create_new_game", socket.id)
        setShowNewGameModal(false)
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