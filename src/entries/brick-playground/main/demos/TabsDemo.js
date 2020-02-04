import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Tabs, TabPane} from '@befe/brick'

// import {Tabs as OriginTabs} from '@befe/brick'
//
// const Tabs = wrapDemoComp(OriginTabs)

const TabsDemo = () => {
    const generatePanesData = num => {
        const result = []
        for (let i = 0; i < num; i ++) {
            result.push(
                {
                    id: `tab${i}`,
                    label: `tab${i}`,
                    disabled: i === 0,
                    content: <div>content-{i}</div>
                }
            )
        }
        return result
    }

    const generatePaperPanesData = num => {
        const result = []
        for (let i = 0; i < num; i ++) {
            result.push(
                <TabPane
                    key={`tab${i}`}
                    id={`tab${i}`}
                    label={`tab${i}`}
                    disabled={i === 0}
                >
                    content-{i}
                </TabPane>,
            )
        }
        return result
    }

    const generateAddablePanesData = (num, deleteIndex) => {
        const result = []
        for (let i = 0; i < num; i ++) {

            result.push(
                <TabPane
                    key={`tab${i}`}
                    id={`tab${i}`}
                    label={`tab${i}`}
                    disabled={i === 0}
                    status={(i === 0 || i === 1) ? 'error' : undefined}
                    deletable={deleteIndex.includes(i)}
                >
                    content-{i}
                </TabPane>,
            )
        }
        return result
    }

    const generateButtonGroupTabs = num => {
        const result = []
        for (let i = 0; i < num; i ++) {

            result.push(
                <TabPane
                    key={`tab${i}`}
                    id={`tab${i}`}
                    label={`tab${i}`}
                    // disabled={i === 0}
                >
                    content-{i}
                </TabPane>,
            )
        }
        return result
    }

    return <div className="demo-block tabs-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <Tabs
                className="demo-tabs"
                panes={generatePanesData(5)}
                defaultActiveId={'tab2'}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 Paper ===== */}
        <div>
            <Tabs className="demo-tabs" defaultActiveId={'tab2'} type={'card'}>
                {generatePaperPanesData(6)}
            </Tabs>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 addable ===== */}
        <div>
            <Tabs
                className="demo-tabs"
                // defaultActiveId={'tab2'}
                type="card"
                shouldDestroyInactivePane={true}
                addable={true}
            >
                {generateAddablePanesData(6, [5])}
            </Tabs>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 3 button group ===== */}
        <div>
            <div className="demo-tabs">
                <p>size: sm</p>
                <Tabs
                    defaultActiveId={'tab1'}
                    type={'button-group'}
                    shouldDestroyInactivePane={true}
                >
                    {generateButtonGroupTabs(4)}
                </Tabs>
            </div>
            <div className="demo-tabs">
                <p>size: md</p>
                <Tabs
                    defaultActiveId={'tab2'}
                    size={'md'}
                    type={'button-group'}
                    shouldDestroyInactivePane={true}
                >
                    {generateButtonGroupTabs(4)}
                </Tabs>
            </div>
        </div>
        <Divider className="demo-block-separator" />
    </div>
}

export default TabsDemo
