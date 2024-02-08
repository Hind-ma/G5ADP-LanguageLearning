/** utils.js - File containing utility functions */

/**
 * GetRandomInt
 * @param {any} min - minimum value
 * @param {any} max - maximum value
 * @returns - a random integer value between min and max, inclusive
 */
export function GetRandomInt(min, max) {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}

/**
 * Shuffle Array - unbiased shuffle algorithm
 * Link: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param {any} array - input array
 * @returns - shuffled array
 */
export function ShuffleArray(array) {
    let currentIdx = array.length;
    let randomIdx = null;

    // While there are remaining elements to shuffle
    while (currentIdx > 0) {

        // Pick the remaining element
        randomIdx = Math.floor(Math.random() * currentIdx);
        currentIdx--;

        // Swap with the current element
        [array[currentIdx], array[randomIdx]] = [array[randomIdx], array[currentIdx]];
    }

    return array;
}