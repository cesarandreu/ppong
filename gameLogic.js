var gameVariables = {
    canvasWidth: 800,
    canvasHeight: 500,
    ballRadius: 10,
    paddleWidth: 30,
    paddleHeight: 100,
    ballVelocityModifier: 1.3,
    paddleAbsoluteVelocity: 60,
    initialBallX: 400,
    initialBallY: 250,
    canvasTop: 0,
    canvasBottom: 500,
    canvasLeft: 0,
    canvasRight: 800,
    borderOffset: 75
};

function GameObject() {
    this.positionX = gameVariables.borderOffset;
    this.positionY = gameVariables.canvasHeight/2;
    this.velocityX = 0;
    this.velocityY = 0;
};



var ball = new GameObject();
var paddle1 = new GameObject();
var paddle2 = new GameObject();

ball.positionX = gameVariables.initialBallX;
ball.positionY = gameVariables.initialBallY;
ball.velocityX = gameVariables.paddleAbsoluteVelocity * gameVariables.ballVelocityModifier;
ball.velocityY = gameVariables.paddleAbsoluteVelocity * gameVariables.ballVelocityModifier;
ball.radius = gameVariables.ballRadius;



ball.update = function(deltaTime) {
    this.positionX += (this.velocityX * deltaTime);
    this.positionY += -1 * (this.velocityY * deltaTime);

    this.top = this.positionY - this.radius;
    this.bottom = this.positionY + this.radius;
    this.left = this.positionX - this.radius;
    this.right = this.positionX + this.radius;

    //This is a canvas bound check
    //Top and bottom
    if(this.top < gameVariables.canvasTop){
        this.velocityY *= -1;
    }
    if(this.bottom > gameVariables.canvasBottom){
        this.velocityY *= -1;
    }

    
    //Left and right
    if(this.left < gameVariables.canvasLeft){
        this.positionX = gameVariables.canvasWidth / 2;
        this.positionY = gameVariables.canvasHeight / 2;

        if(Math.random() * 100 > 50){
            this.velocityX *= -1;
        }
        if(Math.random() * 100 > 50){
            this.velocityY *= -1;
        }

    }
    
    if(this.right > gameVariables.canvasRight){
        this.positionX = gameVariables.canvasWidth / 2;
        this.positionY = gameVariables.canvasHeight / 2;

        if(Math.random() * 100 > 50){
            this.velocityX *= -1;
        }
        if(Math.random() * 100 > 50){
            this.velocityY *= -1;
        }  
    }
    
    //Paddle collision 
    if(intersectRect( paddle1, this )){
        this.velocityX *= -1;
        this.positionX += 5;
    }
    if(intersectRect( paddle2, this)){
        this.velocityX *= -1;
        this.position -= 5;
    }
    
};

function intersectRect(r1, r2) {
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

var paddleUpdate = function(deltaTime) {
    switch(this.state) {
        case controlState_noKey:
            this.velocityY = 0;
            console.log('No key');
            break;
        case controlState_upKey:
            this.velocityY = gameVariables.paddleAbsoluteVelocity;
            console.log('Up key');
            break;
        case controlState_downKey:
            this.velocityY = -1 * gameVariables.paddleAbsoluteVelocity;
            console.log('Down key');
            break;
    }

    this.positionY += (-1 * (this.velocityY * deltaTime));

    if(this.positionY > (gameVariables.canvasBot - (gameVariables.paddleHeight/2))){
        this.positionY = gameVariables.canvasTop - (gameVariables.paddleHeight/2);
    }
    if(this.positionY < (gameVariables.canvasTop + (gameVariables.paddleHeight/2))){
        this.positionY = gameVariables.paddleHeight/2;
    }

    this.top = this.positionY - 50;
    this.bottom = this.positionY + 50;
    this.left = this.positionX - 15;
    this.right = this.positionY - 15;

};


paddle1.update = paddleUpdate;
paddle2.update = paddleUpdate;

//State values
var controlState_noKey = 0;
var controlState_upKey = 1;
var controlState_downKey = 2;

paddle1.state = controlState_noKey;
paddle2.state = controlState_noKey;

paddle1.playerID = 1;
paddle2.playerID = 2; 

var gameItems = new Array(paddle1, paddle2, ball);

function gameUpdate(deltaTime) {

    var size = gameItems.length;
    for (var i = 0; i < size; i++) {
        gameItems[i].update(deltaTime);
    }

};

function input(controlState, pID){
    var currentPaddle;
    if(pID == 1){
        currentPaddle = paddle1;
    } else {
        currentPaddle = paddle2;
    }

    currentPaddle.state = controlState;

};

function gameStatus () {

    return {p1Y: paddle1.positionY, p2Y: paddle2.positionY, ballX: ball.positionX, ballY: ball.positionY};

};




exports.gameUpdate = gameUpdate;
exports.input = input;
exports.gameStatus = gameStatus;

