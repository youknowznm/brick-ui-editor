import * as React from 'react'

import {Option, OptionGroup, Select} from '../localBrickComps/Select'

import getSvgByName from "../utils/getSvgByName";

export default class ComposedSelect extends React.Component {

    static displayName = 'ComposedSelect'

    static defaultProps = {
        mode: 'single', // multiple
        size: 'sm', // 'xs' | 'sm' | 'md' | 'lg'
        placeholder: '',
        options: [
            {
                value: 'option_1',
                label: 'option_1',
                disabled: false,
            }
        ],





        textPrefix: '',
        textSuffix: '',
        value: '',
        disabled: false,
        type: 'text',
        status: 'normal',
    }

    render() {
        const {
            iconPrefix,
            iconSuffix,
            textPrefix,
            textSuffix,
            placeholder,
            value,
            disabled,
            type,
            status,
        } = this.props

        // 字符串前后缀优先级大于图标; 均不提供时, 不渲染
        let _prefix = null
        if (iconPrefix !== '') {
            _prefix = <Icon svg={getSvgByName(iconPrefix)} />
        }
        if (textPrefix !== '') {
            _prefix = <div>{textPrefix}</div>
        }

        let _suffix = null
        if (iconSuffix !== '') {
            _suffix = <Icon svg={getSvgByName(iconSuffix)} />
        }
        if (textSuffix !== '') {
            _suffix = <div>{textSuffix}</div>
        }

        return <Select
            className="composed-Select"
            value={value}
            onChange={() => {}}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            status={status}
            prefix={_prefix}
            suffix={_suffix}
        />
    }
}
