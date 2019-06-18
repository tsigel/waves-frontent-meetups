import { pipe, compose, curry, toPairs, whereEq, filter } from './index';


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

        const summ = (a, b, c) => a + b + c;

        const curryFoo = curry(summ);
        const ten = curryFoo(2, 3, 5);
        const ten2 = curryFoo(2, 3)(5);
        const ten3 = curryFoo(2)(3)(5);

        expect(one).toBe(1);
        expect(empty).toBe(undefined);

        expect(ten).toBe(10);
        expect(ten2).toBe(10);
        expect(ten3).toBe(10);
    });

    it('toPairs', () => {

        const data = { a: 1, b: '2', c: true, d: [1, 2, 3] };
        
        const arr1 = [
            ['a', 1],
            ['b', '2'],
            ['c', true],
            ['d', [1, 2, 3]]
        ];
        
        const arr2 = [
            ['a', 1],
            ['c', true],
            ['b', '2'],
            ['d', [1, 2, 3]]
        ];
        
        const arr3 = [
            ['a', 1],
            ['b', '2'],
            ['d', [1, 2, 3]]
        ];

        expect(toPairs(data)).toEqual(expect.arrayContaining(arr1));
        expect(arr1).toHaveLength(Object.keys(toPairs(data)).length);

        expect(toPairs(data)).toEqual(expect.arrayContaining(arr2));
        expect(arr2).toHaveLength(Object.keys(toPairs(data)).length);

        expect(toPairs(data)).toEqual(expect.arrayContaining(arr3));
        expect(arr3).not.toHaveLength(Object.keys(toPairs(data)).length);

    });

    it('whereEq', () => {
        const data = { a: 1, b: '2', c: true };
        const item1 = { a: 1, b: '2', c: true };
        const item2 = { a: 1, b: '2', c: true, d: 5 };
        const item3 = { a: 1, b: '3', c: true };
        const item4 = { a: 1, b: '2', c: false };

        expect(whereEq(data)(item1)).toBe(true);
        expect(whereEq(data)(item2)).toBe(true);
        expect(whereEq(data, item2)).toBe(true);
        expect(whereEq(data)(item3)).toBe(false);
        expect(whereEq(data, item3)).toBe(false);
        expect(whereEq(data)(item4)).toBe(false);
    });

    it('filter', () => {
        const array = [1, true, null, 'qwerty', undefined, '932', 0, 'preved'];

        const isString = value => typeof value === 'string';

        expect(filter(isString)(array)).toEqual(['qwerty', '932', 'preved']);
        expect(filter(isString, array)).toEqual(['qwerty', '932', 'preved']);
    });
});
