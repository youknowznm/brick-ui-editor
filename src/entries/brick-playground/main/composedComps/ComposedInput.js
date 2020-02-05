import * as React from 'react'

import {Input, Button, Icon} from '@befe/brick'
import getSvgByName from "../utils/getSvgByName";

export default class ComposedInput extends React.Component {

    static displayName = 'ComposedInput'

    static defaultProps = {
        iconPrefix: '',
        iconSuffix: '',
        textPrefix: '',
        textSuffix: '',
        placeholder: '',
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

        return <Input
            className="composed-input"
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
