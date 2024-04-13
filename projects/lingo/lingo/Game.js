import Answer from "./Answer.js";
import Letter from "./Letter.js";
import LetterStatus from "./LetterStatus.js";
import WordService from "./WordService.js";

export default class Game {
    #answer = "";
    givenAnswers = [];
    chances = 6;
    wordSize = 6;

    constructor(chances = 6, wordSize = 6) {
        this.chances = chances;
        this.wordSize = wordSize;
        this.setup();
    }

    async setup() {
        this.#answer = (await WordService.getRandomWord(this.wordSize)).toLowerCase();
        const event = new Event("gameReady");
        document.dispatchEvent(event);
    }

    getGivenAnswers = () => this.givenAnswers;

    getWordSize = () => this.#answer.length;

    ended = () => this.givenAnswers.length === this.chances || this.givenAnswers.find(a => a.word === this.#answer);

    lost = () => !this.givenAnswers.find(a => a.word === this.#answer) && this.givenAnswers.length === this.chances;

    getAnswer = () => this.ended() ? this.#answer : "";

    /**
     * 
     * @param {string} answer 
     */
    async submitAnswer(answer) {
        if(this.ended()) throw new Error("Game has ended");
        if(!(await WordService.doesWordExists(answer))) throw new Error("Word doesn't exists");

        const letters = answer.toLowerCase().split('').map((l, i) => new Letter(l, i));
        let answerLetters = this.#answer.split('').map((l, i) => new Letter(l, i));

        letters.forEach((letter, index) => {
            if(letter.character === this.#answer.charAt(index)) {
                letter.status = LetterStatus.Red;
                answerLetters = answerLetters.filter(al => al.position !== index);
            }
        });

        letters.filter(l => l.status != LetterStatus.Red).forEach(letter => {
            const foundLetter = answerLetters.find(al => al.character === letter.character);
            if(foundLetter) {
                letter.status = LetterStatus.Yellow;
                answerLetters = answerLetters.filter(al => al.position !== foundLetter.position)
            }
        });

        this.givenAnswers.push(new Answer(letters));
    }

    getHints() {
        const letters = [];
        this.#answer.split('').forEach((letter, i) => {
            if(['-', '.', ' '].includes(letter) || i === 0) letters.push(new Letter(letter, i, LetterStatus.Hint));
        });

        let answerLetters = []; 
        this.givenAnswers.forEach(a => answerLetters = [...a.letters, ...answerLetters]);
        answerLetters = [...answerLetters, ...letters];

        return removeDuplicates(answerLetters.filter(al => al.status === LetterStatus.Hint || al.status === LetterStatus.Red), 'position');
    }
}

const removeDuplicates = (array, attribute) => {
    let seen = new Set();
    return array.filter(item => {
        let attributeValue = item[attribute];
        if (!seen.has(attributeValue)) {
            seen.add(attributeValue);
            return true;
        }
        return false;
    });
}