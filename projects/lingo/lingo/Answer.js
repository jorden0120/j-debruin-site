import Letter from "./Letter.js";

export default class Answer {
    letters = [];
    word = "";

    /**
     * 
     * @param {Letter[]} word 
     */
    constructor(letters) {
        this.letters = letters;
        letters.forEach(letter => {
            this.word += letter.character;
        });
    }
}