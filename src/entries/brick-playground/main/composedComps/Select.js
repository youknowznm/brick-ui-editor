import * as React from 'react'

import {Select} from '../localBrickComps/Select'

const wrapComposedSelect = ({mode, displayName}) => {

    class ComposedSelect extends React.Component {

        static displayName = displayName

        static defaultProps = {
            // mode: 'single', // multiple
            size: 'sm', // 'xs' | 'sm' | 'md' | 'lg'
            placeholder: '',
            // maxNumber: 2,
            // placement: 'left',
            disabled: false,
            menuItems: [], // value, label
            group1Label: '',
            group1Type: 'group', // popper
            group1MenuItems: [],
            group2Label: '',
            group2Type: 'group', // popper
            group2MenuItems: [],
            group3Label: '',
            group3Type: 'group', // popper
            group3MenuItems: [],
            width: 180,
        }

        render() {
            const {
                // mode,
                size,
                placeholder,
                menuItems,
                width,
                disabled,
                // maxNumber,
                // placement
            } = this.props

            let options = menuItems.slice()

            const processOptions = index => {
                const groupLabel = this.props[`group${index}Label`]
                const groupType = this.props[`group${index}Type`]
                const groupMenuItems = this.props[`group${index}MenuItems`]
                if (groupMenuItems.length > 0) {
                    options.push({
                        value: groupLabel,
                        label: groupLabel,
                        type: groupType,
                        children: groupMenuItems
                    })
                }
            }

            for (let i = 0; i < 3; i++) {
                processOptions(i + 1)
            }

            return <div
                className="composed-select"
                style={{
                    width: `${width}px`
                }}
            >
                <Select
                    placeholder={placeholder}
                    disabled={disabled}
                    mode={mode}
                    // status={'error'}
                    // placement={placement}
                    // maxNumber={maxNumber}
                    size={size}
                    options={options}
                />
            </div>
        }
    }
    return ComposedSelect
}

export const ComposedSelectSingle = wrapComposedSelect({
    mode: 'single',
    displayName: 'ComposedSelectSingle'
})

export const ComposedSelectMultiple = wrapComposedSelect({
    mode: 'multiple',
    displayName: 'ComposedSelectMultiple'
})
