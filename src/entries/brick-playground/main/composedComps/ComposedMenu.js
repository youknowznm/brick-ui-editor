import * as React from 'react'

import {Menu, MenuItem, Submenu} from '../localBrickComps/Menu'

export default class ComposedMenu extends React.Component {

    static displayName = 'ComposedMenu'

    static defaultProps = {
        size: 'sm',
        layout: 'vertical', // horizontal
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
        width: 200,
    }

    processOptions = index => {
        const groupLabel = this.props[`group${index}Label`]
        const groupType = this.props[`group${index}Type`]
        const groupMenuItems = this.props[`group${index}MenuItems`]
        if (groupMenuItems.length === 0) {
            return null
        }
        return <Submenu
            type={groupType}
            itemContent={groupLabel}
        >
            {
                groupMenuItems.map((item, index) => {
                    return <MenuItem
                        id={item.id}
                        disabled={item.disabled}
                        key={index}
                    >
                        {item.label}
                    </MenuItem>
                })
            }
        </Submenu>
    }

    render() {

        const {
            width,
            menuItems,
            layout,
            size,
        } = this.props


        return <div
            className="composed-menu"
            style={{
                width: `${width}px`,
            }}
        >
            <Menu
                layout={layout}
                size={size}
            >
                {
                    menuItems.map((item, index) => {
                        return <MenuItem
                            id={item.id}
                            disabled={item.disabled}
                            key={index}
                        >
                            {item.label}
                        </MenuItem>
                    })
                }
                {this.processOptions(1)}
                {this.processOptions(2)}
                {this.processOptions(3)}
            </Menu>

        </div>

    }
}


