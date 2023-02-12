# Online Chess App

## Description
A chess website where users can connect to each other online using websockets and play a game of chess. Created using the MERN stack. React was great for creating components for each piece.

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


# General Info
- checkForWhiteCheck() determines if white puts black in check