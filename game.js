const SIZE = 8;
const COLORS = ["red","blue","green","yellow","purple"];
const CLEAR_DELAY = 1000;
const DROP_DELAY = 300;

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const CELL = canvas.width / SIZE;

let board = [];
let moves = 0;
let gameState = "editor"; // editor / playing
let selectedCell = null;

/* =========================
   セルクラス
========================= */
class Cell {
  constructor(type="normal",color=null,hp=null){
    this.type=type;
    this.color=color;
    this.hp=hp;
    this.highlight=false;
  }
}

function randomColor(){
  return COLORS[Math.floor(Math.random()*COLORS.length)];
}

/* =========================
   初期化
========================= */
function initBoard(){
  board=[];
  for(let r=0;r<SIZE;r++){
    board[r]=[];
    for(let c=0;c<SIZE;c++){
      board[r][c]=null; // ← 編集できるよう空にする
    }
  }
}

/* =========================
   描画
========================= */
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      let x=c*CELL;
      let y=r*CELL;

      ctx.strokeStyle="#444";
      ctx.strokeRect(x,y,CELL,CELL);

      let cell=board[r][c];
      if(!cell) continue;

      let cx=x+CELL/2;
      let cy=y+CELL/2;

      ctx.fillStyle=cell.highlight ? "white" : cell.color;
      ctx.beginPath();
      ctx.arc(cx,cy,CELL/2-6,0,Math.PI*2);
      ctx.fill();
    }
  }
}

/* =========================
   ゲーム開始
========================= */
function startGame(){
  // 未設定マスはランダムで埋める
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(!board[r][c]){
        board[r][c]=new Cell("normal",randomColor());
      }
    }
  }

  moves=parseInt(document.getElementById("moveInput").value);
  document.getElementById("moves").textContent=moves;
  gameState="playing";

  checkMatches();
}

/* =========================
   マッチ検出
========================= */
function checkMatches(){
  let clearSet=new Set();

  // 横
  for(let r=0;r<SIZE;r++){
    let count=1;
    for(let c=1;c<=SIZE;c++){
      if(
        c<SIZE &&
        board[r][c] &&
        board[r][c-1] &&
        board[r][c].color===board[r][c-1].color
      ){
        count++;
      }else{
        if(count>=3){
          for(let k=0;k<count;k++){
            clearSet.add(r+","+(c-1-k));
          }
        }
        count=1;
      }
    }
  }

  // 縦
  for(let c=0;c<SIZE;c++){
    let count=1;
    for(let r=1;r<=SIZE;r++){
      if(
        r<SIZE &&
        board[r][c] &&
        board[r-1][c] &&
        board[r][c].color===board[r-1][c].color
      ){
        count++;
      }else{
        if(count>=3){
          for(let k=0;k<count;k++){
            clearSet.add((r-1-k)+","+c);
          }
        }
        count=1;
      }
    }
  }

  if(clearSet.size>0){
    clearMatches(clearSet);
  }
}

function clearMatches(clearSet){

  clearSet.forEach(key=>{
    let [r,c]=key.split(",").map(Number);
    board[r][c].highlight=true;
  });

  draw();

  setTimeout(()=>{
    clearSet.forEach(key=>{
      let [r,c]=key.split(",").map(Number);
      board[r][c]=null;
    });

    draw();

    setTimeout(()=>{
      dropUp();
      draw();

      setTimeout(()=>{
        refillTop();
        draw();
        checkMatches();
      },DROP_DELAY);

    },DROP_DELAY);

  },CLEAR_DELAY);
}

/* =========================
   逆重力（上に落ちる）
========================= */
function dropUp(){
  for(let c=0;c<SIZE;c++){
    let stack=[];
    for(let r=0;r<SIZE;r++){
      if(board[r][c]){
        stack.push(board[r][c]);
      }
    }

    for(let r=0;r<SIZE;r++){
      board[r][c]=stack[r] || null;
    }
  }
}

/* =========================
   下から補充（逆重力なので下側に湧く）
========================= */
function refillTop(){
  for(let r=SIZE-1;r>=0;r--){
    for(let c=0;c<SIZE;c++){
      if(!board[r][c]){
        board[r][c]=new Cell("normal",randomColor());
      }
    }
  }
}

/* =========================
   クリック処理
========================= */
canvas.addEventListener("click",e=>{
  let rect=canvas.getBoundingClientRect();
  let c=Math.floor((e.clientX-rect.left)/CELL);
  let r=Math.floor((e.clientY-rect.top)/CELL);

  if(gameState==="editor"){
    // 色を順番に切り替える
    if(!board[r][c]){
      board[r][c]=new Cell("normal",COLORS[0]);
    }else{
      let idx=COLORS.indexOf(board[r][c].color);
      idx++;
      if(idx>=COLORS.length){
        board[r][c]=null;
      }else{
        board[r][c].color=COLORS[idx];
      }
    }
    draw();
    return;
  }

  if(gameState!=="playing") return;
  if(moves<=0) return;

  if(!selectedCell){
    selectedCell=[r,c];
  }else{
    let [r1,c1]=selectedCell;

    if(Math.abs(r1-r)+Math.abs(c1-c)===1){
      let tmp=board[r1][c1];
      board[r1][c1]=board[r][c];
      board[r][c]=tmp;

      moves--;
      document.getElementById("moves").textContent=moves;

      checkMatches();
    }

    selectedCell=null;
  }

  draw();
});

/* =========================
   ボタン
========================= */
document.getElementById("startBtn").onclick=()=>{
  startGame();
};

initBoard();
draw();
