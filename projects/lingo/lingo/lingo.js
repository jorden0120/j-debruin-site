import Game from "./Game.js";
import GameService from "./GameService.js";
import Letter from "./Letter.js";
import LetterStatus from "./LetterStatus.js";
const gameArea = document.querySelector('.game');
window.playedGames = [];

/**
 * @type {Game}
 */
let currentGame;

document.addEventListener('DOMContentLoaded', _ => {
    document.querySelector('#start-game').addEventListener('click', startGame);
    document.addEventListener('gameReady', () => {
        fillBoard(currentGame.getWordSize(), currentGame.chances);
        showHints(currentGame.getWordSize(), currentGame.getHints()); 
    });

    document.addEventListener('keyup', keyUpListerner);

    startGame();
});

const startGame = () => {
    const random = 3 + Math.floor(Math.random() * 5);
    currentGame = new Game(8, random);
    gameArea.querySelectorAll('.wordRow').forEach(row => row.remove());
}

/**
 * 
 * @param {int} wordSize 
 * @param {int} chances 
 */
const fillBoard = (wordSize, chances) => {
    for(let row = 0; row < chances; row ++) {
        const newRow = document.createElement('form');
        newRow.classList.add('wordRow');
        newRow.classList.add('empty');
        newRow.setAttribute('data-letterCount', wordSize);
        
        for(let column = 0; column < wordSize; column ++) {
            const newLetter = document.createElement('input');
            newLetter.maxLength = 1; 
            newLetter.classList.add('letter');
            newLetter.addEventListener('keypress', nextLetter);
            newLetter.addEventListener('oninput', enforceMaxLength);

            newLetter.disabled = true;
            newRow.appendChild(newLetter);
        }

        const hiddenButton = document.createElement('button');
        hiddenButton.hidden = true;
        newRow.appendChild(hiddenButton);
        gameArea.appendChild(newRow);
    }
};

/**
 * 
 * @param {int} wordSize 
 * @param {Letter[]} letters 
 */
const showValidation = (wordSize, letters) => {
    const newRow = gameArea.querySelector('.wordRow:nth-child(1 of .empty)');
    newRow.classList.remove('empty');
    newRow.removeEventListener('submit', submitAnswer);

    for(let i = 0; i < wordSize; i ++) {
        const letter = letters.find(l => l.position == i);
        const letterElement = newRow.querySelector(`.letter:nth-child(${i + 1} of .letter)`);

        setTimeout(() => validateLetter(letter, letterElement), 200 * i);
    }
};

/**
 * 
 * @param {Letter} letter 
 * @param {Element} letterElement 
 */
const validateLetter = (letter, letterElement) => {
    if(!letter || !letterElement) return;

    letterElement.disabled = true;
    if(letter.status === LetterStatus.Red) {
        letterElement.classList.add('red');
    } else if(letter.status === LetterStatus.Yellow) {
        letterElement.classList.add('yellow');
    } else if(letter.character === ' ') {
        letterElement.classList.add('space');
    }

    letterElement.classList.add('done');
    letterElement.value = letter.character;
}

/**
 * 
 * @param {int} wordSize 
 * @param {Letter[]} letters 
 */
const showHints = (wordSize, letters) => {
    const newRow = gameArea.querySelector('.wordRow:nth-child(1 of .empty)');
    newRow.addEventListener('submit', submitAnswer);
    if(newRow) {
        for(let i = 0; i < wordSize; i ++) {
            const newLetter = newRow.querySelector(`.letter:nth-child(${i + 1} of .letter)`);
            newLetter.disabled = false;
            const letter = letters.find(l => l.position == i);
            if(letter) {
                newLetter.placeholder = letter.character;
                if(letter.character === ' ') {
                    newLetter.classList.add('space');
                }
            }
        }
    }

    selectElement(newRow.querySelector('.letter:nth-child(1 of .letter)'));
};

const submitAnswer = async (e) => {
    e.preventDefault();
    let answer = "";
    e.currentTarget.querySelectorAll('input.letter').forEach(letter => {
        answer += letter.value;
    });

    if(answer.length !== currentGame.getWordSize()) {
        return;
    }
    
    await currentGame.submitAnswer(answer.toLowerCase());
    const answers = currentGame.getGivenAnswers();
    showValidation(currentGame.getWordSize(), answers[answers.length - 1].letters);
    if(currentGame.ended()) {
        GameService.saveGame(currentGame);
        window.playedGames.push(currentGame);
        if(currentGame.lost()) alert(currentGame.getAnswer());
    } else {
        showHints(currentGame.getWordSize(), currentGame.getHints());
    }
};

const keyUpListerner = (e) => {
    if([37, 39, 8].includes(e.keyCode)) {
        const focusedElement = e.target;
        const wrapper = focusedElement.closest('.wordRow');
        const children =  [...wrapper.querySelectorAll('.letter')];
        const focusedElementIndex = children.indexOf(focusedElement);
        let elementToSelect; 
        if([8, 37].includes(e.keyCode) && focusedElementIndex > 0) { // backspace or leftArrow
            elementToSelect = children[focusedElementIndex -1];
        } else if(e.keyCode === 39 && focusedElementIndex + 1 < children.length) { // rightarrow
            elementToSelect = children[focusedElementIndex +1];
        }
        
        selectElement(elementToSelect);
    }
};

const nextLetter = (e) => {
    const focusedElement = e.target;
    if(e.key.length === 1) focusedElement.value = e.key.toLowerCase();

    const wrapper = focusedElement.closest('.wordRow');
    const children = [...wrapper.querySelectorAll('.letter')];
    const focusedElementIndex = children.indexOf(focusedElement);
    
    if(focusedElementIndex + 1 < children.length) {
        const newElement = children[focusedElementIndex +1];
        if(!newElement.value?.length) {
            selectElement(newElement);
        }
    }
};

/**
 * 
 * @param {Element} elementToSelect 
 */
const selectElement = (elementToSelect) => {
    setTimeout(_ => {
        if(elementToSelect) {
            elementToSelect.focus();
            elementToSelect.select();
        }
    }, 1);
};

// function to enforce max-lenght attribute for mobile
const enforceMaxLength = (e) => {
    const target = e.currentTarget;
    if (target.value.length > target.maxLength) target.value = target.value.slice(0, target.maxLength);
}