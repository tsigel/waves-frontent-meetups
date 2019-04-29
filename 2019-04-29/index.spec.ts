import { IPipe, ICompose, ICurry, IFilter, IWhereEq } from './interface';
import { pipe, compose } from './index';

// declare const compose: ICompose;
declare const curry: ICurry;
declare const filter: IFilter;
declare const whereEq: IWhereEq;


describe('Meetup 29.04.2019', () => {

    it('pipe', () => {
        
        const a = (a: number): string => {
            expect(a).toBe(1);
            return '1';
        };

        const b = (b: string): boolean => {
            expect(b).toBe('1');
            return true;
        }

        const c = (c: boolean): {a: number; b: string; c: boolean} => {
            expect(c).toBe(true);
            return { a: 1, b: '1', c: true };
        }

        expect(pipe(a, b, c)(1)).toEqual({a: 1, b: '1', c: true});
    });

    it('compose', () => {
        
        const a = (a: number): string => {
            expect(a).toBe(1);
            return '1';
        };

        const b = (b: string): boolean => {
            expect(b).toBe('1');
            return true;
        }

        const c = (c: boolean): {a: number; b: string; c: boolean} => {
            expect(c).toBe(true);
            return { a: 1, b: '1', c: true };
        }

        expect(compose(c, b, a)(1)).toEqual({a: 1, b: '1', c: true});
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

    // TODO Add tests for filter and  whereEq
});
