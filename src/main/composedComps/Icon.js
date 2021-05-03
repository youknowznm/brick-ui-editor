import * as React from 'react'

import {Icon} from '@befe/brick'
// import '@befe/brick-comp-icon/src/index.scss'
import getSvgByName from "../utils/getSvgByName";

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
        // height: `${14}px`,
      }}
      svg={svg}
      {...restProps}
    />
  }
}
