import * as React from 'react'

import {Tabs, TabPane} from '../../localBrickComps/Tabs'
import {DEMO_WRAP_DEFAULT_WIDTH} from "../../config";

export default class ComposedTabs extends React.Component {

    static displayName = 'ComposedTabs'

    static defaultProps = {
        type: 'plain', // 'plain' | 'card' | 'button-group'
        addable: false,
        size: 'sm',
        tabsClassName: '',
        defaultActiveId: '',
        data: [
            {
                label: '',
                disabled: false,
                deletable: false,
                status: 'error',
                content: '',
            }
        ]
    }

    render() {
        return <div style={{
            minWidth: DEMO_WRAP_DEFAULT_WIDTH,
            background: '#fff'
        }}>
            <Tabs
                className={this.props.tabsClassName}
                type={this.props.type}
                size={this.props.size}
                addable={this.props.addable}
                defaultActiveId={this.props.defaultActiveId}
            >
                {
                    this.props.data.map((item, index) => <TabPane
                        key={index}
                        id={item.id}
                        label={item.label}
                        disabled={item.disabled}
                        deletable={item.deletable}
                        status={item.status}
                    >
                        {item.content}
                    </TabPane>)
                }
            </Tabs>
        </div>
    }
}
