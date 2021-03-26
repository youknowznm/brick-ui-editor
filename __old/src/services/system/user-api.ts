import {ajax} from 'src/services/ajax'

type selectRequest = {
    [propName: string]: {code?: string, text?: string}[]
}
type selectOptionModel = {
    [propName: string]: {value?: string, label?: string}[]
}

export function initOptions(data: selectRequest) {
    let resultData:selectOptionModel = {};
    for(let key in data) {
        resultData[key] = data[key].map(item => ({value: item.code, label: item.text}));
        // resultData[key].unshift({value: undefined, label: '请选择'})
    }
    return resultData;
}

export const getUserTableList = (data: object) => {
    return ajax.post('/center_user/queryList', {
        ...data
    }).then((res: any) => {
        if (res.code && res.code === 200) {
           let list = [];
            return {
                list,
                total: res.data.total,
                pageSize: res.data.pageSize,
                pageNum: res.data.pageNum
            }
        }
    })
}

export const getUserConfigure = (data: object) => {
    return ajax.post('/center_user/deployInit', {
        ...data
    }).then((res: any) => {
        if (res.code && res.code === 200) {
            return res.data;
        }
    });
};

// 用户列表select信息
export const getSelectOptionsService = () => {
    return ajax.post('/center_user/selectInit', {}).then((res: any) => {
        if (res.code && res.code === 200) {

            return  initOptions(res.data);
        }
        return {}
    })
}

// 用户配置页表格
export const getUserTableData = (id: string | number, data: object) => {
    let url = '';
    switch (id) {
        case 'group':
            url = '/user_group/initUserGroups';
            break;
        case 'dataAuth':
            url = '/data_auth/users/auth_view';
            break;
        case 'role':
            url = '';
            break;
    }
    return ajax.post(url, {
        ...data
    }).then((res: any) => {
        if (res.code && res.code === 200) {
            return {
                id,
                list: res.data && res.data.list || [],
                total: res.total,
                pageSize: res.pageSize,
                pageNum: res.pageNum
            }
        }
    })
}

// 用户列表状态切换
export const userSwitchChange = (data:object) => {
    return ajax.post('/center_user/changeStatus', {
        ...data
    }).then(res => {
        return res;
    })
};
