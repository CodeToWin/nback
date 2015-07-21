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
}

function create() {
// blah
    matchPosition = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    matchColor = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    matchBoth = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    game.add.text(game.width-600, 625, 'Press 1 to match position, Press 2 to match color, Press 3 to Match both', {font: '18px Arial', fill: '#fff'});
    
}

function update() {
   

    if (game.time.now > timer) {

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

        gameWorld.push(gameState);
        
        if (gameFrame > nBack) {
            console.log('length is ' + gameWorld.length + ' current position is ' + gameWorld[gameFrame].position + ' position in zero index is ' + gameWorld[0].position);
        }

        timer = game.time.now + 1500;
        gameFrame += 1;
        

    } else if (game.time.now > timer - 100) {
            game.add.tileSprite(0,0,600,600,'grid');
            
    }
   
 //   matchPosition.onDown.add(checkMatchPosition, this); 
    
}

function checkMatchPosition() {
    if (gameFrame > nBack) {    
        /*
        if (gameWorld[gameFrame-1].position == gameWorld[gameFrame-nBack-1].position) {
            console.log( gameWorld[gameFrame-1].position + '   ' + gameWorld[gameFrame-nBack-1].position);
            //game.add.text(game.width -500, 700, 'Match Position', {font: '34px Arial', fill: '#fff'});
        } else {
            console.log('false');
        }
        */
    }
}