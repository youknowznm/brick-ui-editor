
export type paginationModel = {
    total: number | undefined
    pageNum: number | undefined
    pageSize: number | undefined
}


export type basicDataModel =  {
    userName: string,
    userUuap: string,
    userDepartment: string,
    entryDate: string | number,
    leaveDate: string | number,
    createdName: string,
    creationDate: string,
    lastUpdatedName: string,
    lastUpdateDate: string,
    inUse: string,
    inCompany: string
}

export type PersonSearchModel = {
    userUuap: string
    groupCode: string,
    ruleId: string,
    userStatus: string,
    inCompany: string,
    businessGroup: string,
    [propName: string]: any

}

export type SelectOptionsModel = {
    jobStatus: Array<object>,
    roles: Array<object>,
    status: Array<object>
    [propName: string]: any
}
