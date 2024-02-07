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