import {
    Button,
    Icon,
    Link,
    // Collapse,
    Dialog,
    Popover,
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
            //     key: 'singleExpanded',
            //     key: 'defaultExpandedIds',
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
                        title: "ID",
                        columnType: 'string',
                    },
                    {
                        field: "headline",
                        title: "标题",
                        columnType: 'string',
                    },
                    {
                        field: "content",
                        title: "内容",
                        columnType: 'string',
                    },
                    {
                        field: "extra",
                        title: "额外标题",
                        columnType: 'string',
                    },
                    {
                        field: "disabled",
                        title: "禁用",
                        columnType: 'bool',
                        defaultValue: false
                    },
                ]
            },
        ]
    },
    // Dialog: {
    //     cnLabel: '对话框',
    //     Element: Dialog,
    //     editableProps: []
    // }
}
