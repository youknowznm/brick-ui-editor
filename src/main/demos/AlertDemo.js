import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Alert from '../composedComps/Alert'
const Alert = wrapDemoComp(_Alert)

const AlertDemo = () => {

    // const extra = <Link type={'intensive'}>查看详情</Link>
    const extra = null

    const longText = '通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术' +
        '示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术' +
        '通知提示话术通知提示话术通知提示话术'

    const longHeadline = '通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题' +
        '通知标题通知标题通知标'

    return <div className="demo-block alert-demo-block">
        {/* ===== 0 basic ===== */}
        <h3 className="demo-type-desc">普通</h3>
        <div>
            <Alert content={'通知话术描述通知话术描述'} />
            <Alert type={'success'} content={'成功话术描述成功话术描述'} />
            <Alert type={'warning'} content={'警告话术描述警告话术描述'} />
            <Alert type={'error'} content={'错误话术描述错误话术描述'} />
        </div>
        <Divider className="demo-block-separator" />
        <h3 className="demo-type-desc">可关闭</h3>
        <div>
            <Alert content={'通知话术描述通知话术描述'} closable={true} />
            <Alert type={'success'} content={'成功话术描述成功话术描述'} closable={true} />
            <Alert type={'warning'} content={'警告话术描述警告话术描述'} closable={true} />
            <Alert type={'error'} content={'错误话术描述错误话术描述'} closable={true} />
        </div>
        <h3 className="demo-type-desc">带标题</h3>
        <div>
            <Alert headline={'通知标题'} content={'通知话术描述通知话术描述'} icon={true} />
            <Alert type={'success'} headline={'成功标题'} content={'成功话术描述成功话术描述'} icon={true} />
            <Alert type={'warning'} headline={'警告标题'} content={'警告话术描述警告话术描述'} icon={true} />
            <Alert type={'error'} headline={'错误标题'} content={'错误话术描述错误话术描述'} icon={true} />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 long-text ===== */}
        <h3 className="demo-type-desc">长标题/长内容</h3>
        <div>
            <Alert headline={longHeadline} content={longText} icon={true} />
            <Alert headline={longHeadline} type={'success'} content={longText} icon={true} />
            <Alert headline={longHeadline} type={'warning'} content={longText} icon={true} />
            <Alert headline={longHeadline} type={'error'} content={longText} icon={true} />
        </div>
    </div>
}

AlertDemo.wrapName = 'AlertDemo'

export default AlertDemo
