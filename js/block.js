class Block {
    x = 0;
    y = 0;
    w = 0;
    h = 0;
    a = 0;
    constructor(x, y, w, h, color, angle) {
        this.a = angle ? angle : 0;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.setsides();
        this.color = color;
    }

    draw = function () {
        ctx2.beginPath();
        ctx2.rect(this.t.x1, this.t.y1, this.t.x2 - this.t.x1, this.l.y2 - this.l.y1);
        // ctx2.lineWidth = 0;
        ctx2.closePath();
        ctx2.fillStyle = this.color;
        ctx2.fill();
    }
    hit = function () {
        ctx2.clearRect(this.t.x1, this.t.y1 - (this.l.y2 - this.l.y1), this.t.x2 - this.t.x1, this.l.y2 - this.l.y1);
    }
    draw2 = function () {
        // this.a += 1;
        // this.setsides();
        ctx2.beginPath();
        ctx2.moveTo(Math.floor(this.t.x1), Math.floor(this.t.y1));
        ctx2.lineTo(Math.floor(this.t.x2), Math.floor(this.t.y2));
        ctx2.lineTo(Math.floor(this.r.x2), Math.floor(this.r.y2));
        ctx2.lineTo(Math.floor(this.b.x2), Math.floor(this.b.y2));
        ctx2.lineTo(Math.floor(this.l.x2), Math.floor(this.l.y2));
        ctx2.lineWidth = 0;
        ctx2.closePath();
        ctx2.fillStyle = this.color;
        ctx2.fill();
        // ctx.stroke();
    }

    setsides = function () {
        this.getT();
        this.getR();
        this.getB();
        this.getL();
    }
    getT = function () {
        let angle = 0;
        angle = this.a + 225;
        let x1 = this.x + ((this.w / 2) * Math.cos(angle * Math.PI / 180));
        let y1 = this.y + ((this.h / 2) * Math.sin(angle * Math.PI / 180));
        angle = this.a + 315;
        let x2 = this.x + ((this.w / 2) * Math.cos(angle * Math.PI / 180));
        let y2 = this.y + ((this.h / 2) * Math.sin(angle * Math.PI / 180));
        let a = this.calcAngle({ x1: x1, y1: y1, x2: x2, y2: y2 });
        this.t = { x1: x1, y1: y1, x2: x2, y2: y2, a: a };
        // console.log('T');
        // console.log({ x1: x1, y1: y1, x2: x2, y2: y2, a: a });
    }
    getR = function () {
        let angle = 0;
        angle = this.a + 315;
        let x1 = this.x + ((this.w / 2) * Math.cos(angle * Math.PI / 180));
        let y1 = this.y + ((this.h / 2) * Math.sin(angle * Math.PI / 180));
        angle = this.a + 45;
        let x2 = this.x + ((this.w / 2) * Math.cos(angle * Math.PI / 180));
        let y2 = this.y + ((this.h / 2) * Math.sin(angle * Math.PI / 180));
        let a = this.calcAngle({ x1: x1, y1: y1, x2: x2, y2: y2 });
        this.r = { x1: x1, y1: y1, x2: x2, y2: y2, a: a };
        // console.log('R');
        // console.log({ x1: x1, y1: y1, x2: x2, y2: y2, a: a });
    }
    getB = function () {
        let angle = 0;
        angle = this.a + 45;
        let x1 = this.x + ((this.w / 2) * Math.cos(angle * Math.PI / 180));
        let y1 = this.y + ((this.h / 2) * Math.sin(angle * Math.PI / 180));
        angle = this.a + 135;
        let x2 = this.x + ((this.w / 2) * Math.cos(angle * Math.PI / 180));
        let y2 = this.y + ((this.h / 2) * Math.sin(angle * Math.PI / 180));
        let a = this.calcAngle({ x1: x1, y1: y1, x2: x2, y2: y2 });
        this.b = { x1: x1, y1: y1, x2: x2, y2: y2, a: a };
        // console.log('B');
        // console.log({ x1: x1, y1: y1, x2: x2, y2: y2, a: a });
    }
    getL = function () {
        let angle = 0;
        angle = this.a + 135;
        let x1 = this.x + ((this.w / 2) * Math.cos(angle * Math.PI / 180));
        let y1 = this.y + ((this.h / 2) * Math.sin(angle * Math.PI / 180));
        angle = this.a + 225;
        let x2 = this.x + ((this.w / 2) * Math.cos(angle * Math.PI / 180));
        let y2 = this.y + ((this.h / 2) * Math.sin(angle * Math.PI / 180));
        let a = this.calcAngle({ x1: x1, y1: y1, x2: x2, y2: y2 });
        this.l = { x1: x1, y1: y1, x2: x2, y2: y2, a: a };
        // console.log('L');
        // console.log({ x1: x1, y1: y1, x2: x2, y2: y2, a: a });
    }
    calcAngle = function (side) {
        let dx = side.x1 - side.x2;
        let dy = side.y1 - side.y2;
        let angle = Math.atan2(dy, dx); // range (-PI, PI]
        angle *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (angle < 0) angle = 360 + angle; // range [0, 360)
        return angle;
    }
}