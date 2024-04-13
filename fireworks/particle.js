export default class Particle {
    x = 0;
    y = 0;
    height = 1.5;
    life = 150;
    color = "hsl(60, 100%, 50%)";
    firework = false;
    vect;

    constructor(x, y, color = 60, firework = false) {
        this.x = x;
        this.y = y;
        this.firework = firework;
        this.color = color;

        if (firework) {
            this.height = 2;
            this.life = 100;
        }
    }

    update() {
        this.addGrav();
        this.addVel();

        this.life -= 1;
    }

    setVect(vect) {
        this.vect = vect;
    }

    addVel() {
        this.x = this.vect.updateX(this.x);
        this.y = this.vect.updateY(this.y);
    }

    addGrav = function () {
        if (this.firework) {
            this.vect.addForceY(.12);
        } else {
            this.vect.addForceY(.08);
        }
    }

    done() {
        if (this.life > 0) return false;
        return true;
    }

    getColor = function (value) {
        if (this.firework) return "hsl(" + value + ", 100%, 50%, " + Math.abs(this.vect.forceY / 2) + ")";
        return "hsl(" + value + ", 100%, 50%, " + this.life / 100 + ")";
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI);
        ctx.lineWidth = 0;
        ctx.closePath();
        ctx.fillStyle = this.getColor(this.color);
        ctx.fill();
    }
}