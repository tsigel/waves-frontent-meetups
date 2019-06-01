export class Signal<T> {

    private _handlers = [];

    public on(fn: (data: T) => any): void {
        this._handlers.push({
            fn,
            once: false
        });
    }

    public once(fn: (data: T) => any): void {
        this._handlers.push({
            fn,
            once: true
        });
    }

    public off(fnOff: (data: T) => any): void {
        this._handlers = this._handlers.filter(handler => handler.fn !== fnOff);
    }

    public dispatch(data: T): void {
        this._handlers.forEach(handler => {
            if (handler.once) {
                this.off(handler.fn)
            }
            handler.fn(data);
        });
    }
}