

export default function WaitingOnSecondPlayer(props){
    
    
    return(
        <div className="waiting-modal-container">
            <h3>Waiting on Second Player to join</h3>
            <p>Code: {props.room}</p>
        </div>
    )
}