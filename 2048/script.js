var gameDiv;
var tiles = [new Array(4), new Array(4), new Array(4), new Array(4)];
var MAX_X = 4;
var MAX_Y = 4;
window.addEventListener('load', () => {
    gameDiv = document.querySelector('.game');
    addNewTile();
    addNewTile();
})

class Tile {
    x = 0;
    y = 0;
    number;
    element;

    constructor(x, y) {
        this.number = Math.round(Math.random() + 1) * 2;
        this.x = x;
        this.y = y;
        this.createElement();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('tile');
        this.element.style.setProperty('--x', this.x);
        this.element.style.setProperty('--y', this.y);
        this.element.innerText = this.number;
        this.updateColor();
    }

    updateColor() {
        this.element.style.setProperty('--number', this.number);
        this.element.innerText = this.number;
    }

    setNumber(number) {
        this.number = number;
        this.updateColor();
    }

    merge() {
        this.number *= 2;
        this.updateColor();
    }

    setX(x) {
        this.x = x;
        this.element.style.setProperty('--x', this.x);
    }

    setY(y) {
        this.y = y;
        this.element.style.setProperty('--y', this.y);
    }
}

function move(direction) {
    if (direction === 'up') moveUp2();
    // if (direction === 'down') moveDown2();
    if (direction === 'left') moveLeft();
    if (direction === 'right') moveRight();
    console.log(tiles);
    setTimeout(addNewTile, 1000);
}
function addNewTile() {
    addTile(new Tile(Math.floor(Math.random() * MAX_X), Math.floor(Math.random() * MAX_Y)));
}

var keyActive;
document.addEventListener('keydown', (e) => {
    if (keyActive) return;
    console.log(e.key);
    switch (e.key) {
        case 'ArrowUp':
            keyActive = true;
            move('up');
            break;
        case 'ArrowDown':
            keyActive = true;
            move('down');
            break;
        case 'ArrowLeft':
            keyActive = true;
            move('left');
            break;
        case 'ArrowRight':
            keyActive = true;
            move('right');
            break;
        default:
            keyActive = true;
            return;
    }
})

document.addEventListener('keyup', () => {
    keyActive = false;
});

function addTile(tile) {
    if (tiles[tile.x][tile.y] == null) {
        tiles[tile.x][tile.y] = tile;
        gameDiv.append(tile.element);
    } else {
        addNewTile();
    }
}

function moveUp() {
    for (let x = 0; x < MAX_X; x++) {
        movingTiles = [];
        for (let y = MAX_Y - 1; y >= 0; y--) {
            let tile = tiles[x][y];
            let nextTile = tiles[x][y - 1];
            if (tile) {
                movingTiles.push(tile);
                if (nextTile != null) {
                    console.log(nextTile.number + " - " + tile.number)
                    if (nextTile.number === tile.number) {
                        nextTile.merge();
                        removeTile(tile);
                        movingTiles.pop();
                    }
                } else {
                    for (let i = movingTiles.length - 1; i >= 0; i--) {
                        if (movingTiles[i].y === 0) continue;
                        if (tiles[movingTiles[i].x][movingTiles[i].y - 1] != null) continue;
                        tiles[movingTiles[i].x][movingTiles[i].y] = null;
                        tiles[movingTiles[i].x][movingTiles[i].y - 1] = movingTiles[i];
                        movingTiles[i].setY(movingTiles[i].y - 1);
                    }
                }
            }
        }
    }
}

function moveDown() {
    for (let x = 0; x < MAX_X; x++) {
        movingTiles = [];
        for (let y = 0; y < MAX_Y; y++) {
            let tile = tiles[x][y];
            let nextTile = tiles[x][y + 1];
            if (tile) {
                movingTiles.push(tile);
                if (nextTile != null) {
                    console.log(nextTile.number + " - " + tile.number)
                    if (nextTile.number === tile.number) {
                        nextTile.merge();
                        removeTile(tile);
                        movingTiles.pop();
                    }
                } else {
                    for (let i = movingTiles.length - 1; i >= 0; i--) {
                        if (movingTiles[i].y === MAX_Y - 1) continue;
                        if (tiles[movingTiles[i].x][movingTiles[i].y + 1] != null) continue;
                        tiles[movingTiles[i].x][movingTiles[i].y] = null;
                        tiles[movingTiles[i].x][movingTiles[i].y + 1] = movingTiles[i];
                        movingTiles[i].setY(movingTiles[i].y + 1);
                    }
                }
            }
        }
    }
}

