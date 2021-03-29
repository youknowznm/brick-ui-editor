import * as React from 'react'

import {Collapse, CollapsePanel} from '@befe/brick'
// import '@befe/brick-comp-collapse/src/index.scss'

export default class ComposedCollapse extends React.Component {

    static displayName = 'ComposedCollapse'

    static defaultProps = {
        singleExpanded: false,
        defaultExpandedIds: [],
        expandIconPosition: 'left',
        data: [],
        width: 350
    }

    render() {
        const {
            defaultExpandedIds,
            singleExpanded,
            expandIconPosition,
            data,
            width,
        } = this.props

        return <div
            className="composed-collapse"
            style={{
                width: `${width}px`
            }}
        >
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
