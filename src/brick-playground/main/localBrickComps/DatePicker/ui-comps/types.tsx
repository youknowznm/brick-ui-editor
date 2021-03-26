import {Dayjs} from 'dayjs';

export type TypePickerContentType = 'date' | 'year' | 'year-month' | 'month' | 'quarter';

export type TypeLayoutItem = {
    key: string | number
    text: string | number
    data?: {
        type: TypePickerContentType
        date: Dayjs
        outside?: boolean
    }
};

export type TypeAsideItem = {
    key: string | number
    text: string | number
};

export type TypeUIAsideProps = {
    itemKeySelected: string | number
    asideItems: Array<TypeAsideItem>
    onFetchPrev?: () => Array<TypeAsideItem>
    onFetchNext?: () => Array<TypeAsideItem>
    onChange?: (key: string | number, item?: TypeAsideItem) => void
};

export type TypeUIAsideState = {
    isHovering: boolean
    paddingLeft: number | null
};

export type TypeItemStatus = {
    /**
     * 选择状态
     */
    selected?: boolean

    /**
     * 禁用状态
     */
    disabled?: boolean

    /**
     * 上个月 / 下个月的选项 (只有日期内容有效)
     */
    outside?: boolean

    /**
     * 是否今日 (只有日期内容有效)
     */
    today?: boolean

    /**
     * 范围状态
     */
    rangeType?: 'single' | 'start' | 'inside' | 'end'
};

export type TypeItemEvent = {
    onClick?: (itemValue: number) => void
    onClickOutside?: (itemValue: number) => void
}
