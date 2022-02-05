var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var hit = 3;
var over =2;

function keyup(event) {
	var player = document.getElementById('player');
	
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	if(hit>0)	
	player.className = 'character stand ' + lastPressed;
}



function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	

	if (downPressed) {
		var newTop = positionTop+1;

		var element = document.elementFromPoint(player.offsetLeft, newTop+32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';	
		

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
		}
		
	}

	if (upPressed) {
		var newTop = positionTop-1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) 
			{
				player.style.top = newTop + 'px';	
			
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
		}
	
	}
	if (leftPressed) 
	{
		var newLeft = positionLeft-1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) 
			{
				player.style.left = newLeft + 'px';	
				player.className = 'character walk left';
			}
		
	}
	
	if (rightPressed) 
	{
		var newLeft = positionLeft+1;
		var element = document.elementFromPoint(newLeft+32, player.offsetTop);
		
		if (element.classList.contains('sky') == false) 
			{
				player.style.left = newLeft + 'px';		
				player.className = 'character walk right';
			}
			
	}

}


function keydown(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}

// Function commencing the game 
function startGame()
{
	
	this.style.display= 'none';

	//Interval to create bombs
	var createBomb = setInterval(function()
	{
		var body = document.getElementsByTagName('body')[0];
		var life = document.getElementsByTagName('li');
	
		// Creation of the div element for the bombs
		var element = document.createElement('div');
		element.className = 'bomb';
	
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;
	
		// Calculation of random numbers for the bomb creation and drop angles and speed
		var randomNumber = Math.ceil(Math.random()*windowWidth);
		var skyTop = ((4/5)*windowHeight) ;
		var randomExplosion = Math.ceil(Math.random()*(windowHeight - skyTop)+skyTop);
		var randomDrop = Math.floor(Math.random()*2) * (Math.round(Math.random()) ? 2:-2);
		var randomFall = Math.ceil(Math.random()*(4-1));
			
		element.style.left = randomNumber + 'px';
		body.appendChild(element);

		//Interval for each bomb created to drop towards grass
		var bombDrop =setInterval(function()
			{
				var upmovement = element.offsetTop;
				var newLeft = element.offsetLeft;
				var newDown = upmovement + randomFall;
				var angle = newLeft + randomDrop;
				var position = document.elementFromPoint(newLeft,newDown);
				
				element.style.top = newDown +"px";
				element.style.left = angle +'px';
				
				// If function to get bombs to explode randomly on the grass
				if(randomExplosion <= newDown)
					{
						setTimeout(function()
							{
								clearInterval(bombDrop);	
									
								element.className = 'explosion';
								upmovement = element.offsetTop;
								newLeft = element.offsetLeft;
								position = document.elementFromPoint(newLeft,newDown);
									
								var player = document.getElementById('player');
								var playerLeft = player.offsetLeft+16;
								var playerTop = player.offsetTop+32;
								var playerPosition = document.elementFromPoint(playerLeft,playerTop);
												
								// Explosion detection on the character	
								if(playerPosition.classList.contains('explosion')==true)
									{
										player.className = 'character hit down' ;
										hit--;
										
										if(hit ==2)
											life[0].style.opacity = '0' ;
											
										else if(hit==1)
											life[1].style.opacity = '0';
											
										else
											{
												player.className = 'character stand dead';
												life[2].style.opacity= '0';
												
												var start =  document.getElementsByClassName('start');
												start[0].style.display = 'block';
												start[0].firstChild.nodeValue = 'Play Again';
												
												if(over == 2)
													{
														var gameOver = document.createElement('p');
														var text = document.createTextNode('Game Over');
														gameOver.className = 'gameOver';
														gameOver.appendChild(text);
														over++
													}

												//Else to stop game once player dies stopping bomb creation and dropping
												clearInterval(timeout);
												clearInterval(createBomb);
												
												//Game over text and play again button displayed when character dies
												start[0].previousSibling.previousSibling.appendChild(gameOver);
												start[0].addEventListener('click',newGame);
											}
												
									}
								//Removal of the bomb once its exploded	
								setInterval(function()
									{
										element.parentNode.removeChild(element);
									},400)
					
							},0)
								
					} 
				
			},10);
			
	},1000);
	
		
}

// Function to refresh the page when play again button is clicked
function newGame()
	{
		window.location.reload();
	}	

	


function myLoadFunction() {
	
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);

	var start =  document.getElementsByClassName('start');
	start[0].addEventListener('click',startGame);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);