export default class Signal<T> {

    private handlers: Array<any> = [];

    public on(callback: (data: T) => any): void {
        this.handlers.push({ callback });
    }

    public once(callback: (data: T) => any): void {
        const onceFunc = () => this.off(callback);
        this.on(callback);
        this.on(onceFunc);
    }

    public off(callback?: (data: T) => any): void {
        if (!callback) {
            this.handlers = [];
            return;
        }
        this.handlers = this.handlers
            .filter(obj => obj.callback !== callback);
    }

    public dispatch(data: T): void {
        this.handlers.forEach(obj => obj.callback(data));
    }
}