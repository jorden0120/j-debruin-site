import Vector from "./2dvector.js";
import StarFirework from "./fireworkTypes/StarFirework.js";
import Firework from "./firework.js";

let height = document.body.clientHeight;
let width = document.body.clientWidth;
let stop = true;
let runInterval;
const c = document.getElementById("background");
const ctx = c.getContext("2d");
const fireworks = [];
globalThis.chance = 0.02;

ctx.canvas.width = width;
ctx.canvas.height = height;

globalThis.start = function () {
    stop = false;
    draw();
    runInterval = setInterval(run, 15);
}

globalThis.stop = function () {
    if(stop) return;

    stop = true;
    fireworks.splice(0, fireworks.length);
    clearInterval(runInterval);
    setTimeout(() => { ctx.clearRect(0, 0, c.width, c.height); }, 5);
}

function draw() {
    // ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "rgb(0, 0, 51, .2)";
    ctx.fillRect(0, 0, c.width, c.height);

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].draw(ctx);
    }

    if (!stop) window.requestAnimationFrame(draw)
}

function run() {
    if (Math.random() < chance) {
        const vel = Math.floor(Math.random() * 2) * -1 - 4.5;
        const angle = Math.floor(Math.random() * 60) + 60;
        let firework;

        if (Math.random() < .5) {
            firework = new StarFirework(document.body.clientWidth / 2);

        } else {
            firework = new Firework(document.body.clientWidth / 2);
        }

        firework.p.setVect(new Vector(angle, vel / 2));
        fireworks.push(firework);
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        if (fireworks[i].exploded && fireworks[i].particles.length === 0) {
            fireworks.splice(i, 1);
        }
    }
}

window.addEventListener('resize', function () {
    height = document.body.clientHeight;
    width = document.body.clientWidth;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
});

start();