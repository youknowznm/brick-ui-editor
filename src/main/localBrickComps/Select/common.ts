import {MenuItemId} from '@befe/brick-comp-menu'
import * as React from 'react'
import {SelectOptionGroupProps} from './option-group'

export type OptionValue = MenuItemId

export interface OptionObject {
    value: OptionValue
    label: string
    disabled?: boolean
    type?: SelectOptionGroupProps['type']
    children?: OptionObject[]
}

export type SelectValue = null | OptionValue | OptionValue[] | OptionObject | OptionObject[]