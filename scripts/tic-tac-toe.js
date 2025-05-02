function gameBoard() {
  const board = [];
  const rows = 3;
  const columns = 3;
  const boardSize = rows * columns;

  for (let i = 0; i < boardSize; i++) {
    board.push(cell());
  }
}

function cell() {
  let value = "";

  const changeValue = function(playerMark) {
    value = playerMark;
  }

  const getValue = () => value;

  return {
    changeValue,
    getValue,
  }
}