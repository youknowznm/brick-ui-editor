import {action} from 'mobx';
import * as React from 'react';
import {Input} from '@befe/brick-comp-input/src/index';
export function initTextInput(
    data: {
        [propName: string]: any
    },
    opts: {
        key?: string
        getValue?: () => string
        placeholder?: string
        onChange?: (value: string) => void
    }
) {
    function getValue(): string {
        if (opts.key) {
            return data[opts.key];
        }
        return opts.getValue!();
    }
    const handleChange = action((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (opts.key) {
            data[opts.key] = value;
            // console.log('data model', data);
            return;
        }
        opts.onChange!(value);
    });
    const placeholder = opts.placeholder ? opts.placeholder : '';
    return {
        render(){
            return <Input
                value={getValue()}
                onChange={handleChange}
                placeholder={placeholder}
            />;
        }
    };
}
