import Tile from "./Tile.js";

export default class Game {
    static newId = 0;
    id;

    /**
     * @type {Tile[]}
     */
    tiles = [];
    height = 0;
    width = 0;
    bombs = 20;

    constructor(width, height, bombs) {
        this.id = Game.#getNewId();
        this.height = height;
        this.width = width;
        this.bombs = bombs;
        this.#generateMap();
    }

    #generateMap() {
        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                this.tiles.push(new Tile(x, y, false));
            }
        }

        this.#plantBombs();
        this.#calculateTileScores();
    }

    #plantBombs() {
        for(let i = 0; i < this.bombs; i++) {
            const tilesToChoose = this.tiles.filter(t => !t.isBomb);
            const index = Math.floor(Math.random() * tilesToChoose.length);
            tilesToChoose[index].isBomb = true;
        }
    }

    #calculateTileScores() {
        this.tiles.forEach(tile => {
            const score = this.tiles.filter(t => t.isBomb && (
                   t.x === tile.x - 1  && t.y === tile.y
                || t.x === tile.x - 1  && t.y === tile.y + 1
                || t.x === tile.x - 1  && t.y === tile.y - 1

                || t.x === tile.x + 1  && t.y === tile.y
                || t.x === tile.x + 1  && t.y === tile.y + 1
                || t.x === tile.x + 1  && t.y === tile.y - 1

                || t.x === tile.x      && t.y === tile.y + 1
                || t.x === tile.x      && t.y === tile.y - 1
            )).length;
            
            tile.setScore(score);
        });
    }
    

    getTiles() {
        if(!this.tiles) {
            throw new Error("map not generated yet");
        }

        return this.tiles.filter(t => !t.isHidden);
    }

    openTile(tileX, tileY) {
        const tileToOpen = this.tiles.find(t => t.isHidden && t.x === tileX && t.y === tileY);
        tileToOpen?.reveal();
        if(tileToOpen?.isBomb) {
            return;
        }

        if(tileToOpen?.score > 0) {
            return;
        }

        this.tiles.filter(t => t.isHidden && (
                (t.x === tileX      && t.y === tileY + 1)
            ||  (t.x === tileX      && t.y === tileY - 1)
            ||  (t.x === tileX + 1  && t.y === tileY)
            ||  (t.x === tileX - 1  && t.y === tileY)
        )).forEach(tile => {
            if(tile.score === 0) {
                this.openTile(tile.x, tile.y);
            } else {
                tile.reveal();
            }
        });
    }

    static #getNewId() {
        Game.newId ++;
        return Game.newId;
    }
}