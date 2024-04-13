import Vector from "./2dvector.js";
import Particle from "./particle.js";

export default class Firework {
    p;
    particles = [];
    exploded = false;
    constructor(x, y1) {
        let y = document.body.clientHeight;
        if (y1) y = y1;
        this.p = new Particle(x, y, 60, true);
    }

    update() {
        if (this.exploded) {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].update();
                if (this.particles[i].done()) {
                    this.particles.splice(i, 1);
                }
            }
        } else {
            this.checkDone();
            if (!this.exploded) {
                this.p.update();
            }
        }

    }

    draw(ctx) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].draw(ctx);
            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }

        if (!this.exploded) this.p.draw(ctx);
    }

    checkDone() {
        if (this.p.vect.forceY >= 0) {
            this.exploded = true;
            this.explode();
        } else {
            this.exploded = false;
        }

    }

    explode() {
        let x = this.p.x;
        let y = this.p.y;
        let degrees = 0;
        let baseRadius = Math.floor(Math.random() * 25) + 30;
        let color = Math.floor(Math.random() * 360);
        let particle;

        for (let i = 0; i < 50; i++) {
            let radius = baseRadius + Math.floor(Math.random() * 1.5);
            degrees = Math.floor(Math.random() * 360);
            particle = new Particle(x, y, degrees);
            particle.setVect(new Vector(degrees, (radius / 100) * -1));
            this.particles.push(particle);
        }

        baseRadius += Math.floor(Math.random() * -10) - 5;
        color = Math.floor(Math.random() * 360);

        for (let i = 0; i < 50; i++) {
            let radius = baseRadius + Math.floor(Math.random() * 1.5);
            degrees = Math.floor(Math.random() * 360);
            particle = new Particle(x, y, color);
            particle.setVect(new Vector(degrees, (radius / 95) * -1));
            this.particles.push(particle);
        }
    }
}