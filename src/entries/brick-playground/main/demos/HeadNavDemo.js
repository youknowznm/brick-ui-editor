import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {ErpLogo} from '@befe/brick'

import subHead from './subhead.svg'

// import {HeadNav as OriginHeadNav} from '@befe/brick'
// const HeadNav = wrapDemoComp(OriginHeadNav)

import OriginComposedHeadNav from '../composedComps/ComposedHeadNav.js'
const ComposedHeadNav = wrapDemoComp(OriginComposedHeadNav)

const HeadNavDemo = () => {

    // const erpLogo = <ErpLogo
    //     // subhead={<img src={subHead} />}
    //     subhead="项目名称"
    // />
    //
    // const menu = [
    //     {
    //         id: '1',
    //         label: '我的工作台',
    //         children: [
    //             {id: '1', label: '工作台1', href: 'https://www.baidu.com', target: '_blank'},
    //             {id: '2', label: '工作台2', selected: true},
    //         ]
    //     // }, {
    //     //     id: '3',
    //     //     label: '单据管理',
    //     //     href: 'https://www.baidu.com',
    //     //     target: '_blank'
    //     // }, {
    //     //     id: '4',
    //     //     label: '运营管理',
    //     //     children: [
    //     //         {id: '41', label: '运营管理1'},
    //     //         {
    //     //             id: '42', label: '运营管理2',
    //     //             children: [
    //     //                 {id: '421', label: '运营管理22'},
    //     //                 {id: '422', label: '运营管理22'},
    //     //             ]
    //     //         },
    //     //     ]
    //     }
    // ]
    //
    // const userMenu = [
    //     {
    //         id: 'i18n',
    //         label: '语言/Language',
    //         children: [
    //             {
    //                 id: 'zh-CN',
    //                 selected: true,
    //                 label: '中文',
    //                 onClick: e => {
    //                     // console.log('zh-CN')
    //                 }
    //             },
    //             {
    //                 id: 'en-US',
    //                 label: 'English',
    //                 onClick: e => {
    //                     // console.log('en-US')
    //                 }
    //             }
    //         ]
    //     },
    //     {
    //         id: 'logout',
    //         label: '退出/Logout',
    //         onClick: e => {
    //             // console.log('logout')
    //         },
    //     }
    // ]

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
        {/* ===== 0 basic ===== */}
        <div>
            <ComposedHeadNav
                // logo={erpLogo}
                // avatar={avatar}
                // userMenu={userMenu}
                userInfoPrimary={'吴同学（B09858）'}
                userInfoSecondary={'企业智能平台部'}
                {...menuItemProps}
            />
            {/*<HeadNav*/}
            {/*    menu={menu}*/}
            {/*    logo={erpLogo}*/}
            {/*    // avatar={avatar}*/}
            {/*    userMenu={userMenu}*/}
            {/*    userInfoPrimary={'吴同学（B09858）'}*/}
            {/*    userInfoSecondary={'企业智能平台部'}*/}
            {/*/>*/}
        </div>
    </div>
}

export default HeadNavDemo
