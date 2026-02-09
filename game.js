<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reverse Match3</title>
<style>
body{
  margin:0;
  background:#111;
  color:white;
  text-align:center;
  font-family:sans-serif;
}
#board{
  background:#222;
  touch-action:none;
  margin-top:10px;
}
button,input{
  font-size:16px;
  margin:5px;
}
</style>
</head>
<body>

<h2>逆重力マッチ3</h2>
手数: <span id="moves">0</span><br>
<input type="number" id="moveInput" value="20">
<button id="startBtn">スタート</button>
<br>
<canvas id="board" width="400" height="400"></canvas>

<script>
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
let lastSwap = null;

class Cell {
  constructor(type="normal",color=null,bombType=null){
    this.type=type;
    this.color=color;
    this.bombType=bombType;
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
        ctx.fillStyle=cell.highlight?"white":cell.color;
        ctx.beginPath();
        ctx.arc(x,y,CELL/2-6,0,Math.PI*2);
        ctx.fill();
      }

      if(cell.type==="bomb"){
        let color="orange";
        if(cell.bombType==="random") color="gray";
        if(cell.bombType==="explode") color="black";
        if(cell.bombType==="color"){
          let g=ctx.createLinearGradient(x-10,y-10,x+10,y+10);
          g.addColorStop(0,"red");
          g.addColorStop(0.2,"orange");
          g.addColorStop(0.4,"yellow");
          g.addColorStop(0.6,"green");
          g.addColorStop(0.8,"blue");
          g.addColorStop(1,"purple");
          ctx.fillStyle=g;
        }else{
          ctx.fillStyle=color;
        }
        ctx.beginPath();
        ctx.moveTo(x,y-CELL/2+6);
        ctx.lineTo(x-CELL/2+6,y+CELL/2-6);
        ctx.lineTo(x+CELL/2-6,y+CELL/2-6);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}

function startGame(){
  moves=parseInt(document.getElementById("moveInput").value);
  document.getElementById("moves").textContent=moves;
  gameState="playing";
  selectedCell=null;
  lastSwap=null;
}


function swap(r1,c1,r2,c2){
  let tmp=board[r1][c1];
  board[r1][c1]=board[r2][c2];
  board[r2][c2]=tmp;
  lastSwap=[[r1,c1],[r2,c2]];
}

function checkMatches(test=false){

  let mark = Array.from({length:SIZE},()=>Array(SIZE).fill(false));
  let found=false;

  for(let r=0;r<SIZE;r++){
    let count=1;
    for(let c=1;c<=SIZE;c++){
      if(c<SIZE && board[r][c] && board[r][c-1] &&
         board[r][c].color===board[r][c-1].color){
        count++;
      }else{
        if(count>=3){
          found=true;
          for(let k=0;k<count;k++)
            mark[r][c-1-k]=true;
        }
        count=1;
      }
    }
  }

  for(let c=0;c<SIZE;c++){
    let count=1;
    for(let r=1;r<=SIZE;r++){
      if(r<SIZE && board[r][c] && board[r-1][c] &&
         board[r][c].color===board[r-1][c].color){
        count++;
      }else{
        if(count>=3){
          found=true;
          for(let k=0;k<count;k++)
            mark[r-1-k][c]=true;
        }
        count=1;
      }
    }
  }

  if(test){
    if(!lastSwap) return false;
    let [[r1,c1],[r2,c2]] = lastSwap;
    return mark[r1][c1] || mark[r2][c2];
  }

  if(found){
    let clearSet=new Set();
    for(let r=0;r<SIZE;r++)
      for(let c=0;c<SIZE;c++)
        if(mark[r][c]) clearSet.add(r+","+c);

    generateBomb(mark);
    clearMatches(clearSet);
  }

  return found;
}

function generateBomb(mark){
  if(!lastSwap) return;

  let [[r1,c1],[r2,c2]] = lastSwap;
  let pos=null;

  if(mark[r1][c1]) pos=[r1,c1];
  else if(mark[r2][c2]) pos=[r2,c2];

  if(!pos) return;

  let [r,c]=pos;
  board[r][c]=new Cell("bomb",null,"lineH");
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
      if(lastSwap &&
         ((r===lastSwap[0][0]&&c===lastSwap[0][1]) ||
          (r===lastSwap[1][0]&&c===lastSwap[1][1])))
        return;

      board[r][c]=null;
    });

    draw();

    setTimeout(()=>{
      dropUp();
      draw();

      setTimeout(()=>{
        refillBottom();
        draw();
        checkMatches(false);
      },DROP_DELAY);

    },DROP_DELAY);

  },CLEAR_DELAY);
}

function dropUp(){
  for(let c=0;c<SIZE;c++){
    for(let r=0;r<SIZE;r++){
      if(board[r][c]===null){
        for(let k=r+1;k<SIZE;k++){
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

function refillBottom(){
  for(let c=0;c<SIZE;c++){
    for(let r=SIZE-1;r>=0;r--){
      if(board[r][c]===null)
        board[r][c]=new Cell("normal",randomColor());
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

      if(checkMatches(true)){
        moves--;
        document.getElementById("moves").textContent=moves;
        checkMatches(false);
      }else{
        swap(r1,c1,r,c);
      }
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
</script>

</body>
</html>
