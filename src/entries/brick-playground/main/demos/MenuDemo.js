import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Menu, MenuItem, Submenu} from '@befe/brick'

// import {Menu as OriginMenu} from '@befe/brick'
//
// const Menu = wrapDemoComp(OriginMenu)

import OriginComposedMenu from "../composedComps/ComposedMenu";
const ComposedMenu = wrapDemoComp(OriginComposedMenu)

const MenuDemo = () => {

    const [selectedIds, setSelectIds] = React.useState([])
    const [expandedIds, setExpandedIds] = React.useState([])

    const renderSizeMenu = (size) => {
        return (
            <div className="menu-wrap-horizontal" key={size}>
                <Menu layout={'horizontal'} size={size}>
                    <MenuItem id={'item_1'}>option 1</MenuItem>
                    <MenuItem id={'item_4'}>option 4</MenuItem>
                    <MenuItem id={'item_5'}>option 5</MenuItem>
                    <Submenu id={'menu_sub'} type={'popper'} itemContent={'subMenu'}>
                        <MenuItem id={'item_6'}>option 6</MenuItem>
                        <MenuItem id={'item_7'}>option 7</MenuItem>
                        <MenuItem id={'item_8'}>option 8</MenuItem>
                    </Submenu>
                </Menu>
            </div>
        )
    }

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

    return <div className="demo-block menu-demo-block">
        <ComposedMenu
            size={'sm'}
            {...optionProps}
        />

        <Divider className="demo-block-separator" />

        <ComposedMenu
            size={'md'}
            {...optionProps}
        />

        <Divider className="demo-block-separator" />

        <ComposedMenu
            layout={'horizontal'}
            size={'sm'}
            {...optionProps}
        />

        <Divider className="demo-block-separator" />

        <ComposedMenu
            layout={'horizontal'}
            size={'md'}
            {...optionProps}
        />

        {/* ===== 0 basic ===== */}
        {/*    <Menu*/}
        {/*        selectedIds={selectedIds}*/}
        {/*        onChangeSelectedIds={setSelectIds}*/}
        {/*        expandedIds={expandedIds}*/}
        {/*        onChangeExpandedIds={setExpandedIds}*/}
        {/*    >*/}
        {/*        <MenuItem id={'item_1'}>option 1</MenuItem>*/}
        {/*        <Submenu id={'group_2'} type={'group'} itemContent={'group_2'}>*/}
        {/*            <MenuItem id={'item_21'}>option 21</MenuItem>*/}
        {/*            <MenuItem id={'item_22'}>option 22</MenuItem>*/}
        {/*            <Submenu id={'sub_23'} type={'folder'} itemContent={'sub_23'}>*/}
        {/*                <MenuItem id={'item_231'}>option 231</MenuItem>*/}
        {/*                <MenuItem id={'item_232'}>option 232</MenuItem>*/}
        {/*                <Submenu id={'sub_233'} type={'folder'} itemContent={'sub_233'}>*/}
        {/*                    <MenuItem id={'item_2331'}>option 2331</MenuItem>*/}
        {/*                    <MenuItem id={'item_2332'}>option 2331</MenuItem>*/}
        {/*                </Submenu>*/}
        {/*            </Submenu>*/}
        {/*        </Submenu>*/}
        {/*        <Submenu type={'popper'} id={'popper_3'} itemContent={'popper_3'}>*/}
        {/*            <MenuItem id={'item_31'}>option 31</MenuItem>*/}
        {/*            <MenuItem id={'item_32'}>option 32</MenuItem>*/}
        {/*            <MenuItem id={'item_33'}>option 33</MenuItem>*/}
        {/*            <Submenu type={'popper'} id={'popper_34'} itemContent={'popper_34'}>*/}
        {/*                <MenuItem id={'item_341'}>option 341</MenuItem>*/}
        {/*                <MenuItem id={'item_342'}>option 342</MenuItem>*/}
        {/*                <MenuItem id={'item_343'}>option 343</MenuItem>*/}
        {/*            </Submenu>*/}
        {/*        </Submenu>*/}
        {/*        <MenuItem id={'item_4'} disabled>option 4</MenuItem>*/}
        {/*        <MenuItem id={'item_5'}>option 5</MenuItem>*/}
        {/*        <Submenu id={'sub_6'} itemContent={'sub_6'}>*/}
        {/*            <MenuItem id={'item_61'}>option 61</MenuItem>*/}
        {/*            <MenuItem id={'item_62'}>option 62</MenuItem>*/}
        {/*            <MenuItem id={'item_63'}>option 63</MenuItem>*/}
        {/*            <Submenu type={'group'} itemContent={'group_64'}>*/}
        {/*                <MenuItem id={'item_641'}>option 641</MenuItem>*/}
        {/*                <MenuItem id={'item_642'}>option 642</MenuItem>*/}
        {/*            </Submenu>*/}
        {/*            <Submenu id={'sub_65'} type={'folder'} disabled itemContent={'sub_65'}>*/}
        {/*                <MenuItem id={'item_651'}>option 651</MenuItem>*/}
        {/*                <MenuItem id={'item_652'}>option 652</MenuItem>*/}
        {/*                <Submenu id={'sub_653'} type={'folder'} itemContent={'sub_653'}>*/}
        {/*                    <MenuItem id={'item_6531'}>option 6531</MenuItem>*/}
        {/*                    <MenuItem id={'item_6532'}>option 6532</MenuItem>*/}
        {/*                </Submenu>*/}
        {/*            </Submenu>*/}
        {/*        </Submenu>*/}
        {/*    </Menu>*/}
        {/*</div>*/}
        {/*<Divider className="demo-block-separator" />*/}
        {/*/!* ===== 1 layout ===== *!/*/}
        {/*<div>*/}
        {/*    {['md', 'sm'].map(renderSizeMenu)}*/}
        {/*</div>*/}
    </div>
}

export default MenuDemo
