class Bord {
    holes = [];

    constructor() {
        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 7; x++) {
                let x1 = s * x + s / 2;
                let y1 = s * y + s / 2 + s;
                this.holes.push({ x: x1, y: y1, s: s / 2.4 });
            }
        }
    }

    draw = function () {
        ctx2.beginPath();
        ctx2.rect(0, s / 2, width, height - s/ 2);
        ctx2.fillStyle = 'blue';
        ctx2.fill();
        ctx2.closePath();
        ctx2.stroke();
        for (let h in this.holes) {
            ctx2.beginPath();
            ctx2.globalCompositeOperation = 'destination-out'
            ctx2.lineWidth = 0;
            h = this.holes[h];
            ctx2.arc(h.x, h.y, h.s, 0, 360);
            ctx2.closePath();
            ctx2.stroke();
            // ctx2.fillStyle = 'rgba(0,0,0,0)';
            ctx2.fill();
        }
    }
}