import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {ErpLogo} from '@befe/brick'
import {HeadNav} from '../localBrickComps'

import subHead from './subhead.svg'

// import {HeaderNav as OriginHeaderNav} from '@befe/brick'
//
// const HeaderNav = wrapDemoComp(OriginHeaderNav)

const HeadNavDemo = () => {

    const erpLogo = <ErpLogo
        subhead={<img src={subHead} />}
    />

    const menu = [
        {
            id: '1',
            label: '我的工作台',
            children: [
                {id: '1', label: '工作台1', href: 'https://www.baidu.com', target: '_blank'},
                {id: '2', label: '工作台2', selected: true},
            ]
        // }, {
        //     id: '3',
        //     label: '单据管理',
        //     href: 'https://www.baidu.com',
        //     target: '_blank'
        // }, {
        //     id: '4',
        //     label: '运营管理',
        //     children: [
        //         {id: '41', label: '运营管理1'},
        //         {
        //             id: '42', label: '运营管理2',
        //             children: [
        //                 {id: '421', label: '运营管理22'},
        //                 {id: '422', label: '运营管理22'},
        //             ]
        //         },
        //     ]
        }
    ]
    const userMenu = [
        {
            id: 'i18n',
            label: '语言/Language',
            children: [
                {
                    id: 'zh-CN',
                    selected: true,
                    label: '中文',
                    onClick: e => {
                        console.log('zh-CN')
                    }
                },
                {
                    id: 'en-US',
                    label: 'English',
                    onClick: e => {
                        console.log('en-US')
                    }
                }
            ]
        },
        {
            id: 'logout',
            label: '退出/Logout',
            onClick: e => {
                console.log('logout')
            },
        }
    ]

    return <div className="demo-block breadcrumb-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <HeadNav
                menu={menu}
                onClickMenuItem={(item, e) => console.log(e, item)}
                logo={erpLogo}
                // avatar={avatar}
                userMenu={userMenu}
                userInfoPrimary={'吴同学（B09858）'}
                userInfoSecondary={'企业智能平台部'}
            />
        </div>
    </div>
}

export default HeadNavDemo
