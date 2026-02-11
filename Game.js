const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const COLS = 8;
const ROWS = 8;
const SIZE = 60;

const COLORS = ["red","blue","green","yellow","purple"];

let board=[];
let selected=null;
let moves=20;
let animating=false;
let editorMode=false;

/* =====================
   初期化
===================== */

function createPiece(color=null){
  return {
    type:"normal",
    color:color || COLORS[Math.floor(Math.random()*COLORS.length)],
    hp:0
  };
}

function initBoard(){
  board=[];
  for(let r=0;r<ROWS;r++){
    let row=[];
    for(let c=0;c<COLS;c++){
      row.push(createPiece());
    }
    board.push(row);
  }
  draw();
}

/* =====================
   描画
===================== */

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      drawCell(r,c);
    }
  }
  document.getElementById("moves").textContent="手数: "+moves;
}

function drawTriangle(x,y,color){
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.moveTo(x+SIZE/2,y+10);
  ctx.lineTo(x+10,y+SIZE-10);
  ctx.lineTo(x+SIZE-10,y+SIZE-10);
  ctx.closePath();
  ctx.fill();
}

function drawCell(r,c){
  const cell=board[r][c];
  if(!cell) return;

  const x=c*SIZE;
  const y=r*SIZE;

  if(cell.type==="normal"){
    ctx.fillStyle=cell.color;
    ctx.beginPath();
    ctx.arc(x+SIZE/2,y+SIZE/2,SIZE/2-6,0,Math.PI*2);
    ctx.fill();
  }

  if(cell.type==="bomb"){
    if(cell.bombType==="color") drawTriangle(x,y,"rainbow");
    if(cell.bombType==="line") drawTriangle(x,y,"orange");
    if(cell.bombType==="random") drawTriangle(x,y,"gray");
    if(cell.bombType==="explode") drawTriangle(x,y,"black");
  }

  if(cell.type==="box"){
    ctx.fillStyle="#8B4513";
    ctx.fillRect(x,y,SIZE,SIZE);
  }

  if(cell.type==="colorBox"){
    ctx.fillStyle=cell.color;
    ctx.fillRect(x,y,SIZE,SIZE);
  }

  if(cell.type==="bombBox"){
    ctx.fillStyle="black";
    ctx.fillRect(x,y,SIZE,SIZE);
  }
}

/* =====================
   クリック処理
===================== */

canvas.addEventListener("click",(e)=>{
  if(animating) return;

  const rect=canvas.getBoundingClientRect();
  const c=Math.floor((e.clientX-rect.left)/SIZE);
  const r=Math.floor((e.clientY-rect.top)/SIZE);

  if(editorMode){
    board[r][c]=createPiece();
    draw();
    return;
  }

  const cell=board[r][c];

  if(cell && cell.type==="bomb"){
    if(moves<=0) return;
    moves--;
    activateBomb(r,c);
    return;
  }

  if(!selected){
    selected={r,c};
  }else{
    swap(selected.r,selected.c,r,c);
    selected=null;
  }
});

/* =====================
   スワップ
===================== */

function swap(r1,c1,r2,c2){
  if(Math.abs(r1-r2)+Math.abs(c1-c2)!==1) return;

  let tmp=board[r1][c1];
  board[r1][c1]=board[r2][c2];
  board[r2][c2]=tmp;

  const matches=findMatches();
  if(matches.length===0){
    tmp=board[r1][c1];
    board[r1][c1]=board[r2][c2];
    board[r2][c2]=tmp;
    return;
  }

  if(moves<=0) return;
  moves--;

  processMatches(matches);
}

/* =====================
   マッチ検出
===================== */

function findMatches(){
  let matches=[];

  for(let r=0;r<ROWS;r++){
    let count=1;
    for(let c=1;c<COLS;c++){
      if(board[r][c] && board[r][c-1] &&
         board[r][c].type==="normal" &&
         board[r][c].color===board[r][c-1].color){
        count++;
      }else{
        if(count>=3){
          for(let k=0;k<count;k++){
            matches.push({r,c:c-1-k});
          }
        }
        count=1;
      }
    }
  }

  for(let c=0;c<COLS;c++){
    let count=1;
    for(let r=1;r<ROWS;r++){
      if(board[r][c] && board[r-1][c] &&
         board[r][c].type==="normal" &&
         board[r][c].color===board[r-1][c].color){
        count++;
      }else{
        if(count>=3){
          for(let k=0;k<count;k++){
            matches.push({r:r-1-k,c});
          }
        }
        count=1;
      }
    }
  }

  return matches;
}

/* =====================
   消去
===================== */

async function processMatches(matches){
  animating=true;

  for(let m of matches){
    ctx.strokeStyle="white";
    ctx.strokeRect(m.c*SIZE,m.r*SIZE,SIZE,SIZE);
  }

  await sleep(400);

  for(let m of matches){
    board[m.r][m.c]=null;
  }

  draw();
  await sleep(200);

  await applyGravity();
  animating=false;

  const chain=findMatches();
  if(chain.length>0){
    processMatches(chain);
  }
}

/* =====================
   逆重力（吸い上げ）
===================== */

async function applyGravity(){
  for(let c=0;c<COLS;c++){
    for(let r=0;r<ROWS;r++){
      if(board[r][c]==null){
        for(let k=r+1;k<ROWS;k++){
          if(board[k][c]){
            board[r][c]=board[k][c];
            board[k][c]=null;
            draw();
            await sleep(50);
            break;
          }
        }
      }
    }
  }

  for(let c=0;c<COLS;c++){
    for(let r=ROWS-1;r>=0;r--){
      if(board[r][c]==null){
        board[r][c]=createPiece();
      }
    }
  }

  draw();
}

/* =====================
   ボム起動
===================== */

function activateBomb(r,c){
  board[r][c]=null;
  draw();
  applyGravity();
}

/* =====================
   保存
===================== */

document.getElementById("saveBtn").onclick=()=>{
  localStorage.setItem("A1",JSON.stringify(board));
};

document.getElementById("loadBtn").onclick=()=>{
  const data=localStorage.getItem("A1");
  if(data){
    board=JSON.parse(data);
    draw();
  }
};

document.getElementById("editorBtn").onclick=()=>{
  editorMode=!editorMode;
};

document.getElementById("startBtn").onclick=()=>{
  moves=20;
  initBoard();
};

function sleep(ms){
  return new Promise(r=>setTimeout(r,ms));
}
