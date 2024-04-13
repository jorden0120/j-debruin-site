var c = document.getElementById("discs");
var ctx = c.getContext("2d");
var c2 = document.getElementById("bord");
var ctx2 = c2.getContext("2d");
var width = 400;
var height = 400;
var s = Math.floor((width / 7));


ctx.canvas.width = width;
ctx.canvas.height = height;
ctx2.canvas.width = width;
ctx2.canvas.height = height;
ctx.beginPath();
ctx.fillStyle = "rgb(0, 0, 51)";
ctx.fillRect(0, 0, c.width, c.height);
ctx.closePath();
