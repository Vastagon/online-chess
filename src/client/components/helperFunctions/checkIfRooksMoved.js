export function checkIfRooksMoved(boardPosition, haveRooksMoved){
    if(boardPosition[0][0] === ""){
        haveRooksMoved.blackARook = true
    }
    if(boardPosition[0][7] === ""){
        haveRooksMoved.blackHRook = true
    }
    if(boardPosition[7][0] === ""){
        haveRooksMoved.whiteARook = true
    }
    if(boardPosition[7][7] === ""){
        haveRooksMoved.whiteHRook = true
    }

    return haveRooksMoved
}