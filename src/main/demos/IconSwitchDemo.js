import * as React from 'react'

import wrapDemoComp from '../utils/wrapDemoComp'
import {Divider} from "@material-ui/core";

import {
    ComposedIconSwitch as _IconSwitch,
} from "../composedComps/Switch";
const IconSwitch = wrapDemoComp(_IconSwitch)

const IconSwitchDemo = () => {

    return <div className="demo-block switch-demo-block">
        <div className="switch-demo-wrap">
            <IconSwitch
                checked={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <IconSwitch
                checked={false}
            />
        </div>
        <div className="switch-demo-wrap">
            <IconSwitch
                checked={true}
                disabled={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <IconSwitch
                checked={false}
                disabled={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <IconSwitch
                loading={true}
            />
        </div>
        <Divider className="demo-block-separator" />
    </div>
}

IconSwitchDemo.wrapName = 'IconSwitchDemo'

export default IconSwitchDemo
