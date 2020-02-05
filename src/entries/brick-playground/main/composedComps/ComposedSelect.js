import * as React from 'react'

import {Option, OptionGroup, Select} from '../localBrickComps/Select'

export default class ComposedSelect extends React.Component {

    static displayName = 'ComposedSelect'

    static defaultProps = {
        mode: 'single', // multiple
        size: 'sm', // 'xs' | 'sm' | 'md' | 'lg'
        placeholder: '',
        disabled: false,
        options: [],
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
            disabled
        } = this.props

        const renderTargetIndexGroup = index => {
            const groupLabel = this.props[`group${index}Label`]
            const groupType = this.props[`group${index}Type`]
            const groupOptions = this.props[`group${index}Options`]
            if (groupOptions.length > 0) {
                return <OptionGroup
                    label={groupLabel}
                    type={groupType}
                    mode={this.props.mode}
                >
                    {
                        groupOptions.map(item => {
                            return <Option
                                value={item.value}
                                disabled={item.disabled}
                            >
                                {item.label}
                            </Option>
                        })
                    }
                </OptionGroup>
            }
            return null
        }

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
            {renderTargetIndexGroup(1)}
            {renderTargetIndexGroup(2)}
            {renderTargetIndexGroup(3)}
        </Select>
    }
}
