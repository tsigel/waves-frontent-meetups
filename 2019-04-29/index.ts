import { IPipe, ICompose, IWhereEq } from "./interface";
const toUpperCase = (str: string) => str.toUpperCase();
const addProtocol = (protocol: string) => (str: string) => protocol + str;

const result = addProtocol('http://')(toUpperCase('hello'));

// const result2 = pipe(
//     toUpperCase,
//     addProtocol('http://')
// )('hello');

export const pipe: IPipe = (...funcList: Array<(data: any) => any>) => 
    (data: any) => 
        funcList.reduce((acc, processor) => processor(acc), data);

export const compose: ICompose = (...funcList: Array<(data: any) => any>) =>
    (pipe as any)(...funcList.reverse()) as any;

export const toPairs = <T>(data: T): Array<[keyof T, T[keyof T]]> => 
    Object.keys(data).map(key => [key as keyof T, data[key]]);

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

const filter = <T>(cb: (data: T, index: number) => boolean, list: Array<T>): Array<T> => list.filter(cb);

const whereEq: IWhereEq = curry((data: any, item: any) => 
    Object.entries(data).every(([key, value]) => item[key] === value)
);

const list: Array<any> = [];
const myTx = list.find(x => x.timstam === 2 && x.sende == 'vasia');
const myTx2 = list.find(whereEq({timstam: 2, sende: 'vasia'}));


// const sum = (a, b, c, d) => a + b + c + d;
// const f = curry(sum);
// f(1)(2)(3)(4) // 10;
// f(1,2,3,4) // 10;
// f(1)(2, 3)(4) // 10;
// f(1,2,3) // function 

// const prop = (key: string, data: object) => data[key];
// const getType2 = prop.bind(null, 'type');
// const getType = (data) => data['type'];
    