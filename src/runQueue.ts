/// <reference path="./index.d.ts" />

// 拟多线程
const queue: Jafish_Utils.Cache = {}
const runing: Jafish_Utils.Runing = {}
const runQueue = async (key: string) => {
    const current = queue[key].shift()

    if (!current) return runing[key] = false

    runing[key] = true

    await Promise.race([
        Promise.resolve(current.callback())
            .then(res => current.resolve(res))
            .catch(err => console.error('runQueue', key, err))
        ,
        new Promise(resolve => setTimeout(resolve, 5000))
    ])

    runQueue(key)
}

const start = (key: string) => !runing[key] && runQueue(key)

export const addQueue = <T>(key: string, callback: Jafish_Utils.Callback<T>): Promise<T> => {
    if (!queue[key]) queue[key] = []

    return new Promise(resolve => {
        queue[key].push({
            callback,
            resolve,
        })

        start(key)
    })
}

