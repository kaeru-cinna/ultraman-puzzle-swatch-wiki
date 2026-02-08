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
    this.type=type; // normal / bomb
    this.color=color;
    this.bombType=bombType; // lineH lineV explode color random
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
        ctx.fillStyle=cell.color || "white";
        drawStar(x,y,CELL/2-6,5);
      }
    }
  }
}

function drawStar(cx,cy,r,points){
  ctx.beginPath();
  for(let i=0;i<points*2;i++){
    let angle=Math.PI*i/points;
    let rad=i%2===0?r:r/2;
    ctx.lineTo(cx+rad*Math.sin(angle),cy-rad*Math.cos(angle));
  }
  ctx.closePath();
  ctx.fill();
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
  lastSwapped=[r2,c2]; // Swipe先
}

function checkMatches(){
  let matches=[];
  let clearSet=new Set();

  // 横
  for(let r=0;r<SIZE;r++){
    let count=1;
    for(let c=1;c<=SIZE;c++){
      if(c<SIZE && board[r][c] && board[r][c-1] &&
         board[r][c].color===board[r][c-1].color){
        count++;
      }else{
        if(count>=3){
          let group=[];
          for(let k=0;k<count;k++){
            group.push([r,c-1-k]);
            clearSet.add(r+","+(c-1-k));
          }
          matches.push(group);
        }
        count=1;
      }
    }
  }

  // 縦
  for(let c=0;c<SIZE;c++){
    let count=1;
    for(let r=1;r<=SIZE;r++){
      if(r<SIZE && board[r][c] && board[r-1][c] &&
         board[r][c].color===board[r-1][c].color){
        count++;
      }else{
        if(count>=3){
          let group=[];
          for(let k=0;k<count;k++){
            group.push([r-1-k,c]);
            clearSet.add((r-1-k)+","+c);
          }
          matches.push(group);
        }
        count=1;
      }
    }
  }

  if(clearSet.size>0){
    generateBomb(matches);
    clearMatches(clearSet);
  }
}

function generateBomb(matches){
  if(!lastSwapped) return;

  for(let group of matches){
    if(group.length===4){
      let [r,c]=lastSwapped;
      let dir = group[0][0]===group[1][0]?"lineH":"lineV";
      board[r][c]=new Cell("bomb",randomColor(),dir);
    }
    if(group.length===5){
      let [r,c]=lastSwapped;
      board[r][c]=new Cell("bomb",null,"color");
    }
  }
}

function clearMatches(clearSet){

  clearSet.forEach(key=>{
    let [r,c]=key.split(",").map(Number);
    if(board[r][c]) board[r][c].highlight=true;
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
      if(board[r][c]===null){
        board[r][c]=new Cell("normal",randomColor());
      }
    }
  }
}

function activateBomb(r,c){
  let bomb=board[r][c];
  if(!bomb || bomb.type!=="bomb") return;

  let clearSet=new Set();

  if(bomb.bombType==="lineH"){
    for(let i=0;i<SIZE;i++) clearSet.add(r+","+i);
  }

  if(bomb.bombType==="lineV"){
    for(let i=0;i<SIZE;i++) clearSet.add(i+","+c);
  }

  if(bomb.bombType==="explode"){
    for(let dr=-1;dr<=1;dr++){
      for(let dc=-1;dc<=1;dc++){
        let nr=r+dr,nc=c+dc;
        if(nr>=0&&nr<SIZE&&nc>=0&&nc<SIZE)
          clearSet.add(nr+","+nc);
      }
    }
  }

  if(bomb.bombType==="color"){
    let colorCount={};
    for(let r2=0;r2<SIZE;r2++){
      for(let c2=0;c2<SIZE;c2++){
        let cell=board[r2][c2];
        if(cell && cell.color){
          colorCount[cell.color]=(colorCount[cell.color]||0)+1;
        }
      }
    }
    let maxColor=Object.keys(colorCount)
      .reduce((a,b)=>colorCount[a]>colorCount[b]?a:b);
    for(let r2=0;r2<SIZE;r2++){
      for(let c2=0;c2<SIZE;c2++){
        if(board[r2][c2] && board[r2][c2].color===maxColor)
          clearSet.add(r2+","+c2);
      }
    }
  }

  clearMatches(clearSet);
}

canvas.addEventListener("click",e=>{
  if(gameState!=="playing")return;
  if(moves<=0)return;

  let rect=canvas.getBoundingClientRect();
  let c=Math.floor((e.clientX-rect.left)/CELL);
  let r=Math.floor((e.clientY-rect.top)/CELL);

  let cell=board[r][c];

  if(cell && cell.type==="bomb"){
    moves--;
    document.getElementById("moves").textContent=moves;
    activateBomb(r,c);
    return;
  }

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
