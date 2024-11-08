export function shuffleArray(array: any[]) {
    if(!array) {
        return []
    }
    for (let i = array?.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export function minutesToMilliseconds(minutes: number): number {
    const millisecondsPerMinute: number = 60000;
    return minutes * millisecondsPerMinute;
}

/**
 * Generates a random number between min (inclusive) and max (inclusive).
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns A random number between min and max.
 */
export function getRandomNumber(min: number, max: number): number {
    if (min > max) {
        throw new Error('Min should be less than or equal to max');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
