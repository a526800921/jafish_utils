/// <reference path="./index.d.ts" />

export const isIphone: Jafish_Utils.VerifyResult = (ua: string) => ua.toLowerCase().indexOf('iphone') > -1
export const isIpad: Jafish_Utils.VerifyResult = (ua: string) => ua.toLowerCase().indexOf('ipad') > -1
export const isIOS: Jafish_Utils.VerifyResult = (ua: string) => isIphone(ua) || isIpad(ua)
export const isAndroid: Jafish_Utils.VerifyResult = (ua: string) => ua.toLowerCase().indexOf('android') > -1 || ua.toLowerCase().indexOf('adr') > -1
export const isWechat: Jafish_Utils.VerifyResult = (ua: string) => ua.toLowerCase().indexOf('micromessenger') > -1
export const isMac: Jafish_Utils.VerifyResult = (ua: string) => ua.toLowerCase().indexOf('mac os') > -1
