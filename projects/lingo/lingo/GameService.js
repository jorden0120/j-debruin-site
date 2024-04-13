import Game from "./Game.js";

class GameService {
    /**
     * 
     * @param {Game} game 
     */
    saveGame(game) {

        const gameData = {
            answer: game.getAnswer(),
            chances: game.chances,
            won: !game.lost(),
            givenAnswers: game.getGivenAnswers().map(ga => ga.word)
        };
        
        fetch('./saveGame.php', {
            method: 'POST',
            body: JSON.stringify(gameData),
            headers: {
                'Content-Type': 'application/json'
              }
        });
    }
}

export default new GameService();