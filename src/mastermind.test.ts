import { Mastermind } from './mastermind';

it('should create a game', function () {
    const game = new Mastermind();
    expect(game).toBeDefined();
});

it('should answer ++++ if good input', function () {
    const game = new Mastermind('1234');
    expect(game.try('1234')).toBe('++++');
});

it('should count exact matches multiple times if necessary', function () {
    const game = new Mastermind('2234');
    expect(game.try('2234')).toBe('++++');
});

it('should answer nothing if everything wrong', function () {
    const game = new Mastermind('1234');
    expect(game.try('0000')).toBe('');
});

it('should answer with - for partial matches', function () {
    const game = new Mastermind('1234');
    expect(game.try('0001')).toBe('-');
});

it('should answer with a combination of + and -', function () {
    const game = new Mastermind('1234');
    expect(game.try('1245')).toBe('++-');
});

it('should count a partial match only once per digit', function () {
    const game = new Mastermind('1234');
    expect(game.try('2002')).toBe('-');
});

it('should prioritize exact matches over partial matches', function () {
    const game = new Mastermind('1234');
    expect(game.try('2200')).toBe('+');
});

it('should prioritize exact matches over partial matches 2', function () {
    const game = new Mastermind('2202');
    expect(game.try('2220')).toBe('++--');
});

it('should prioritize exact matches over partial matches 3', function () {
    const game = new Mastermind('2202');
    expect(game.try('2221')).toBe('++-');
});

it('should prioritize exact matches over partial matches 4', function () {
    const game = new Mastermind('3129');
    expect(game.try('1249')).toBe('+--');
});

it('should work when more spots than matches', function () {
    const game = new Mastermind('3303');
    expect(game.try('1131')).toBe('-');
});

it('should count a partial match twice if there are 2 spots', function () {
    const game = new Mastermind('2200');
    expect(game.try('1122')).toBe('--');
});

it('should reject bad input', function () {
    const game = new Mastermind('1234');
    expect(game.try('123')).toBe('bad input');
    expect(game.try('12356')).toBe('bad input');
    expect(game.try('abcd')).toBe('bad input');
    expect(game.try('12.3')).toBe('bad input');
});
