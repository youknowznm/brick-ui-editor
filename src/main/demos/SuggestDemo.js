import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Suggest from "../composedComps/Suggest";

const Suggest = wrapDemoComp(_Suggest)

const SuggestDemo = () => {

  const optionProps = {
    menuItems: [
      {id: 'option_1', label: 'option_1'},
      {id: 'option_2', label: 'option_2'},
      {id: 'option_3', label: 'option_3'},
    ],
    group1Label: '分类 1',
    group1MenuItems: [
      {id: 'option_11', label: 'option_11'},
      {id: 'option_12', label: 'option_12', disabled: true},
    ],
    group2Label: '分类 2',
    group2MenuItems: [
      {id: 'option_21', label: 'option_21'},
      {id: 'option_22', label: 'option_22', disabled: true},
    ],
    group3Label: '分类 3',
    group3MenuItems: [
      {id: 'option_31', label: 'option_31'},
      {id: 'option_32', label: 'option_32', disabled: true},
    ],
  }

  return <div className="demo-block suggest-demo-block">
    {/* ===== 0 basic ===== */}
    <div>
      <h3 className="demo-type-desc inline">普通</h3>
      <Suggest
        placeholder={'请输入'}
        {...optionProps}
      />
    </div>
    {/* ===== 1 disabled ===== */}
    <div>
      <h3 className="demo-type-desc inline">禁用</h3>
      <Suggest
        placeholder={'请输入'}
        disabled={true}
        {...optionProps}
      />
    </div>
    <Divider className="demo-block-separator"/>
  </div>
}

SuggestDemo.wrapName = 'SuggestDemo'

export default SuggestDemo
