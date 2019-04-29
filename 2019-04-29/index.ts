import { IPipe, ICompose } from "./interface";
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

export const toPairs = <T>(data: T): Array<[keyof T, T[keyof T]> => 
    Object.keys(data)