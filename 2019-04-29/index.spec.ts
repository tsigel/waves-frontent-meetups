import { pipe, compose, curry, toPairs, filter, whereEq } from './index';


describe('Meetup 29.04.2019', () => {

    it('pipe', () => {

        const a = (a: number): string => {
            expect(a).toBe(1);
            return '1';
        };

        const b = (b: string): boolean => {
            expect(b).toBe('1');
            return true;
        };

        const c = (c: boolean): { a: number; b: string; c: boolean } => {
            expect(c).toBe(true);
            return { a: 1, b: '1', c: true };
        };

        expect(pipe(a, b, c)(1)).toEqual({ a: 1, b: '1', c: true });
    });

    it('compose', () => {

        const a = (a: number): string => {
            expect(a).toBe(1);
            return '1';
        };

        const b = (b: string): boolean => {
            expect(b).toBe('1');
            return true;
        };

        const c = (c: boolean): { a: number; b: string; c: boolean } => {
            expect(c).toBe(true);
            return { a: 1, b: '1', c: true };
        };

        expect(compose(c, b, a)(1)).toEqual({ a: 1, b: '1', c: true });
    });

    it('curry', () => {
        const f: <T, K extends keyof T>(key: K) => (data: T) => T[K] =
            curry(<T, K extends keyof T>(prop: K, data: T): T[K] => data[prop]) as any;

        const getType = f<{ type?: number }, 'type'>('type');

        const one = getType({ type: 1 });
        const empty = getType({});

        expect(one).toBe(1);
        expect(empty).toBe(undefined);
    });

    it('toPairs', () => {

        const data = { b: '2', a: 1, c: true, d: [1, 2, 3] };
        expect(toPairs(data).sort()).toEqual([
            ['a', 1],
            ['b', '2'],
            ['c', true],
            ['d', [1, 2, 3]]
        ]);
    });

    it('filter', () => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
        const lessThen5 = (number) => number < 5;

        expect(filter(lessThen5, numbers)).toEqual([0, 1, 2, 3, 4]);
        expect(filter(lessThen5)(numbers)).toEqual([0, 1, 2, 3, 4]);
    });

    it('whereEq', () => {
        const data = { a: 'a', b: 'b' };
        const itemTrue = { a: 'a', b: 'b', c: 'c' };
        const itemFalse = { a: 'b', b: 'b'};

        expect(whereEq(data, itemTrue)).toBe(true);
        expect(whereEq(data)(itemTrue)).toBe(true);
        expect(whereEq(data, itemFalse)).toBe(false);
        expect(whereEq(data)(itemFalse)).toBe(false);
    });
});
