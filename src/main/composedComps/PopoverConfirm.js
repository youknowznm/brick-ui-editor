import * as React from 'react'

import {Button} from '@befe/brick'
import {PopoverConfirm} from "../localBrickComps/Popover";
// import '@befe/brick-comp-popover/src/index.scss'

export default class ComposedPopoverConfirm extends React.Component {

    static displayName = 'ComposedPopoverConfirm'

    static defaultProps = {
        confirmMessage: '这是一段确认信息',
        confirmHeadline: '',
        confirmType: 'info',

        btnType: 'normal',
        btnContent: '按钮',
        btnSize: 'sm',
        btnColor: 'normal',
    }

    render() {
        return <PopoverConfirm
            type={this.props.confirmType}
            headline={this.props.confirmHeadline}
            message={this.props.confirmMessage}
        >
            <Button
                type={this.props.btnType}
                size={this.props.btnSize}
                color={this.props.btnColor}
            >
                {this.props.btnContent}
            </Button>
        </PopoverConfirm>
    }
}
