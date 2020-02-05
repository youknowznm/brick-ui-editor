import * as React from 'react'

import {Tabs, TabPane} from '@befe/brick'

export default class ComposedTabs extends React.Component {

    static displayName = 'ComposedTabs'

    static defaultProps = {
        type: 'plain', // 'plain' | 'card' | 'button-group'
        addable: false,
        size: 'sm',
        TabsClassName: '',
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
        return <Tabs
            className={this.props.TabsClassName}
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
    }
}
