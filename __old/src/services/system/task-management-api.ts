import {ajax} from 'src/services/ajax';
import {initOptions} from './user-api';

export function getTaskSelectOptions() {
    return ajax.post('/task_active/selectInit',
        {}).then((res: any) => {
        if (res.code && res.code === 200 && res.data) {
            return initOptions(res.data);
        }
        return {};
    });
}

// 活动详情table
export function getTaskTableList(searchValues: object) {
    return ajax.post('/task_active/view', {...searchValues}).then((res:any) => {
        if(res.code && res.code === 200) {
            if (res.data && res.data.list) {
                return {
                    list: res.data.list,
                    total: 1 * res.data.total,
                    pageNum: 1 * res.data.pageNum,
                    pageSize: 1 * res.data.pageSize
                }
            }
            return []
        }
        return []
    })
}


// 任务活动详情接口

export function getTaskViewDetail(id:string) {
    return ajax.get(   `/task_active/detail/${id}`).then((res: any) => {
        if (res.code && res.code === 200) {
            return res.data
        }
    })
}


// 活动列表switch切换

export function taskListSwitch(taskId: string, dataStatus: string) {
    return ajax.post('/task_active/switchStatus', {
        taskId,
        dataStatus
    }).then(res => {
        return res;
    })

}

// 活动列表删除

export function taskListDelete(taskId: string) {
    return ajax.post('/task_active/delete', {
        taskId
    }).then(res => {
        return res;
    })

}

// 活动页保存

export function taskListSave(data: object) {
    return ajax.post('/task_active/add', {
        ...data
    }).then(res => {
       return res;
    })
}
