# Online Chess App

## Description
All movement and pie taking is done. Now just need to finish logic for each piece, make the pieces take turns, and check for check, checkmate, and castling

# Scripts

### `npm run dev`
Uses Concurently to start the server with nodemon and starts the react-scripts

### `npm run clientStart`
Runs react-scripts start

### `heroku git:remote -a vastagon-online-chess`
Run after heroku login to connect to proper heroku app

### `git push heroku main`
Create a new build and serve it for heroku using their CLI


# Function Flow Chart

### `Order of functions called when a piece gets clicked, then moved`
1. canIMovePiece() in Piece.js || Checks if the piece you clicked is in line with the current client's turn and their color
2. clickPiece() in Piece.js || Uses movementLogicFunctions to update potentialMovement state of 2d array
3. The clickPiece() function can call a variety of movement logic functions from movementLogicFunctions.js
4. useEffect occurs in Board.js when boardPosition changes to update the board
5. potentialMovementGetsClicked() in Board.js || Runs when one of the squares with a dot gets clicked. Determines if it's a pawn promotion and moves the piece selected. This changes whiteMoveBoolean and emits "piece_moved"


### `TODO`
1. Check if the movement puts the person who moved it in check while checking through potentialMovement in movementLogicFunctions. If it puts them in check, don't push that position to the potentialMovement array.


###  `General Info`
- checkForWhiteCheck() determines if white puts black in check