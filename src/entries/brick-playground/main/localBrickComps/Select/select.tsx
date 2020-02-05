/**
 * @file select
 * @author wujun07
 * @owner wujun07:2019-11-07
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

import {Menu, MenuItemId, MenuPopperProps, MenuItemSelectAll} from '@befe/brick-comp-menu'
import {MenuPopper} from '../Menu'
import {ConfigContext, getDefaultValueUsingContextTheme} from '@befe/brick-comp-config-provider'
import {pick, pickDerivedStateFromProps, safeInvoke} from '@befe/brick-utils'
import {isArray, isUndefined} from 'lodash-es'
import {Icon} from '@befe/brick-comp-icon'
import {SvgPlainDown} from '@befe/brick-icon'
import {Option} from './option'
import {OptionGroup} from './option-group'
import {OptionObject, OptionValue, SelectValue} from './common'

export interface SelectProps {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 选择模式
     */
    mode?: 'single' | 'multiple'

    /**
     * 选中控制值
     */
    value?: SelectValue

    /**
     * 选中默认值
     */
    defaultValue?: SelectValue

    /**
     * 选项列表
     */
    options?: OptionObject[]

    /**
     * 最大选择个数
     * `mode` 为 `multiple` 时有效
     */
    maxNumber?: number

    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * 未选择占位提示
     */
    placeholder?: string

    /**
     * 尺寸
     */
    size?: 'xs' | 'sm' | 'md' | 'lg'

    /**
     * 选项列表弹出位置
     */
    placement?: MenuPopperProps['placement']

    /**
     * 值变化时的回调
     */
    onChange?: (value: SelectValue) => void
}

export interface SelectState {
    value: SelectValue
    popperVisible: boolean
}

function optionValuePropChecker(props: SelectProps,  propName: keyof SelectProps, componentName: string) {
    const {mode} = props
    const value = props[propName]
    if (isUndefined(value) || value === null) {
        return
    }

    const msg = `Invalid prop \`${propName}\` supplied to` +
        ` \`${componentName}\`. Validation failed.`

    switch (mode) {
        case 'multiple':
            return !isArray(value) && new Error(
                msg
                + ` typeof \`${propName}\` should be (string | number)[] | null`
                + ` while \`mode\` is multiple`
            )
        case 'single':
        default:
            return !['string', 'number'].includes(typeof value) && new Error(
                msg
                + ` typeof \`${propName}\` should be string | number | null`
                + ` while \`mode\` is 'single'`
            )
    }
}

/**
 * Select
 * @description brick component Select
 * @for-mobx
 */
export class Select extends React.Component<SelectProps, SelectState> {
    static displayName = 'Select'
    static propTypes = {
        value: optionValuePropChecker,
        defaultValue: optionValuePropChecker
    }
    static defaultProps = {
        className: '',
        mode: 'single',
        disabled: false
    }

    static context = ConfigContext

    static getDerivedStateFromProps(nextProps: SelectProps) {
        return pickDerivedStateFromProps(nextProps, ['value'])
    }

    state: SelectState

    context!: React.ContextType<typeof ConfigContext>

    // target = React.createRef<HTMLDivElement>()

    constructor(props: SelectProps) {
        super(props)
        const {mode, value, defaultValue} = props
        let initialValue = isUndefined(value) ? defaultValue : value

        if (isUndefined(initialValue)) {
            initialValue = mode === 'multiple' ? [] : null
        }

        this.state = {
            value: initialValue,
            popperVisible: false,
        }
    }

    get className() {
        const {className, disabled, mode} = this.props
        const size = this.size
        return c(
            'brick-select',
            {
                [`brick-select-mode-${mode}`]: mode,
                [`brick-select-size-${size}`]: size,
                ['brick-select-disabled']: disabled,
                ['brick-select-with-max-number']: this.withMaxNumber,
                ['brick-select-is-full']: this.isFull,

            },
            className
        )
    }

    get size(): SelectProps['size'] {
        return getDefaultValueUsingContextTheme(this,'size', 'defaultSize')!
    }

    get menuSize() {
        switch(this.size) {
            case 'lg':
            case 'md':
                return 'md'
            case 'sm':
            case 'xs':
            default:
                return 'sm'
        }
    }

    get withMaxNumber() {
        return this.props.mode === 'multiple' && !isUndefined(this.props.maxNumber)
    }

    get isFull() {
        const {mode, maxNumber} = this.props
        if (mode !== 'multiple' || isUndefined(maxNumber)) {
            return false
        }
        return this.withMaxNumber
            ? (this.state.value as []).length >= maxNumber
            : false
    }

    get menuPopperProps(): MenuPopperProps {
        return {
            className: c('brick-select-options-popper'),
            targetContent: this.renderTarget(),
            size: this.size,
            visible: this.state.popperVisible,
            // target: this.popperTargetGetter,
            onChange: this.handlerPopperVisibleChange,
            type: 'click'
        }
    }

    get hasValue() {
        const {value} = this.state
        return !!(
            this.props.mode === 'multiple'
            ? (value as OptionValue[]).length
            : value
        )
    }

    get options() {
        const {children, options} = this.props
        return isUndefined(options) ? this.normalizeOptions(children) : options
    }

    get isSelectedAll() {
        if (!this.isMultiple) {
            return false
        }
        const value = this.state.value as OptionValue[]
        const isAllSelected = (opt: OptionObject): boolean => {
            const {children} = opt
            if (opt.disabled) {
                 return true
            }
            if (isUndefined(children)) {
                return value.includes(opt.value)
            }
            return children.every(isAllSelected)
        }
        return this.options.every(isAllSelected)
    }

