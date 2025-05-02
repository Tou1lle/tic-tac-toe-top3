function gameBoard() {
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
    console.log(boardWithValues);
  }

  return {
    getBoard,
    printBoard,
    changeMark,
  }
}

function cell() {
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