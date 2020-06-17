/// <reference path="./index.d.ts" />

// 发布订阅统一方法
const subscibes: Jafish_Utils.Subscibes = {}
// 添加订阅，返回取消订阅的方法
export const addSubscribe = (key: string, callback: Function): Function => {
	if (!subscibes[key]) subscibes[key] = {
		id: 0,
		queue: [],
	}

	const current = subscibes[key]
	const params = {
		id: current.id++,
		callback,
	}

	current.queue.push(params)

    // 取消订阅
	return () => {
        const index = current.queue.findIndex(item => item.id === params.id)
        
		if (index > -1) current.queue.splice(index, 1)
	}
}
// 获取订阅key下面的方法
export const getSubscribe = (key: string): Function[] => (subscibes[key] ? subscibes[key].queue : []).map(item => item.callback)

