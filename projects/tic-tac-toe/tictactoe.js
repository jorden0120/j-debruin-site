var c = document.getElementById("ttt");
var ctx = c.getContext("2d");
var width = 400;
var height = 400;

ctx.canvas.width = width;
ctx.canvas.height = height;
ctx.beginPath();
ctx.fillStyle = "rgb(0, 0, 51)";
ctx.fillRect(0, 0, c.width, c.height);
ctx.closePath();

class Block {
    size = 0;
    state = -1;
    x = 0;
    y = 0;
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    draw = function () {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    drawO = function () {
        this.state = 0;
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 4;
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2 * .8, 0, 360)
        ctx.closePath();
        ctx.stroke();
    }
    drawX = function () {
        this.state = 1;
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 4;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.moveTo(this.x + this.size, this.y);
        ctx.lineTo(this.x, this.y + this.size);
        ctx.closePath();
        ctx.stroke();
    }
}