    get isMultiple() {
        return this.props.mode === 'multiple'
    }

    get selectedIds(){
        const {value} = this.state
        if (!value) {
            return []
        }
        if (this.isMultiple) {
            return (value as OptionValue[]).slice()
        }

        return (value ? [value] : []) as OptionValue[]
    }

    get selectedOptions() {
        const options = this.options
        return this.selectedIds
            .map(id => this.findOption(id, options))
            .filter(Boolean) as OptionObject[]
    }

    // popperTargetGetter = () => this.target.current

    handlerPopperVisibleChange = (popperVisible: boolean) => {
        if (this.props.disabled) {
            return
        }
        this.setState({
            popperVisible
        })
    }

    handleChangeSelectedIds = (selectedIds: OptionValue[]) => {
        const value: SelectValue = this.isMultiple
            ? selectedIds
            : selectedIds[0] || null

        if (isUndefined(this.props.value)) {
            this.setState({
                value
            })
        }

        if (!this.isMultiple && value) {
            this.setState({
                popperVisible: false
            })
        }
        safeInvoke(this.props.onChange, value)
    }

    handleClickSelectAll = (e: React.MouseEvent) => {
        let selectedIds: OptionValue[] = []
        if (!this.isSelectedAll) {
            selectedIds = this.selectedIds.slice()
            const doSelect = (opt: OptionObject) => {
                const {value, children} = opt
                if (!isUndefined(children)) {
                    children.forEach(doSelect)
                }
                else if (value && !opt.disabled && !selectedIds.includes(value)) {
                    selectedIds.push(value)
                }
            }

            this.options.forEach(doSelect)
        }

        this.handleChangeSelectedIds(selectedIds)
    }

    findOption(value: OptionValue, options: OptionObject[] = []): OptionObject | void {
        for (let i = options.length; i-- > 0; ) {
            const opt = options[i]
            const {children} = opt
            if (opt.value === value) {
                return opt
            }
            else if (!isUndefined(children)) {
                const found = this.findOption(value, children)
                if (found) {
                    return found
                }
            }
        }
    }

    normalizeOptions(children: React.ReactNode): OptionObject[] {
        const options = React.Children.map(children, opt => {
            if (React.isValidElement(opt)) {
                const {children, ...childProps} = (opt as React.ReactElement).props
                const option: OptionObject = pick(childProps, ['value', 'label', 'disabled', 'type'])

                if (opt.type === Option) {
                    option.label = children
                }
                else if (opt.type === OptionGroup && children) {
                    option.children = this.normalizeOptions(children)
                }

                return option
            }
        })


        return (options || []).filter(Boolean) as OptionObject[]
    }

    // getSelectedOption(value: OptionValue) {
    //     return this.findOption(value, this.options)
    // }

    renderSuffix() {
        return (
            <div className={'brick-select-suffix'}>
                <Icon className={'brick-select-suffix-arrow'} svg={SvgPlainDown} />
            </div>
        )
    }

    renderPlaceholder() {
        const {placeholder} = this.props
        return placeholder && !this.hasValue
            ? <div className={'brick-select-placeholder'}>{placeholder}</div>
            : null
    }

    renderSelected() {
        const selectedOptions = this.selectedOptions
        let selected = null
        if (selectedOptions.length) {
            selected = this.isMultiple
                ? selectedOptions.map(opt => opt.label).join('; ') + ';'
                : selectedOptions[0].label
        }
        return selected ? <div className={'brick-select-selected'} title={selected}>{selected}</div> : null
    }

    renderSelection(): React.ReactNode {
        return (
            <div className={'brick-select-selection'}>
                <div className={'brick-select-selected-wrap'}>
                    {this.renderPlaceholder()}
                    {this.renderSelected()}
                </div>
                {this.renderSuffix()}
            </div>
        )
    }

    renderTarget() {
        return (
            <div className={this.className}>
                {this.renderSelection()}
            </div>
        )
    }

    renderOptions = (options?: OptionObject[]) => {
        const {children} = this.props
        if (children) {
            return children
        }

        return options && options.map((opt, index) => {
            const {children, value, label} = opt
            return isUndefined(children)
                ? <Option key={value} {...pick(opt, ['value', 'disabled'])}>{label}</Option>
                : (
                    <OptionGroup key={`sub${index}`} {...pick(opt, ['type', 'label', 'disabled'])}>
                        {this.renderOptions(children)}
                    </OptionGroup>
                )
        })
    }

    renderSelectAllOption() {
        if (!this.isMultiple) {
            return null
        }

        const value = this.state.value as OptionValue[]
        const isSelectedAll = this.isSelectedAll
        const indeterminate = !isSelectedAll && !!value.length

        return (
            <MenuItemSelectAll
                onClick={this.handleClickSelectAll}
                selected={this.isSelectedAll}
                indeterminate={indeterminate}
            />
        )
    }

    renderPopper() {
        const {mode} = this.props
        const options = this.renderOptions(this.props.options)

        return (
            <Menu
                selectedIds={this.selectedIds}
                onChangeSelectedIds={this.handleChangeSelectedIds}
                size={this.menuSize}
                multiple={mode === 'multiple'}
                multipleItemType={'checkbox'}
            >
                {this.renderSelectAllOption()}
                {options}
            </Menu>
        )
    }

    render() {
        return (
            <MenuPopper {...this.menuPopperProps} size={this.size}>
                {this.renderPopper()}
            </MenuPopper>
        )
    }
}
