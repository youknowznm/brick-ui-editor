export const COMP_TYPES = {
    Button: {
        cnLabel: '按钮',
        editableProps: [
            {
                desc: '内容',
                key: 'children',
                type: 'string',
                defaultValue: ''
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
                defaultValue: 'md'
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
        editableState: {

        },
    }
}
