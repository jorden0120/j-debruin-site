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

let drawingEvents = [];

document.addEventListener('DOMContentLoaded', () => {
    gameMap = document.querySelector('#game-map');
    document.querySelector('#start-game').addEventListener('click', startGame);
    startGame();
});

const startGame = async () => {
    gameMap.addEventListener('click', openTile);
    gameMap.addEventListener('contextmenu', flagTile);

    const width = parseInt(document.querySelector('#size').value);
    const height = parseInt(document.querySelector('#size').value);
    const bombsAmount = parseInt(document.querySelector('#total-bombs').value);
    drawingEvents.forEach(e => clearTimeout(e));


    gameMap.style.setProperty('--rows', width);

    gameMap.innerHTML = '';
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            gameMap.appendChild(createTile(x, y));
        }
    }

    const gameState = await gameService.startGame(width, height, bombsAmount);
    gameId = gameState.gameId;
    document.querySelectorAll('.bombs').forEach(e => e.innerText = gameState.bombsRemaining)
    drawingEvents = [];
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

    return tile;
}

/**
 * 
 * @param {PointerEvent} clickEvent 
 */
const openTile = (clickEvent) => {
    const tile = clickEvent.target.closest('.tile');
    if (!tile) return;

    gameService.getResult(gameId, 
        tile.getAttribute('data-x'), 
        tile.getAttribute('data-y')
    ).then(gameState => updateGame(gameState, tile));
}

/**
 * 
 * @param {GameState} gameState 
 */
const updateGame = (gameState, tileElement) => {
    updateMap(gameState, tileElement.getAttribute('data-x'),  tileElement.getAttribute('data-y'));
    document.querySelectorAll('.bombs').forEach(e => e.innerText = gameState.bombsRemaining)
}

/**
 * 
 * @param {PointerEvent} clickEvent 
 */
const flagTile = (clickEvent) => {
    clickEvent.preventDefault();
    const tile = clickEvent.target.closest('.tile');
    if (!tile) return;

    tile.classList.toggle('flaged');
    let flaged = tile.classList.contains('flaged');

    gameService.setFlagTile(gameId, 
        tile.getAttribute('data-x'), 
        tile.getAttribute('data-y'),
        flaged
    ).then(gameState => updateGame(gameState, tile));
}




function calculateDistance(x1, y1, x2, y2) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

/**
 * 
 * @param {Tile[]} array 
 * @param {int} centerX 
 * @param {int} centerY 
 */
const sortToOuter = (array, centerX, centerY) => {
    array.forEach(t => t.distance = calculateDistance(centerX, centerY, t.x, t.y))
    array.sort((a, b) =>  a.distance - b.distance);
}

/**
 * 
 * @param {GameState} gameState 
 */
const updateMap = async (gameState, centerX, centerY) => {
    sortToOuter(gameState.map, centerX, centerY);
    gameState.map.forEach((tile) => {
        const event = setTimeout(() => {
            const tileElement = gameMap.querySelector(`[data-x="${tile.x}"][data-y="${tile.y}"]`);
            const value = tile.isBomb ? 'B' : tile.score > 0 ? tile.score : '';
            tileElement.setAttribute('data-value', value);
            tileElement.classList.add('opened')
            tileElement.removeEventListener('click', openTile);
            tileElement.removeEventListener('contextmenu', flagTile);
        }, tile.distance * 10 + Math.random() * 10);

        drawingEvents.push(event);
    });

    console.log(gameState);
}