import * as React from 'react'

import {Suggest} from '../localBrickComps/Suggest'

export default class ComposedSuggest extends React.Component {

    static displayName = 'ComposedSuggest'

    static defaultProps = {
        // mode: 'single', // multiple
        // size: 'sm', // 'xs' | 'sm' | 'md' | 'lg'
        disabled: false,
        placeholder: '',
        options: [], // id, label

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
            // mode,
            // size,
            placeholder,
            options,
            disabled,
        } = this.props

        let _options = options.slice()

        const processOptions = index => {
            const groupLabel = this.props[`group${index}Label`]
            const groupType = this.props[`group${index}Type`]
            const groupOptions = this.props[`group${index}Options`]
            if (groupOptions.length > 0) {
                _options.push({
                    id: groupLabel,
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
                    resolve(inputVal && inputVal.length < 7 ? _options : [])
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
