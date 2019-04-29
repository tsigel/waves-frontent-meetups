export interface IToPairs {
    <T extends Record<keyof any, any>>(data: T): Array<[keyof T, T[keyof T]]>;
}

interface IPipe {
    <A, B, R>(cb1: (a: A) => B, cb2: (b: B) => R): (a: A) => R;
    <A, B, C, R>(cb1: (a: A) => B, cb2: (b: B) => C, cb3: (c: C) => R): (a: A) => R;
    <A, B, C, D, R>(cb1: (a: A) => B, cb2: (b: B) => C, cb3: (c: C) => D, cb4: (c: D) => R): (a: A) => R;
    <A, B, C, D, E, R>(cb1: (a: A) => B, cb2: (b: B) => C, cb3: (c: C) => D, cb4: (c: D) => E, cb5: (data: E) => R): (a: A) => R;
}
export interface ICompose {
    <A, B, R>(cb2: (b: B) => R, cb1: (a: A) => B): (a: A )=> R;
    <A, B, C, R>(cb3: (c: C) => R, cb2: (B: B) => C, cb1: (a: A) => B): (a: A) => R;
    <A, B, C, D, R>(cb1: (a: D) => R, cb2: (b: C) => D, cb3: (c: B) => C, cb4: (c: A) => B): (a: A) => R;
    <A, B, C, D, E, R>(cb1: (a: E) => R, cb2: (b: D) => E, cb3: (c: C) => D, cb4: (c: B) => C, cb5: (data: A) => B): (a: A) => R;
}

export interface IFilter {
    <T>(callback: (item: T) => boolean, list: Array<T>): Array<T>;
    <T>(callback: (item: T) => boolean): (list: Array<T>) => Array<T>;
}

export interface IWhereEq {
    <T extends Record<keyof any, any>>(data: Partial<T>, item: T): boolean;
    <T extends Record<keyof any, any>>(data: Partial<T>): (item: T) => boolean;
}

export interface ICurry {
    <A, B, R>(cb: (a: A, b: B) => R): (a: A, b: B) => R;
    <A, B, R>(cb: (a: A, b: B) => R): (a: A) => (b: B) => R;
    <A, B, C, R>(cb: (a: A, b: B, c: C) => R): (a: A, b: B, c: C) => R;
    <A, B, C, R>(cb: (a: A, b: B, c: C) => R): (a: A, b: B) => (c: C) => R;
    <A, B, C, R>(cb: (a: A, b: B, c: C) => R): (a: A) => (b: B) => (c: C) => R;
}
