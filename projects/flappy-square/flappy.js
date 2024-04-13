var canvas = document.getElementById("flappy");
var draw = canvas.getContext('2d');
var pipes = [];
var WIDTH = 16;
var gap = 3 * 16;
var pipeSpawnRate = 100;
var counter = 0;
var Player = {x: 30, y: 80, acceleration: 0.00}
var started = false;
var gameLoop;
var drawLoop;
var score = 0;

function createPipe() {
    counter = 0;
    let gapTop = Math.floor(Math.random() * 90 + 10);
    console.log(gapTop);
    pipes.push({bottom: gapTop, x: 160, counted: false})
}
function start() {
    if(started) return
    Player = {x: 30, y: 80, acceleration: 0.00}
    score = 0;
    started = true;
    drawLoop = setInterval(drawFrame, 10);
    gameLoop = setInterval(update, 50);
}

function drawFrame() {
    draw.clearRect(0, 0, 160, 160);
    draw.beginPath();
    draw.fillStyle = "green";
    pipes.forEach(pipe => {
        draw.fillRect(pipe.x - WIDTH / 2, 0, WIDTH, pipe.bottom);
        draw.fillRect(pipe.x - WIDTH / 2, pipe.bottom + gap, WIDTH, 160 - (pipe.bottom + gap));
    });
    draw.fill();
    draw.beginPath();
    draw.fillStyle = "yellow";
    draw.fillRect(Player.x - WIDTH / 2, Player.y - WIDTH / 2, WIDTH, WIDTH);
    draw.fill();
}
function update() {
    counter ++;
    if(counter >= pipeSpawnRate) createPipe();
    checkCollision();
    movePipe();
    checkMovement();
    document.querySelector('.game > h1 > strong').textContent = score;
}
function movePipe(){
    pipes.forEach(pipe => {
        if(pipe.x <= 0 - WIDTH) {
            pipes.shift();
        }
        pipe.x -= 1;
    })
}

function canvasMove(e) {
    if(e.keyCode.toString() === "32") jump();
}
document.onkeydown = canvasMove;
function jump() {
    Player.acceleration = -3;
}
function checkMovement() {
    if(Player.acceleration > 3) Player.acceleration = 3;
    if(Player.acceleration < -3) Player.acceleration = -3;
    Player.y += Player.acceleration;
    Player.acceleration += 0.20;
}
function checkCollision() {
    let playerx1 = Player.x + WIDTH / 2;
    let playerx2 = Player.x - WIDTH / 2;
    let playery1 = Player.y - WIDTH / 2;
    let playery2 = Player.y + WIDTH / 2;
    if(playery2 > 160) gameOver();
    if(playery1 < 0) gameOver();
    pipes.forEach(pipe => {
        let death = false;
        if(playerx1 < pipe.x - WIDTH / 2 ) return;
        if(playerx2 > pipe.x + WIDTH / 2 ) return;
        if(playery1 < pipe.bottom) death = true;
        if(playery2 > pipe.bottom + gap) death = true;
        if(death) gameOver();
        if(Player.x > pipe.x && !pipe.counted) {
            pipe.counted = true;
            score += 1;
        }
    });
}
function gameOver(){
    clearInterval(drawLoop);
    clearInterval(gameLoop);
    started = false;
    pipes = [];
    counter = 0;
}
document.getElementById('flappy').addEventListener('click', jump);
document.querySelector(".start").addEventListener('click', start);
