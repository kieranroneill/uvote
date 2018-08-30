/**
 * Utility method to return a random alphanumeric string.
 * @param length the length of the random alphanumeric string.
 * @returns a random hash
 */
export function createHash(length: number = 8): string {
    return Math.random()
        .toString(36)
        .substr(2, length);
}
