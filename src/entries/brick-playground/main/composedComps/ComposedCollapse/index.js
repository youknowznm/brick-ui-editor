import * as React from 'react'

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

        return <Collapse
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
    }
}
