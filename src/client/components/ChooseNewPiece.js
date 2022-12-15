

const ChooseNewPiece = (props) =>{
    return (
        <div className="choose-piece-modal">
            <h3>Pick a new piece</h3>
            <div className="piece-container">
                <img onClick={() => props.changePawn("Knight")} className="modal-image" src={props.blackOrWhiteModal === "white" ? require(`../images/whiteKnight.png`) : require(`../images/blackKnight.png`)} />
                <img onClick={() => props.changePawn("Bishop")} className="modal-image" src={props.blackOrWhiteModal === "white" ? require(`../images/whiteBishop.png`) : require(`../images/blackBishop.png`)} />
                <img onClick={() => props.changePawn("Rook")} className="modal-image" src={props.blackOrWhiteModal === "white" ? require(`../images/whiteRook.png`) : require(`../images/blackRook.png`)} />
                <img onClick={() => props.changePawn("Queen")} className="modal-image" src={props.blackOrWhiteModal === "white" ? require(`../images/whiteQueen.png`) : require(`../images/blackQueen.png`)} />
            </div>
        </div>
    )
}

export default ChooseNewPiece