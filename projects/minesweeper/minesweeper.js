import gameService from "./GameService.js";
import GameState from "./gameState.js";

/**
 * @type {Element}
 */
let gameMap;

/**
 * @type {int}
 */
let gameId;

document.addEventListener('DOMContentLoaded', () => {
    gameMap = document.querySelector('#game-map');

    startGame();
});

const startGame = async () => {
    const width = 10;
    const height = 10;
    const bombsAmount = 15;

    gameMap.style.setProperty('--rows', width);

    gameMap.innerHTML = '';
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            gameMap.appendChild(createTile(x, y));
        }
    }

    gameId = (await gameService.startGame(width, height, bombsAmount)).gameId;
}

/**
 * 
 * @param {int} x 
 * @param {int} y 
 * @returns {Element}
 */
const createTile = (x, y) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.setAttribute('data-x', x);
    tile.setAttribute('data-y', y);

    tile.addEventListener('click', openTile);

    return tile;
}

const openTile = (clickEvent) => {
    const tile = clickEvent.currentTarget;

    gameService.getResult(gameId, 
        tile.getAttribute('data-x'), 
        tile.getAttribute('data-y')
    ).then(gameState => updateMap(gameState));
}

/**
 * 
 * @param {GameState} gameState 
 */
const updateMap = (gameState) => {
    gameState.map.forEach(tile => {
        const tileElement = gameMap.querySelector(`[data-x="${tile.x}"][data-y="${tile.y}"]`);
        const value = tile.isBomb ? 'B' : tile.score;
        tileElement.setAttribute('data-value', value);
        tileElement.classList.add('opened')
    });
}