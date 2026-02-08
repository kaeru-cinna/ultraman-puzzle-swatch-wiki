const SIZE = 8;
const COLORS = ["red","blue","green","yellow","purple"];
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
      let x=c*CELL+CELL/2;
      let y=r*CELL+CELL/2;

      if(cell.type==="normal"){
        ctx.fillStyle=cell.color;
        ctx.beginPath();
        ctx.arc(x,y,CELL/2-6,0,Math.PI*2);
        ctx.fill();
      }
      else if(cell.type==="lineH"||cell.type==="lineV"||
              cell.type==="bomb"||cell.type==="colorBomb"||
              cell.type==="randomBomb"){
        ctx.fillStyle="white";
        ctx.beginPath();
        ctx.moveTo(x,y-CELL/2+8);
        for(let i=1;i<5;i++){
          ctx.lineTo(
            x+(CELL/2-8)*Math.cos(i*2*Math.PI/5 - Math.PI/2),
            y+(CELL/2-8)*Math.sin(i*2*Math.PI/5 - Math.PI/2)
          );
        }
        ctx.fill();
      }
      else if(cell.type.startsWith("obstacle")){
        ctx.fillStyle="gray";
        ctx.beginPath();
        ctx.moveTo(x,y-CELL/2+6);
        ctx.lineTo(x-CELL/2+6,y+CELL/2-6);
        ctx.lineTo(x+CELL/2-6,y+CELL/2-6);
        ctx.fill();
      }

      if(cell.hp){
        ctx.fillStyle="white";
        ctx.fillText(cell.hp,x-4,y+4);
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
  let visited=Array(SIZE).fill().map(()=>Array(SIZE).fill(false));

  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      let cell=board[r][c];
      if(cell.type!=="normal")continue;
      let color=cell.color;
      let line=[[r,c]];

      for(let k=c+1;k<SIZE;k++){
        if(board[r][k].type==="normal"&&board[r][k].color===color)
          line.push([r,k]);
        else break;
      }
      if(line.length>=3)matches.push(line);

      line=[[r,c]];
      for(let k=r+1;k<SIZE;k++){
        if(board[k][c].type==="normal"&&board[k][c].color===color)
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

  clearSet.forEach(key=>{
    let [r,c]=key.split(",").map(Number);
    board[r][c]=null;
  });

  animateClear(()=>{
    dropUp();
    refill();
    checkMatches();
  });
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

function animateClear(callback){
  setTimeout(()=>{
    callback();
    draw();
  },200);
}

canvas.addEventListener("click",e=>{
  if(gameState!=="playing")return;
  if(moves<=0)return;

  let rect=canvas.getBoundingClientRect();
  let c=Math.floor((e.clientX-rect.left)/CELL);
  let r=Math.floor((e.clientY-rect.top)/CELL);

  if(selectedItem){
    useItem(r,c);
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

function useItem(r,c){
  if(itemUsed[selectedItem])return;

  if(selectedItem==="A"){
    triggerCell(r,c);
  }
  if(selectedItem==="B"){
    for(let col=0;col<SIZE;col++)triggerCell(r,col);
  }
  if(selectedItem==="C"){
    for(let row=0;row<SIZE;row++)triggerCell(row,c);
  }
  if(selectedItem==="D"){
    if(!swapBuffer){
      swapBuffer=[r,c];
      return;
    }else{
      let [r1,c1]=swapBuffer;
      swap(r1,c1,r,c);
      swapBuffer=null;
    }
  }

  itemUsed[selectedItem]=true;
  document.getElementById("item"+selectedItem).classList.add("used");
  selectedItem=null;
  checkMatches();
  draw();
}

function triggerCell(r,c){
  let cell=board[r][c];
  if(!cell)return;
  board[r][c]=null;
}

document.getElementById("startBtn").onclick=()=>{
  initBoard();
  startGame();
  draw();
};

["A","B","C","D"].forEach(k=>{
  document.getElementById("item"+k).onclick=()=>{
    if(moves<=0)return;
    selectedItem=k;
  };
});

initBoard();
draw();
