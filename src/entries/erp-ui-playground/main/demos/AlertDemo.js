import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Alert} from '@befe/brick'
import {Link} from '@befe/brick'

// import {Alert as OriginAlert} from '@befe/brick'
//
// const Alert = wrapDemoComp(OriginAlert)

const AlertDemo = () => {

    const extra = <Link type={'intensive'}>查看详情</Link>

    const longText = '通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术' +
        '示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术' +
        '通知提示话术通知提示话术通知提示话术'

    const longHeadline = '通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题' +
        '通知标题通知标题通知标'

    return <div className="demo-block alert-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <Alert content={'通知话术描述通知话术描述'} />
            <Alert type={'success'} content={'成功话术描述成功话术描述'} />
            <Alert type={'warning'} content={'警告话术描述警告话术描述'} />
            <Alert type={'error'} content={'错误话术描述错误话术描述'} />

            <Alert content={'通知话术描述通知话术描述'} icon={true} closable={true} />
            <Alert headline={'通知标题'} content={'通知话术描述通知话术描述'} icon={true} />
            <Alert type={'success'} content={'成功话术描述成功话术描述'} icon={true} closable={true} />
            <Alert type={'success'} headline={'成功标题'} content={'成功话术描述成功话术描述'} icon={true} />
            <Alert type={'warning'} content={'警告话术描述警告话术描述'} icon={true} closable={true} />
            <Alert type={'warning'} headline={'警告标题'} content={'警告话术描述警告话术描述'} icon={true} />
            <Alert type={'error'} content={'错误话术描述错误话术描述'} icon={true} closable={true} />
            <Alert type={'error'} headline={'错误标题'} content={'错误话术描述警告话术描述'} icon={true} />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 extra ===== */}
        <div>
            <Alert content={'通知提示话术通知提示话术通知提示话术'} icon={true} extra={extra} />
            <Alert type={'success'} content={'通知提示话术通知提示话术通知提示话术'} icon={true} closable={true} extra={extra} />
            <Alert type={'warning'} headline={'通知提示标题'} content={'通知提示话术通知提示话术通知提示话术'} icon={true} extra={extra} />
            <Alert type={'error'} headline={'通知提示标题'} content={'通知提示话术通知提示话术通知提示话术'} icon={true} closable={true} extra={extra} />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 long-text ===== */}
        <div>
            <Alert content={longText} icon={true} />
            <Alert content={longText} icon={true} closable={true} />
            <Alert headline={longHeadline} content={longText} icon={true} />
            <Alert headline={longHeadline} content={longText} icon={true} closable={true} />
            <Alert content={longText} icon={true} extra={extra} />
            <Alert content={longText} icon={true} closable={true} extra={extra} />
            <Alert headline={longHeadline + longHeadline} content={longText} icon={true} extra={extra} />
            <Alert headline={longHeadline + longHeadline} content={longText} icon={true} closable={true} extra={extra} />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}

    </div>
}

export default AlertDemo
