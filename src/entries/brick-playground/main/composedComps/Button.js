import * as React from 'react'

import {Button} from '@befe/brick'
import getSvgByName from "../utils/getSvgByName";

export default class ComposedButton extends React.Component {

    static displayName = 'ComposedButton'

    static defaultProps = {
        width: 30,
        height: 20,
        children: '',
        type: 'normal',
        size: 'sm',
        color: 'normal',
        shape: 'normal',
        iconName: '',
        loadingIconName: '',
        disabled: false,
        loading: false,
    }

    render() {
        const {
            width,
            height,
            iconName,
            loadingIconName,
            ...restProps
        } = this.props
        return <Button
            className="composed-button"
            style={{
                // width: `${width}px`
            }}
            icon={getSvgByName(iconName)}
            loadingIcon={getSvgByName(loadingIconName)}
            {...restProps}
        />
    }
}
