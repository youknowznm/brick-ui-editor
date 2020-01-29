import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {toast, Toast} from '@befe/brick'
import {Button} from '@befe/brick'

// import {Toast as OriginToast} from '@befe/brick'
//
// const Toast = wrapDemoComp(OriginToast)

const ToastDemo = () => {

    const info = () => {
        toast.info('info')
    }

    const success = () => {
        toast.success('info')
    }

    const error = () => {
        toast.error('error')
    }

    const warning = () => {
        toast.warning('error')

    }

    const infoWithClose = e => {
        toast.warning('通知文案描述', {
            durationInMS: 5000,
            manualClose: true
        })
    }

    const infoWithHeadlineWithClose = e => {
        toast.error(
            '通知标题文案',
            '通知文案描述通知文案描述',
            {
                manualClose: true,
                durationInMS: 0
            }
        )
    }

    return <div className="demo-block alert-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <div className="inline-block-demo">
                <Button onClick={e => toast.info('通知文案描述')} type={'intensive'}>通知</Button>
                <Button onClick={e => toast.info('通知标题文案', '通知文案描述通知文案描述')} type={'intensive'}>有标题</Button>
            </div>
            <div className="inline-block-demo">
                <Button onClick={e => toast.success('成功文案描述成功文案描述')} type={'intensive'} color={'success'}>成功</Button>
                <Button onClick={e => toast.success('成功标题文案', '成功文案描述通知文案描述文案描述')} type={'intensive'} color={'success'}>有标题</Button>
            </div>
            <div className="inline-block-demo">
                <Button onClick={e => toast.warning('警告文案描述警告文案描述')} type={'intensive'} color={'warning'}>警告</Button>
                <Button onClick={e => toast.warning('警告标题文案文案描述', '警告文案描述成功文案描述文案描述文案描述')} type={'intensive'} color={'warning'}>有标题</Button>
            </div>
            <div className="inline-block-demo">
                <Button onClick={e => toast.warning('错误文案描述错误文案描述')} type={'intensive'} color={'error'}>错误</Button>
                <Button onClick={e => toast.warning('错误标题文案', '错误文案描述警告文案描述文案描述', {durationInMS: 5000})} type={'intensive'} color={'error'}>有标题</Button>
            </div>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 close ===== */}
        <div>
            <Button onClick={infoWithClose} type={'intensive'} color={'warning'}>自动关闭 + 手动关闭</Button>
            <Button onClick={infoWithHeadlineWithClose} type={'intensive'} color={'error'}>只允许手动关闭</Button>
        </div>
    </div>
}

export default ToastDemo
