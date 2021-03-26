import {PopperProps} from '@befe/brick-comp-popper'

export type MenuItemId = string | number
export type MenuLayout = 'vertical' | 'horizontal' | 'vertical-right'
export type MenuSize = 'sm' | 'md'
export type PropsFromPopper = Pick<PopperProps, 'placement' | 'matchMinWidthToTarget'>
export type MultipleItemType = 'normal' | 'checkbox'