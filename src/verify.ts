/// <reference path="./index.d.ts" />

// 验证手机号码
export const verifyPhone = (phone: string): boolean => /^1\d{10}$/.test(phone || '')
// 验证数字
export const verifyNumber = (num: number, { minLength = 0, maxLength = 0 } = {}): boolean => {
    if (!num && num !== 0) return false

    const _num = num + ''

    if (!/^[\d]+$/.test(_num)) return false
    if (minLength && _num.length < minLength) return false
    if (maxLength && _num.length > maxLength) return false

    return true
}

// 验证邮箱
export const verifyMail = (mail: string): boolean => /^[\w-]+@(\w+\.)+\w+$/.test(mail || '')

// 验证身份证
export const verifyIDCard = (idCard: string): boolean => /^\d{17}\w$/.test(idCard || '')

// 验证基础类型
export const isUndefined: Jafish_Utils.VerifyResult = data => data === void 0
export const isNull: Jafish_Utils.VerifyResult = data => data === null
export const isBoolean: Jafish_Utils.VerifyResult = data => typeof data === 'boolean'
export const isNumber: Jafish_Utils.VerifyResult = data => typeof data === 'number'
export const isNaN: Jafish_Utils.VerifyResult = data => isNumber(data) && data !== data
export const isString: Jafish_Utils.VerifyResult = data => typeof data === 'string'
export const isFunction: Jafish_Utils.VerifyResult = data => typeof data === 'function'
export const isObject: Jafish_Utils.VerifyResult = data => Object.prototype.toString.call(data) === '[object Object]'
export const isArray: Jafish_Utils.VerifyResult = data => Array.isArray(data)


