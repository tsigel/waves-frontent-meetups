import { IPipe, ICompose, IWhereEq, IFilter } from './interface';

(Function.prototype as any).mybind = function (ctx) {
    const args = Array.prototype.slice.call(arguments, 1);
    const func = this;
    return function () {
        const newArgs = Array.prototype.slice.call(arguments);
        return func.apply(ctx, args.concat(newArgs));
    }
};

export const pipe: IPipe = (...funcList: Array<(data: any) => any>) =>
    (data: any) =>
        funcList.reduce((acc, processor) => processor(acc), data);

export const compose: ICompose = (...funcList: Array<(data: any) => any>) =>
    (pipe as any)(...funcList.reverse()) as any;

export const toPairs = <T>(data: T): Array<[keyof T, T[keyof T]]> =>
    Object.keys(data).map(key => [key as keyof T, data[key]]);

export const curry: any = (cb: (...args: Array<any>) => any) => {

    function loop(cb, ...args) {
        if (args.length >= cb.length) {
            return cb(...args);
        } else {
            return (...newArgs) => loop(cb, ...args.concat(newArgs));
        }
    }

    return (...args) => loop(cb, ...args);
};

export const whereEq: IWhereEq = curry((data: any, item: any) =>
    Object.entries(data).every(([key, value]) => item[key] === value)
);

export const filter: IFilter =
    curry(<T>(callback: (item: T, index: number) => boolean, list: Array<T>): Array<T> => list.filter(callback));
