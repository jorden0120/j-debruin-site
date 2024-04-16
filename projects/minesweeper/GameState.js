export default class GameState {
    constructor(game) {
        this.gameId = game.id;
        this.map = game.getTiles();
        this.width = game.width;
        this.height = game.height;
    }
}