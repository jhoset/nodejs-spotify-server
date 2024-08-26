import * as crypto from 'crypto';



/**
 * Generates a random string of hexadecimal characters.
 *
 * @param {number} [length=10] - The desired length of the random string.
 * @returns {string} A random string of hexadecimal characters.
 */
export const generateRandomString = (length: number = 10): string => {
    return crypto.randomBytes(60).toString('hex').slice(0, length);
}