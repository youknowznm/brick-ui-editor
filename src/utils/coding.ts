// @todo: @befe/utils
// don't use it, it will not work for removing dead code in production building
// export const __DEV__ = process.env.NODE_ENV !== 'production'

// if (__DEV__) { /* dev only */} does not worked
// if (process.env.NODE_ENV !== 'production') { /* dev only */} worked
// if (isDev()) { /* dev only */} worked

// webpack treat `if (false) {}` as dead code but not `var f = false; if (f) {}`
// and webpack may
// transform `function f() {return false}; if (f()) {}` to `if (false) {}`
// before removing dead stage

// by the way, it seems react use their own babel processor to
// replaces __DEV__ with process.env.NODE_ENV !== 'production'
// which might be https://github.com/facebook/fbjs/blob/master/packages/babel-preset-fbjs/plugins/dev-expression.js

// it will work for removing dead code in production building
export function isDev() {
    return process.env.NODE_ENV !== 'production'
}

let warned: {
    [key: string]: string | boolean
} = {}
export function resetWarned() {
    warned = {}
}

export function codeWarning(condition: boolean, message: string, ...args: string[]) {
    if (!condition && message) {
        let argIdx = 0
        console.error(`Warning: ${message.replace(/%s/g, () => args[argIdx++])}`)
    }
}

export function codeWarningOnce(condition: boolean, message: string, ...args: string[]) {
    if (!warned[message]) {
        codeWarning(condition, message, ...args)
        warned[message] = !condition
    }
}
