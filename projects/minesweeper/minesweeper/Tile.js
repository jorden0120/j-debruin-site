export default class Tile {
    isBomb = false;
    isHidden = true;
    isflaged = false;
    score = -1;
    x = 0;
    y = 0;

    constructor(x, y, isBomb) {
        this.isBomb = isBomb || false;
        this.x = x;
        this.y = y;
    }

    reveal() {
        this.isHidden = false;
    }

    setScore(score) {
        if(!this.isBomb) {
            this.score = score;
        }
    }

    setFlaged(flagged) {
        this.isflaged = flagged;
    }
}