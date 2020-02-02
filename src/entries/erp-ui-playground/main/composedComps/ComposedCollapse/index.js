import * as React from 'react'

import {DEMO_WRAP_DEFAULT_WIDTH} from '../../config'

import {Collapse, CollapsePanel} from '@befe/brick'

export default class ComposedCollapse extends React.Component {

    static displayName = 'ComposedCollapse'

    static defaultProps = {
        singleExpanded: false,
        defaultExpandedIds: [],
        expandIconPosition: 'left',
        data: []
    }

    render() {
        const {
            defaultExpandedIds,
            singleExpanded,
            expandIconPosition,
            data
        } = this.props

        return <div style={{
            minWidth: DEMO_WRAP_DEFAULT_WIDTH,
            background: '#fff'
        }}>
            <Collapse
                singleExpanded={singleExpanded}
                defaultExpandedIds={defaultExpandedIds}
                expandIconPosition={expandIconPosition}
            >
                {
                    data.map((item, index) => <CollapsePanel
                        key={item.id}
                        headline={item.headline}
                        id={item.id}
                        extra={item.extra}
                        disabled={item.disabled}
                    >
                        {item.content}
                    </CollapsePanel>)
                }
            </Collapse>
        </div>
    }
}
