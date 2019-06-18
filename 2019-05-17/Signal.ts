export default class Signal<T> {

    private handlers: Array<{ callback: (data: T) => any, once: boolean }> = [];

    public on(callback: (data: T) => any): void {
        this.handlers.push({
            callback,
            once: false
         });
    }

    public once(callback: (data: T) => any): void {
        this.handlers.push({
            callback,
            once: true
         });
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
        this.handlers.forEach(obj => {
            obj.callback(data)
            if (obj.once) {
                this.off(obj.callback)
            }
        });
    }
}