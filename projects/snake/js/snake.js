var canvas = document.getElementById("snake");
var draw = canvas.getContext('2d');
var snake = {x: 5, y: 5, length: 0, bodies: [], direction: 'right'};
var started = false;
var WIDTH = 20;
var HEIGHT = 20;
var food = {x: 0, y: 0};
var speed = 300;
var GAME;
var score = 0;
document.querySelector('.start').addEventListener('click', start);
drawSquare(snake.x, snake.y, 'yellow');

function game(){
    snake.direction = snakeDirection;
    move(snake.direction);
    dead();
    snake.bodies.forEach(body => {
        if(body.update()) {
            snake.bodies.shift();
        }
    })
    drawSquare(snake.x, snake.y, 'yellow');
    eat();
}

function drawSquare(x, y, color) {
    draw.beginPath();
    draw.fillStyle = color;
    draw.fillRect(WIDTH * x, HEIGHT * y, WIDTH, HEIGHT);
    draw.fill();
}

function start() {
    if(started) return;
    document.querySelector('.gameOver').setAttribute('style', 'opacity: 0');
    clearInterval(GAME);
    started = true;
    snake = {x: 5, y: 5, length: 1, bodies: [], direction: 'right'};
    WIDTH = 20;
    HEIGHT = 20;
    food = {x: 0, y: 0};
    setScore(0);
    draw.clearRect(0,0,220,220);
    spawnFood();
    drawSquare(snake.x, snake.y, 'yellow');
    GAME = setInterval(game, speed);
}

function dead() {
    let snakeCords = snake.x.toString() + snake.y.toString();
    if(snake.bodies.find(x => x.getCord() === snakeCords)) {
        started = false;
        clearInterval(GAME);
        document.querySelector('.gameOver').setAttribute('style', 'opacity: 100');
    }
}

function spawnFood() {
    food.x = Math.floor(Math.random() * 11);
    food.y = Math.floor(Math.random() * 11);
    let foodCords = food.x.toString() + food.y.toString();
    if(snake.bodies.find(x => x.getCord() === foodCords)) {
        spawnFood();
        return
    }
    drawSquare(food.x, food.y, 'red');
}



function eat() {
    if(snake.x === food.x && snake.y === food.y){
        spawnFood();
        snake.length ++;
        setScore(score + 10);
    }
}

function move(direction){
    let x = snake.x;
    let y = snake.y;
    let x2 = snake.x;
    let y2 = snake.y;
    switch (direction) {
        case 'up':
            y -= 1;
            break;
        case 'down':
            y += 1;
            break;
        case 'left':
            x -= 1;
            break;
        case 'right':
            x += 1;
            break;
    }
    if(x < 0) x = 10;
    if(x > 10) x = 0;
    if(y < 0) y = 10;
    if(y > 10) y = 0;
    snake.x = x;
    snake.y = y;
    snake.bodies.push(new Body(snake.length,x2, y2));

}

function canvasMove(e) {
    let direction = snake.direction;
    if(e.keyCode == '38' && direction !== 'down') { direction = 'up' }
    if(e.keyCode == '40' && direction !== 'up') { direction = 'down' }
    if(e.keyCode == '37' && direction !== 'right') { direction = 'left' }
    if(e.keyCode == "39" && direction !== 'left') { direction = 'right' }
    // snake.direction = direction;
    setButton(direction);
    snakeDirection = direction;
}
function canvasMove2(keyCode) {
    let direction = snake.direction;
    if(keyCode == '38' && direction !== 'down') { direction = 'up' }
    if(keyCode == '40' && direction !== 'up') { direction = 'down' }
    if(keyCode == '37' && direction !== 'right') { direction = 'left' }
    if(keyCode == "39" && direction !== 'left') { direction = 'right' }
    setButton(direction);
    snakeDirection = direction;
}
function setButton(direction) {
    document.querySelectorAll('.controls > .input').forEach(button => {
       if(button.id === direction) {
           button.setAttribute('style', 'background-color: blue');
       }else {
           button.setAttribute('style', '');
       }
    });
}
document.onkeydown = canvasMove;

class Body {
    constructor(life, x, y) {
        this.life = life;
        this.x = x;
        this.y = y;
        if(life >= 0) {
            drawSquare(x, y, 'green');
        }
    }
    update = function () {
        if(this.life <= 0){
            draw.clearRect(this.x * WIDTH, this.y * HEIGHT, WIDTH, HEIGHT);
            return true;
        }
        this.life --;
        return false;
    }
    getCord = function () {
        return this.x.toString() + this.y.toString();
    }
}

var snakeDirection = 'right';
document.querySelectorAll('.controls > .input').forEach(input => {
    input.addEventListener('click', function (e) {
        let direction = e.target.id;
        switch (direction){
            case 'up':
                canvasMove2('38')
                break;
            case 'down':
                canvasMove2('40')
                break;
            case 'left':
                canvasMove2('37')
                break;
            case 'right':
                canvasMove2('39')
                break;
        }
    })
});

function setScore(value) {
    score = value;
    document.getElementById('score').innerText = score.toString();
}