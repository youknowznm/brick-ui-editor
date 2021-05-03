import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _RadioGroup from '../composedComps/RadioGroup'

const RadioGroup = wrapDemoComp(_RadioGroup)

const RadioDemo = () => {

  return <div className="demo-block radio-group-demo-block">
    <h3 className="demo-type-desc">普通</h3>
    <div>
      <RadioGroup
        defaultValue={['item_1']}
        options={[
          {value: 'item_1', label: 'item-1', checked: true},
          {value: 'item_2', label: 'item-2', disabled: true},
          {value: 'item_3', label: 'item-3'},
          {value: 'item_4', label: 'item-4'},
        ]}
      />
      <RadioGroup
        defaultValue={['item_1']}
        size={'md'}
        options={[
          {value: 'item_1', label: 'item-1', indeterminate: true},
          {value: 'item_2', label: 'item-2', disabled: true},
          {value: 'item_3', label: 'item-3'},
          {value: 'item_4', label: 'item-4'},
        ]}
      />
    </div>
    <Divider className="demo-block-separator"/>
    <h3 className="demo-type-desc">加强</h3>
    <div>
      <RadioGroup
        type={'intensive'}
        defaultValue={['item_1']}
        options={[
          {value: 'item_1', label: 'item-1', checked: true},
          {value: 'item_2', label: 'item-2',},
          {value: 'item_3', label: 'item-3'},
          {value: 'item_4', label: 'item-4'},
        ]}
      />
    </div>
    <div>
      <RadioGroup
        type={'intensive'}
        size={'md'}
        defaultValue={['item_1']}
        options={[
          {value: 'item_1', label: 'item-1', checked: true},
          {value: 'item_2', label: 'item-2',},
          {value: 'item_3', label: 'item-3'},
          {value: 'item_4', label: 'item-4'},
        ]}
      />
    </div>
    <Divider className="demo-block-separator"/>
  </div>
}

RadioDemo.wrapName = 'RadioDemo'

export default RadioDemo
