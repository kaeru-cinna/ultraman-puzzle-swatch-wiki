const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ROWS=8;
const COLS=8;
const SIZE=60;
const COLORS=["red","blue","green","yellow","purple"];

let board=[];
let editorBoard=null;
let moves=20;
let gameStarted=false;
let editorMode=false;
let selected=null;
let animating=false;

let items={A:true,B:true,C:true,D:true};
let currentItem=null;
let swapBuffer=null;

/* ===================== 基本生成 ===================== */

function createNormal(color=null){
  return {type:"normal",color:color||COLORS[Math.floor(Math.random()*5)]};
}

function createBomb(type){
  return {type:"bomb",bombType:type};
}

function createBox(hp=2){
  return {type:"box",hp};
}

function createColorBox(color,hp=2){
  return {type:"colorBox",color,hp};
}

function createBombBox(){
  return {type:"bombBox",hp:1};
}

/* ===================== 初期化 ===================== */

function initEditor(){
  editorBoard=[];
  for(let r=0;r<ROWS;r++){
    let row=[];
    for(let c=0;c<COLS;c++) row.push(null);
    editorBoard.push(row);
  }
  board=structuredClone(editorBoard);
  draw();
}

/* ===================== 描画 ===================== */

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const cell=board[r][c];
      if(!cell) continue;

      const x=c*SIZE;
      const y=r*SIZE;

      if(cell.type==="normal"){
        ctx.fillStyle=cell.color;
        ctx.beginPath();
        ctx.arc(x+SIZE/2,y+SIZE/2,SIZE/2-6,0,Math.PI*2);
        ctx.fill();
      }

      if(cell.type==="bomb"){
        let col="white";
        if(cell.bombType==="color") col="rainbow";
        if(cell.bombType==="line") col="orange";
        if(cell.bombType==="random") col="gray";
        if(cell.bombType==="explode") col="black";
        ctx.fillStyle=col;
        ctx.beginPath();
        ctx.moveTo(x+SIZE/2,y+10);
        ctx.lineTo(x+10,y+SIZE-10);
        ctx.lineTo(x+SIZE-10,y+SIZE-10);
        ctx.closePath();
        ctx.fill();
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
  }

  document.getElementById("moves").textContent="手数: "+moves;
}

/* ===================== マッチ検出 ===================== */

