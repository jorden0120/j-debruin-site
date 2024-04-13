import Firework from "../firework.js";
import Vector from "../2dvector.js";
import Particle from "../particle.js";

export default class StarFirework extends Firework {
    explode = function () {
        let x = this.p.x;
        let y = this.p.y;
        let degrees = 0;
        let baseRadius = Math.floor(Math.random() * 10) + 50;
        let color = Math.floor(Math.random() * 360);
        let particle;

        for (let i = 0; i < 80; i++) {
            degrees = Math.floor(Math.random() * 360);
            let radiusOffset = Math.abs(degrees % 72 - 36);
            let radius = baseRadius - radiusOffset;

            particle = new Particle(x, y, color);
            particle.setVect(new Vector(degrees + 20, radius / 95));
            this.particles.push(particle);
        }
    }
}