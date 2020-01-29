declare module 'promise-throttle' {
    export default class PromiseThrottle {
        constructor(options?: {
            requestsPerSecond?: number;
        })

        add<T>(func: () => Promise<T>): Promise<T>
    }
}
