const SIZE = 8;
const COLORS = ["red","blue","green","yellow","purple"];

let board = [];
let selected = null;
let moves = 20;
let animating = false;
let gameStarted = false;

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  moves = 20;
  document.getElementById("moves").textContent = moves;
  gameStarted = true;
  initBoard();
}

function initBoard() {
  board = [];
  for (let r = 0; r < SIZE; r++) {
    let row = [];
    for (let c = 0; c < SIZE; c++) {
      row.push(randomColor());
    }
    board.push(row);
  }
  render();
  setTimeout(checkMatches, 100);
}

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function render() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const div = document.createElement("div");
      div.className = "cell " + (board[r]?.[c] || "empty");
      div.onclick = () => select(r, c);
      boardDiv.appendChild(div);
    }
  }
}

function select(r, c) {
  if (!gameStarted || animating || moves <= 0) return;

  if (!selected) {
    selected = { r, c };
    return;
  }

  const dr = Math.abs(selected.r - r);
  const dc = Math.abs(selected.c - c);

  if (dr + dc === 1) {
    swap(selected.r, selected.c, r, c, true);
  }

  selected = null;
}

function swap(r1, c1, r2, c2, playerMove) {
  [board[r1][c1], board[r2][c2]] = [board[r2][c2], board[r1][c1]];
  render();

  setTimeout(() => {
    if (checkMatches()) {
      if (playerMove) {
        moves--;
        document.getElementById("moves").textContent = moves;
      }
    } else {
      if (playerMove) {
        [board[r1][c1], board[r2][c2]] = [board[r2][c2], board[r1][c1]];
        render();
      }
    }
  }, 200);
}

function checkMatches() {
  let matches = [];

  // horizontal
  for (let r = 0; r < SIZE; r++) {
    let count = 1;
    for (let c = 1; c <= SIZE; c++) {
      if (c < SIZE && board[r][c] === board[r][c - 1]) {
        count++;
      } else {
        if (count >= 3) {
          for (let k = 0; k < count; k++) {
            matches.push({ r: r, c: c - 1 - k });
          }
        }
        count = 1;
      }
    }
  }

  // vertical
  for (let c = 0; c < SIZE; c++) {
    let count = 1;
    for (let r = 1; r <= SIZE; r++) {
      if (r < SIZE && board[r][c] === board[r - 1][c]) {
        count++;
      } else {
        if (count >= 3) {
          for (let k = 0; k < count; k++) {
            matches.push({ r: r - 1 - k, c: c });
          }
        }
        count = 1;
      }
    }
  }

  if (matches.length > 0) {
    animating = true;
    setTimeout(() => removeMatches(matches), 1000);
    return true;
  }

  return false;
}

function removeMatches(matches) {
  matches.forEach(m => {
    board[m.r][m.c] = null;
  });

  render();
  setTimeout(applyGravity, 1000);
}

/*
   吸い上げ重力
   ↓
   下から新規生成
   ↓
   上へ詰める
*/
function applyGravity() {

  for (let c = 0; c < SIZE; c++) {

    let newColumn = [];

    // 既存ピースを下から順に取得
    for (let r = SIZE - 1; r >= 0; r--) {
      if (board[r][c] != null) {
        newColumn.push(board[r][c]);
      }
    }

    // 足りない分を下側に追加（吸い上げなので下から湧く）
    while (newColumn.length < SIZE) {
      newColumn.push(randomColor());
    }

    // 下から詰めていく（上に向かって積む）
    for (let r = SIZE - 1; r >= 0; r--) {
      board[r][c] = newColumn[SIZE - 1 - r];
    }
  }

  render();

  setTimeout(() => {
    animating = false;
    checkMatches();
  }, 1000);
}
