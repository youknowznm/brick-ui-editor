import {action} from 'mobx';
import * as React from 'react';
import {Textarea} from '@befe/brick/src';

export function initTextArea(
    data: {
        [propName: string]: any
    },
    opts: {
        key?: string
        getValue?: () => string
        onChange?: (value: string) => void
        props?: {
            [propsName: string]: string | number | boolean
        }
    }
) {
    function getValue(): string {
        if (opts.key) {
            return data[opts.key];
        }
        return opts.getValue!();
    }
    const handleChange = action((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (opts.key) {
            data[opts.key] = value;
            // console.log('data model', data);
            return;
        }
        opts.onChange!(value);
    });
    return {
        render(){
            return <Textarea
                value={getValue()}
                onChange={handleChange}
                {...opts.props}
            />;
        }
    };
}