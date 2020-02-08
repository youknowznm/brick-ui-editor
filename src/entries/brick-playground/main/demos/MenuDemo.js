import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from "../utils/wrapDemoComp";

import _Menu from "../composedComps/Menu"
const Menu = wrapDemoComp(_Menu)

const MenuDemo = () => {

    const optionProps = {
        menuItems: [
            {id: 'option_1', label: 'option_1'},
            {id: 'option_2', label: 'option_2', disabled: true},
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

    return <div className="demo-block menu-demo-block">
        <Menu
            size={'sm'}
            {...optionProps}
        />
        <Divider className="demo-block-separator" />
        <Menu
            size={'md'}
            {...optionProps}
        />
        <Divider className="demo-block-separator" />
        <Menu
            layout={'horizontal'}
            size={'sm'}
            {...optionProps}
        />
        <Divider className="demo-block-separator" />
        <Menu
            layout={'horizontal'}
            size={'md'}
            {...optionProps}
        />
    </div>
}

export default MenuDemo
