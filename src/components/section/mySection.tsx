import React, {ReactNode} from 'react';
import './style.mod.scss'

export interface MySectionProps {
    title: string
    children?: ReactNode
}

export class MySection extends React.PureComponent<MySectionProps, {}> {
    render(): ReactNode {
        return (
            <div styleName='my-section'>
                <div styleName='my-section-header'>
                    <div styleName='my-section-header-title'>
                        <div styleName='my-section-header-title-label'>
                            <span>{this.props.title}</span>
                        </div>
                    </div>
                </div>
                <div styleName='my-section-content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}