/// <reference path="./index.d.ts" />

// 深拷贝
export const deepValue = data => JSON.parse(JSON.stringify(data))
// 对象转查询参数
export const queryToStr = (data: Jafish_Utils.Obj): string => {
    if (!data) return ''

    const query = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&')

    return query.length > 0 ? `?${query}` : ''
}
// 查询参数转对象
export const queryToObj = (url: string): Jafish_Utils.Obj => {
    let search: string = url.split('?')[1] || ''
    search = search.split('#')[0]

    return search ? search.split('&').reduce((a, b) => {
        const [key, value] = b.split('=')

        if (!key || !value) return a

        a[key] = value

        return a
    }, {}) : {}
}
// 缓存
const setItem = (key: string, value: any, { long }) => (long ? localStorage : sessionStorage).setItem(key, JSON.stringify(value))
const getItem = (key: string, { long }): any => {
    const data = (long ? localStorage : sessionStorage).getItem(key)

    try {
        return JSON.parse(data)
    } catch (error) {
        console.error('getItem', error)
        return data
    }
}
const removeItem = (key: string, { long }): any => (long ? localStorage : sessionStorage).removeItem(key)

// 临时缓存
export const setItemUseSession = (key: string, value: any) => setItem(key, value, { long: false })
export const getItemUseSession = (key: string) => getItem(key, { long: false })
export const removeItemUseSession = (key: string) => removeItem(key, { long: false })
// 永久缓存
export const setItemUseLocal = (key: string, value: any) => setItem(key, value, { long: true })
export const getItemUseLocal = (key: string) => getItem(key, { long: true })
export const removeItemUseLocal = (key: string) => removeItem(key, { long: true })

// 填充
const fillNum = (num: number): string => num < 10 ? `0${num}` : `${num}`

// 格式化时间 2019.05.22 19:33:03
export const formatTime = (time: string | number | Date, { start = 0, end = void 0, split = '.', subsection = false } = {}): string => {
    const date = new Date(time)
    const YYYY = date.getFullYear()
    const MM = date.getMonth() + 1
    const DD = date.getDate()
    const tt = date.getHours()
    const mm = date.getMinutes()
    const ss = date.getSeconds()

    // 05.22 早
    if (subsection) {
        const type = tt < 11 ? '早' :
            tt >= 11 && tt < 13 ? '中' : '晚'

        return `${fillNum(MM)}${split}${fillNum(DD)} ${type}`
    }

    return `${YYYY}${split}${fillNum(MM)}${split}${fillNum(DD)} ${fillNum(tt)}:${fillNum(mm)}:${fillNum(ss)}`.slice(start, end)
}

// 填充数组，达到整数倍
export const fillArray = (arr: any[], fill = 3): any[] => {
	if (arr.length % fill === 0) return arr

	const diff = arr.length % fill
	const fillArr = new Array(fill - diff).fill(null)

	return arr.concat(fillArr)
}

// 解析url
export const urlParse = (url: string) => {
    let origin: string = ''
    let hash: string = ''
    let pathname: string = ''
    let search: string = ''

    const path = url.replace(/^\w+:\/\/[^/]+/, '')
    const searchIndex = path.indexOf('?')
    const hashIndex = path.indexOf('#')

    origin = url.slice(0, url.length - path.length)

    if (searchIndex === -1 && hashIndex === -1) pathname = path
    else if (searchIndex === -1) {
        pathname = path.slice(0, hashIndex)
        hash = path.slice(hashIndex)
    }
    else if (hashIndex === -1) {
        pathname = path.slice(0, searchIndex)
        search = path.slice(searchIndex)
    }
    else {
        pathname = path.slice(0, searchIndex)
        search = path.slice(searchIndex, hashIndex)
        hash = path.slice(hashIndex)
    }

    return { origin, hash, pathname, search }
}

