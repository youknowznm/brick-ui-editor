import * as React from 'react'

import {Button} from '@befe/brick'
// import '@befe/brick-comp-button/src/index.scss'

import getSvgByName from "../utils/getSvgByName";

export default class ComposedButton extends React.Component {

  static displayName = 'ComposedButton'

  static defaultProps = {
    children: '',
    type: 'normal',
    size: 'sm',
    color: 'normal',
    shape: 'normal',
    iconName: '',
    loadingIconName: '',
    disabled: false,
    loading: false,
    // width: 30,
    // height: 20,
  }

  render() {
    const {
      width,
      height,
      iconName,
      content,
      loadingIconName,
      ...restProps
    } = this.props
    return <Button
      className="composed-button"
      icon={getSvgByName(iconName)}
      loadingIcon={getSvgByName(loadingIconName)}
      {...restProps}
    />
  }
}
