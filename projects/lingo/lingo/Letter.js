import LetterStatus from "./LetterStatus.js";

export default class Letter {
    character = '';
    position = -1;
    status;

    constructor(character, position, status = LetterStatus.Default) {
        this.character = character;
        this.position = position;
        this.status = status;
    }
}