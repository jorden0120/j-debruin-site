class Firework {
    p;
    particles = [];
    exploded = false;
    constructor(x, y1) {
        let y = document.body.clientHeight;
        if(y1) y = y1; 
        this.p = new Particle(x, y, 60, true);
    }

    update = function () {
        if (this.exploded) {
            for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].update();
                if (this.particles[i].done()) {
                    this.particles.splice(i, 1);
                }
            }
            if (this.particles.length <= 0) {

            }
        } else {
            this.done();
            if (!this.exploded) {
                this.p.update();
            }
        }

    }
    done = function () {
        if (this.p.vect.forceY >= 0) {
            this.exploded = true;
            this.addParticles();
        } else {
            this.exploded = false;
        }

    }
    addParticles = function () {
        let x = this.p.x;
        let y = this.p.y;
        let degrees = 0;
        let r = Math.floor(Math.random() * 15) + 60;
        let color = Math.floor(Math.random() * 360);
        let particle;

        // for (let i = 0; i < 50; i++) {
        //     r = Math.floor(Math.random() * 1.5) + r;
        //     degrees = Math.floor(Math.random() * 360);
        //     // x = this.p.x + (r * Math.cos(degrees * Math.PI / 180))
        //     // y = this.p.y + (r * Math.sin(degrees * Math.PI / 180))
        //     particle = new Particle(x, y, degrees);
        //     particle.setVect(new Vector(degrees, r / 100));
        //     this.particles.push(particle);
        // }

        for (let i = 0; i < 30; i++) {
            degrees = Math.floor(Math.random() * 360);
            let t = Math.abs(degrees % 72 - 36);
            particle = new Particle(x, y, degrees);
            particle.setVect(new Vector(degrees + 20, (r - t) / 95));
            this.particles.push(particle);
        }

        r = r + Math.floor(Math.random() * 10) + 5;
        color = Math.floor(Math.random() * 360);

        for (let i = 0; i < 50; i++) {
            r = Math.floor(Math.random() * 1.5) + r;
            degrees = Math.floor(Math.random() * 360);
            particle = new Particle(x, y, color);
            particle.setVect(new Vector(degrees, r / 95));
            this.particles.push(particle);
        }
    }
}