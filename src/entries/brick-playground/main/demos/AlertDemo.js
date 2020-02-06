import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Link} from '@befe/brick'

import OriginComposedAlert from '../composedComps/ComposedAlert'
const ComposedAlert = wrapDemoComp(OriginComposedAlert)

const AlertDemo = () => {

    const extra = <Link type={'intensive'}>查看详情</Link>

    const longText = '通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术' +
        '示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术通知提示话术' +
        '通知提示话术通知提示话术通知提示话术'

    const longHeadline = '通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题通知标题' +
        '通知标题通知标题通知标'

    return <div className="demo-block ComposedAlert-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <ComposedAlert content={'通知话术描述通知话术描述'} />
            <ComposedAlert type={'success'} content={'成功话术描述成功话术描述'} />
            <ComposedAlert type={'warning'} content={'警告话术描述警告话术描述'} />
            <ComposedAlert type={'error'} content={'错误话术描述错误话术描述'} />

            <ComposedAlert content={'通知话术描述通知话术描述'} icon={true} closable={true} />
            <ComposedAlert headline={'通知标题'} content={'通知话术描述通知话术描述'} icon={true} />
            <ComposedAlert type={'success'} content={'成功话术描述成功话术描述'} icon={true} closable={true} />
            <ComposedAlert type={'success'} headline={'成功标题'} content={'成功话术描述成功话术描述'} icon={true} />
            <ComposedAlert type={'warning'} content={'警告话术描述警告话术描述'} icon={true} closable={true} />
            <ComposedAlert type={'warning'} headline={'警告标题'} content={'警告话术描述警告话术描述'} icon={true} />
            <ComposedAlert type={'error'} content={'错误话术描述错误话术描述'} icon={true} closable={true} />
            <ComposedAlert type={'error'} headline={'错误标题'} content={'错误话术描述警告话术描述'} icon={true} />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 extra ===== */}
        <div>
            <ComposedAlert content={'通知提示话术通知提示话术通知提示话术'} icon={true} extra={extra} />
            <ComposedAlert type={'success'} content={'通知提示话术通知提示话术通知提示话术'} icon={true} closable={true} extra={extra} />
            <ComposedAlert type={'warning'} headline={'通知提示标题'} content={'通知提示话术通知提示话术通知提示话术'} icon={true} extra={extra} />
            <ComposedAlert type={'error'} headline={'通知提示标题'} content={'通知提示话术通知提示话术通知提示话术'} icon={true} closable={true} extra={extra} />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 long-text ===== */}
        <div>
            <ComposedAlert content={longText} icon={true} />
            <ComposedAlert content={longText} icon={true} closable={true} />
            <ComposedAlert headline={longHeadline} content={longText} icon={true} />
            <ComposedAlert headline={longHeadline} content={longText} icon={true} closable={true} />
            <ComposedAlert content={longText} icon={true} extra={extra} />
            <ComposedAlert content={longText} icon={true} closable={true} extra={extra} />
            <ComposedAlert headline={longHeadline + longHeadline} content={longText} icon={true} extra={extra} />
            <ComposedAlert headline={longHeadline + longHeadline} content={longText} icon={true} closable={true} extra={extra} />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}

    </div>
}

export default AlertDemo
