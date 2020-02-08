import * as React from 'react'

import {Icon} from '@befe/brick'
import getSvgByName from "../utils/getSvgByName";

import {SvgGear} from '@befe/brick-icon'

export default class ComposedIcon extends React.Component {

    static displayName = 'ComposedIcon'

    static defaultProps = {
        svgName: ''
    }

    render() {
        const {
            svgName,
            ...restProps
        } = this.props

        const svg = getSvgByName(svgName)

        return <Icon
            className="composed-icon"
            style={{
                // width: `${14}px`,
                // height: `${15}px`,
            }}
            svg={svg}
            {...restProps}
        />
    }
}
