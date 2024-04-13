class Vector {
    angle = 0;
    velocity = 0;
    forceX = 0;
    forceY = 0;
    maxVel = 100;

    constructor(angle, velocity) {
        this.angle = angle,
        this.velocity = velocity * 3;
        this.forceX = (this.velocity * Math.cos(this.angle * Math.PI / 180)) * 1.6;
        this.forceY = (this.velocity * Math.sin(this.angle * Math.PI / 180)) * 1.6;
    }

    updateX = function (x) {
        return x + (this.velocity * Math.cos(this.angle * Math.PI / 180))
    }
    updateY = function (y) {
        return y + (this.velocity * Math.sin(this.angle * Math.PI / 180))
    }
    calcAngle = function () {
        let angle = Math.atan2(this.forceY, this.forceX); // range (-PI, PI]
        angle *= 180 / Math.PI; // rads to degs, range (-180, 180]
        if (angle < 0) angle = 360 + angle; // range [0, 360)
        this.angle = angle;
        this.velocity =  Math.sqrt(Math.pow(this.forceY, 2) + Math.pow(this.forceX, 2));
        if(this.velocity > this.maxVel) this.velocity = this.maxVel;
    }
    addForceX = function(x) {
        this.forceX += x;
        this.calcAngle();
    }
    addForceY = function(y) {
        this.forceY += y;
        this.calcAngle();
    }
    setmaxVel = function(max) {
        this.maxVel = max;
    }
    setAngle = function(angle, velocity) {
        this.angle = angle,
        this.velocity = velocity;
        this.forceX = (this.velocity * Math.cos(this.angle * Math.PI / 180)) * 1.6;
        this.forceY = (this.velocity * Math.sin(this.angle * Math.PI / 180)) * 1.6;
    }
}