function moveLeft() {
    for (let y = 0; y < MAX_Y; y++) {
        movingTiles = [];
        for (let x = MAX_X - 1; x >= 0; x--) {
            let tile = tiles[x][y];
            let nextTile = tiles[x - 1] ? tiles[x - 1][y] : null;
            if (tile) {
                movingTiles.push(tile);
                if (nextTile != null) {
                    console.log(nextTile.number + " - " + tile.number)
                    if (nextTile.number === tile.number) {
                        nextTile.merge();
                        removeTile(tile);
                        movingTiles.pop();
                    }
                } else {
                    for (let i = movingTiles.length - 1; i >= 0; i--) {
                        if (movingTiles[i].x === 0) continue;
                        if (tiles[movingTiles[i].x - 1][movingTiles[i].y] != null) continue;
                        tiles[movingTiles[i].x][movingTiles[i].y] = null;
                        tiles[movingTiles[i].x - 1][movingTiles[i].y] = movingTiles[i];
                        movingTiles[i].setX(movingTiles[i].x - 1);
                    }
                }
            }
        }
    }
}

function moveRight() {
    for (let y = 0; y < MAX_Y; y++) {
        movingTiles = [];
        for (let x = 0; x < MAX_X; x++) {
            let tile = tiles[x][y];
            let nextTile = tiles[x + 1] ? tiles[x + 1][y] : null;
            if (tile) {
                movingTiles.push(tile);
                if (nextTile != null) {
                    console.log(nextTile.number + " - " + tile.number)
                    if (nextTile.number === tile.number) {
                        nextTile.merge();
                        removeTile(tile);
                        movingTiles.pop();
                    }
                } else {
                    for (let i = movingTiles.length - 1; i >= 0; i--) {
                        if (movingTiles[i].x === MAX_X - 1) continue;
                        if (tiles[movingTiles[i].x + 1][movingTiles[i].y] != null) continue;
                        tiles[movingTiles[i].x][movingTiles[i].y] = null;
                        tiles[movingTiles[i].x + 1][movingTiles[i].y] = movingTiles[i];
                        movingTiles[i].setX(movingTiles[i].x + 1);
                    }
                }
            }
        }
    }
}

function removeTile(tile) {
    setTimeout(function() {
        tile.element.remove()
    }, 1000);
    tiles[tile.x][tile.y] = null;
}

function moveUp2() {
    for (let x = 0; x < MAX_X; x++) {
        for (let y = MAX_Y - 1; y >= 0; y--) {
            let tile = tiles[x][y];
            if (tile == null) {
                for (let y2 = y; y2 < MAX_Y; y2++) {
                    if (!tiles[x][y2]) continue;
                    if (y2 - 1 < 0) continue;
                    tiles[x][y2 - 1] = tiles[x][y2];
                    tiles[x][y2] = null;
                    tiles[x][y2 - 1].setY(y2 - 1);
                    continue;
                }
            } else {
                for (let y2 = y - 1; y2 >= 0; y2--) {
                    let checkTile = tiles[x][y2];
                    if (checkTile == null) continue;
                    if (checkTile.number === tile.number) {
                        tile.merge();
                        tile.setY(y2);
                        removeTile(checkTile);
                    }else {
                        break;
                    }
                }
            }
        }
    }
}

function moveDown2() {
    for (let x = 0; x < MAX_X; x++) {
        for (let y = 0; y < MAX_Y; y++) {
            let tile = tiles[x][y];
            if (tile == null) {
                for (let y2 = (MAX_Y - 1) - (y + 1); y2 >= 0; y2--) {
                    if (!tiles[x][y2]) continue;
                    if (y2 + 1 > MAX_Y - 1) continue;
                    tiles[x][y2 + 1] = tiles[x][y2];
                    tiles[x][y2] = null;
                    tiles[x][y2 + 1].setY(y2 + 1);
                    continue;
                }
            } else {
                for (let y2 = y + 1; y2 < MAX_Y; y2 ++) {
                    let checkTile = tiles[x][y2];
                    if (!checkTile) continue;
                    if (checkTile.number === tile.number) {
                        tile.merge();
                        tile.setY(y2);
                        removeTile(checkTile);
                    }else {
                        break;
                    }
                }
            }
        }
    }
}