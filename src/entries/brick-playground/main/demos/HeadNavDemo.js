import * as React from 'react'

import wrapDemoComp from '../utils/wrapDemoComp'

import _HeadNav from '../composedComps/HeadNav'
const HeadNav = wrapDemoComp(_HeadNav)

const HeadNavDemo = () => {

    const menuItemProps = {
        menuItems: [
            {id: 'option_1', label: 'option_1'},
            // {id: 'option_2', label: 'option_2'},
            // {id: 'option_3', label: 'option_3'},
        ],
        group1Label: '分类 1',
        group1MenuItems: [
            {id: 'option_11', label: 'option_11'},
            {id: 'option_12', label: 'option_12', disabled: true},
        ],
        // group2Label: '分类 2',
        // group2MenuItems: [
        //     {id: 'option_21', label: 'option_21'},
        //     {id: 'option_22', label: 'option_22', disabled: true},
        // ],
        // group3Label: '分类 3',
        // group3MenuItems: [
        //     {id: 'option_31', label: 'option_31'},
        //     {id: 'option_32', label: 'option_32', disabled: true},
        // ],
    }

    return <div className="demo-block head-nav-demo-block">
        <div>
            <HeadNav
                userInfoPrimary={'吴同学（B09858）'}
                userInfoSecondary={'企业智能平台部'}
                {...menuItemProps}
            />
        </div>
    </div>
}

HeadNavDemo.wrapName = 'HeadNavDemo'

export default HeadNavDemo
