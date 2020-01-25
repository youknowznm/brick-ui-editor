export type TaskListDialogModel = {
    visible: boolean
    handelCancel: () => void
    handleConfirm: (data: TaskModalFormValueModel) => void
    selectOptions: TaskListSelectOptions
}
// 查看form model
export type TaskListViewDialogModel = {
    visible: boolean
    handelCancel: () => void
    handleConfirm: () => void
    viewFormValue: {taskResults: Array<string>} & TaskModalFormValueModel
}


export type TaskModalFormValueModel = {
    taskId?: string
    name: string
    code: string
    codeName?: string
    lineStatus?: string
    lineStatusName?: string
    resultIds?: Array<string>
    dataStatus: string
    startDate: string
    endDate: string
    sortNumber: number | string
    remarks: string
    imageSystemCode: string // 影像系统状态代码
    staffCanSearch: string
    canTransferShare: string
    arrtibute1: string
    arrtibute1Remarks: string
    arrtibute2: string
    arrtibute2Remarks: string
    arrtibute3: string
    arrtibute3Remarks: string
    arrtibute4: string
    arrtibute4Remarks: string
    arrtibute5: string
    arrtibute5Remarks: string
    [propName: string]: any
}


export type TaskActivitySearchModel = {
    enableFlags: string[] | undefined | string
    resultIds: string[] | undefined | string
    bIds: string[] | undefined | string
    code: string
    name: string
    pageNum: undefined | number
    pageSize: undefined | number
    [propName: string]: any
}
// 活动状态select
export type TaskListSelectOptions = {
    statusOptions?: Array<object>
    lineResultOptions?: Array<object>
    lineStatusOptions?: Array<object>
    dataStatus?: Array<object>
    relatedBillStatus?: Array<object>
    [propName: string]: any
}

// 活动状态table列Model
export type taskTableRowModel = {
    taskId?: string
    code: string
    name: string
    dataStatus: string
    startDate?: string
    endDate?: string
    createdName?: string
    creationDate?: string
    remark?: string
    relatedBillStatus?: string
    relatedTaskResult?: Array<{name: string, dataStatusName: string}>
    lastUpdatedName?: string
    lastUpdateDate?: string
    [propName: string]: any
}

// 活动状态table列表

export type taskTableDataModel = {
    list: Array<taskTableRowModel>
    total: number | undefined
    pageNum: number | undefined
    pageSize: number | undefined
}


// 表格右侧操作栏字段
export type OperationsModel = {
    default_config?: string // 配置
    user_config?: string // 配置用户
    auth_rule_config?: string // 配置权限规则
    default_detail?: string // 查看详情
    edit?: string // 编辑
    delete?: string // 删除
    view_task?: string // 查看活动
    view_result?: string // 查看结果
    insert?: string // 添加
    view_three?: string // 查看三级
    insert_three?: string // 添加三级
    view_two?: string // 查看二级
    insert_two?: string // 添加二级
}
