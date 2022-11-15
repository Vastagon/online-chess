

const ChooseNewPiece = (props) =>{
    return (
        <div className="choose-piece-modal">
            <h3>Pick a new piece</h3>
            <div className="piece-container">
                <img onClick={() => props.changePawn("Knight")} className="modal-image" src={require(`../images/whiteKnight.png`)} />
                <img onClick={() => props.changePawn("Bishop")} className="modal-image" src={require(`../images/whiteBishop.png`)} />
                <img onClick={() => props.changePawn("Rook")} className="modal-image" src={require(`../images/whiteRook.png`)} />
                <img onClick={() => props.changePawn("Queen")} className="modal-image" src={require(`../images/whiteQueen.png`)} />
            </div>
        </div>
    )
}

export default ChooseNewPiece
