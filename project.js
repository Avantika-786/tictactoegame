const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;
const winningPosition =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

//lets create function to intialize 
function init(){
  currentPlayer="X";
  gameGrid=["","","","","","","","",""];
  //UI pe empty karna hai
  boxes.forEach((box,index) =>{
    box.innerText="";
    boxes[index].style.pointerEvents="all";
    //initializes boxes with 
    box.classList = `box box${index+1}`;

  }
  )
  newGameBtn.classList.remove("active");
  gameinfo.innerText = `Current Player - ${currentPlayer}`;
}
init();
function swapTurn(){
  if(currentPlayer==="X")
  {
    currentPlayer="O";
  }
  else{
    currentPlayer="X";
  }
  gameinfo.innerText=`Current Player - ${currentPlayer}`;

}
function checkGameOver()
{
  // newGameBtn.classList.add("active");
  let answer="";

  winningPosition.forEach((position)=>{

    if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && ( 
    gameGrid[position[0]]===gameGrid[position[1]]) && (
    gameGrid[position[2]]===gameGrid[position[1]]) )
    {
        if(gameGrid[position[0]]==="X")
        answer="X";
        else
        answer="O"
        //disable all pointers
        boxes.forEach((box)=>{
          box.style.pointerEvents = "none";
        })

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

    }
  });
  if(answer!=="")
  {
      gameinfo.innerText=`Winner - ${answer}`;
      newGameBtn.classList.add('active');
      return;
  }
  //when there is no winner
  let emptyCounts=0;
  gameGrid.forEach((box)=>{
    if(box!=="")
    emptyCounts++;
  }
  );
  if(emptyCounts===9)
  {
    gameinfo.innerText="Game Tie !";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index){
  if(gameGrid[index]==="")
  {
    boxes[index].innerText = currentPlayer;
    gameGrid[index]= currentPlayer;
    boxes[index].style.pointerEvents='none';
    //swap turns
    swapTurn();
    //check game over
    checkGameOver();
  }
}
boxes.forEach((box,index) => {
  box.addEventListener('click',()=>{
    handleClick(index);
  })
});

newGameBtn.addEventListener('click',init);


