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
export const verifyIDCard = (idCard: string): boolean => /^\d{17}\w/.test(idCard || '')


