function createClsUtil(prefix: string) {
    return function cls(...classNames: string[]) {
        if (classNames.length === 1) {
            return `${prefix}${classNames[0]}`;
        }
        return classNames.map(className => `${prefix}${className}`)
            .join(' ');
    };
}

export const cls = createClsUtil('brick-date-picker-');
export const brk = createClsUtil('brick-');
