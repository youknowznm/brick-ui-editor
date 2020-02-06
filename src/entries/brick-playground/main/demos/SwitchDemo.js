import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

// import {Switch} from '@befe/brick'

import {Switch as OriginSwitch} from '@befe/brick'
const Switch = wrapDemoComp(OriginSwitch)

import OriginComposedIconSwitch from '../composedComps/ComposedIconSwitch'
const ComposedIconSwitch = wrapDemoComp(OriginComposedIconSwitch)

const SwitchDemo = () => {

    const [checked, setChecked] = React.useState(true)

    const switchChange = () => {
        setChecked(!checked);
    }

    // size={'md'}
    // checkedLabel={'开启'}
    // uncheckedLabel={'停用'}
    // checked={checked}
    // onChange={switchChange}

    return <div className="demo-block switch-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <Switch
                defaultChecked={true}
            />
            <Switch
                defaultChecked={false}
            />
            <Switch
                checked={true}
                disabled={true}
            />
            <Switch
                checked={false}
                disabled={true}
            />
            <Switch
                size={'md'}
                checkedLabel={'启用'}
                uncheckedLabel={'停用'}
            />
            <ComposedIconSwitch
                size={'md'}
                iconLabel={true}
            />
            <ComposedIconSwitch
                size={'md'}
                disabled={true}
                iconLabel={true}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        <div>
            <Switch
                size="xs"
            />
            <Switch
                size="sm"
            />
            <Switch
                size={'md'}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 loading ===== */}
        <div>
            <Switch
                size={'xs'}
                loading={true}
            />
            <Switch
                size="sm"
                loading={true}
            />
            <Switch
                size={'md'}
                loading={true}
            />
            <Switch
                loading={true}
                disabled={false}
            />
        </div>
    </div>
}

export default SwitchDemo
