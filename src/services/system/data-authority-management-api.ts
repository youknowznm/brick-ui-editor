import {ajax} from '../ajax'
import {AxiosResponse} from 'axios';

type Integer = number;
type TypeResponseInResponse<data> = {
    code: number
    message: string
    data: data
}
type TypeResponse<data> = {
    code: number
    message: string
    data: data
    response: AxiosResponse< TypeResponseInResponse<data> >
}

type TypeTableData<SingleData> = {
    "endRow"?: number
    "firstPage"?: number
    "hasNextPage"?: boolean
    "hasPreviousPage"?: boolean
    "isFirstPage"?: boolean
    "isLastPage"?: boolean
    "lastPage"?: number
    "navigateFirstPage"?: number
    "navigateLastPage"?: number
    "navigatePages"?: number
    "navigatepageNums"?: Array<number>
    "nextPage"?: number
    "pageNum"?: number
    "pageSize"?: number
    "pages"?: number
    "prePage"?: number
    "size"?: number
    "startRow"?: number
    "total"?: string
    "list"?: Array<SingleData>
}

type TypeEmptyRequest = TypeResponse<{}>

/**
 * 获取权限列表-Table
 */
export interface TypeDataAuthorityListQuery {
    authName?: string       //数据权限名称
    userUuap?: string       //用户uuap
    userId?: Integer	    //当需根据用户查询时，与uuap一起上传(对应suggest中的employeeId)
    pageNum: Integer        //页码
    pageSize: Integer       //页面显示条数
}
export interface DataAuthVO {
    infoId?: string	//主键
    authName?: string	//数据权限名称
    remarks?: string //备注
    lastUpdateDate?: string //最新修改时间
    lastUpdatedBy?: string  //最新修改人uuap
    lastUpdatedName?: string    // 最新修改人名称
    creationDate?: string   //创建时间
    createdBy?: string  //创建人uuap
    createdName?: string    //创建人名称
    options?: Array<string>  //操作集：user_config：用户配置auth_rule_config：规则配置edit：编辑delete：删除
}
export type TypeDataAuthorityList = TypeTableData<DataAuthVO>;
type TypeDataAuthorityListResponse = TypeResponse<TypeDataAuthorityList>

export const getDataAuthorityList = (data: TypeDataAuthorityListQuery): Promise<TypeDataAuthorityList> => {
    return ajax.post('/data_auth/view', data)
        .then((res: TypeDataAuthorityListResponse | AxiosResponse<TypeDataAuthorityListResponse>) => {
            const responseData = (res as TypeDataAuthorityListResponse).response.data;
            if (responseData.code === 200) {
                return responseData.data
            }
            return {}
        })
};

/**
 * 新建、编辑权限
 */
export interface TypeDataAuthorityOperationQuery {
    authName: string    //权限名称
    remarks?: string    //备注
    infoId?: string     //编辑时必传
}
type TypeDataAuthOperationResponse = TypeResponse<number>
export const postDataAuthOperation = (data: TypeDataAuthorityOperationQuery): Promise<TypeResponseInResponse<number>> => {
    return ajax.post('/data_auth/operation', data)
        .then((res: TypeDataAuthOperationResponse | AxiosResponse<TypeDataAuthOperationResponse>) => {
            return (res as TypeDataAuthOperationResponse).response.data;
        })
};

/**
 * 新建、编辑权限
 */
export interface TypeDataAuthDeleteQuery {
    infoId: string      //数据权限主键
    confirmed: string   //删除确认 Y已确认|N未确认
}
type TypeDataAuthDeleteResponse = TypeResponse<number>
export const deleteDataAuth = (data: TypeDataAuthDeleteQuery): Promise<TypeResponseInResponse<number>> => {
    return ajax.post('/data_auth/delete', data)
        .then((res: TypeDataAuthDeleteResponse | AxiosResponse<TypeDataAuthDeleteResponse>) => {
            return (res as TypeDataAuthDeleteResponse).response.data;
        })
};

/**
 * 配置用户
 * 页面信息初始化
 */
