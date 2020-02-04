/**
 * @file suggest
 * @author wujun07
 * @owner wujun07:2019-12-26
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

import {Menu, MenuPopper, MenuItemId, MenuPopperProps, MenuItem, Submenu} from '../Menu'
import {InputProps} from '@befe/brick-comp-input'
import {Input} from '@befe/brick-comp-input'
import {createDelayHandler, pick, safeInvoke} from '@befe/brick-utils'
import {debounce, isUndefined} from 'lodash-es'
import {ConfigContext, createComponentLocale, getDefaultValueUsingContextTheme} from '@befe/brick-comp-config-provider'
import {SvgDiscX, SvgSearch} from '@befe/brick-icon'
import {Icon} from '@befe/brick-comp-icon'
import {Button} from '@befe/brick-comp-button'
import {ifNodeContains} from '@befe/brick-utils/src/dom/index'

type SuggestPropsFromInput = Pick<InputProps, 'placeholder'>


const DEBOUNCE_WAIT = 300

const componentLocale = createComponentLocale('suggest', {
    'en_us': {
        'no_result': 'No Result',
    },
    'zh_cn': {
        'no_result': '无搜索结果',
    }
})

export interface SuggestOption {
    /**
     * 唯一标识
     */
    id: MenuItemId
    /**
     * 显示文字，用于已选择
     */
    label: string
    /**
     * 显示内容，用于选项，如不指定则使用 label
     */
    content?: React.ReactNode
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 子选项，只支持一层，用于 group
     */
    children?: SuggestOption[]
}

type SuggestValue = null | SuggestOption | SuggestOption[]

export interface SuggestProps extends SuggestPropsFromInput {
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
    value?: SuggestValue

    /**
     * 选中默认值
     */
    defaultValue?: SuggestValue

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
    onChange?: (value: SuggestValue) => void

    /**
     * 查询回调
     */
    onSearch?: (query: string) => Promise<SuggestOption[]>

    /**
     * loading 图标的延迟响应时间
     * 单位 ms
     * 0 为立即显示
     */
    loadingDelayInMS?: number

    /**
     * 是否使用 trimmed 过的 inputValue 作为 fetch 的 query 参数
     */
    trim?: boolean

    /**
     * 空字符串是是否进行 search
     * 设为 true 则空字符串在 focus 状态下亦会触发 search
     */
    shouldEmptySearch?: boolean
}

interface SuggestState {
    // value: SuggestValue
    selected: SuggestOption[]
    popperVisible: boolean
    loading: boolean
    fetched: boolean
    inputValue: string
    options: SuggestOption[]
}


/**
 * Suggest
 * @description brick component Suggest
 * @for-mobx
 */
export class Suggest extends React.Component<SuggestProps, SuggestState> {
    static displayName = 'Suggest'
    // static propTypes = {}
    static defaultProps = {
        mode: 'single',
        trim: true,
        placement: 'bottom-start',
        loadingDelayInMS: 300,
        disabled: false
    }

    static contextType = ConfigContext

    static getDerivedStateFromProps(nextProps: SuggestProps) {
        const {value} = nextProps
        if (isUndefined(value)) {
            return null
        }

        let selected: SuggestOption[] = []
        if (value) {
            selected = selected.concat(value)
        }
        return {selected}
    }

    context!: React.ContextType<typeof ConfigContext>
    state: SuggestState

    fetchId = 0
    focused = false

    refSuggest = React.createRef<HTMLDivElement>()
    refInput = React.createRef<Input>()

    blurDelayHandler = createDelayHandler(() => {
        // @todo: 依赖 timeout 终究不科学，且看有没更好的做法，暂且不处理
        // - blur 应有隐藏 popper 的处理，因为用户可能用 tab 键离开（而不是通过鼠标点击离开）
        // - blur 的隐藏操作须延时处理且时间不能太短，否则 popper 立即隐藏，点击无法触及菜单项
        // this.hideMenuPopper()
        // this.resetInputValue()
    }, 120)

    loadingDelayHandler = createDelayHandler(() => {
        this.setState({
            loading: true
        })
    }, this.props.loadingDelayInMS)

    constructor(props: SuggestProps) {
        super(props)

        const {mode, value, defaultValue} = props
        let initialValue = isUndefined(value) ? defaultValue : value
        let selected: SuggestOption[] = []
        let inputValue = ''

        if (isUndefined(initialValue)) {
            initialValue = mode === 'multiple' ? [] : null
        }
        if (initialValue) {
            selected = selected.concat(initialValue)
            inputValue = mode === 'multiple' ? '' : (initialValue as SuggestOption).label
        }

        this.state = {
            selected,
            options: [],
            popperVisible: false,
            loading: false,
            fetched: false,
            inputValue,

        }
    }

