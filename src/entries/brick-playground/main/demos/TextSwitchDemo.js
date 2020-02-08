import * as React from 'react'

import wrapDemoComp from '../utils/wrapDemoComp'

import {
    ComposedTextSwitch as _TextSwitch,
} from "../composedComps/Switch";

import {Divider} from "@material-ui/core";

const TextSwitch = wrapDemoComp(_TextSwitch)

const TextSwitchDemo = () => {

    return <div className="demo-block switch-demo-block">
        <div className="switch-demo-wrap">
            <TextSwitch
                size="xs"
                checked={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="xs"
                checked={false}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="xs"
                checked={true}
                disabled={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="xs"
                checked={false}
                disabled={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="xs"
                loading={true}
            />
        </div>
        <Divider className="demo-block-separator" />
        <div className="switch-demo-wrap">
            <TextSwitch
                size="sm"
                checked={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="sm"
                checked={false}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="sm"
                checked={true}
                disabled={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="sm"
                checked={false}
                disabled={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="sm"
                loading={true}
            />
        </div>
        <Divider className="demo-block-separator" />
        <div className="switch-demo-wrap">
            <TextSwitch
                size="md"
                checked={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="md"
                checked={false}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="md"
                checked={true}
                disabled={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="md"
                checked={false}
                disabled={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="md"
                loading={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="md"
                checkedLabel="启用"
                // uncheckedLabel="停用"
                checked={true}
            />
        </div>
        <div className="switch-demo-wrap">
            <TextSwitch
                size="md"
                // checkedLabel="启用"
                uncheckedLabel="停用"
                checked={false}
            />
        </div>
    </div>
}

export default TextSwitchDemo
