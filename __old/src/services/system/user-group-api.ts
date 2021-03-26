import {ajax} from '../ajax'
import {TypeUserGroupList} from "../../entries/system/user-group/configureGroup/model";

type TypeRequest<data> = {
    code: number
    message: string
    data: data
}

type TypeEmptyRequest = TypeRequest<{}>

/**
 * 系统管理-获取用户组信息
 */
export const getUserGroup = (data: any): Promise<TypeRequest<TypeUserGroupList>> => {
    return ajax.post('/user_group/queryList', data)
        .then((res: any) => {
            if (res.code === 200 || res.code === '200') {
                return res
            }
        })
};

/**
 * 根据用户组编号初始化用户组信息
 */
export const getConfigureUserGroup = (data: any): Promise<TypeUserGroupList> => {
    return ajax.post('/user_group/init', data)
        .then((res: any) => {
            if (res.code === 200 || res.code === '200') {
                return res.data;
            }
        })
};

/**
 * 根据用户组编号初始化用户组信息
 */
export const postAddUserGroup = (data: any): Promise<TypeUserGroupList> => {
    return ajax.post('/user_group/addUserGroup', data)
        .then((res: any) => {
            if (res.code === 200 || res.code === '200') {
                return res.data;
            }
        })
};

/**
 * 编辑用户组
 */
export const postEditUserGroup = (data: any): Promise<TypeEmptyRequest> => {
    return ajax.post('/user_group/editGroup', data)
        .then((res: any) => {
            return res;
        })
};

/**
 * 删除用户组
 */
export const postDeleteUserGroup = (data: any): Promise<TypeEmptyRequest> => {
    return ajax.post('/user_group/deleteGroup', data)
        .then((res: any) => {
            return res;
        })
};

/**
 * 配置用户-用户组添加用户
 */
export const userGroupAddUser = (data: any): Promise<TypeEmptyRequest> => {
    return ajax.post('/user_group/addUser', data)
        .then((res: any) => {
            if (res.code === 200 || res.code === '200') {
                return res.message;
            }
        })
};
