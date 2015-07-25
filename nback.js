var game = new Phaser.Game(600, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var gameWorld = [];
var randomTile = 0;
var timer = 0;
var randomColor = 0;
var frame = "";
var color = "";
var delay = 0;
var gameFrame = 0;
var nBack = 2;
var gameState = { color: "", position: 0 };
var Score = 0;
var scoreString = 'Your Score is ';
var rightOrWrong = "";
var scoreText;
var messageText;

function preload() {
    game.load.image('red0', 'red0.png');
    game.load.image('blue0', 'blue0.png');
    game.load.image('red1', 'red1.png');
    game.load.image('blue1', 'blue1.png');
    game.load.image('red2', 'red2.png');
    game.load.image('blue2', 'blue2.png');
    game.load.image('red3', 'red3.png');
    game.load.image('blue3', 'blue3.png');    
    game.load.image('red4', 'red4.png');
    game.load.image('blue4', 'blue4.png');
    game.load.image('red5', 'red5.png');
    game.load.image('blue5', 'blue5.png');
    game.load.image('red6', 'red6.png');
    game.load.image('blue6', 'blue6.png');
    game.load.image('red7', 'red7.png');
    game.load.image('blue7', 'blue7.png');
    game.load.image('red8', 'red8.png');
    game.load.image('blue8', 'blue8.png');    
    game.load.image('grid', 'grid.png');
    instructions();
}

function create() {
        matchPosition = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        matchColor = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        matchBoth = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        game.add.text(game.width-600, 605, '2-Back Training', {font: '18px Arial', fill: '#fff'});
        game.add.text(game.width-600, 625, 'Press 1 to match position, Press 2 to match color, Press 3 to Match both', {font: '18px Arial', fill: '#fff'});
        scoreText = game.add.text(game.width-600, 650, scoreString + Score, {font: '18px Arial', fill: '#fff'});
        messageText = game.add.text(game.width-600, 675, rightOrWrong, {font: '18px Arial', fill: '#fff'});
}

function update() {
    if (game.time.now > timer) {
        messageText.text = "";
        randomTile = game.rnd.integerInRange(0, 8);
        randomColor = game.rnd.integerInRange(0,1);
    
        if (randomColor == 0) {
            color = "red";
        } else {
            color = "blue";
        }
        frame = color + randomTile.toString();  
        game.add.tileSprite(0,0,600,600,frame);

        gameState.color = color;
        gameState.position = randomTile;

        gameWorld.push({color: gameState.color, position: gameState.position});
        
        timer = game.time.now + 2000;
        gameFrame += 1;

    } else if (game.time.now > timer - 100) {
            game.add.tileSprite(0,0,600,600,'grid');
    }
    matchPosition.onDown.add(checkMatchPosition, this); 
    matchColor.onDown.add(checkMatchColor, this);
    matchBoth.onDown.add(checkMatchBoth, this);
}
function instructions() {
    if (game.paused == false) {
            game.paused = true;
    }
    game.add.text(0,50, 'This is 2-back training. You are presented with a 3x3 grid. One by one, one of the squares\nwill light up either red or blue.\n', {font:'14px Arial', fill: '#fff'});
    game.add.text(0, 90, 'You have to remember 2 moves back. If the square on the current move is the same as\n 2 moves ago, press 1\n', {font: '14px Arial', fill: '#fff'}); 
    game.add.text(0,130, 'If the color is the same as 2 moves ago, press 2.\nIf both color and grid are the same, press 3', {font: '14px Arial', fill: '#fff'});
    game.add.text(0,170, 'To begin, it is easiest to focus on the color until you get the hang of it\n', {font: '14px Arial', fill: '#fff'});
    game.add.text(0,210, 'The game is paused. Click to begin\n', {font: '14px Arial', fill: '#fff'});
    game.input.onDown.add(unpause, self);
    function unpause(event) {
        if (game.paused) {
            game.paused = false;
        }   
    }
}
function checkMatchPosition() {
    if (gameFrame > nBack) {    
        if (gameWorld[gameFrame-1].position == gameWorld[gameFrame-nBack-1].position) {
            Score += 1;
            scoreText.text = scoreString + Score;
            messageText.text = "Correct!";
        } else {
            messageText.text = "Not a match!";
        }
    }
}
function checkMatchColor() {
    if (gameFrame > nBack) {    
        if (gameWorld[gameFrame-1].color == gameWorld[gameFrame-nBack-1].color) {
            Score += 1;
            scoreText.text = scoreString + Score;
            messageText.text = "Correct!";
        } else {
            messageText.text = "Not a match!";
        }        
    }
}
function checkMatchBoth() {
    if (gameFrame > nBack) {    
        if (gameWorld[gameFrame-1].position == gameWorld[gameFrame-nBack-1].position) {
            if (gameWorld[gameFrame-1].color == gameWorld[gameFrame-nBack-1].color) {
                Score += 1;
                scoreText.text = scoreString + Score;
                messageText.text = "Correct!";
            }            
        } else {
            messageText.text = "Not a match!";
        }
    }
}