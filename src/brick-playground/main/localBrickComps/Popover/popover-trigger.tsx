/**
 * @file popover-trigger
 * @author wujun07
 * @owner wujun07:2020-01-09
 */

import * as React from 'react'
// // import * as PropTypes from 'prop-types'
// import {default as c} from 'classnames'
import {PopperTrigger, PopperTriggerProps} from '@befe/brick-comp-popper'

import {Popover} from './popover'

// export interface PopoverTriggerProps extends PopperTriggerProps {
//
// }

/**
 * PopoverTrigger
 * @description brick component PopoverTrigger
 * @for-mobx
 */
export class PopoverTrigger extends PopperTrigger {
    isPopper(child: React.ReactNode) {
        return React.isValidElement(child) && child.type === Popover
    }
}
// export class PopoverTrigger extends React.Component<PopoverTriggerProps> {
//     static displayName = 'PopoverTrigger'
//     // static propTypes = {}
//     static defaultProps = {}
//
//     render() {
//         return (
//             <PopperTrigger {...this.props}>
//                 {this.props.children}
//             </PopperTrigger>
//         )
//     }
// }
