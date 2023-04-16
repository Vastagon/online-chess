

export default function WinScreen({winString}){
///Pass in which color wins
    return(
        <div className="center-modal-container">
            <div className="win-screen modal">
                {winString}
            </div>
        </div>
    )
}