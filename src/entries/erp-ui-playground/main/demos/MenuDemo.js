import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../components/wrapDemoComp'

import {Menu, MenuItem, Submenu} from '@befe/brick'

// import {Menu as OriginMenu} from '@befe/brick'
//
// const Menu = wrapDemoComp(OriginMenu)

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

    return <div className="demo-block checkbox-demo-block">
        {/* ===== 0 basic ===== */}
        <div className="menu-wrap-vertical">
            <Menu
                selectedIds={selectedIds}
                onChangeSelectedIds={setSelectIds}
                expandedIds={expandedIds}
                onChangeExpandedIds={setExpandedIds}
            >
                <MenuItem id={'item_1'}>option 1</MenuItem>
                <Submenu id={'group_2'} type={'group'} itemContent={'group_2'}>
                    <MenuItem id={'item_21'}>option 21</MenuItem>
                    <MenuItem id={'item_22'}>option 22</MenuItem>
                    <Submenu id={'sub_23'} type={'folder'} itemContent={'sub_23'}>
                        <MenuItem id={'item_231'}>option 231</MenuItem>
                        <MenuItem id={'item_232'}>option 232</MenuItem>
                        <Submenu id={'sub_233'} type={'folder'} itemContent={'sub_233'}>
                            <MenuItem id={'item_2331'}>option 2331</MenuItem>
                            <MenuItem id={'item_2332'}>option 2331</MenuItem>
                        </Submenu>
                    </Submenu>
                </Submenu>
                <Submenu type={'popper'} id={'popper_3'} itemContent={'popper_3'}>
                    <MenuItem id={'item_31'}>option 31</MenuItem>
                    <MenuItem id={'item_32'}>option 32</MenuItem>
                    <MenuItem id={'item_33'}>option 33</MenuItem>
                    <Submenu type={'popper'} id={'popper_34'} itemContent={'popper_34'}>
                        <MenuItem id={'item_341'}>option 341</MenuItem>
                        <MenuItem id={'item_342'}>option 342</MenuItem>
                        <MenuItem id={'item_343'}>option 343</MenuItem>
                    </Submenu>
                </Submenu>
                <MenuItem id={'item_4'} disabled>option 4</MenuItem>
                <MenuItem id={'item_5'}>option 5</MenuItem>
                <Submenu id={'sub_6'} itemContent={'sub_6'}>
                    <MenuItem id={'item_61'}>option 61</MenuItem>
                    <MenuItem id={'item_62'}>option 62</MenuItem>
                    <MenuItem id={'item_63'}>option 63</MenuItem>
                    <Submenu type={'group'} itemContent={'group_64'}>
                        <MenuItem id={'item_641'}>option 641</MenuItem>
                        <MenuItem id={'item_642'}>option 642</MenuItem>
                    </Submenu>
                    <Submenu id={'sub_65'} type={'folder'} disabled itemContent={'sub_65'}>
                        <MenuItem id={'item_651'}>option 651</MenuItem>
                        <MenuItem id={'item_652'}>option 652</MenuItem>
                        <Submenu id={'sub_653'} type={'folder'} itemContent={'sub_653'}>
                            <MenuItem id={'item_6531'}>option 6531</MenuItem>
                            <MenuItem id={'item_6532'}>option 6532</MenuItem>
                        </Submenu>
                    </Submenu>
                </Submenu>
            </Menu>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 layout ===== */}
        <div>
            {['md', 'sm'].map(renderSizeMenu)}
        </div>
    </div>
}

export default MenuDemo
