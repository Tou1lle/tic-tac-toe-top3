function GameBoard() {
  const board = [];
  const rows = 3;
  const columns = 3;
  const boardSize = rows * columns;

  // Create the gameboard 3x3 for TOP
  for (let i = 0; i < boardSize; i++) {
    board.push(cell());
  }

  // Return the board for rendering in UI
  const getBoard = () => board;

  // Change the mark based on index
  // if the place is already occupied (not empty string), do nothing
  const changeMark = (index, mark) => {
    if (board[index].hasValue()) return;
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

  return {
    getBoard,
    printBoard,
    changeMark,
  }
}

function Cell() {
  // Initial value for all cells
  let value = "";

  // Change the initial value to the player mark
  const addValue = function(playerMark) {
    value = playerMark;
  }

  // Check in the board so the value can't ba changed again
  const hasValue = () => {
    return value !== "";
  }

  const getValue = () => value;

  return {
    addValue,
    getValue,
    hasValue,
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