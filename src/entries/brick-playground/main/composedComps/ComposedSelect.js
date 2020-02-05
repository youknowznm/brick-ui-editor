import * as React from 'react'

import {Option, OptionGroup, Select} from '../localBrickComps/Select'

export default class ComposedSelect extends React.Component {

    static displayName = 'ComposedSelect'

    static defaultProps = {
        mode: 'single', // multiple
        size: 'sm', // 'xs' | 'sm' | 'md' | 'lg'
        placeholder: '',
        // maxNumber: 2,
        // placement: 'left',
        disabled: false,
        options: [], // value, label
        group1Label: '',
        group1Type: 'group', // popper
        group1Options: [],
        group2Label: '',
        group2Type: 'group', // popper
        group2Options: [],
        group3Label: '',
        group3Type: 'group', // popper
        group3Options: [],
    }

    render() {
        const {
            mode,
            size,
            placeholder,
            options,
            disabled,
            // maxNumber,
            // placement
        } = this.props

        let _options = options.slice()

        const processOptions = index => {
            const groupLabel = this.props[`group${index}Label`]
            const groupType = this.props[`group${index}Type`]
            const groupOptions = this.props[`group${index}Options`]
            if (groupOptions.length > 0) {
                _options.push({
                    value: groupLabel,
                    label: groupLabel,
                    children: groupOptions
                })
            }
        }

        for (let i = 0; i < 3; i++) {
            processOptions(i + 1)
        }

        return <Select
            className="composed-select"
            placeholder={placeholder}
            disabled={disabled}
            mode={mode}
            // status={'error'}
            // placement={placement}
            // maxNumber={maxNumber}
            size={size}
            options={_options}
        />
    }
}
