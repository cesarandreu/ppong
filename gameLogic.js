function GameObject() {
    this.positionX = 0;
    this.positionY = 0;
    this.velocityX = 0;
    this.velocityY = 0;
};


var ball = new GameObject();
var paddle1 = new GameObject();
var paddle2 = new GameObject();

ball.update = function(deltaTime) {
  
};

var paddleUpdate = function(deltaTime) {
    switch(this.state) {
        case controlState_noKey:
            this.velocity = 0;
            break;
        case controlState_upKey:
            this.velocityY = 1;
            break;
        case controlState_downKey:
            this.velocityY = -1;
            break;
    }

    this.positionY += -1 * (this.velocityY * deltaTime);

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

var gameItems = new Array(ball, paddle1, paddle2);

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

    return paddle1;

};

exports.gameUpdate = gameUpdate;
exports.input = input;
exports.gameStatus = gameStatus;

