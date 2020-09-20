let myCanvas = document.querySelector('#my_canvas');
let ctx = myCanvas.getContext("2d");
let btnMove = document.querySelector('#btn_move');

let w = 10, h = 50, step=17, ballStepX = 3, ballStepY=1;
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

ctx.textAlign = "center";
ctx.font = "18px Arial";
ctx.fillText(`${scoreLeft} : ${scoreRight}` , 240, 25);

//move sticks
document.onkeydown = function(e){
	e.key == "ArrowDown" ? moveStick(stick2, step): null;
	e.key == "ArrowUp" ? moveStick(stick2, -step): null;
	
	e.key == "s" ? moveStick(stick1, step):null;
	e.key == "w" ? moveStick(stick1, -step): null;
}

//move ball
setInterval(()=>{
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
			changeScoreRestartBall();
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

function changeScoreRestartBall(){
	ctx.fillRect(210, 0 , 60 , 30);
	ball.x > 260 ? scoreLeft ++ : scoreRight ++;

	ctx.fillStyle = "#fff";
	ctx.fillText(`${scoreLeft} : ${scoreRight}` , 240, 25);

	ball.x= 260;
	ball.y = 160;

	ballStepX = -ballStepX;
	ballStepY = 0;
}