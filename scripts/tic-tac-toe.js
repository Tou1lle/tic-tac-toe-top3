function GameBoard() {
  const board = [];
  const rows = 3;
  const columns = 3;
  const boardSize = rows * columns;

  // Create the gameboard 3x3 for TOP
  for (let i = 0; i < boardSize; i++) {
    board.push(Cell());
  }

  // Return the board for rendering in UI
  const getBoard = () => board;

  // Change the mark based on index
  // if the place is already occupied (not empty string), do nothing
  const markSpot = (index, mark) => {
    // Return value will be helpful in the GameController to avoid switching players wrongly
    if (board[index].hasValue()) return true;
    board[index].addValue(mark);
  }

  // Prints the board to the console for console version
  const printBoard = () => {
    const boardWithValues = board.map(cell => cell.getValue());
    // Hardcoded version of the board so it looks somewhat the same as normal tictactoe board on console
    const boardNice = `${board[0].getValue()} | ${board[1].getValue()} | ${board[2].getValue()}\n${board[3].getValue()} | ${board[4].getValue()} | ${board[5].getValue()}\n${board[6].getValue()} | ${board[7].getValue()} | ${board[8].getValue()}`
    console.log(boardWithValues);
    console.log(boardNice);
  }

  const hasEmptyCell = () => {
    let isEmpty = false;
    // Check each cell if it is still empty
    board.forEach(cell => {
      if (cell.getValue() === "") {
        isEmpty = true;
      }
    });
    return isEmpty;
  }

  return {
    getBoard,
    printBoard,
    markSpot,
    hasEmptyCell,
  }
}

function Cell() {
  // Initial value for all cells
  let value = "";

  // Change the initial value to the player mark
  const addValue = function (playerMark) {
    value = playerMark;
  }

  // Check in the board so the value can't ba changed again
  const hasValue = () => {
    return value !== "";
  }

  const resetValue = () => value = "";

  const getValue = () => value;

  return {
    addValue,
    getValue,
    hasValue,
    resetValue
  }
}

function Player(name, mark) {
  // Name and mark for a player (mark will be either O or X)
  const getName = () => name;
  const getMark = () => mark;

  // Setter for changing names in UI
  const setName = (newName) => name = newName;
  const setMark = (newMark) => mark = newMark;

  return {
    getName,
    getMark,
    setName,
    setMark,
  }
}

function GameController() {
  // Tic Tac Toe Marks
  const markX = "X"
  const markO = "O"

  // Initial assets - players and gameboard
  const player1 = Player("Nigga", markX);
  const player2 = Player("Monkey", markO);
  const gameBoard = GameBoard();

  // Put players into array for easy switching active player
  const players = [player1, player2];
  let activePlayer = players[0];

  // Winning indexes, useful for checking if those indexes have the same mark = Win
  const winningRules = [
    // Rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // Columns
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // Diagonal
    [0, 4, 8], [2, 4, 6]
  ]

  // Ending the game
  let gameEnded = false;
  let endingMessage = "";

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const printRound = () => {
    gameBoard.printBoard();
    console.log(`${activePlayer.getName()}'s turn.`);
    console.log(`Mark: ${activePlayer.getMark()}`);
  }

  const setWinMessage = () => {
    endingMessage = `${activePlayer.getName()} with mark "${activePlayer.getMark()}" has won!`;
    // For console version
    console.log(endingMessage);
  }

  const setDrawMessage = () => {
    endingMessage = "The Game Ended in DRAW!\nNO winner:("
    // For console version
    console.log(endingMessage);
  }

  const setGameEnded = () => gameEnded = true;

  const setGameDraw = () => {
    gameBoard.printBoard();
    setDrawMessage();
    setGameEnded();
  }

  const setGameWin = () => {
    gameBoard.printBoard();
    setWinMessage();
    setGameEnded();
  }

  const getGameEnded = () => gameEnded;

  const getDraw = () => {
    return !gameBoard.hasEmptyCell();
  }

  const getWin = () => {
    for (let i = 0; i < winningRules.length; i++) {
      const index1 = winningRules[i][0];
      const index2 = winningRules[i][1];
      const index3 = winningRules[i][2];

      const mark1 = gameBoard.getBoard()[index1].getValue();
      const mark2 = gameBoard.getBoard()[index2].getValue();
      const mark3 = gameBoard.getBoard()[index3].getValue();

      if (
        mark1 !== "" &&
        mark1 === mark2 && 
        mark1 === mark3
      ) {
        return true;
      }
    }
  }

  const getPlayers = () => players;

  const resetGame = () => {
    // Reset Game state
    gameEnded = false;
    endingMessage = "";
    // Reset board
    gameBoard.getBoard().forEach(cell => cell.resetValue());
    // Reset first player
    activePlayer = players[0];
    // Start new game
    printRound();
  }

  const playRound = (index) => {
    if (gameEnded) return;
    const currentMark = activePlayer.getMark();
    // Prevents switching players when chosen an already marked place
    const alreadyMarked = gameBoard.markSpot(index, currentMark);
    if (alreadyMarked) {
      console.log("Already marked here! Chose again");
      gameBoard.printBoard();
      return;
    }
    //Check winner
    if (getWin()) {
      setGameWin();
      return;
    } 
    //Check draw
    if (getDraw()) {
      setGameDraw();
      return;
    }
    switchActivePlayer()
    printRound();
  }

  printRound();

  return {
    playRound,
    getGameEnded,
    resetGame,
    getPlayers,
    getBoard: gameBoard.getBoard,
  }
}

function ScreenController() {
  
}