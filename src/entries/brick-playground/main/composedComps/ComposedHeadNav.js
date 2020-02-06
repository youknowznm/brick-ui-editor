import * as React from 'react'

import {ErpLogo, HeadNav} from '../localBrickComps/HeadNav'

export default class ComposedHeadNav extends React.Component {

    static displayName = 'ComposedHeadNav'

    static defaultProps = {
        projectName: '', // 项目名称
        userInfoPrimary: '吴同学（B09858）',
        userInfoSecondary: '企业智能平台部',
        menuItems: [], // id, label
        group1Label: '',
        group1Type: 'group', // popper
        group1MenuItems: [],
        group2Label: '',
        group2Type: 'group', // popper
        group2MenuItems: [],
        group3Label: '',
        group3Type: 'group', // popper
        group3MenuItems: [],
        width: 750
    }

    render() {

        const {
            projectName,
            userInfoPrimary,
            userInfoSecondary,
            menuItems,
            width
        } = this.props

        const erpLogo = <ErpLogo
            subhead={projectName}
        />

        const userMenu = [
            {
                id: 'i18n',
                label: '语言/Language',
                children: [
                    {
                        id: 'zh-CN',
                        selected: true,
                        label: '中文',
                    },
                    {
                        id: 'en-US',
                        label: 'English',
                    }
                ]
            },
            {
                id: 'logout',
                label: '退出/Logout',
            }
        ]

        let _menuItems = menuItems.slice()

        const processMenuItems = index => {
            const groupLabel = this.props[`group${index}Label`]
            const groupType = this.props[`group${index}Type`]
            const groupMenuItems = this.props[`group${index}MenuItems`]
            if (groupMenuItems.length > 0) {
                _menuItems.push({
                    id: groupLabel,
                    label: groupLabel,
                    children: groupMenuItems
                })
            }
        }

        for (let i = 0; i < 3; i++) {
            processMenuItems(i + 1)
        }

        return <div
            style={{
                width: `${width}px`
            }}
        >
            <HeadNav
                menu={_menuItems}
                logo={erpLogo}
                // avatar={avatar}
                userMenu={userMenu}
                userInfoPrimary={userInfoPrimary}
                userInfoSecondary={userInfoSecondary}
            />
        </div>

    }
}
