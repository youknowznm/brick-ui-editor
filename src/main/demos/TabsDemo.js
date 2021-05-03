import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Tabs from "../composedComps/Tabs.js";

const Tabs = wrapDemoComp(_Tabs)

const TabsDemo = () => {

  const generatePanesData = num => {
    const result = []
    for (let i = 0; i < num; i++) {
      result.push(
        {
          id: `tab${i}`,
          label: `tab${i}`,
          content: `content-${i}`
        }
      )
    }
    return result
  }

  const generatePaperPanesData = num => {
    const result = []
    for (let i = 0; i < num; i++) {
      result.push({
        id: `tab${i}`,
        key: `tab${i}`,
        label: `tab${i}`,
        content: `content-${i}`
      })
    }
    return result
  }

  const generateAddablePanesData = (num, deleteIndex) => {
    const result = []
    for (let i = 0; i < num; i++) {
      result.push({
        id: `tab${i}`,
        key: `tab${i}`,
        label: `tab${i}`,
        disabled: i === 3,
        content: `content-${i}`,
        status: (i === 0 || i === 1) ? 'error' : undefined,
        deletable: deleteIndex.includes(i)
      })
    }
    return result
  }

  // const generateButtonGroupTabs = num => {
  //     const result = []
  //     for (let i = 0; i < num; i ++) {
  //
  //         result.push(
  //             <TabPane
  //                 key={`tab${i}`}
  //                 id={`tab${i}`}
  //                 label={`tab${i}`}
  //                 // disabled={i === 0}
  //             >
  //                 content-{i}
  //             </TabPane>,
  //         )
  //     }
  //     return result
  // }

  return <div className="demo-block tabs-demo-block">
    {/* ===== 0 basic ===== */}
    <h3 className="demo-type-desc">普通</h3>
    <div>
      <Tabs
        className="demo-tabs"
        defaultActiveId={'tab0'}
        data={generatePanesData(5)}
      />
    </div>
    <Divider className="demo-block-separator"/>
    <div>
      <Tabs
        className="demo-tabs"
        type="card"
        defaultActiveId={'tab0'}
        data={generatePaperPanesData(5)}
      />
    </div>
    <Divider className="demo-block-separator"/>
    <div>
      <Tabs
        className="demo-tabs"
        type="button-group"
        defaultActiveId={'tab0'}
        data={generatePaperPanesData(5)}
      />
    </div>
    <Divider className="demo-block-separator"/>
    {/* ===== 2 addable ===== */}
    <h3 className="demo-type-desc">错误 / 禁用 / 可删除 / 可添加</h3>
    <div>
      <Tabs
        className="demo-tabs"
        type="card"
        defaultActiveId={'tab0'}
        addable={true}
        data={generateAddablePanesData(6, [5])}
      />
    </div>
    <Divider className="demo-block-separator"/>
    {/* ===== 3 button group ===== */}
    <h3 className="demo-type-desc">尺寸</h3>
    <div>
      <div className="demo-tabs">
        <Tabs
          className="demo-tabs"
          type={'button-group'}
          defaultActiveId={'tab0'}
          data={generatePanesData(5)}
        />
      </div>
      <div className="demo-tabs">
        <Tabs
          size="md"
          type={'button-group'}
          className="demo-tabs"
          defaultActiveId={'tab0'}
          data={generatePanesData(5)}
        />
      </div>
    </div>
    <Divider className="demo-block-separator"/>
    {/* ===== 4 long ===== */}
    <h3 className="demo-type-desc">超长</h3>
    <div>
      <Tabs
        className="demo-tabs"
        type="card"
        defaultActiveId={'tab0'}
        data={generatePaperPanesData(20)}
      />
    </div>
    <Divider className="demo-block-separator"/>
  </div>
}

TabsDemo.wrapName = 'TabsDemo'

export default TabsDemo
