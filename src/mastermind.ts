export class Mastermind {
    private readonly secret: Array<string>;
    private static readonly CODE_LENGTH = 4;

    constructor(secret?: string) {
        this.secret = (secret ?? Mastermind.generateSecret()).split('');
    }

    private static generateSecret(): string {
        return Math.floor(Math.random() * 10 ** this.CODE_LENGTH)
            .toString()
            .padStart(this.CODE_LENGTH, '0');
    }

    public try(code: string): string {
        if (Mastermind.isBadInput(code)) {
            return 'bad input';
        }

        const splitCode = code.split('');
        const exactMatches = this.findExactMatches(splitCode);
        const minuses = this.countRemainingPartialMatches(splitCode, exactMatches);
        const pluses = exactMatches.length;

        return ''.padEnd(pluses, '+').padEnd(pluses + minuses, '-');
    }

    private static isBadInput(code: string): boolean {
        return code.length !== this.CODE_LENGTH || isNaN(Number(code)) || Number(code) % 1 !== 0;
    }

    private findExactMatches(code: Array<string>): Array<string> {
        return code.filter((digit, pos) => this.secret[pos] === digit);
    }

    private countRemainingPartialMatches(code: Array<string>, exactMatches: Array<String>): number {
        const partialMatches = code.filter((digit) => this.secret.includes(digit));
        let result = 0;

        for (let digit of new Set(partialMatches)) {
            const exactMatchesCountForDigit = exactMatches.filter((d) => d === digit).length;
            const partialMatchesCountForDigit = partialMatches.filter((d) => d === digit).length;
            const remainingSpots = this.secret.filter((d) => d === digit).length - exactMatchesCountForDigit;

            result += Math.min(partialMatchesCountForDigit - exactMatchesCountForDigit, remainingSpots);
        }

        return result;
    }
}
