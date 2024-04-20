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
    won = false;
    ended = false;

    /**
     * 
     * @param {int} width 
     * @param {int} height 
     * @param {int} bombs 
     */
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
        if(this.bombs > this.tiles.length) {
            this.bombs = this.tiles.length;    
        }

        for(let i = 0; i < this.bombs; i++) {
            const tilesToChoose = this.tiles.filter(t => !t.isBomb);
            const index = Math.floor(Math.random() * tilesToChoose.length);
            tilesToChoose[index].isBomb = true;
        }
    }

    #calculateTileScores() {
        this.tiles.forEach(tile => {
            const score = this.getAllTilesAroundTile(this.tiles, tile).filter(t => t.isBomb).length;
            
            tile.setScore(score);
        });
    }
    

    getTiles() {
        if(!this.tiles) {
            throw new Error("map not generated yet");
        }

        return this.tiles.filter(t => !t.isHidden);
    }

    toggleFlagTile(tileX, tileY, flagged) {
        const tile = this.tiles.find(t => t.isHidden && t.x === tileX && t.y === tileY);
        tile.setFlaged(flagged);
    }

    openTile(tileX, tileY) {
        const tileToOpen = this.tiles.find(t => t.isHidden && t.x === tileX && t.y === tileY);
        const tilesToSearch = [...this.tiles];
        if (!tileToOpen || tileToOpen.isflaged) {
            return;
        }    
    
        const stack = [tileToOpen];
        while (stack.length > 0) {
            const currentTile = stack.pop();
            currentTile.reveal();
            
            if (currentTile.isBomb || currentTile.score > 0) {
                continue;
            }
            
            const tilesAround = this.getAllTilesAroundTile(tilesToSearch, currentTile).filter(t => t.isHidden && !t.isflaged);
            tilesAround.forEach(tile => {
                if (tile.score === 0) {
                    tilesToSearch.splice(tilesToSearch.indexOf(tile), 1);
                    stack.push(tile);
                } else {
                    tile.reveal();
                }
            });
        }

        this.updateGameState();
    }

    getAllTilesAroundTile(list, tile) {
        if (!tile) return [];
    
        const { x, y } = tile;
        const tilesAround = [];
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i !== x || j !== y) {
                    const foundTile = list.find(t => t.x === i && t.y === j);
                    if (foundTile) {
                        tilesAround.push(foundTile);
                    }
                }
            }
        }
        return tilesAround;
    }

    updateGameState() {
        if(this.tiles.some(t => t.isBomb && !t.isHidden)) {
            this.endGame();
        }

        if(this.tiles.every(tile => !tile.isHidden || tile.isBomb)) {
            this.endGame(true);
        }
    }

    endGame(won = false) {
        this.won = won;
        this.ended = true;
    }

    getBombRemaining() {
        return this.bombs - this.tiles.filter(t => t.isflaged).length;
    }

    static #getNewId() {
        Game.newId ++;
        return Game.newId;
    }
}