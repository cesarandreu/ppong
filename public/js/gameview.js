$(document).ready(function() {

    //Socket connection
    var socket = io.connect('http://localhost');

    socket.on('sendDraw', function(data) {
        drawLoop(data);
    });

    //One part handles getting the game's values.
    //Another part handles drawing the game's values.

    //Canvas context
    var canvas = $('#game');
    var ctx = document.getElementById('game').getContext('2d');

    //Canvas sizes.
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();

    //Game variables
    var pHeight = 100;
    var pWidth = 30;
    var borderOffset = 75; 
    var ballRadius = 10;

    //Dummy object with the type of information I'll receive from the server.
    //var variableObject = {ballPositionX: 200, ballPositionY: 200, paddle1: 100, paddle2: 100, score1: 0, score2: 10};


    //Draws the game's frame
    function drawGameFrame(width, height){
        ctx.lineWidth = 20;  
        ctx.strokeStyle = "rgb(0, 0, 0)";  
        ctx.strokeRect(0, 0, width, height); 

    };

    function drawGamePaddles (gameVariables) {
        ctx.lineWidth = 1;  
        ctx.fillRect(borderOffset - (pWidth/2), (gameVariables.paddle1 - (pHeight/2)), pWidth, pHeight);
        ctx.fillRect((canvasWidth - borderOffset) - (pWidth/2) , (gameVariables.paddle2 - (pHeight/2)), pWidth, pHeight);

    };

    function drawGameBall (gameVariables) {
        ctx.lineWidth = 1;
        ctx.beginPath();  
        ctx.arc(gameVariables.ballPositionX, gameVariables.ballPositionY, ballRadius, 0, Math.PI*2, false);  
        ctx.closePath();  
        ctx.fill();

    }


    function drawLoop (gameVariables) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGameFrame(canvasWidth, canvasHeight);
        drawGamePaddles(gameVariables);  
        drawGameBall(gameVariables);    
    }

    


});