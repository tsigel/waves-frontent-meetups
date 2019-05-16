import { IPipe, ICompose, IWhereEq, IFilter } from './interface';


export const pipe: IPipe = (...funcList: Array<(data: any) => any>) =>
    (data: any) =>
        funcList.reduce((acc, processor) => processor(acc), data);

export const compose: ICompose = (...funcList: Array<(data: any) => any>) =>
    (pipe as any)(...funcList.reverse()) as any;

export const toPairs = <T>(data: T): Array<[keyof T, T[keyof T]]> =>
    Object.keys(data).map(key => [key as keyof T, data[key]]);

// TODO Fix curry!
export const curry: any = (cb: (...args: Array<any>) => any) => {
    const maxLength = cb.length;
    const args = [];

    function loop(...newArgs) {
        args.push(...newArgs);
        if (args.length >= maxLength) {
            return cb(...args);
        } else {
            return loop;
        }
    }

    return loop;
};

export const whereEq: IWhereEq = curry((data: any, item: any) =>
    Object.entries(data).every(([key, value]) => item[key] === value)
);

export const filter: IFilter =
    curry(<T>(callback: (item: T, index: number) => boolean, list: Array<T>): Array<T> => list.filter(callback));