    get className() {
        const {className, disabled} = this.props
        return c(
            'brick-suggest',
            {
                ['brick-suggest-disabled']: disabled
            },
            className
        )
    }

    get size() {
        return getDefaultValueUsingContextTheme(this, 'size', 'defaultSize')
    }

    get nodeInput() {
        return this.refInput.current
    }

    get value() {
        const {selected} = this.state
        if (this.isMultiple) {
            return selected
        }

        return selected[0] || null
    }


    get isMultiple() {
        return this.props.mode === 'multiple'
    }

    get isLoading() {
        return this.state.loading
    }

    get isFetched() {
        return this.state.fetched
    }

    get hasSelected() {
        return !!this.state.selected.length
    }

    get menuPopperProps(): MenuPopperProps {
        return {
            className: c('brick-suggest-options-popper'),
            targetContent: this.renderTarget(),
            size: this.size,
            visible: this.state.popperVisible,
            onChange: this.handlePopperVisibleChange,
            loading: this.isLoading,
            emptyHint: this.isFetched ? this.getLocaleText('no_result') : null,
            type: 'click'
        }
    }

    get selectedIds() {
        return this.state.selected.map(opt => opt.id)
    }

    handlePopperVisibleChange = (popperVisible: boolean, e: Event | React.SyntheticEvent) => {
        if (this.props.disabled) {
            return
        }

        // 显示的行为另行控制
        // 点击 suggest 本身时不要 toggle false
        if (!popperVisible && !ifNodeContains(this.refSuggest.current, e.target as Node)) {
            this.hideMenuPopper()
        }
    }

    handleChangeSelectedIds = (selectedIds: MenuItemId[]) => {
        const selected = selectedIds
            .map(id => this.findOption(id))
            .filter(Boolean) as SuggestOption[]


        if (isUndefined(this.props.value)) {
            this.setState({
                selected
            })
        }

        const value = this.getValue(selected)

        if (!this.isMultiple && selected.length) {
            this.hideMenuPopper()
        }
        safeInvoke(this.props.onChange, value)
    }

    handleBlurInput = (e: React.FocusEvent) => {
        this.focused = false
        this.blurDelayHandler()
    }

    handleFocusInput = (e: React.FocusEvent) => {
        this.focused = true
        this.setState({
            popperVisible: true
        })

        const {inputValue} = this.state
        if (!inputValue) {
            this.search('')
        }
        else if (this.nodeInput) {
            this.nodeInput.elemInput.select()
        }
    }

    handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value

        if (!inputValue && !this.isMultiple) {
            this.clearSelection()
        }

