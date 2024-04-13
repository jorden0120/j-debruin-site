var height = document.body.clientHeight;
var width = document.body.clientWidth;
var startx = 300;
var starty = 300;
var size = 9;
// for (let i = 1; i <= 130; i++) {
//     // let s = Math.abs(i % 20 - i % 10);
//     let s = 0;
//     for (let j = s; j <= 80; j++) {
//         let x = startx + i * size;
//         let y = starty + j * size;
//         blocks.push(new Block(x, y, size + 4, size + 4, 'red'));
//     }
// }
// var c2 = document.getElementById("fireworks2");
// var ctx2 = c2.getContext("2d");
// ctx2.canvas.width = width;
// ctx2.canvas.height = height;
// for (let i = blocks.length - 1; i >= 0; i--) {
//     let b = blocks[i];
//     blocks[i].draw2();

// }

// blocks.push(new Block(width / 2, height / 2, 100, 400, 'red', 70));
// blocks.push(new Block(width / 2 - 90, height / 2, 100, 100, 'red', 0));
// blocks.push(new Block(width / 2, height / 2 - 300, 100, 100, 'red'));
// blocks.push(new Block(width / 2 - 300, height / 2 - 300, 100, 300, 'red'));
// blocks.push(new Block(width / 2 - 360, height / 2 - 300, 50, 300, 'red', 10));

var mouseClicks = { x1: 0, y1: 0, x2: 0, y2: 0 };
var c = document.getElementById("background");
var ctx = c.getContext("2d");
ctx.canvas.width = width;
ctx.canvas.height = height;
var chance = 0.02;
ctx.fillStyle = "rgb(0, 0, 51, .4)";
ctx.fillRect(0, 0, c.width, c.height);
var fireworks = [];
function draw() {
    // ctx.fillStyle = "rgb(0, 0, 51, 1)";
    ctx.fillStyle = "rgb(0, 0, 51, .4)";
    ctx.fillRect(0, 0, c.width, c.height);
    // ctx.clearRect(0, 0, c.width, c.height);
    if (Math.random() < chance) {
        let vel = Math.floor(Math.random() * 2) * -1 - 4.5;
        let angle = Math.floor(Math.random() * 60) + 60;
        let firework = new Firework(document.body.clientWidth / 2);
        firework.p.setVect(new Vector(angle, vel / 2));
        fireworks.push(firework);
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        if (fireworks[i].exploded && fireworks[i].particles.length === 0) {
            fireworks.splice(i, 1);
        }
    }

    window.requestAnimationFrame(draw)
}
draw();
// document.getElementById("fire").addEventListener("change", function (e) { chance = e.currentTarget.value; })
// // document.getElementById('fireworks').addEventListener('click', function (e) {
// //     let vel = Math.floor(Math.random() * 2) * -1 - 4;
// //     let angle = Math.floor(Math.random() * 40) + 70;
// //     let firework = new Firework(document.body.clientWidth / 2);
// //     firework.p.setVect(new Vector(angle, vel / 2));
// //     fireworks.push(firework);
// // });
// document.getElementById('fireworks2').addEventListener('mousedown', function (e) {
//     mouseClicks.x1 = e.x;
//     mouseClicks.y1 = e.y;
// });
// document.getElementById('fireworks2').addEventListener('mouseup', function (e) {
//     mouseClicks.x2 = e.x;
//     mouseClicks.y2 = e.y;
//     let dx = mouseClicks.x1 - mouseClicks.x2;
//     let dy = mouseClicks.y1 - mouseClicks.y2;
//     let angle = Math.atan2(dy, dx); // range (-PI, PI]
//     angle *= 180 / Math.PI; // rads to degs, range (-180, 180]
//     if (angle < 0) angle = 360 + angle; // range [0, 360)
//     let vel = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

//     let firework = new Firework(mouseClicks.x2, mouseClicks.y2);
//     firework.p.setVect(new Vector(angle, vel / 100));
//     fireworks.push(firework);
// });
window.addEventListener('resize', function () {
    var height = document.body.clientHeight;
    var width = document.body.clientWidth;
    // ctx2.canvas.width = width;
    // ctx2.canvas.height = height;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
});