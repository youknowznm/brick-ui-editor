import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {CollapsePanel} from '@befe/brick'
// import {Collapse, CollapsePanel} from '@befe/brick'
import {Collapse as OriginCollapse} from '@befe/brick'
const Collapse = wrapDemoComp(OriginCollapse)

const CollapseDemo = () => {
    const extra = (<div>{'222'}</div>)
    const extra1 = (<div>{'自定义1'}</div>)
    const extra2 = (<div>{'自定义2'}</div>)
    return <div className="demo-block link-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <Collapse defaultExpandedIds = {[1]}>
                <CollapsePanel headline = {'可以折叠1'} id = {1}>
                    {'text content'}
                </CollapsePanel>
                <CollapsePanel headline = {'可以折叠2'} id = {2}>
                    <div>{'div content'}</div>
                </CollapsePanel>
                <CollapsePanel headline = {'可以折叠3'} id = {3} disabled = {true}>
                    <div>{'div content'}</div>
                </CollapsePanel>
            </Collapse>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 single ===== */}
        <div>
            <Collapse singleExpanded = {true}>
                <CollapsePanel headline = {'可以折叠1'} id = {1}>
                    {'text'}
                </CollapsePanel>
                <CollapsePanel headline = {'可以折叠2'} id = {2} extra = {extra}>
                    {'text'}
                </CollapsePanel>
                <CollapsePanel headline = {'可以折叠3'} id = {3}>
                    <div>{'div'}</div>
                </CollapsePanel>
            </Collapse>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 3 extra ===== */}
        <div>
            <Collapse>
                <CollapsePanel headline = {'可以折叠1'} id = {1} extra = {extra1}>
                    {'text'}
                </CollapsePanel>
                <CollapsePanel headline = {'可以折叠2'} id = {2} extra = {extra2}>
                    {'text'}
                </CollapsePanel>
                <CollapsePanel headline = {'可以折叠3'} id = {3}>
                    <div>{'div'}</div>
                </CollapsePanel>
            </Collapse>
        </div>
    </div>
}

export default CollapseDemo
