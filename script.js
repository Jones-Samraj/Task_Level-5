const boxs=document.querySelectorAll('.box');
const statusTxt=document.querySelector('#status');
const btnRestart=document.querySelector('#restart');
let x="<img src='X.png'>";
let o="<img src='O.png'>";

const win=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let options=["","","","","","","","",""];
let Playerimage=x;
let player="X";
let running=false;

function choosePlayer() {
    const choice = prompt("Choose X or O").toUpperCase();
    if (choice === 'X' || choice === 'O') {
        player = choice;
        Playerimage = choice === 'X' ? x : o;
        init();
    } else {
        alert("Please choose either X or O");
        choosePlayer();
    }
}

function init(){
  boxs.forEach(box=>box.addEventListener('click',boxClick));
  statusTxt.textContent=`${player} Your Turn`;
  running=true;
}

function boxClick(){
  const index=this.dataset.index;
  if(options[index]!="" || !running){
    return;
  }
  updateBox(this,index);
  checkWinner();
}

function updateBox(box,index){
  options[index]=player;
  box.innerHTML=Playerimage;
}

function changePlayer(){
    player=(player=='X') ? "O" :"X";
    Playerimage=(Playerimage==x) ? o :x;
    statusTxt.textContent=`${player} Your Turn`;
}

function checkWinner(){
  let isWon=false;
  for(let i=0;i<win.length;i++){
    const condition=win[i]; //[0,1,2] index
    const box1=options[condition[0]]; //'X' value
    const box2=options[condition[1]]; //'O' value
    const box3=options[condition[2]]; //'X' value
    if(box1=="" || box2=="" || box3==""){
      continue;
    }
    if(box1==box2 && box2==box3){
      isWon=true;
      boxs[condition[0]].classList.add('win');
      boxs[condition[1]].classList.add('win');
      boxs[condition[2]].classList.add('win');
    }
  }
  if(isWon){
    statusTxt.textContent=`${player} Won..!`;
    running=false;
  }else if(!options.includes("")){
    statusTxt.textContent=`Game Draw..!`;
    running=false;
  }else{
    changePlayer();
  }
}

function restartGame(){
  options=["","","","","","","","",""];
  choosePlayer();
  boxs.forEach(box=>{
      box.innerHTML="";
      box.classList.remove('win');
  });
}

choosePlayer();