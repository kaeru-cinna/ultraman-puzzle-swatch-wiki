const ROWS = 8;
const COLS = 8;
const COLORS = ["red","blue","green","yellow","purple"];

let board = [];
let selected = null;
let isProcessing = false;

const boardElement = document.getElementById("board");

function randomColor(){
  return COLORS[Math.floor(Math.random()*COLORS.length)];
}

function sleep(ms){
  return new Promise(res=>setTimeout(res,ms));
}

function initBoard(){
  board=[];
  for(let r=0;r<ROWS;r++){
    board[r]=[];
    for(let c=0;c<COLS;c++){
      board[r][c]={
        id: crypto.randomUUID(),
        color: randomColor()
      };
    }
  }
}

function renderBoard(){
  boardElement.innerHTML="";

  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const cellData = board[r][c];
      if(!cellData) continue;

      const div=document.createElement("div");
      div.classList.add("cell");
      div.style.background=cellData.color;

      div.dataset.r=r;
      div.dataset.c=c;

      if(selected && selected.r===r && selected.c===c){
        div.classList.add("selected");
      }

      div.onclick=()=>handleClick(r,c);
      boardElement.appendChild(div);
    }
  }
}

function isAdjacent(a,b){
  return Math.abs(a.r-b.r)+Math.abs(a.c-b.c)===1;
}

function swap(a,b){
  [board[a.r][a.c],board[b.r][b.c]] =
  [board[b.r][b.c],board[a.r][a.c]];
}

function detectMatches(){
  let matches=[];

  // 横
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS-2;c++){
      let a=board[r][c];
      if(!a) continue;
      if(board[r][c+1] && board[r][c+2] &&
         a.color===board[r][c+1].color &&
         a.color===board[r][c+2].color){
        matches.push({r,c});
        matches.push({r,c:c+1});
        matches.push({r,c:c+2});
      }
    }
  }

  // 縦
  for(let c=0;c<COLS;c++){
    for(let r=0;r<ROWS-2;r++){
      let a=board[r][c];
      if(!a) continue;
      if(board[r+1][c] && board[r+2][c] &&
         a.color===board[r+1][c].color &&
         a.color===board[r+2][c].color){
        matches.push({r,c});
        matches.push({r:r+1,c});
        matches.push({r:r+2,c});
      }
    }
  }

  const map=new Set();
  return matches.filter(m=>{
    const key=m.r+"-"+m.c;
    if(map.has(key)) return false;
    map.add(key);
    return true;
  });
}

function clearMatches(matches){
  matches.forEach(m=>{
    board[m.r][m.c]=null;
  });
}

function applyReverseGravity(){
  for(let c=0;c<COLS;c++){
    let column=[];
    for(let r=0;r<ROWS;r++){
      if(board[r][c]!=null){
        column.push(board[r][c]);
      }
    }

    for(let r=0;r<column.length;r++){
      board[r][c]=column[r];
    }

    for(let r=column.length;r<ROWS;r++){
      board[r][c]=null;
    }
  }
}

function spawnNew(){
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      if(board[r][c]==null){
        board[r][c]={
          id: crypto.randomUUID(),
          color: randomColor()
        };
      }
    }
  }
}

async function flashMatches(matches){

  matches.forEach(pos=>{
    const cell=document.querySelector(
      `.cell[data-r="${pos.r}"][data-c="${pos.c}"]`
    );
    if(cell){
      cell.style.transform="scale(1.3)";
      cell.style.filter="brightness(2)";
    }
  });

  await sleep(400);

  matches.forEach(pos=>{
    const cell=document.querySelector(
      `.cell[data-r="${pos.r}"][data-c="${pos.c}"]`
    );
    if(cell){
      cell.style.transform="scale(1)";
      cell.style.filter="brightness(1)";
    }
  });
}

async function handleClick(r,c){

  if(isProcessing) return;

  if(!selected){
    selected={r,c};
    renderBoard();
    return;
  }

  if(selected.r===r && selected.c===c){
    selected=null;
    renderBoard();
    return;
  }

  if(!isAdjacent(selected,{r,c})){
    selected={r,c};
    renderBoard();
    return;
  }

  isProcessing=true;
  swap(selected,{r,c});
  renderBoard();

  let matches=detectMatches();

  if(matches.length===0){
    swap(selected,{r,c});
    renderBoard();
  }else{
    while(matches.length>0){

      await flashMatches(matches);

      clearMatches(matches);
      renderBoard();
      await sleep(400);

      applyReverseGravity();
      renderBoard();
      await sleep(400);

      spawnNew();
      renderBoard();
      await sleep(400);

      matches=detectMatches();
    }
  }

  selected=null;
  isProcessing=false;
}

initBoard();
renderBoard();
