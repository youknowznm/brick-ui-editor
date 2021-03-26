import * as React from 'react';

export function initLabel(
    data: {
        [propName: string]: any
    },
    opts: {
        key: string
    }
)  {
    return {
        render() {
            return (
                <label>{data[opts.key]}</label>
            )
        }
    }
};