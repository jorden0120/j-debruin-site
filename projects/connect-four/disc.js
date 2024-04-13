class Disc {
    cSize = 0;
    color = 'yellow';
    x = 0;
    y = s / 2;
    row = -1;
    rowIndex = -1;
    velY = 1;
    landed = false;
    constructor(x, r, c) {
        this.x = x;
        this.cSize = s / 2.4;
        this.row = r;
        this.color = c;
        this.rowIndex = rows[r].length;
        this.floor = this.getFloorY();
    }

    draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.cSize, 0, 360);
        ctx.closePath();
        ctx.fill();
    }
    update = function () {
        if (!this.landed) {
            this.velY *= 1.1;
            if (this.velY > 7) this.velY = 7;
            this.y += this.velY;
            if (this.y > this.floor) {
                this.landed = true;
                this.y = this.floor;
            }
        }
        this.draw();
    }
    getFloorY = function () {
        let f = rows[this.row][this.rowIndex - 1];
        if (f) {
            return f.floor - s;
        } else {
            return height - s / 2 - 1;
        }
    }
    clear = function() {
        this.floor = height + s;
        this.landed = false;
    }
}