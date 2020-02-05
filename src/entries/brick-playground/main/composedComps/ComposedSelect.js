import * as React from 'react'

import {Option, OptionGroup, Select} from '../localBrickComps/Select'

import getSvgByName from "../utils/getSvgByName";

export default class ComposedSelect extends React.Component {

    static displayName = 'ComposedSelect'

    static defaultProps = {
        mode: 'single', // multiple
        size: 'sm', // 'xs' | 'sm' | 'md' | 'lg'
        placeholder: '',
        disabled: false,
        options: [
            {
                value: 'option_1',
                label: 'option_1',
                disabled: false,
            },
            {
                value: 'option_2',
                label: 'option_2',
                disabled: false,
            },
        ],
        group1Label: '',
        group1Type: 'group', // popper
        group1Options: [
            {
                value: 'option_11',
                label: 'option_11',
                disabled: false,
            },
            {
                value: 'option_22',
                label: 'option_22',
                disabled: false,
            },
        ],
        group2Label: '',
        group2Type: 'group', // popper
        group2Options: [
            {
                value: 'option_11',
                label: 'option_11',
                disabled: false,
            },
            {
                value: 'option_22',
                label: 'option_22',
                disabled: false,
            },
        ],
    }

    render() {
        const {
            mode,
            size,
            placeholder,
            options,
            group1Label,
            group1Type,
            group1Options,
            group2Label,
            group2Type,
            group2Options,
            disabled
        } = this.props

        return <Select
            className="composed-select"
            placeholder={placeholder}
            disabled={disabled}
            mode={mode}
            status={'error'}
            size={size}
        >
            {
                options.map(item => {
                    return <Option
                        value={item.value}
                        disabled={item.disabled}
                    >
                        {item.label}
                    </Option>
                })
            }
            <OptionGroup
                label={group1Label}
                type={group1Type}
                mode={mode}
            >
                {
                    group1Options.map(item => {
                        return <Option
                            value={item.value}
                            disabled={item.disabled}
                        >
                            {item.label}
                        </Option>
                    })
                }
            </OptionGroup>
            <OptionGroup
                label={group2Label}
                type={group2Type}
                mode={mode}
            >
                {
                    group2Options.map((item, index) => {
                        return <Option
                            key={index}
                            value={item.value}
                            disabled={item.disabled}
                        >
                            {item.label}
                        </Option>
                    })
                }
            </OptionGroup>
        </Select>
    }
}
