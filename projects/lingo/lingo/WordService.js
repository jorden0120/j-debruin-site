/**
 * Service for managing words.
 */
class WordService {
    /**
     * Array to store words.
     * @type {string[]}
     * @private
     */
    #words = [];

    /**
     * Get a random word from the stored words.
     * @returns {Promise<string>}
     */
    getRandomWord = async (size = 6) => {
        if(!this.#words.length) {
            this.#words = await this.#loadWords(); 
        }

        return this.#words.filter(w => w.length == size)[Math.floor(Math.random() * this.#words.filter(w => w.length == size).length)];
    }

    /**
     * Check if a word exists in the stored words.
     * @param {string} word - The word to check.
     * @returns {Promise<boolean>}
     */
    doesWordExists = async (word) => {
        if(!this.#words.length) {
            this.#words = await this.#loadWords(); 
        }

        return typeof this.#words.find(w => w.toLowerCase() === word) !== 'undifined';
    }

    #loadWords = () => {
        return fetch('./words.txt').then(result => result.text()).then(wordtext => wordtext.split('\n')); 
    }
}

export default new WordService();