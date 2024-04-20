import GameState from "./gameState.js";
import Game from "./minesweeper/Game.js";
import Tile from "./minesweeper/Tile.js";

class GameService {
    #runningGames = [];
    /**
     * @param {int} gameId 
     * @param {int} tileX 
     * @param {int} tileY 
     * @returns {Tile[]}
     */
    async getResult(gameId, tileX, tileY) {
        const game = this.#runningGames.find(g => g.id === parseInt(gameId));

        game.openTile(toBase10(tileX), toBase10(tileY));

        return new GameState(game);
    }

    /**
     * @param {int} gameId 
     * @param {int} tileX 
     * @param {int} tileY 
     * @param {boolean} flagged 
     * @returns {Tile[]}
     */
    async setFlagTile(gameId, tileX, tileY, flagged) {
        const game = this.#runningGames.find(g => g.id === parseInt(gameId));

        game.toggleFlagTile(toBase10(tileX), toBase10(tileY), !!flagged);

        return new GameState(game);
    }

    /**
     *  @returns {Promise<GameState>}
     */
    async startGame(width, height, bombsAmount) {
        const game = new Game(toBase10(width), toBase10(height), toBase10(bombsAmount));

        this.#runningGames.push(game);
        return new GameState(game);
    }

    /**
     * 
     * @param {int} gameId 
     * @returns 
     */
    async getGameState(gameId) {
        const game = this.#runningGames.find(g => g.id === gameId);
        if(!game) {
            throw new Error('game not found');
        }

        return new GameState(game);
    }
}

const toBase10 = (value) => {
    return parseInt(value, 10)
}

const gameService = new GameService();
export default gameService;