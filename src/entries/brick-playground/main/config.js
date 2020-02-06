import * as React from "react";

import {
    Button,
    Icon,
    Link,
    // Collapse,
    // Dialog,
    // Popover,
    Tabs,
    FileList,
    // Table,
    Checkbox,
    // DatePicker,
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

import ComposedCollapse from './composedComps/ComposedCollapse.js'
import ComposedPopover from './composedComps/ComposedPopover.js'
import ComposedPopoverConfirm from './composedComps/ComposedPopoverConfirm.js'
import ComposedTabs from './composedComps/ComposedTabs.js'
import ComposedTable from './composedComps/ComposedTable.js'
import ComposedCheckboxGroup from './composedComps/ComposedCheckboxGroup.js'
import ComposedRadioGroup from './composedComps/ComposedRadioGroup.js'
import ComposedInput from './composedComps/ComposedInput.js'
import ComposedSelect from './composedComps/ComposedSelect.js'
import ComposedSuggest from './composedComps/ComposedSuggest.js'
import ComposedIconSwitch from './composedComps/ComposedIconSwitch.js'
import ComposedTextarea from './composedComps/ComposedTextarea.js'
import ComposedAlert from './composedComps/ComposedAlert.js'
import ComposedBreadcrumb from './composedComps/ComposedBreadcrumb.js'
import ComposedHeadNav from './composedComps/ComposedHeadNav.js'

import {Dialog} from './localBrickComps/Dialog'
import {DatePicker} from './localBrickComps/DatePicker'

const getMenuConfigList = ({
    itemKey = 'id',
    showType = false
}) => {
    const menuConfigList = [{
        desc: '主菜单列表',
        key: 'menuItems',
        type: 'array',
        columns: [
            {
                title: '唯一标识',
                field: itemKey,
                columnType: 'string',
            },
            {
                title: '标签',
                field: 'label',
                columnType: 'string',
            },
        ]
    }]

    const typeEmumOptions = [
        {value: 'group', label: '列表'},
        {value: 'popper', label: '弹层'},
    ]

    const arrayEditorColumns = [
        {
            title: '唯一标识',
            field: itemKey,
            columnType: 'string',
        },
        {
            title: '标签',
            field: 'label',
            columnType: 'string',
        },
    ]

    let count
    for (let i = 0; i < 3; i++) {
        count = i + 1
        menuConfigList.push({
            desc: `菜单分组${count}标题`,
            key: `group${count}Label`,
            type: 'string',
        })
        if (showType) {
            menuConfigList.push({
                desc: `菜单分组${count}类型`,
                key: `group${count}Type`,
                type: 'enum',
                options: typeEmumOptions,
                defaultValue: 'group'
            })
        }
        menuConfigList.push({
            desc: `菜单分组${count}内容`,
            key: `group${count}MenuItems`,
            type: 'array',
            columns: arrayEditorColumns
        })
    }

    return menuConfigList
}

export const COMP_TYPES = {
    Button: {
        cnLabel: '按钮',
        enLabel: 'Button',
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
        cnLabel: '图标',
        enLabel: 'Icon',
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
        cnLabel: '链接',
        enLabel: 'Link',
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
        cnLabel: '扩展面板',
        enLabel: 'Collapse',
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
                        title: '唯一标识',
                        field: 'id',
                        columnType: 'string',
                    },
                    {
                        title: '标题',
                        field: 'headline',
                        columnType: 'string',
                    },
                    {
                        title: '内容',
                        field: 'content',
                        columnType: 'string',
                    },
                    {
                        title: '额外标题',
                        field: 'extra',
                        columnType: 'string',
                    },
                    {
                        title: '禁用',
                        field: 'disabled',
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
                desc: '标题',
                key: 'headline',
                type: 'string',
            },
            {
                desc: '内容',
                key: 'children',
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
        cnLabel: '弹出框',
        enLabel: 'Popover',
        Element: ComposedPopover,
        editableProps: [
            {
                desc: '位置',
                key: 'placement',
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
                desc: '内容',
                key: 'content',
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
        enLabel: 'Popover',
        // enLabel: 'PopoverConfirm',
        cnLabel: '弹出确认',
        Element: ComposedPopoverConfirm,
        editableProps: [
            {
                desc: '提示信息',
                key: 'confirmMessage',
                type: 'string',
            },
            {
                desc: '标题',
                key: 'confirmHeadline',
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
        cnLabel: '标签页',
        enLabel: 'Tabs',
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
                desc: '默认标签唯一标识',
                key: 'defaultActiveId',
                type: 'string',
            },
            {
                desc: '内容',
                key: 'data',
                type: 'array',
                columns: [
                    {
                        title: '标题',
                        field: 'label',
                        columnType: 'string',
                    },
                    // TODO: 改成 enum?
                    {
                        title: '状态',
                        field: 'status',
                        columnType: 'string',
                    },
                    {
                        title: '内容',
                        field: 'content',
                        columnType: 'string',
                    },
                    {
                        title: '禁用',
                        field: 'disabled',
                        columnType: 'bool',
                        defaultValue: false
                    },
                    {
                        title: '可删除',
                        field: 'deletable',
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
                        title: '唯一标识',
                        field: 'id',
                        columnType: 'string',
                    },
                    {
                        title: '扩展名',
                        field: 'type',
                        columnType: 'string',
                    },
                    {
                        title: '文件名',
                        field: 'name',
                        columnType: 'string',
                    },
                    {
                        title: '加载中',
                        field: 'progress',
                        columnType: 'bool',
                        defaultValue: false
                    },
                    {
                        title: '错误信息',
                        field: 'error',
                        columnType: 'string',
                    },
                ]
            },
        ]
    },
    ComposedTable: {
        enLabel: 'Table',
        cnLabel: '表格',
        Element: ComposedTable,
        editableProps: [
            {
                desc: '列定义',
                key: 'columns',
                type: 'array',
                columns: [
                    // {
                    //     field: 'key',
                    //     title: '列名称',
                    //     columnType: 'string',
                    // },
                    {
                        title: '列标题',
                        field: 'thContent',
                        columnType: 'string',
                    },
                    {
                        title: '对齐方式',
                        field: 'align',
                        columnType: 'string',
                    },
                    {
                        title: '固定',
                        field: 'fixed',
                        columnType: 'string',
                    },
                    {
                        title: '宽度',
                        field: 'width',
                        columnType: 'string',
                    },
                ]
            },
            {
                desc: '数据',
                key: 'data',
                type: 'array',
                columns: [
                    {
                        title: '第1列值',
                        field: 'key1',
                        columnType: 'string',
                    },
                    {
                        title: '第2列值',
                        field: 'key2',
                        columnType: 'string',
                    },
                    {
                        title: '第3列值',
                        field: 'key3',
                        columnType: 'string',
                    },
                    {
                        title: '第4列值',
                        field: 'key4',
                        columnType: 'string',
                    },
                    {
                        title: '第5列值',
                        field: 'key5',
                        columnType: 'string',
                    },
                    {
                        title: '第6列值',
                        field: 'key6',
                        columnType: 'string',
                    },
                    {
                        title: '第7列值',
                        field: 'key7',
                        columnType: 'string',
                    },
                    {
                        title: '第8列值',
                        field: 'key8',
                        columnType: 'string',
                    },
                    {
                        title: '第9列值',
                        field: 'key9',
                        columnType: 'string',
                    },
                ]
            },
            {
                desc: '首列复选框',
                key: 'useCheckbox',
                type: 'bool',
                defaultValue: false
            },
            {
                desc: '操作列按钮组',
                key: 'operationsLabelsJoined',
                type: 'string',
            },
        ]
    },
    ComposedCheckboxGroup: {
        enLabel: 'Checkbox',
        cnLabel: '复选框',
        Element: ComposedCheckboxGroup,
        editableProps: [
            {
                desc: '类型',
                key: 'type',
                type: 'enum',
                options: [
                    {value: 'normal', label: '普通'},
                    {value: 'intensive', label: '强调'},
                ],
                defaultValue: 'plain'
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
                desc: '数据',
                key: 'options',
                type: 'array',
                columns: [
                    {
                        title: '值',
                        field: 'value',
                        columnType: 'string',
                    },
                    {
                        title: '标签',
                        field: 'label',
                        columnType: 'string',
                    },
                    {
                        title: '选择',
                        field: 'checked',
                        columnType: 'bool',
                        defaultValue: false
                    },
                    {
                        title: '禁用',
                        field: 'disabled',
                        columnType: 'bool',
                        defaultValue: false
                    },
                    {
                        title: '部分选择',
                        field: 'indeterminate',
                        columnType: 'bool',
                        defaultValue: false
                    },
                ]
            }
        ]
    },
    DatePicker: {
        enLabel: 'DatePicker',
        cnLabel: '日期选择器',
        Element: DatePicker,
        editableProps: [
            {
                desc: '模式',
                key: 'mode',
                type: 'enum',
                options: [
                    {value: 'date', label: '常规'},
                    {value: 'month', label: '月份'},
                    {value: 'quarter', label: '季度'},
                ],
                defaultValue: 'date'
            },
            {
                desc: '状态',
                key: 'status',
                type: 'enum',
                options: [
                    {value: 'normal', label: '正常'},
                    {value: 'error', label: '错误'},
                ],
                defaultValue: 'normal'
            },
            {
                desc: '禁用',
                key: 'disabled',
                type: 'bool',
                defaultValue: false
            },
        ],
    },
    ComposedInput: {
        enLabel: 'Input',
        cnLabel: '输入框',
        Element: ComposedInput,
        editableProps: [
            {
                desc: '内容',
                key: 'value',
                type: 'string',
            },
            {
                desc: '宽度',
                key: 'width',
                type: 'string',
            },
            {
                desc: '占位符',
                key: 'placeholder',
                type: 'string',
            },
            {
                desc: '类型',
                key: 'type',
                type: 'enum',
                options: [
                    {value: 'text', label: '文字'},
                    {value: 'number', label: '数字'},
                    {value: 'tel', label: '电话'},
                    {value: 'email', label: '邮箱'},
                    {value: 'password', label: '密码'},
                ],
                defaultValue: 'text'
            },
            {
                desc: '状态',
                key: 'status',
                type: 'enum',
                options: [
                    {value: 'normal', label: '正常'},
                    {value: 'error', label: '错误'},
                ],
                defaultValue: 'normal'
            },
            {
                desc: '文本前缀',
                key: 'textPrefix',
                type: 'string',
            },
            {
                desc: '文本后缀',
                key: 'textSuffix',
                type: 'string',
            },
            {
                desc: '图标前缀',
                key: 'iconPrefix',
                type: 'svg',
            },
            {
                desc: '图标后缀',
                key: 'iconSuffix',
                type: 'svg',
            },
            {
                desc: '禁用',
                key: 'disabled',
                type: 'bool',
                defaultValue: false
            },
        ],
    },
    ComposedRadioGroup: {
        enLabel: 'Radio',
        cnLabel: '单选框',
        Element: ComposedRadioGroup,
        editableProps: [
            {
                desc: '类型',
                key: 'type',
                type: 'enum',
                options: [
                    {value: 'normal', label: '普通'},
                    {value: 'intensive', label: '强调'},
                ],
                defaultValue: 'plain'
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
                desc: '数据',
                key: 'options',
                type: 'array',
                columns: [
                    {
                        title: '值',
                        field: 'value',
                        columnType: 'string',
                    },
                    {
                        title: '标签',
                        field: 'label',
                        columnType: 'string',
                    },
                    {
                        title: '选择',
                        field: 'checked',
                        columnType: 'bool',
                        defaultValue: false
                    },
                    {
                        title: '禁用',
                        field: 'disabled',
                        columnType: 'bool',
                        defaultValue: false
                    },
                ]
            }
        ]
    },
    ComposedSelect: {
        enLabel: 'Select',
        cnLabel: '选项列表',
        Element: ComposedSelect,
        editableProps: [
            ...getMenuConfigList({
                itemKey: 'value',
                showType: true,
            })
        ]
    },
    ComposedSuggest: {
        enLabel: 'Suggest',
        cnLabel: '建议列表',
        Element: ComposedSuggest,
        editableProps: [
            ...getMenuConfigList({
                showType: false,
            })
        ]
    },
    Switch: {
        enLabel: 'Switch',
        cnLabel: '开关',
        Element: Switch,
        editableProps: [
            {
                desc: '状态',
                key: 'checked',
                type: 'bool',
                defaultValue: false
            },
            {
                desc: '尺寸',
                key: 'size',
                type: 'enum',
                options: [
                    {value: 'xs', label: '超小号'},
                    {value: 'sm', label: '小号'},
                    {value: 'md', label: '中号'},
                ],
                defaultValue: 'sm'
            },
            {
                desc: '开启状态标签',
                key: 'checkedLabel',
                type: 'string',
                defaultValue: ''
            },
            {
                desc: '关闭状态标签',
                key: 'uncheckedLabel',
                type: 'string',
                defaultValue: ''
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
        ]
    },
    ComposedIconSwitch: {
        enLabel: 'Switch',
        cnLabel: '开关',
        Element: ComposedIconSwitch,
        editableProps: [
            {
                desc: '状态',
                key: 'checked',
                type: 'bool',
                defaultValue: false
            },
            {
                desc: '尺寸',
                key: 'size',
                type: 'enum',
                options: [
                    {value: 'xs', label: '超小号'},
                    {value: 'sm', label: '小号'},
                    {value: 'md', label: '中号'},
                ],
                defaultValue: 'sm'
            },
            {
                desc: '使用图标标签',
                key: 'iconLabel',
                type: 'bool',
                defaultValue: false
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
        ]
    },
    ComposedTextarea: {
        enLabel: 'Textarea',
        cnLabel: '文本框',
        Element: ComposedTextarea,
        editableProps: [
            {
                desc: '内容',
                key: 'value',
                type: 'string',
            },
            {
                desc: '宽度',
                key: 'width',
                type: 'number',
            },
            {
                desc: '行数',
                key: 'rows',
                type: 'number',
            },
            {
                desc: '占位符',
                key: 'placeholder',
                type: 'string',
            },
            {
                desc: '最大输入长度',
                key: 'maxLength',
                type: 'number',
            },
            {
                desc: '状态',
                key: 'status',
                type: 'enum',
                options: [
                    {value: 'normal', label: '正常'},
                    {value: 'error', label: '错误'},
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
                desc: '允许溢出输入',
                key: 'allowOverflow',
                type: 'bool',
                defaultValue: false
            },
            {
                desc: '禁用',
                key: 'disabled',
                type: 'bool',
                defaultValue: false
            },
        ],
    },
    ComposedAlert: {
        enLabel: 'Alert',
        cnLabel: '提醒',
        Element: ComposedAlert,
        editableProps: [
            {
                desc: '类型',
                key: 'type',
                type: 'enum',
                options: [
                    {value: 'info', label: '信息'},
                    {value: 'success', label: '成功'},
                    {value: 'error', label: '错误'},
                    {value: 'warning', label: '警告'},
                ],
                defaultValue: 'info'
            },
            {
                desc: '使用图标',
                key: 'icon',
                type: 'bool',
                defaultValue: false
            },
            {
                desc: '允许关闭',
                key: 'closable',
                type: 'bool',
                defaultValue: false
            },
            {
                desc: '标题',
                key: 'headline',
                type: 'string',
            },
            {
                desc: '内容',
                key: 'content',
                type: 'string',
            },
            {
                desc: '宽度',
                key: 'width',
                type: 'number',
            },
        ],
    },
    ComposedBreadcrumb: {
        enLabel: 'Breadcrumb',
        cnLabel: '面包屑',
        Element: ComposedBreadcrumb,
        editableProps: [
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
                desc: '分隔符',
                key: 'divider',
                type: 'string',
            },
            {
                desc: '宽度',
                key: 'width',
                type: 'number',
            },
            {
                desc: '数据',
                key: 'data',
                type: 'array',
                columns: [
                    {
                        title: '标签',
                        field: 'label',
                        columnType: 'string',
                    },
                    {
                        title: '链接',
                        field: 'href',
                        columnType: 'string',
                    },

                ]
            }
        ]
    },
    ComposedHeadNav: {
        enLabel: 'HeadNav',
        cnLabel: '应用栏',
        Element: ComposedHeadNav,
        editableProps: [
            {
                desc: '项目名称',
                key: 'projectName',
                type: 'string',
            },
            {
                desc: '用户主要信息',
                key: 'userInfoPrimary',
                type: 'string',
            },
            {
                desc: '用户次要信息',
                key: 'userInfoSecondary',
                type: 'string',
            },
            {
                desc: '宽度',
                key: 'width',
                type: 'number',
            },
            ...getMenuConfigList({})
        ]
    }
}
