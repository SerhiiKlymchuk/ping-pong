let myCanvas = document.querySelector('#my_canvas');
let container = document.querySelector('.container');
let ctx = myCanvas.getContext("2d");
let btnMove = document.querySelector('#btn_move');
let startBtn = document.querySelector("#start_btn");
let w = 10, h = 50, step=17, ballStepX = 4, ballStepY=0;
let scoreLeft = 0, scoreRight = 0;

let stick1 = {
	x: 10,
	y: 135, 
	c: '#f22a' 
}

let stick2 = {
	x: 460,
	y: 130, 
	c: '#faa2ff' 
}

let ball = {
	r:10,

	x: 240,
	y: 160,
	c: '#fff'
}

//Initial draw
ctx.fillStyle = stick1.c;
ctx.fillRect(stick1.x, stick1.y , w , h);

ctx.fillStyle = stick2.c;
ctx.fillRect(stick2.x, stick2.y , w , h);

ctx.fillStyle = ball.c;

ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
ctx.fill();



//move sticks
document.onkeydown = function(e){
	e.key == "ArrowDown" ? moveStick(stick2, step): null;
	e.key == "ArrowUp" ? moveStick(stick2, -step): null;
	
	e.key == "s" ? moveStick(stick1, step):null;
	e.key == "w" ? moveStick(stick1, -step): null;
}

startBtn.onclick = function(){
	let score = document.querySelector("#score");	
	setTimeout(()=>startGame(),800)

	this.parentElement.style.display  = 'none';
	score.style.filter = "none";
	myCanvas.style.filter = "none";
	
};

//move ball
function startGame(){
	let moveBall = setInterval(()=>{
		ctx.beginPath();
		ctx.fillStyle = '#2a2a2a';
		ctx.arc(ball.x, ball.y, ball.r+1, 0, Math.PI*2);
		ctx.fill();

		if(ball.x + 15 >= stick2.x || ball.x - 15 - w <= stick1.x ){
			if(ball.y >= stick2.y - ball.r && ball.y <= stick2.y + h + ball.r && ball.x > 260){
				changeBallDirection(stick2);
			}
			else if(ball.y >= stick1.y - ball.r && ball.y <= stick1.y + h + ball.r && ball.x < 260){
				changeBallDirection(stick1);
			}
			else{
				changeScoreRestartBall(moveBall);	
			}
		}

		if(ball.y - ball.r <=0 || ball.y + ball.r >= 320){
			ballStepY = -ballStepY;
		}

		ball.x += ballStepX;
		ball.y += ballStepY;

		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
		ctx.fillStyle = ball.c;
		ctx.fill();
	}, 13)
}

function moveStick(s, signStep){
	ctx.clearRect(s.x, s.y, w, h);
	
	s.y + h + step >= 320 ? s.y = 255 :
	s.y - step <= 0 ? s.y = step : null;
	s.y += signStep;	
	
	ctx.fillStyle = s.c;
	ctx.fillRect(s.x, s.y , w , h);
}

function changeBallDirection(s){
	ballStepX = -ballStepX;	

	if(ball.y >= s.y && ball.y <= s.y + h/3){
		ballStepY = ballStepY - 1;
	}
	if(ball.y >= s.y + h/3 && ball.y <= s.y + h){
		ballStepY = ballStepY + 1;
	}
}

function changeScoreRestartBall(interval){
	let cpuScore = document.querySelector(".cpu-score");
	let playerScore = document.querySelector(".player-score");

	ball.x > 260 ? scoreLeft ++ : scoreRight ++;
	cpuScore.innerText = scoreLeft;
	playerScore.innerText = scoreRight;

	clearInterval(interval);
	ball.x= myCanvas.offsetWidth / 2 - ball.r / 2;
	ball.y = myCanvas.offsetHeight / 2;	

	setTimeout(()=>{
		startGame()
	}, 2000)
	
	ballStepX = -ballStepX;
	ballStepY = 0;
}