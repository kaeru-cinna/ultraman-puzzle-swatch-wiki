const SIZE = 8;
const COLORS = ["red","blue","green","yellow","purple"];
const CLEAR_DELAY = 1000;
const DROP_DELAY = 300;

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const CELL = canvas.width / SIZE;

let board = [];
let moves = 0;
let gameState = "editor";
let selectedCell = null;
let selectedItem = null;
let itemUsed = {A:false,B:false,C:false,D:false};
let swapBuffer = null;

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

function initBoard(){
  board=[];
  for(let r=0;r<SIZE;r++){
    board[r]=[];
    for(let c=0;c<SIZE;c++){
      board[r][c]=new Cell("normal",randomColor());
    }
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      let cell=board[r][c];
      if(!cell) continue;

      let x=c*CELL+CELL/2;
      let y=r*CELL+CELL/2;

      if(cell.type==="normal"){
        ctx.fillStyle=cell.highlight ? "white" : cell.color;
        ctx.beginPath();
        ctx.arc(x,y,CELL/2-6,0,Math.PI*2);
        ctx.fill();
      }
    }
  }
}

function startGame(){
  moves=parseInt(document.getElementById("moveInput").value);
  document.getElementById("moves").textContent=moves;
  gameState="playing";
  checkMatches();
}

function inBounds(r,c){
  return r>=0&&r<SIZE&&c>=0&&c<SIZE;
}

function swap(r1,c1,r2,c2){
  let tmp=board[r1][c1];
  board[r1][c1]=board[r2][c2];
  board[r2][c2]=tmp;
}

function checkMatches(){
  let matches=[];

  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      let cell=board[r][c];
      if(!cell || cell.type!=="normal")continue;

      let color=cell.color;
      let line=[[r,c]];

      for(let k=c+1;k<SIZE;k++){
        if(board[r][k] && board[r][k].type==="normal" && board[r][k].color===color)
          line.push([r,k]);
        else break;
      }
      if(line.length>=3)matches.push(line);

      line=[[r,c]];
      for(let k=r+1;k<SIZE;k++){
        if(board[k][c] && board[k][c].type==="normal" && board[k][c].color===color)
          line.push([k,c]);
        else break;
      }
      if(line.length>=3)matches.push(line);
    }
  }

  if(matches.length>0){
    clearMatches(matches);
  }
}

function clearMatches(matches){
  let clearSet=new Set();

  matches.forEach(line=>{
    line.forEach(([r,c])=>{
      clearSet.add(r+","+c);
    });
  });

  // ハイライト
  clearSet.forEach(key=>{
    let [r,c]=key.split(",").map(Number);
    if(board[r][c])
      board[r][c].highlight=true;
  });

  draw();

  setTimeout(()=>{

    // 消去
    clearSet.forEach(key=>{
      let [r,c]=key.split(",").map(Number);
      board[r][c]=null;
    });

    draw();

    setTimeout(()=>{
      dropUp();
      draw();

      setTimeout(()=>{
        refill();
        draw();
        checkMatches();
      }, DROP_DELAY);

    }, DROP_DELAY);

  }, CLEAR_DELAY);
}

function dropUp(){
  for(let c=0;c<SIZE;c++){
    for(let r=SIZE-1;r>=0;r--){
      if(board[r][c]===null){
        for(let k=r-1;k>=0;k--){
          if(board[k][c]){
            board[r][c]=board[k][c];
            board[k][c]=null;
            break;
          }
        }
      }
    }
  }
}

function refill(){
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(board[r][c]===null){
        board[r][c]=new Cell("normal",randomColor());
      }
    }
  }
}

canvas.addEventListener("click",e=>{
  if(gameState!=="playing")return;
  if(moves<=0)return;

  let rect=canvas.getBoundingClientRect();
  let c=Math.floor((e.clientX-rect.left)/CELL);
  let r=Math.floor((e.clientY-rect.top)/CELL);

  if(!selectedCell){
    selectedCell=[r,c];
  }else{
    let [r1,c1]=selectedCell;
    if(Math.abs(r1-r)+Math.abs(c1-c)===1){
      swap(r1,c1,r,c);
      moves--;
      document.getElementById("moves").textContent=moves;
      checkMatches();
    }
    selectedCell=null;
  }
  draw();
});

document.getElementById("startBtn").onclick=()=>{
  initBoard();
  startGame();
  draw();
};

initBoard();
draw();
