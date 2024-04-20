export default class GameState {
    /**
     * 
     * @param {Game} game 
     */
    constructor(game) {
        this.gameId = game.id;
        this.map = game.getTiles();
        this.totalBombs = game.bombs;
        this.bombsRemaining = game.getBombRemaining();
        this.width = game.width;
        this.height = game.height;
        this.ended = game.ended;
        this.won = game.won;
    }
}