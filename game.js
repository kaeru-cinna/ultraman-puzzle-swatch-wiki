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
let lastSwapped = null;

class Cell {
  constructor(type="normal",color=null,bombType=null){
    this.type=type; // normal bomb
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
          drawRainbowTriangle(x,y,CELL/2-6);
          continue;
        }
        ctx.fillStyle=color;
        drawTriangle(x,y,CELL/2-6);
      }
    }
  }
}

function drawTriangle(cx,cy,r){
  ctx.beginPath();
  ctx.moveTo(cx,cy-r);
  ctx.lineTo(cx-r,cy+r);
  ctx.lineTo(cx+r,cy+r);
  ctx.closePath();
  ctx.fill();
}

function drawRainbowTriangle(cx,cy,r){
  let g=ctx.createLinearGradient(cx-r,cy-r,cx+r,cy+r);
  g.addColorStop(0,"red");
  g.addColorStop(0.2,"orange");
  g.addColorStop(0.4,"yellow");
  g.addColorStop(0.6,"green");
  g.addColorStop(0.8,"blue");
  g.addColorStop(1,"purple");
  ctx.fillStyle=g;
  drawTriangle(cx,cy,r);
}

function startGame(){
  moves=parseInt(document.getElementById("moveInput").value);
  document.getElementById("moves").textContent=moves;
  gameState="playing";
  checkMatches();
}

function swap(r1,c1,r2,c2){
  let tmp=board[r1][c1];
  board[r1][c1]=board[r2][c2];
  board[r2][c2]=tmp;
  lastSwapped=[r2,c2];
}

function checkMatches(){

  let mark = Array.from({length:SIZE},()=>Array(SIZE).fill(false));
  let bombInfo=null;

  // 横チェック
  for(let r=0;r<SIZE;r++){
    let count=1;
    for(let c=1;c<=SIZE;c++){
      if(c<SIZE &&
         board[r][c] &&
         board[r][c-1] &&
         board[r][c].color===board[r][c-1].color){
        count++;
      }else{
        if(count>=3){
          for(let k=0;k<count;k++){
            mark[r][c-1-k]=true;
          }
          if(count===4) bombInfo="line";
          if(count>=5) bombInfo="color";
        }
        count=1;
      }
    }
  }

  // 縦チェック
  for(let c=0;c<SIZE;c++){
    let count=1;
    for(let r=1;r<=SIZE;r++){
      if(r<SIZE &&
         board[r][c] &&
         board[r-1][c] &&
         board[r][c].color===board[r-1][c].color){
        count++;
      }else{
        if(count>=3){
          for(let k=0;k<count;k++){
            mark[r-1-k][c]=true;
          }
          if(count===4) bombInfo="line";
          if(count>=5) bombInfo="color";
        }
        count=1;
      }
    }
  }

  // 2x2 ランダムボム
  for(let r=0;r<SIZE-1;r++){
    for(let c=0;c<SIZE-1;c++){
      let a=board[r][c];
      let b=board[r][c+1];
      let d=board[r+1][c];
      let e=board[r+1][c+1];
      if(a&&b&&d&&e &&
         a.color===b.color &&
         a.color===d.color &&
         a.color===e.color){
        mark[r][c]=mark[r][c+1]=mark[r+1][c]=mark[r+1][c+1]=true;
        bombInfo="random";
      }
    }
  }

  let clearSet=new Set();
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(mark[r][c]) clearSet.add(r+","+c);
    }
  }

  if(clearSet.size>0){
    generateBomb(bombInfo);
    clearMatches(clearSet);
  }
}

function generateBomb(type){
  if(!type || !lastSwapped) return;
  let [r,c]=lastSwapped;

  if(type==="line")
    board[r][c]=new Cell("bomb",null,"lineH");

  if(type==="color")
    board[r][c]=new Cell("bomb",null,"color");

  if(type==="random")
    board[r][c]=new Cell("bomb",null,"random");
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
      if(lastSwapped && r===lastSwapped[0] && c===lastSwapped[1]) return;
      board[r][c]=null;
    });

    draw();

    setTimeout(()=>{
      dropUp();
      draw();

      setTimeout(()=>{
        refillBottom();
        draw();
        checkMatches();
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
