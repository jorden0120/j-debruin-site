export default class Vector {
    angle = 0;
    velocity = 0;
    forceX = 0;
    forceY = 0;
    maxVel = 50;

    constructor(angle, velocity) {
        this.angle = angle,
            this.velocity = velocity * 3;
        this.forceX = (this.velocity * Math.cos(this.angle * Math.PI / 180)) * 1.6;
        this.forceY = (this.velocity * Math.sin(this.angle * Math.PI / 180)) * 1.6;
    }

    updateX(x) {
        return x + (this.velocity * Math.cos(this.angle * Math.PI / 180))
    }

    updateY(y) {
        return y + (this.velocity * Math.sin(this.angle * Math.PI / 180))
    }

    calcAngle() {
        let angle = Math.atan2(this.forceY, this.forceX); // range (-PI, PI]
        angle *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (angle < 0) angle = 360 + angle; // range [0, 360)
        this.angle = angle;
        this.velocity = Math.sqrt(Math.pow(this.forceY, 2) + Math.pow(this.forceX, 2));
        if (this.velocity > this.maxVel) this.velocity = this.maxVel;
    }

    addForceX(x) {
        this.forceX += x;
        this.calcAngle();
    }

    addForceY(y) {
        this.forceY += y;
        this.calcAngle();
    }

    setForceX(x) {
        this.forceX = x;
        this.calcAngle();
    }

    setForceY(y) {
        this.forceY = y;
        this.calcAngle();
    }

    setMaxVel(max) {
        this.maxVel = max;
    }

    setVelocity(velocity) {
        this.velocity = velocity;
    }

    setAngle(angle, velocity) {
        this.angle = angle;
        this.velocity = velocity;
        this.forceX = (this.velocity * Math.cos(this.angle * Math.PI / 180)) * 1.6;
        this.forceY = (this.velocity * Math.sin(this.angle * Math.PI / 180)) * 1.6;
    }
}