        this.setState({
            inputValue,
            popperVisible: true
        })
        this.search(inputValue)
    }

    handleClickClear = (e: React.MouseEvent) => {
        this.clearSelection()
        this.clearBlurTimer()
        this.setState({
            inputValue: ''
        })
        this.reset()
        setTimeout(() => {
            this.focus()
        })
    }

    search = debounce((inputValue) => {
        if (inputValue && this.props.trim) {
            inputValue = inputValue.trim()
        }
        if (inputValue || this.props.shouldEmptySearch) {
            this.fetch(inputValue)
        }

    }, DEBOUNCE_WAIT)

    getLocaleText(key: string, ...args: []): string {
        return safeInvoke(this.context.getLocaleText, componentLocale, key, ...args) || ''
    }

    getValue(selected = this.state.selected) {
        if (this.isMultiple) {
            return selected
        }

        return selected && selected[0] || null
    }

    findOption(id: MenuItemId, options: SuggestOption[] = this.state.options): SuggestOption | null {
        for (let i = options.length; i-- > 0;) {
            const opt = options[i]
            const {children} = opt
            if (opt.id === id) {
                return opt
            } else if (!isUndefined(children)) {
                const found = this.findOption(id, children)
                if (found) {
                    return found
                }
            }
        }

        return null
    }

    fetch(query: string) {
        this.loadingDelayHandler()
        this.setState({
            fetched: false,
            options: [] // necessary
        })
        return new Promise<SuggestOption[]>((resolve) => {
            const currentId = ++this.fetchId

            const fetchPromise = safeInvoke(this.props.onSearch, query)
            if (fetchPromise) {
                fetchPromise.then(options => {
                    if (currentId === this.fetchId) {
                        resolve(options)
                    }
                })
            }
        }).then(options => {
            this.setState({
                options
            })
        }).finally(() => {
            this.loadingDelayHandler.clear()
            this.setState({
                loading: false,
                fetched: true
            })
        })
    }

    clearSelection() {
        this.setState({
            selected: []
        })

        safeInvoke(this.props.onChange, this.getValue([]))
    }

    clearBlurTimer() {
        if (this.blurDelayHandler) {
            this.blurDelayHandler.clear()
        }
    }

    autoResetInputValue() {
        if (!this.focused) {
            this.resetInputValue()
        }
    }

    resetInputValue(value = this.getValue()) {
        let inputValue = ''
        if (!this.isMultiple && value) {
            inputValue = value && (value  as SuggestOption).label || ''
        }

        if (inputValue !== this.state.inputValue) {
            this.setState({
                inputValue
            })
        }
    }

    hideMenuPopper() {
        this.setState({
            popperVisible: false
        })
        this.resetInputValue()
        this.reset()
    }

    reset() {
        this.loadingDelayHandler.clear()
        this.setState({
            loading: false,
            fetched: false,
            options: []
        })
    }

    focus() {
        const nodeInput = this.nodeInput
        if (nodeInput) {
            nodeInput.focus()
        }
    }

    blur() {
        const nodeInput = this.nodeInput
        if (nodeInput) {
            nodeInput.blur()
        }
    }

    renderInputSuffix() {
        return this.state.inputValue && !this.props.disabled
            ? <Button
                className={'brick-suggest-clear-button'}
                icon={SvgDiscX}
                type={'plain'}
                onClick={this.handleClickClear}
            />
            : <Icon className={'brick-suggest-search-icon'} svg={SvgSearch} />
    }

    renderSingleSelection() {
        const inputProps = {
            ...pick(this.props, ['placeholder']),
            value: this.state.inputValue,
            disabled: this.props.disabled,
            onFocus: this.handleFocusInput,
            onBlur: this.handleBlurInput,
            onChange: this.handleChangeInput,
            suffix: this.renderInputSuffix()
        }
        return <Input {...inputProps} ref={this.refInput} />
    }

    renderMultipleSelection() {
        return null
    }

    renderSelection() {
        return this.isMultiple
            ? this.renderMultipleSelection()
            : this.renderSingleSelection()
    }

    renderMenuItem(opt: SuggestOption) {
        const {id, label, content} = opt
        const itemProps = pick(opt, ['id', 'disabled'])
        Object.assign(itemProps, {
            className: 'brick-suggest-option'
        })
        return <MenuItem key={id}{...itemProps}>{content || label}</MenuItem>
    }

    renderMenuItemGroup(opt: SuggestOption) {
        const {id, label, content, children} = opt
        if (!children || !children.length) {
            return null
        }
        return <Submenu
            key={id} type={'group'}
            itemContent={content || label}
        >
            {children.map(child => this.renderMenuItem(child))}
        </Submenu>
    }

    renderOptions() {
        const {options} = this.state
        if (!options || !options.length) {
            return null
        }
        return options.map((opt, index) => {
            return isUndefined(opt.children)
                ? this.renderMenuItem(opt)
                : this.renderMenuItemGroup(opt)

        })
    }

    renderNoOptions() {
        let content
        if (this.isLoading) {
            content = 'loading'
        }
        else if (this.isFetched) {
            content = 'not found'
        }

        return content
            ? <div className={'brick-suggest-no-option'}>{content}</div>
            : null
    }

    renderPopper() {
        const {mode} = this.props
        const options = this.renderOptions()

        return options
            ? <Menu
                multiple={mode === 'multiple'}
                selectedIds={this.selectedIds}
                onChangeSelectedIds={this.handleChangeSelectedIds}
            >
                {options}
            </Menu>
            : null
    }

    renderTarget() {
        return (
            <div className={this.className} ref={this.refSuggest}>
                {this.renderSelection()}
            </div>
        )
    }

    componentDidMount(): void {
        this.autoResetInputValue()
    }

    componentDidUpdate(prevProps: Readonly<SuggestProps>, prevState: Readonly<SuggestState>, snapshot?: any): void {
        this.autoResetInputValue()
    }

    render() {
        return (
            <MenuPopper {...this.menuPopperProps}>
                {this.renderPopper()}
            </MenuPopper>
        )
    }
}
