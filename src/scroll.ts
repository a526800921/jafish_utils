import { addSubscribe, getSubscribe } from './subscribe'

const scrollLowerKey = 'utils/onScrollLower'

// 滚动到底部、右边
export const onScrollLower = (callback: Function): Function => addSubscribe(scrollLowerKey, callback)

// 滚动封装
let scrollTimer: boolean = false
export const onScroll = (e: Event, { useVertical = true } = {}) => {
    if (e.target instanceof HTMLDivElement) {
        const { offsetHeight, scrollHeight, scrollTop, scrollLeft } = e.target
        const diff = scrollHeight - offsetHeight - (useVertical ? scrollTop : scrollLeft)
        const bottom = 5 // 距离底部位置 px

        if (diff < bottom) {
            // 节流
            if (!scrollTimer) {
                scrollTimer = true
                setTimeout(() => scrollTimer = false, 1000)
                getSubscribe(scrollLowerKey).forEach(fn => fn())
            }
        }
    }
}
