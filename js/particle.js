class Particle {
    x = 0;
    y = 0;
    height = 1.5;
    life = 320;
    color = "hsl(60, 100%, 50%)";
    firework = false;
    vect;
    vect2;

    constructor(x, y, color = 60, firework = false) {
        this.x = x;
        this.y = y;
        this.firework = firework;
        this.color = color;
        if (firework) this.height = 2;
    }

    update = function () {
        // if(this.firework || this.life > 190)this.addvel();
        this.checkcol();
        this.life -= 2;
        if (!this.firework) this.life -= 3;
        this.draw();

    }
    setVect(vect) {
        this.vect = vect;
    }
    addvel = function () {
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

    done = function () {
        if (this.life > 0) return false;
        return true;
    }
    getColor = function (value) {
        if (this.firework) return "hsl(" + value + ", 100%, 50%, " + Math.abs(this.vect.forceY / 2) + ")";
        return "hsl(" + value + ", 100%, 50%, " + this.life / 100 + ")";
    }
    draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.height, 0, 2 * Math.PI);
        ctx.lineWidth = 0;
        ctx.closePath();
        ctx.fillStyle = this.getColor(this.color);
        ctx.fill();
    }
    checkcol = function () {
        let ox = this.x;
        let oy = this.y;
        let hit = false;

        this.addvel();
        this.addGrav();

        // switch (true) {
        //     case (this.x > width):
        //         this.x = width;
        //         this.vect.forceX *= -0.6;
        //         hit = true;
        //         break;
        //     case (this.x < 0):
        //         this.x = 0;
        //         this.vect.forceX *= -0.6;
        //         hit = true;
        //         break;
        //     case (this.y > height + 10):
        //         this.y = height + 10;
        //         this.vect.forceY *= -0.6;
        //         hit = true;
        //         break;
        //     case (this.y < 0):
        //         this.y = 0;
        //         this.vect.forceY *= -0.6;
        //         hit = true;
        //         break;
        //     default:
        //         for (let i = 0; i < blocks.length; i++) {
        //             let b = blocks[i];
        //             let br = b.w < b.h ? b.h / 2 + 2 : b.w / 2 + 2;
        //             if (!(this.x > b.x - br && this.x < b.x + br && this.y > b.y - br && this.y < b.y + br)) {
        //                 continue;
        //             };
        //             let p = null;
        //             switch (true) {
        //                 case (this.intersects(b.t, ox, oy, this.x, this.y)):
        //                     p = this.getPoint(b.t, ox, oy, this.x, this.y);
        //                     // this.vect.forceY *= -0.6;
        //                     this.vect.setAngle(this.calcAngle(b.t.a, this.vect.angle), this.vect.velocity *= .6);
        //                     // this.y = b.t.y1 - 1;
        //                     this.y = p.y;
        //                     this.x = p.x;
        //                     hit = true;
        //                     break;
        //                 case (this.intersects(b.b, ox, oy, this.x, this.y)):
        //                     p = this.getPoint(b.b, ox, oy, this.x, this.y);
        //                     // this.vect.forceY *= -0.6;
        //                     this.vect.setAngle(this.calcAngle(b.b.a, this.vect.angle), this.vect.velocity *= .6);
        //                     // this.y = b.b.y1 + 1;
        //                     this.y = p.y;
        //                     this.x = p.x;
        //                     hit = true;
        //                     break;
        //                 case (this.intersects(b.l, ox, oy, this.x, this.y)):
        //                     p = this.getPoint(b.l, ox, oy, this.x, this.y);
        //                     // this.vect.forceX *= -0.6;
        //                     this.vect.setAngle(this.calcAngle(b.l.a, this.vect.angle), this.vect.velocity *= .6);
        //                     // this.x = b.l.x1 - 1;
        //                     this.y = p.y;
        //                     this.x = p.x;
        //                     hit = true;
        //                     break;
        //                 case (this.intersects(b.r, ox, oy, this.x, this.y)):
        //                     p = this.getPoint(b.r, ox, oy, this.x, this.y);
        //                     // this.vect.forceX *= -0.6;
        //                     this.vect.setAngle(this.calcAngle(b.r.a, this.vect.angle), this.vect.velocity *= .6);
        //                     // this.x = b.r.x1 + 1;
        //                     this.y = p.y;
        //                     this.x = p.x;
        //                     hit = true;
        //                     break;
        //                 default:
        //                     hit = false;
        //             }
        //             if (hit) {
        //                 b.hit();
        //                 blocks.splice(i, 1);
        //                 break;
        //             };
        //         }
        //         break;
        // }
        // if (hit) {
        //     this.vect.calcAngle();
        //     this.addvel();
        // }
    }

    intersects = function (side, p, q, r, s) {
        let a = side.x1;
        let b = side.y1;
        let c = side.x2;
        let d = side.y2;
        var det, gamma, lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
            // return {x: 0,y: 0, i:false};
            // return null;
            return false;
        } else {
            lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
            // lambda = ((s - q) * (r - a) + (p - r) * (s - b));
            // gamma = ((b - d) * (r - a) + (c - a) * (s - b)) ;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
            let u2x = p - p; // (x3 - x4)
            let u3x = a - c; // (x1 - x2)
            let u2y = q - s; // (y3 - y4)
            let u3y = b - d; // (y1 - y2)
            var px = (lambda * u2x - u3x * gamma) / d;
            var py = (lambda * u2y - u3y * gamma) / d;
            // console.log(px);
            return { x: px, y: py, i: true };
        }
    };
    getPoint = function (side, p, q, r, s) {
        let a = side.x1;
        let b = side.y1;
        let c = side.x2;
        let d = side.y2;
        var det, gamma, lambda;
        det = (a - c) * (q - s) - (b - d) * (p - r);
        if (det === 0) {
            // return {x: 0,y: 0, i:false};
            return null;
            // return false;
        } else {
            // lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
            // gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;            
            lambda = (a * d - b * c);
            gamma = (p * s - q * r);
            // return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
            let u2x = p - r; // (x3 - x4)
            let u3x = a - c; // (x1 - x2)
            let u2y = q - s; // (y3 - y4)
            let u3y = b - d; // (y1 - y2)
            var px = (lambda * u2x - u3x * gamma) / det;
            var py = (lambda * u2y - u3y * gamma) / det;
            return { x: px, y: py };
        }
    }
    calcAngle = function (angle, iangle) {
        let diff = iangle - angle;
        return angle - diff;
    }
}

/*
 switch (true) {
                            case (this.vect.angle >= 225 && this.vect.angle < 315):
                                this.vect.forceY *= -0.6;
                                this.y = b.y + b.h + 1;
                                break;
                            case (this.vect.angle >= 45 && this.vect.angle < 135):
                                this.vect.forceY *= -0.6;
                                this.y = b.y - 1;
                                break;
                            case (this.vect.angle >= 315 || this.vect.angle < 45):
                                this.vect.forceX *= -0.6;
                                this.x = b.x - 1;
                                break;
                            case (this.vect.angle >= 135 && this.vect.angle < 225):
                                this.vect.forceX *= -0.6;
                                this.x = b.x + b.h + 1;
                                break;
                            default:
                                this.vect.forceX *= -0.3;
                                this.vect.forceY *= -0.3;
                                break;

                        }
                        */