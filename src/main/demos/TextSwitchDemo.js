import * as React from 'react'

import wrapDemoComp from '../utils/wrapDemoComp'

import {
  ComposedTextSwitch as _TextSwitch,
} from "../composedComps/Switch";

import {Divider} from '@material-ui/core';

const TextSwitch = wrapDemoComp(_TextSwitch)

const TextSwitchDemo = () => {

  return <div className="demo-block switch-demo-block">
    <h3 className="demo-type-desc inline">尺寸</h3>
    <div>
      <TextSwitch
        size="xs"
        checked={true}
      />
      <TextSwitch
        size="xs"
        checked={false}
      />
      <TextSwitch
        size="xs"
        checked={true}
        disabled={true}
      />
      <TextSwitch
        size="xs"
        checked={false}
        disabled={true}
      />

    </div>
    <div>
      <TextSwitch
        size="sm"
        checked={true}
      />
      <TextSwitch
        size="sm"
        checked={false}
      />
      <TextSwitch
        size="sm"
        checked={true}
        disabled={true}
      />
      <TextSwitch
        size="sm"
        checked={false}
        disabled={true}
      />

    </div>
    <div>
      <TextSwitch
        size="md"
        checked={true}
      />
      <TextSwitch
        size="md"
        checked={false}
      />
      <TextSwitch
        size="md"
        checked={true}
        disabled={true}
      />
      <TextSwitch
        size="md"
        checked={false}
        disabled={true}
      />

    </div>
    <Divider className="demo-block-separator"/>
    <h3 className="demo-type-desc inline">禁用</h3>
    <div>
      <TextSwitch
        size="xs"
        loading={true}
      />
      <TextSwitch
        size="sm"
        loading={true}
      />
      <TextSwitch
        size="md"
        loading={true}
      />
    </div>
    <Divider className="demo-block-separator"/>
    <h3 className="demo-type-desc inline">文字标签</h3>
    <div>
      <TextSwitch
        size="md"
        checkedLabel="启用"
        // uncheckedLabel="停用"
        checked={true}
      />
      <TextSwitch
        size="md"
        // checkedLabel="启用"
        uncheckedLabel="停用"
        checked={false}
      />
    </div>
    <Divider className="demo-block-separator"/>
  </div>

}

TextSwitchDemo.wrapName = 'TextSwitchDemo'

export default TextSwitchDemo
