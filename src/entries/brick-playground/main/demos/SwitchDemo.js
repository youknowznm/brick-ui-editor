import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

// import {Switch} from '@befe/brick'

import {Switch as OriginSwitch} from '@befe/brick'
const Switch = wrapDemoComp(OriginSwitch)

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
                checked={true}
            />
            <Switch
                checked={false}
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
            <Switch
                size={'md'}
                iconLabel={true}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        <div>
            <Switch
                size="xs"
            />
            <Switch />
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
