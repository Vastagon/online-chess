

export default function JoinGame(props){

    function submitJoinGame(e){
        e.preventDefault()
    }

    return(
        <div className="join-game-modal-container">
            <form onSubmit={submitJoinGame}>
                <button>Join Game</button>
                <button>Create Game</button>
            </form>
        </div>
    )
}


///When pressing the create game button, connect to a room that hasn't been created and then a waiting modal until another user joins. This can be with the code
//join game allows them to put in the room, check if the room exists and that there's a spot open in the room, then connect to the room and start the game