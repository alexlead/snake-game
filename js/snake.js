

// ------- prepare table for snake   ----------
var workTable;
var workTableSize = {x: 20, y: 20};
workTable = "<div class='gameBody'><div class='tabs placeButtons'><table>";
    for(var i=0; i<workTableSize.x; i++){
    'use strict';
        workTable +="<tr>";
            for (var j=0; j<workTableSize.y; j++){
                workTable +="<td id='";
                workTable = workTable+ "x"+j+"y"+i;
                workTable +="'></td>";
            }
        workTable +="</tr>";
    }
workTable +="</table></div><div class='buts placeButtons'><button id='newGameButton' onclick='newGame();'>New Game</button><button id='startButton' onclick='startGame();'>START</button></div></div>";

document.getElementById('workarea').innerHTML = workTable;

/*========= 
  Class function snake blocks
  @param int x, y
  @functions draw, remove
=======*/
function snakePosition(x, y){ 
    this.x = x;
    this.y = y;
    this.elem = "x"+this.x+"y"+this.y;
    this.drawSnake = function(){
        document.getElementById(this.elem).classList.add('snake');
        }; 
    this.drawSnake();
    this.removeSnake = function(){
        document.getElementById(this.elem).classList.remove('snake');
        };
    this.finishHead = function(){
        document.getElementById(this.elem).classList.add('snakeFinal');
    }
    this.finishHeadRemove = function(){
        document.getElementById(this.elem).classList.remove('snakeFinal');
    }
};
    
/*========= 
  Change way of snake
  @todo change step
=======*/
function changeWay(){
    if ((moveStep.x==0) && !(changeWayEvent.x==0)){
        moveStep.x = changeWayEvent.x;
        moveStep.y = 0;
        return true;
    }
    if ((moveStep.y==0)&&!(changeWayEvent.y==0)){
        moveStep.y = changeWayEvent.y;
        moveStep.x = 0;
        return true;
    }
};

/*========= 
  Finish game
  @todo stop Interval, paint head
=======*/
function finishGame(){
    clearInterval(timerId);
    snake[snake.length-1].finishHead();
    document.getElementById('newGameButton').removeAttribute('disabled');
};

/*========= 
  Moving snake
  @todo moving snake stepByStep, checking if there is any mistake
=======*/
function nextStep(){
    
    changeWay();
    
    if((snake[snake.length-1].x+moveStep.x > (workTableSize.x - 1))||(snake[snake.length-1].x+moveStep.x < 0)||snake[snake.length-1].y+moveStep.y > (workTableSize.y-1)||(snake[snake.length-1].y+moveStep.y < 0)){
        finishGame();
        return false;
    }
    var elem = "x"+(snake[snake.length-1].x+moveStep.x)+"y"+(snake[snake.length-1].y+moveStep.y);
  
    if(document.getElementById(elem).classList.contains('snake')){
        finishGame();
        return false;
    }

    snake[snake.length] = new snakePosition(snake[snake.length-1].x+moveStep.x, snake[snake.length-1].y+moveStep.y);
    
    if (snake[snake.length-1].elem == apple.elem){
        apple.removeApple();
            do{
                apple.generateApple();
            } while(apple.checkApple())
        apple.drawApple();
     return false;   
    }
    snake[0].removeSnake();
    snake.shift();
};

/*========= 
  Class function apple blocks
  @param int x, y
  @function draw, remove, checkPlace
  @todo random place
=======*/
function randomApple(x, y){
    this.x = x;
    this.y = y;
    this.elem = "x"+this.x+"y"+this.y;
    this.drawApple = function(){
      document.getElementById(this.elem).classList.add('apple');  
    };
    this.drawApple();
    this.generateApple = function(){
        this.x = parseInt(Math.random()*(workTableSize.x-1));
        this.y = parseInt(Math.random()*(workTableSize.y-1));
        this.elem = "x"+this.x+"y"+this.y;        
    };
    this.checkApple = function(){
        if(document.getElementById(this.elem).classList.contains('snake')){
            return true;
        }
        return false;
    };
    this.removeApple = function(){
      document.getElementById(this.elem).classList.remove('apple');  
    };
};

/*========= 
  Class function apple blocks
  @param int 
  @function draw, remove, checkPlace
  @todo random place
=======*/
document.addEventListener("keydown" ,function (e){
    
switch(e.keyCode){
    case 40: 
        changeWayEvent.y = 1;
        changeWayEvent.x = 0;
        break;
    case 38: 
        changeWayEvent.y = -1;
        changeWayEvent.x = 0;
        
        break;
    case 39: 
        changeWayEvent.y = 0;
        changeWayEvent.x = 1;
        break;
    case 37: 
        changeWayEvent.y = 0;
        changeWayEvent.x = -1;
        break;
}  
});

function startGame(){
timerId = setInterval(nextStep, 200);
document.getElementById('startButton').setAttribute('disabled','disabled');
document.getElementById('newGameButton').setAttribute('disabled','disabled');
};

function newGame(){
    snake[snake.length-1].finishHeadRemove();
    while(snake.length){
        snake[snake.length-1].removeSnake();
        snake.pop();
    }
    apple.removeApple();
            do{
                apple.generateApple();
            } while(apple.checkApple())
        apple.drawApple();
    startPosition();
    document.getElementById('startButton').removeAttribute('disabled');
}

/*========= 
  Start positions 
=======*/
var moveStep;
var changeWayEvent;
var apple = new randomApple(8, 10);
var snake = new Array;
var timerId;

function startPosition(){
    snake[0]= new snakePosition(3, 3);
    snake[1]= new snakePosition(4, 3);
    snake[2]= new snakePosition(5, 3);
    moveStep = {x: 1, y: 0};
    changeWayEvent = {x: 0, y: 0};
};

startPosition();