export interface TypeAuthUserConfigurePageQuery {
    infoId: string
}
export interface DataAuthUsersVO {
    infoId?: string	//数据权限主键
    authId?: string	//用户数据主键
    remarks?: string	//备注
    userAccount?: string	//用户uuap
    userName?: string	//用户名称
    departmentCode?: string	//部门code
    departmentName?: string	//部门名称
    userStatus?: string //	用户状态code
    userStatusName?: string	//用户状态
    dataStatus?: string	//数据状态code
    dataStatusName?: string	//数据状态
    startDate?: string	//启用时间
    endDate?: string	//停用时间
    lastUpdatedBy?: string	//最新修改人uuap
    lastUpdatedName?: string	//最新修改人名称
    lastUpdateDate?: string	//最新修改时间
    creationDate?: string	//创建时间
    createdBy?: string	//创建人uuap
    createdName?: string	//创建人名称
    options?: string[]	//edit: 编辑
}

export interface TypeAuthUserConfigurePageData {
    infoId?: string	//主键
    authName?: string	//数据权限名称
    remarks?: string //备注
    lastUpdateDate?: string // 最新修改时间
    lastUpdatedBy?: string //最新修改人uuap
    lastUpdatedName?: string //最新修改人名称
    creationDate?: string//创建时间
    createdBy?: string//创建人uuap
    createdName?: string//创建人名称
    users?: TypeTableData<DataAuthUsersVO>//用户列表DataAuthUsersVO
}

type TypeAuthUserConfigurePageRes = TypeResponse<TypeAuthUserConfigurePageData>
export const getAuthUserConfigurePage = (data: TypeAuthUserConfigurePageQuery): Promise<TypeAuthUserConfigurePageData> => {
    return ajax.get(`/data_auth/detail/${data.infoId}`)
        .then((res: TypeAuthUserConfigurePageRes | AxiosResponse<TypeAuthUserConfigurePageRes>) => {
            const responseData = (res as TypeAuthUserConfigurePageRes).response.data;
            if (responseData.code === 200) {
                return responseData.data
            }
            return {}
        })
};

/**
 * 配置用户
 * 页面信息初始化
 */
export interface TypeDataAuthUsersViewQuery {
    infoId: string  //数据权限主键ID
    showStop: boolean	//true:显示停用记录|false:不显示停用记录(默认)
    pageNum: Integer	//页码
    pageSize: Integer	//页面显示条数
}
export type TypeDataAuthUsersViewData = TypeTableData<DataAuthUsersVO[]>;
type TypeDataAuthUsersViewRes = TypeResponse<TypeDataAuthUsersViewData>;
export const postDataAuthUsersView = (data: TypeDataAuthUsersViewQuery): Promise<TypeDataAuthUsersViewData> => {
    return ajax.post('/data_auth/users/view', data)
        .then((res: TypeDataAuthUsersViewRes | AxiosResponse<TypeDataAuthUsersViewRes>) => {
            const responseData = (res as TypeDataAuthUsersViewRes).response.data;
            if (responseData.code === 200) {
                return responseData.data
            }
            return {}
        })
};

/**
 * 配置用户
 * 页面信息初始化
 */
export interface DataAuthUsersDTO {
    userUuap: string    //用户uuap

    userName: string    //用户姓名

    userEmail: string	//用户姓名
    userId: Integer     //用户唯一标识

    dataStatus: string  //数据状态

    startDate?: string  //启用时间

    endDate?: string    //停用时间

    remarks?: string    //备注
}
export interface TypeDataAuthUsersSaveQuery {
    infoId: string  //数据权限主键
    users: DataAuthUsersDTO[]   //待添加用户数组
    confirmed: string	//保存二次确认时使用 Y已确认|N未确认
}
type TypeDataAuthUsersSaveRes = TypeResponse<number>
export const postDataAuthUsersSave= (data: TypeDataAuthUsersSaveQuery): Promise<TypeDataAuthUsersSaveRes> => {
    return ajax.post('/data_auth/users/save', data)
        .then((res: TypeDataAuthUsersSaveRes | AxiosResponse<TypeDataAuthUsersSaveRes>) => {
            return res as TypeDataAuthUsersSaveRes;
        })
};