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
           let list = [
                {
                    "boardRoles":[

                    ],
                    "businessGroup":"0",
                    "createdBy":"lixiang47",
                    "createdId":560386,
                    "createdName":"李翔",
                    "creationDate":1573709557000,
                    "dataPowers":[

                    ],
                    "departmentCode":"118000",
                    "entryDate":"2017-07-12",
                    "functionRoles":[

                    ],
                    "groups":[
                        "产品组"
                    ],
                    "inCompany":"1",
                    "inUse":"Y",
                    "ruleRoles":[

                    ],
                    "uId":9,
                    "userDepartment":"企业智能平台部",
                    "userEmail":"anchao01@baidu.com",
                    "userId":567881,
                    "userName":"安超",
                    "userStatus":"Y",
                    "userUuap":"anchao01"
                },
                {
                    "boardRoles":[

                    ],
                    "businessGroup":"0",
                    "createdBy":"lixiang47",
                    "createdId":560386,
                    "createdName":"李翔",
                    "creationDate":1573709557000,
                    "dataPowers":[

                    ],
                    "departmentCode":"118000",
                    "entryDate":"2017-06-21",
                    "functionRoles":[

                    ],
                    "groups":[
                        "产品组",
                        "运营组"
                    ],
                    "inCompany":"1",
                    "inUse":"Y",
                    "ruleRoles":[

                    ],
                    "uId":10,
                    "userDepartment":"企业智能平台部",
                    "userEmail":"liugang07@baidu.com",
                    "userId":487250,
                    "userName":"刘刚",
                    "userStatus":"Y",
                    "userUuap":"liugang07"
                },
                {
                    "boardRoles":[

                    ],
                    "businessGroup":"0",
                    "createdBy":"lixiang47",
                    "createdId":560386,
                    "createdName":"李翔",
                    "creationDate":1573882493000,
                    "dataPowers":[

                    ],
                    "departmentCode":"118000",
                    "entryDate":"2017-11-15",
                    "functionRoles":[

                    ],
                    "groups":[
                        "运营组"
                    ],
                    "inCompany":"1",
                    "inUse":"N",
                    "ruleRoles":[

                    ],
                    "uId":7,
                    "userDepartment":"企业智能平台部",
                    "userEmail":"liuwei44@baidu.com",
                    "userId":357986,
                    "userName":"刘伟",
                    "userStatus":"Y",
                    "userUuap":"liuwei44"
                },
                {
                    "boardRoles":[

                    ],
                    "businessGroup":"0",
                    "createdBy":"lixiang47",
                    "createdId":560386,
                    "createdName":"李翔",
                    "creationDate":1573709557000,
                    "dataPowers":[

                    ],
                    "departmentCode":"118000",
                    "entryDate":"2017-06-14",
                    "functionRoles":[

                    ],
                    "groups":[
                        "运营组"
                    ],
                    "inCompany":"1",
                    "inUse":"Y",
                    "ruleRoles":[

                    ],
                    "uId":8,
                    "userDepartment":"企业智能平台部",
                    "userEmail":"lixiang47@baidu.com",
                    "userId":560386,
                    "userName":"李翔",
                    "userStatus":"Y",
                    "userUuap":"lixiang47"
                },
                {
                    "boardRoles":[

                    ],
                    "businessGroup":"0",
                    "createdBy":"lixiang47",
                    "createdId":560386,
                    "createdName":"李翔",
                    "creationDate":1573709557000,
                    "dataPowers":[

                    ],
                    "departmentCode":"118000",
                    "entryDate":"2019-08-14",
                    "functionRoles":[

                    ],
                    "groups":[
                        "产品组"
                    ],
                    "inCompany":"1",
                    "inUse":"Y",
                    "ruleRoles":[

                    ],
                    "uId":6,
                    "userDepartment":"企业智能平台部",
                    "userEmail":"xiajunbo@baidu.com",
                    "userId":674566,
                    "userName":"夏俊博",
                    "userStatus":"Y",
                    "userUuap":"xiajunbo"
                },
                {
                    "boardRoles":[

                    ],
                    "businessGroup":"0",
                    "createdBy":"lixiang47",
                    "createdId":560386,
                    "createdName":"李翔",
                    "creationDate":1573709557000,
                    "dataPowers":[

                    ],
                    "departmentCode":"118000",
                    "entryDate":"2019-08-14",
                    "functionRoles":[

                    ],
                    "groups":[
                        "产品组"
                    ],
                    "inCompany":"1",
                    "inUse":"Y",
                    "ruleRoles":[

                    ],
                    "uId":6,
                    "userDepartment":"企业智能平台部",
                    "userEmail":"xiajunbo@baidu.com",
                    "userId":674566,
                    "userName":"夏俊博",
                    "userStatus":"Y",
                    "userUuap":"xiajunbo"
                }
            ];
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
