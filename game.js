// ===== 設定 =====
const ROWS = 8;
const COLS = 8;
const CELL = 54;
const COLORS = ["red","blue","green","yellow","purple"];

let board = [];
let selected = null;
let moves = 20;

// ===== 初期化 =====
document.getElementById("startBtn").addEventListener("click", initGame);

function initGame() {
  moves = 20;
  document.getElementById("moves").textContent = moves;
  selected = null;
  createBoard();
  renderBoard();
}
// ===== 遅延 =====
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// ===== 盤面作成 =====
function createBoard() {
  board = [];

  for (let r = 0; r < ROWS; r++) {
    let row = [];
    for (let c = 0; c < COLS; c++) {
      row.push({
        id: crypto.randomUUID(),
        color: randomColor(),
        bomb: null
      });
    }
    board.push(row);
  }
}

// ===== 描画 =====
function renderBoard() {
  const boardEl = document.getElementById("board");
  boardEl.innerHTML = "";

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {

      const cell = board[r][c];
      if (!cell) continue;

      const div = document.createElement("div");
      div.className = "piece " + cell.color;

      if (selected && selected.r === r && selected.c === c) {
        div.style.outline = "3px solid white";
      }

      div.style.left = (c * CELL) + "px";
      div.style.top = (r * CELL) + "px";

      div.addEventListener("click", () => {
        handleCellClick(r, c);
      });

      boardEl.appendChild(div);
    }
  }
}

// ===== 入力処理 =====
async function handleCellClick(r, c) {

  if (!selected) {
    selected = { r, c };
    renderBoard();
    return;
  }

  if (selected.r === r && selected.c === c) {
    selected = null;
    renderBoard();
    return;
  }

    if (matches.length === 0) {
      swapCells(selected, { r, c });
    } else {

      while (matches.length > 0) {

        // 消える前に描画
        renderBoard();
        await sleep(2000);

        clearMatches(matches);
        renderBoard();
        await sleep(2000);

        applyReverseGravity();
        renderBoard();
        await sleep(2000);

        spawnNewPieces();
        renderBoard();
        await sleep(2000);

        matches = detectMatches();
      }
    }

    selected = null;
    renderBoard();

  } else {
    selected = { r, c };
    renderBoard();
  }
}


// ===== スワップ =====
function swapCells(a, b) {
  const temp = board[a.r][a.c];
  board[a.r][a.c] = board[b.r][b.c];
  board[b.r][b.c] = temp;
}

// ===== 隣接判定 =====
function isAdjacent(a, b) {
  return Math.abs(a.r - b.r) + Math.abs(a.c - b.c) === 1;
}

// ===== マッチ検出 =====
function detectMatches() {

  let matches = [];

  // 横チェック
  for (let r = 0; r < ROWS; r++) {
    let count = 1;

    for (let c = 1; c < COLS; c++) {
      if (board[r][c].color === board[r][c - 1].color) {
        count++;
      } else {
        if (count >= 3) {
          for (let k = 0; k < count; k++) {
            matches.push({ r, c: c - 1 - k });
          }
        }
        count = 1;
      }
    }

    if (count >= 3) {
      for (let k = 0; k < count; k++) {
        matches.push({ r, c: COLS - 1 - k });
      }
    }
  }

  // 縦チェック
  for (let c = 0; c < COLS; c++) {
    let count = 1;

    for (let r = 1; r < ROWS; r++) {
      if (board[r][c].color === board[r - 1][c].color) {
        count++;
      } else {
        if (count >= 3) {
          for (let k = 0; k < count; k++) {
            matches.push({ r: r - 1 - k, c });
          }
        }
        count = 1;
      }
    }

    if (count >= 3) {
      for (let k = 0; k < count; k++) {
        matches.push({ r: ROWS - 1 - k, c });
      }
    }
  }

  // 重複除去
  const unique = [];
  const map = new Set();

  for (let m of matches) {
    const key = m.r + "-" + m.c;
    if (!map.has(key)) {
      map.add(key);
      unique.push(m);
    }
  }

  return unique;
}

// ===== 消去 =====
function clearMatches(matches) {
  matches.forEach(m => {
    board[m.r][m.c] = null;
  });
}

// ===== 補助 =====
function randomColor() {
  return COLORS[Math.floor(Math.random()*COLORS.length)];
}
// ===== 逆重力（吸い上げ） =====
function applyReverseGravity() {

  for (let c = 0; c < COLS; c++) {

    let column = [];

    // nullじゃないものを集める
    for (let r = 0; r < ROWS; r++) {
      if (board[r][c] !== null) {
        column.push(board[r][c]);
      }
    }

    // 上から詰める
    for (let r = 0; r < column.length; r++) {
      board[r][c] = column[r];
    }

    // 残りはnull
    for (let r = column.length; r < ROWS; r++) {
      board[r][c] = null;
    }
  }
}

function spawnNewPieces() {

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {

      if (board[r][c] === null) {
        board[r][c] = {
          id: crypto.randomUUID(),
          color: randomColor(),
          bomb: null
        };
      }

    }
  }
}
