import {
    Button,
    Icon,
    Link,
    // Collapse,
    // Dialog,
    // Popover,
    Tabs,
    FileList,
    Table,
    Checkbox,
    DatePicker,
    Input,
    Radio,
    Select,
    Suggest,
    Switch,
    Textarea,
    Alert,
    Breadcrumb,
    HeadNav,
    Menu,
    Pagination
} from '@befe/brick'

import ComposedCollapse from './composedComps/ComposedCollapse'
import ComposedPopover from './composedComps/ComposedPopover'
import ComposedPopoverConfirm from './composedComps/ComposedPopoverConfirm'
import ComposedTabs from './composedComps/ComposedTabs'

import {Dialog} from './localBrickComps/Dialog'

export const DEMO_LIST_WIDTH = 820
export const DEMO_WRAP_DEFAULT_WIDTH = 760

export const COMP_TYPES = {
    Button: {
        enLabel: 'button',
        cnLabel: '按钮',
        Element: Button,
        editableProps: [
            {
                desc: '内容',
                key: 'children',
                type: 'string',
            },
            {
                desc: '类型',
                key: 'type',
                type: 'enum',
                options: [
                    {value: 'normal', label: '普通'},
                    {value: 'intensive', label: '加强'},
                    {value: 'important', label: '重要'},
                    {value: 'translucent', label: '半透明'},
                    {value: 'plain', label: '纯文字'},
                    // ghost: '幽灵'
                ],
                defaultValue: 'normal'
            },
            {
                desc: '尺寸',
                key: 'size',
                type: 'enum',
                options: [
                    {value: 'xs', label: '超小号'},
                    {value: 'sm', label: '小号'},
                    {value: 'md', label: '中号'},
                    {value: 'lg', label: '大号'},
                    {value: 'xl', label: '特大号'}
                ],
                defaultValue: 'sm'
            },
            {
                desc: '颜色',
                key: 'color',
                type: 'enum',
                options: [
                    {value: 'normal', label: '普通'},
                    {value: 'primary', label: '重要'},
                    {value: 'success', label: '成功'},
                    {value: 'error', label: '错误'},
                    {value: 'warning', label: '警告'},
                ],
                defaultValue: 'normal'
            },
            {
                desc: '形状',
                key: 'shape',
                type: 'enum',
                options: [
                    {value: 'normal', label: '普通'},
                    {value: 'capsule', label: '胶囊'},
                ],
                defaultValue: 'normal'
            },
            {
                desc: '图标',
                key: 'icon',
                type: 'svg',
            },
            {
                desc: '加载中图标',
                key: 'loadingIcon',
                type: 'svg',
            },
            {
                desc: '禁用',
                key: 'disabled',
                type: 'bool',
                defaultValue: false
            },
            {
                desc: '加载中',
                key: 'loading',
                type: 'bool',
                defaultValue: false
            },
        ],
    },
    Icon: {
        enLabel: 'icon',
        cnLabel: '图标',
        Element: Icon,
        editableProps: [
            {
                desc: '图标',
                key: 'svg',
                type: 'svg',
            },
        ],
    },
    Link: {
        enLabel: 'link',
        cnLabel: '链接',
        Element: Link,
        editableProps: [
            {
                desc: '内容',
                key: 'children',
                type: 'string',
            },
            {
                desc: '地址',
                key: 'href',
                type: 'string',
            },
            {
                desc: '类型',
                key: 'type',
                type: 'enum',
                options: [
                    {value: 'normal', label: '普通'},
                    {value: 'intensive', label: '加强'},
                ],
                defaultValue: 'normal'
            },
            {
                desc: '尺寸',
                key: 'size',
                type: 'enum',
                options: [
                    {value: 'sm', label: '小号'},
                    {value: 'md', label: '中号'},
                ],
                defaultValue: 'sm'
            },
            {
                desc: '禁用',
                key: 'disabled',
                type: 'bool',
                defaultValue: false
            },
        ],
    },
    ComposedCollapse: {
        enLabel: 'collapse',
        cnLabel: '扩展面板',
        Element: ComposedCollapse,
        editableProps: [
            {
                desc: '图标位置',
                key: 'expandIconPosition',
                type: 'enum',
                options: [
                    {value: 'left', label: '左'},
                    {value: 'right', label: '右'},
                ],
            },
            {
                desc: '内容',
                key: 'data',
                type: 'array',
                columns: [
                    {
                        field: 'id',
                        title: 'ID',
                        columnType: 'string',
                    },
                    {
                        field: 'headline',
                        title: '标题',
                        columnType: 'string',
                    },
                    {
                        field: 'content',
                        title: '内容',
                        columnType: 'string',
                    },
                    {
                        field: 'extra',
                        title: '额外标题',
                        columnType: 'string',
                    },
                    {
                        field: 'disabled',
                        title: '禁用',
                        columnType: 'bool',
                        defaultValue: false
                    },
                ]
            },
        ]
    },
    Dialog: {
        enLabel: 'Dialog',
        cnLabel: '对话框',
        Element: Dialog,
        editableProps: [
            {
                key: 'headline',
                desc: '标题',
                type: 'string',
            },
            {
                key: 'children',
                desc: '内容',
                type: 'string',
            },
            {
                desc: '尺寸',
                key: 'size',
                type: 'enum',
                options: [
                    {value: 'xs', label: '超小号'},
                    {value: 'sm', label: '小号'},
                    {value: 'md', label: '中号'},
                    {value: 'lg', label: '大号'},
                    {value: 'xl', label: '特大号'}
                ],
                defaultValue: 'md'
            },
        ]
    },
    ComposedPopover: {
        enLabel: 'Popover',
        cnLabel: '弹出',
        Element: ComposedPopover,
        editableProps: [
            {
                key: 'placement',
                desc: '位置',
                type: 'enum',
                options: [
                    {value: 'top-start'},
                    {value: 'top'},
                    {value: 'top-end'},
                    {value: 'left-start',},
                    {value: 'right-start'},
                    {value: 'left'},
                    {value: 'right'},
                    {value: 'left-end'},
                    {value: 'right-end'},
                    {value: 'bottom-start'},
                    {value: 'bottom'},
                    {value: 'bottom-end'},
                ]
            },
            {
                key: 'content',
                desc: '内容',
                type: 'string',
            },
            {
                desc: '按钮内容',
                key: 'btnContent',
                type: 'string',
            },
            {
                desc: '按钮类型',
                key: 'btnType',
                type: 'enum',
                options: [
                    {value: 'normal', label: '普通'},
                    {value: 'intensive', label: '加强'},
                    {value: 'important', label: '重要'},
                    {value: 'translucent', label: '半透明'},
                    {value: 'plain', label: '纯文字'},
                    // ghost: '幽灵'
                ],
                defaultValue: 'normal'
            },
            {
                desc: '颜色',
                key: 'btnColor',
                type: 'enum',
                options: [
                    {value: 'normal', label: '普通'},
                    {value: 'primary', label: '重要'},
                    {value: 'success', label: '成功'},
                    {value: 'error', label: '错误'},
                    {value: 'warning', label: '警告'},
                ],
                defaultValue: 'normal'
            },
            {
                desc: '按钮尺寸',
                key: 'btnSize',
                type: 'enum',
                options: [
                    {value: 'xs', label: '超小号'},
                    {value: 'sm', label: '小号'},
                    {value: 'md', label: '中号'},
                    {value: 'lg', label: '大号'},
                    {value: 'xl', label: '特大号'}
                ],
                defaultValue: 'sm'
            },
        ]
    },
    ComposedPopoverConfirm: {
        enLabel: 'PopoverConfirm',
        cnLabel: '弹出确认',
        Element: ComposedPopoverConfirm,
        editableProps: [
            {
                key: 'confirmMessage',
                desc: '提示信息',
                type: 'string',
            },
            {
                key: 'confirmHeadline',
                desc: '标题',
                type: 'string',
            },
            {
                desc: '提示类型',
                key: 'confirmType',
                type: 'enum',
                options: [
                    {value: null, label: '普通'},
                    {value: 'info', label: '信息'},
                    {value: 'success', label: '成功'},
                    {value: 'error', label: '错误'},
                    {value: 'warning', label: '警告'},
                ],
                defaultValue: 'info'
            },
            {
                desc: '按钮类型',
                key: 'btnType',
                type: 'enum',
                options: [
                    {value: 'normal', label: '普通'},
                    {value: 'intensive', label: '加强'},
                    {value: 'important', label: '重要'},
                    {value: 'translucent', label: '半透明'},
                    {value: 'plain', label: '纯文字'},
                    // ghost: '幽灵'
                ],
                defaultValue: 'normal'
            },
            {
                desc: '按钮内容',
                key: 'btnContent',
                type: 'string',
            },
            {
                desc: '颜色',
                key: 'btnColor',
                type: 'enum',
                options: [
                    {value: 'normal', label: '普通'},
                    {value: 'primary', label: '重要'},
                    {value: 'success', label: '成功'},
                    {value: 'error', label: '错误'},
                    {value: 'warning', label: '警告'},
                ],
                defaultValue: 'normal'
            },
            {
                desc: '按钮尺寸',
                key: 'btnSize',
                type: 'enum',
                options: [
                    {value: 'xs', label: '超小号'},
                    {value: 'sm', label: '小号'},
                    {value: 'md', label: '中号'},
                    {value: 'lg', label: '大号'},
                    {value: 'xl', label: '特大号'}
                ],
                defaultValue: 'sm'
            },
        ]
    },
    ComposedTabs: {
        enLabel: 'Tabs',
        cnLabel: '标签页',
        Element: ComposedTabs,
        editableProps: [
            {
                desc: '类型',
                key: 'type',
                type: 'enum',
                options: [
                    {value: 'plain', label: '普通'},
                    {value: 'card', label: '卡片'},
                    {value: 'button-group', label: '按钮组'},
                ],
                defaultValue: 'plain'
            },
            {
                desc: '可添加',
                key: 'addable',
                type: 'bool',
                defaultValue: false
            },
            {
                desc: '尺寸',
                key: 'size',
                type: 'enum',
                options: [
                    {value: 'sm', label: '小号'},
                    {value: 'md', label: '中号'},
                ],
                defaultValue: 'sm'
            },
            {
                key: 'defaultActiveId',
                desc: '默认活动页 ID',
                type: 'string',
            },
            {
                desc: '内容',
                key: 'data',
                type: 'array',
                columns: [
                    {
                        field: 'label',
                        title: '标题',
                        columnType: 'string',
                    },
                    // TODO: 改成 enum?
                    {
                        field: 'status',
                        title: '状态',
                        columnType: 'string',
                    },
                    {
                        field: 'content',
                        title: '内容',
                        columnType: 'string',
                    },
                    {
                        field: 'disabled',
                        title: '禁用',
                        columnType: 'bool',
                        defaultValue: false
                    },
                    {
                        field: 'deletable',
                        title: '可删除',
                        columnType: 'bool',
                        defaultValue: false
                    },
                ]
            },
        ]
    },
    FileList: {
        enLabel: 'FileList',
        cnLabel: '文件列表',
        Element: FileList,
        editableProps: [
            {
                desc: '布局',
                key: 'layout',
                type: 'enum',
                options: [
                    {value: 'horizontal', label: '水平'},
                    {value: 'vertical', label: '垂直'},
                ],
                defaultValue: 'horizontal'
            },
            {
                desc: '可删除',
                key: 'useRemove',
                type: 'bool',
                defaultValue: false
            },
            {
                desc: '文件内容',
                key: 'data',
                type: 'array',
                columns: [
                    {
                        field: 'id',
                        title: 'ID',
                        columnType: 'string',
                    },
                    {
                        field: 'type',
                        title: '扩展名',
                        columnType: 'string',
                    },
                    {
                        field: 'name',
                        title: '文件名',
                        columnType: 'string',
                    },
                    {
                        field: 'progress',
                        title: '加载中',
                        columnType: 'bool',
                        defaultValue: false
                    },
                    {
                        field: 'error',
                        title: '错误信息',
                        columnType: 'string',
                    },
                ]
            },
        ]
    },
}
