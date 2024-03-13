const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.querySelector('.message');
const restartBtn = document.querySelector('.restart-btn');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (e) => {
  const cell = e.target;
  const cellIndex = parseInt(cell.getAttribute('data-cell'));

  if (cell.textContent !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  checkResult();
  swapPlayer();
};

const checkResult = () => {
  const winner = checkWin() || checkDraw();
  if (winner) {
    message.textContent = winner === 'draw' ? "It's a draw!" : `${winner} wins!`;
    gameActive = false;
    return;
  }
};

const checkWin = () => {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a].textContent === '' || cells[b].textContent === '' || cells[c].textContent === '') continue;
    if (cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
      return cells[a].textContent;
    }
  }
  return null;
};

const checkDraw = () => {
  return [...cells].every(cell => cell.textContent !== '') ? 'draw' : null;
};

const swapPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const restartGame = () => {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  message.textContent = '';
  gameActive = true;
  currentPlayer = 'X';
};

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);
