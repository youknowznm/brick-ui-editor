// @todo: @befe/utils
export interface StringKeyMap<T = string> {
    [key: string]: T
}

// @todo: @befe/utils
// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
type TypeList = string | number | boolean | undefined | null | void | {}
export const tuple = <T extends TypeList[]>(...types: T) => types
