

const ChooseNewPiece = (props) =>{
    return (
        <div className={props.blackOrWhitePromotion === "white" ? "choose-piece-modal" : "black-board choose-piece-modal"}>
            <h3>Pick a new piece</h3>
            <div className="piece-container">
                <img alt="Piece not found" onClick={() => props.changePawn("Knight")} className="modal-image" src={props.blackOrWhitePromotion === "white" ? require(`../../images/whiteKnight.png`) : require(`../../images/blackKnight.png`)} />
                <img alt="Piece not found" onClick={() => props.changePawn("Bishop")} className="modal-image" src={props.blackOrWhitePromotion === "white" ? require(`../../images/whiteBishop.png`) : require(`../../images/blackBishop.png`)} />
                <img alt="Piece not found" onClick={() => props.changePawn("Rook")} className="modal-image" src={props.blackOrWhitePromotion === "white" ? require(`../../images/whiteRook.png`) : require(`../../images/blackRook.png`)} />
                <img alt="Piece not found" onClick={() => props.changePawn("Queen")} className="modal-image" src={props.blackOrWhitePromotion === "white" ? require(`../../images/whiteQueen.png`) : require(`../../images/blackQueen.png`)} />
            </div>
        </div>
    )
}

export default ChooseNewPiece
