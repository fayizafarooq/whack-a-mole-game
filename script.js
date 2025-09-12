let highScore = localStorage.getItem("highScore") || 0;

const holes=document.querySelectorAll(".hole"); const scoreBoard=document.getElementById("score"); const start=document.getElementById("start"); const timer=document.getElementById("timer"); const sound = document.getElementById("whackSound");
let lastHole; 
let timesUp=false; 
let score=0; 
let countDown;
let gameRunning = false;


function randomHole(){ 
  const random=Math.floor(Math.random()* holes.length); 
  const hole=holes[random];
  if (hole===lastHole) { 
    return randomHole() } 
  lastHole=hole; 
  return hole; 
}
function startGame() { 
  if (gameRunning) return; 
  gameRunning = true;

  score = 0; 
  scoreBoard.textContent = `Score: ${score} | High Score: ${highScore}`; 
  timesUp = false;

  let timeLeft = 15; 
  timer.textContent = `Time: ${timeLeft} `;
  clearInterval(countDown);

  countDown = setInterval(() => {
    timeLeft--; 
    timer.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) { 
      clearInterval(countDown);
      timesUp = true;
      gameRunning = false;
      
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);}
      timer.textContent = `Times Up!`;
      scoreBoard.textContent = `Score: ${score} | High Score: ${highScore}`;
    } 
  }, 1000);
  peep(); 
}

function peep(){ 
  const hole=randomHole(); 
  hole.classList.add("mole") 
  const time=Math.random() * 500 + 300; 
  setTimeout( ()=>{ 
    hole.classList.remove("mole"); 
    if(!timesUp) peep(); 
  },time) 
} 

function whack(e){ 
  if (!e.target.classList.contains("mole")) return
  sound.currentTime = 0; 
  sound.play();
  score++; 
  scoreBoard.textContent = `Score: ${score}`; 
  e.target.classList.remove("mole");
}
holes.forEach(hole => { 
  hole.addEventListener("click",whack) 
}) 
start.addEventListener("click",startGame)

