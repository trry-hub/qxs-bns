export { isVNode } from 'vue'

export const isUndefined = (val: any): val is undefined => val === undefined
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isNumber = (val: any): val is number => typeof val === 'number'

export function isElement(e: unknown): e is Element {
  if (typeof Element === 'undefined') {
    return false
  }
  return e instanceof Element
}

export function isWindow(val: unknown): val is Window {
  return val === window
}
