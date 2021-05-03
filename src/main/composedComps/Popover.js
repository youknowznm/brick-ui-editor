import * as React from 'react'

import {Button} from '@befe/brick'
import {Popover} from "../localBrickComps/Popover";
// import '@befe/brick-comp-popover/src/index.scss'

export default class ComposedPopover extends React.Component {

  static displayName = 'ComposedPopover'

  static defaultProps = {
    placement: 'top',
    content: '内容',
    btnType: 'normal',
    btnContent: '按钮',
    btnSize: 'sm',
    btnColor: 'normal',
  }

  render() {
    const {
      placement,
      content,
      btnType,
      btnContent,
      btnSize,
      btnColor
    } = this.props

    return <Popover
      placement={placement}
      content={content}
    >
      <Button
        type={btnType}
        size={btnSize}
        color={btnColor}
      >
        {btnContent}
      </Button>
    </Popover>
  }
}
