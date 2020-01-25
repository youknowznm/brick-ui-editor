import {ajax} from './ajax'

/**
 * erp 获取用户信息
 */
export const getUserContext = () => {
    return ajax.post('/bprouting/rest/api/user/context')
}

/**
 * 查询当前登陆用户基本信息
 */
export const getCurrentUser = () => {
    return ajax.get('/api/user/currentUser').then((res: any) => {
        if (res.code === 200) {
            return res.data;
        }
    })
};

/**
 * suggest用户信息
 */
export interface TypeSuggestParam {
    keyWord: string     //用户关键信息(如邮箱、uuap)
    pageSize: number    //展示条数，默认10条
    /*
    数据类型：

    1.USER[用户信息]

    2.COMPANY[公司信息]

    3.DEPARTMENT[部门信息]

    4.ORGANIZATION[hr组织信息]

    5.EMPLOYEE[员工信息]

    6.ACTIVE_RESULT[活动结果信息]

    7.TASK_ACTIVE[活动结果信息]
    */
    dataType: 'USER' | 'COMPANY'| 'DEPARTMENT' | 'ORGANIZATION' | 'EMPLOYEE' | 'ACTIVE_RESULT' | 'ACTIVE_RESULT'
        | 'TASK_ACTIVE'
}
export const postSuggest = (data: TypeSuggestParam): Promise<any> => {
    return ajax.post('/api/suggest', data).then((res: any) => {
        if (res.code === 200) {
            return res.data;
        }
    })
};