function findMatches(){
  let matches=[];

  // 横
  for(let r=0;r<ROWS;r++){
    let count=1;
    for(let c=1;c<COLS;c++){
      if(board[r][c] && board[r][c-1] &&
         board[r][c].type==="normal" &&
         board[r][c-1].type==="normal" &&
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
    if(count>=3){
      for(let k=0;k<count;k++){
        matches.push({r,c:COLS-1-k});
      }
    }
  }

  // 縦
  for(let c=0;c<COLS;c++){
    let count=1;
    for(let r=1;r<ROWS;r++){
      if(board[r][c] && board[r-1][c] &&
         board[r][c].type==="normal" &&
         board[r-1][c].type==="normal" &&
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
    if(count>=3){
      for(let k=0;k<count;k++){
        matches.push({r:ROWS-1-k,c});
      }
    }
  }

  return matches;
}

/* ===================== ダメージ ===================== */

function damageCell(r,c){
  const cell=board[r][c];
  if(!cell) return;

  if(cell.type==="box" || cell.type==="colorBox" || cell.type==="bombBox"){
    cell.hp--;
    if(cell.hp<=0) board[r][c]=null;
  }
}

function damageAdjacent(r,c){
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  for(let d of dirs){
    const nr=r+d[0];
    const nc=c+d[1];
    if(nr>=0&&nr<ROWS&&nc>=0&&nc<COLS){
      if(board[nr][nc] && board[nr][nc].type==="box"){
        board[nr][nc].hp--;
        if(board[nr][nc].hp<=0) board[nr][nc]=null;
      }
    }
  }
}

/* ===================== 消去処理 ===================== */

async function processMatches(matches){
  animating=true;

  for(let m of matches){
    ctx.strokeStyle="white";
    ctx.strokeRect(m.c*SIZE,m.r*SIZE,SIZE,SIZE);
  }

  await sleep(500);

  for(let m of matches){
    damageAdjacent(m.r,m.c);
    board[m.r][m.c]=null;
  }

  draw();
  await sleep(200);
  await applyGravity();

  animating=false;

  const chain=findMatches();
  if(chain.length>0) processMatches(chain);
}

/* ===================== 逆重力 ===================== */

async function applyGravity(){
  for(let c=0;c<COLS;c++){
    for(let r=0;r<ROWS;r++){
      if(board[r][c]==null){
        for(let k=r+1;k<ROWS;k++){
          if(board[k][c]){
            board[r][c]=board[k][c];
            board[k][c]=null;
            draw();
            await sleep(40);
            break;
          }
        }
      }
    }
  }

  for(let c=0;c<COLS;c++){
    for(let r=ROWS-1;r>=0;r--){
      if(board[r][c]==null){
        board[r][c]=createNormal();
      }
    }
  }

  draw();
}

/* ===================== アイテム ===================== */

function useItem(type,r,c){
  if(moves<=0) return;
  if(!items[type]) return;

  if(type==="A"){
    triggerCell(r,c);
    items.A=false;
  }

  if(type==="B"){
    for(let i=0;i<COLS;i++) triggerCell(r,i);
    items.B=false;
  }

  if(type==="C"){
    for(let i=0;i<ROWS;i++) triggerCell(i,c);
    items.C=false;
  }

  if(type==="D"){
    if(!swapBuffer){
      swapBuffer={r,c};
      return;
    }else{
      const a=swapBuffer;
      const b={r,c};
      if(board[a.r][a.c].type.includes("Box")||
         board[b.r][b.c].type.includes("Box")){
         swapBuffer=null;
         return;
      }
      let temp=board[a.r][a.c];
      board[a.r][a.c]=board[b.r][b.c];
      board[b.r][b.c]=temp;
      items.D=false;
      swapBuffer=null;
      draw();
      return;
    }
  }

  applyGravity();
  const matches=findMatches();
  if(matches.length>0) processMatches(matches);
}

function triggerCell(r,c){
  const cell=board[r][c];
  if(!cell) return;

  if(cell.type==="normal") board[r][c]=null;
  else if(cell.type==="bomb") board[r][c]=null;
  else damageCell(r,c);
}

/* ===================== イベント ===================== */

canvas.addEventListener("click",(e)=>{
  if(animating) return;

  const rect=canvas.getBoundingClientRect();
  const c=Math.floor((e.clientX-rect.left)/SIZE);
  const r=Math.floor((e.clientY-rect.top)/SIZE);

  if(currentItem){
    useItem(currentItem,r,c);
    currentItem=null;
    return;
  }

  if(editorMode){
    editorBoard[r][c]=createNormal();
    board=structuredClone(editorBoard);
    draw();
    return;
  }

  if(!selected){
    selected={r,c};
  }else{
    let a=selected;
    let b={r,c};
    if(Math.abs(a.r-b.r)+Math.abs(a.c-b.c)!==1){
      selected=null;
      return;
    }
    let tmp=board[a.r][a.c];
    board[a.r][a.c]=board[b.r][b.c];
    board[b.r][b.c]=tmp;

    const matches=findMatches();
    if(matches.length===0){
      tmp=board[a.r][a.c];
      board[a.r][a.c]=board[b.r][b.c];
      board[b.r][b.c]=tmp;
    }else{
      moves--;
      processMatches(matches);
    }

    selected=null;
  }
});

/* ===================== ボタン ===================== */

document.getElementById("editorBtn").onclick=()=>{
  editorMode=!editorMode;
  if(editorMode) initEditor();
};

document.getElementById("startBtn").onclick=()=>{
  if(editorBoard) board=structuredClone(editorBoard);
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      if(!board[r][c]) board[r][c]=createNormal();
    }
  }
  moves=20;
  gameStarted=true;
  draw();
  const m=findMatches();
  if(m.length>0) processMatches(m);
};

document.getElementById("saveBtn").onclick=()=>{
  if(editorBoard)
    localStorage.setItem("A1",JSON.stringify(editorBoard));
};

document.getElementById("loadBtn").onclick=()=>{
  const data=localStorage.getItem("A1");
  if(!data) return;
  editorBoard=JSON.parse(data);
  board=structuredClone(editorBoard);
  draw();
};

document.getElementById("itemA").onclick=()=>currentItem="A";
document.getElementById("itemB").onclick=()=>currentItem="B";
document.getElementById("itemC").onclick=()=>currentItem="C";
document.getElementById("itemD").onclick=()=>currentItem="D";

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
