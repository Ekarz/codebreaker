import * as readline from 'readline';
import { Mastermind } from './mastermind';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const game = new Mastermind();

const ask = (): void =>
    rl.question('Propose an answer\n', (input) => {
        const answer = game.try(input);
        rl.write(`Output : ${answer}\n`);

        if (answer !== '++++') {
            ask();
        } else {
            rl.write('Good job !');
            rl.close();
        }
    });

ask();
