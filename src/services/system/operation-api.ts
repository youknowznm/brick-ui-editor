import {ajax} from 'src/services/ajax';

// 公司组列表table
export const getCompTableList = (data:object) => {
    return ajax.post('/com_group/queryList', {
        ...data
    }).then((res: any)=> {
        if (res.code && res.code === 200) {
            if (res.data) {
                return {
                   list: res.data.list || [],
                    pageMsg: {
                        total: res.data.total,
                        pageNum: res.date.pageNum,
                        pageSize: res.data.pageSize
                    }
                }
            }
        }
    })
};

export const compSwitchChange = (data: object) => {
    return ajax.post('/com_group/updateStatus', {...data}).then(res => {
        return res;
    })
}
// 成本中心组table
