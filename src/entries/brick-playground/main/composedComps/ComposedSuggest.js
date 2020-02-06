import * as React from 'react'

import {Suggest} from '../localBrickComps/Suggest'

export default class ComposedSuggest extends React.Component {

    static displayName = 'ComposedSuggest'

    static defaultProps = {
        // mode: 'single', // multiple
        // size: 'sm', // 'xs' | 'sm' | 'md' | 'lg'
        disabled: false,
        placeholder: '',
        menuItems: [], // id, label
        group1Label: '',
        group1Type: 'group', // popper
        group1MenuItems: [],
        group2Label: '',
        group2Type: 'group', // popper
        group2MenuItems: [],
        group3Label: '',
        group3Type: 'group', // popper
        group3MenuItems: [],
    }

    render() {
        const {
            // mode,
            // size,
            placeholder,
            menuItems,
            disabled,
        } = this.props

        let options = menuItems.slice()

        const processOptions = index => {
            const groupLabel = this.props[`group${index}Label`]
            const groupType = this.props[`group${index}Type`]
            const groupOptions = this.props[`group${index}MenuItems`]
            if (groupOptions.length > 0) {
                options.push({
                    id: groupLabel,
                    type: groupType,
                    label: groupLabel,
                    children: groupOptions
                })
            }
        }

        for (let i = 0; i < 3; i++) {
            processOptions(i + 1)
        }

        const fakeSuggest = inputVal => new Promise(
            resolve => {
                setTimeout(() => {
                    resolve(inputVal && inputVal.length < 7 ? options : [])
                }, 1000)
            }
        )

        return <Suggest
            className="composed-suggest"
            placeholder={placeholder}
            disabled={disabled}
            onSearch={fakeSuggest}
            loadingDelayInMS={200}
            // mode={mode}
            // status={'error'}
            // size={size}
        />
    }
}
