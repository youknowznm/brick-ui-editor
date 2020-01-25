import {observable} from 'mobx';
import * as React from 'react'
import {Select} from '@befe/brick';
type GenericDataModel = {
    [propName:string]: any
}
function selectionOptionManager() {
    const context = observable({
        options: observable.map()
    });
    return {
        getOptions(
            optionKey: string
        ): null | Array<{
            label: string
            value: any
        }> {
            const options = context.options.get(optionKey);
            if (!options) {
                return null;
            }
            return [...options];
        }
    };
}
export function initSelect(
    data: GenericDataModel,
    opts: {
        valueKey: string
        labelKey: string
        selectKey: string
    }
) {
    function getValue() {
        return data[opts.valueKey];
    }
    function getLabel() {
        const {labelKey} = opts;
        return data[labelKey];
    }
    function getOptions() {
        const value = getValue();
        const options = selectionOptionManager()
            .getOptions(opts.selectKey);
        if (options) {
            return options;
        }
        if (!value) {
            return [{value: '', label: '加载中...'}];
        }
        return [{
            label: getLabel(),
            value: getValue()
        }];
    }
    return {
        render() {
            return (
                <Select
                    value={getValue()}
                    options={getOptions()}
                />
            );
        }
    };
}
