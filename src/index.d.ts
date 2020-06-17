declare namespace Jafish_Utils {
    interface Obj {
        [key: string]: any
    }

    type Callback<T> = () => Promise<T>
    type Resolve<T> = (res: T) => any

    interface CacheItem {
        callback: Callback
        resolve: Resolve
    }

    interface Cache {
        [key: string]: CacheItem[]
    }

    interface Runing {
        [key: string]: boolean
    }

    interface SubscribeQueueItem {
        id: number
        callback: Function
    }

    interface SubscribeItem {
        id: number
        queue: SubscribeQueueItem[]
    }

    interface Subscibes {
        [key: string]: SubscribeItem
    }
}