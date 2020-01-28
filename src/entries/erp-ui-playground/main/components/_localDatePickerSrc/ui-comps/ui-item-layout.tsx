import * as React from 'react';
import {cls} from '../utils/cls';
import classNames from 'classnames';
import {TypeLayoutItem} from './types';

function renderTitleRow(props: {
    titleRow?: {
        items: Array<{
            text: string
        }>
    }
}) {
    if (!props.titleRow) {
        return null;
    }

    return <div className={classNames(
        cls('content-title'),
        'item-row',
    )}>
        {props.titleRow.items.map(
            (item, index) => (
                <React.Fragment key={index}>
                    {
                        index ? <span className={'item-gap'}/> : null
                    }
                    <span className={'item-cell'}>
                        {item.text}
                    </span>
                </React.Fragment>
            )
        )}
    </div>;
}

function renderContent(props: {
    rows: Array<{
        items: Array<TypeLayoutItem>
    }>

    renderItem: (item: TypeLayoutItem) => {
        elem: JSX.Element
        className?: string
        prevGapClassName?: string
    }

    onItemClick?: (item: TypeLayoutItem) => void
    onItemMouseEnter?: (item: TypeLayoutItem) => void
}) {
    return props.rows.map(
        (row, rowIndex) => (
            <div key={rowIndex} className={
                classNames(
                    cls('content-row'),
                    'row'
                )
            }>
                {
                    row.items.map(
                        (item, colIndex) => {
                            const {
                                elem,
                                prevGapClassName
                            } = props.renderItem(item);

                            return <React.Fragment key={colIndex}>
                                {
                                    colIndex ? <span
                                        className={classNames('item-gap', prevGapClassName)}
                                    /> : null
                                }
                                <span className={'item-cell'}>
                                    {elem}
                                </span>
                            </React.Fragment>;
                        }
                    )
                }
            </div>
        )
    );
}

/**
 * @for-mobx
 *
 * 所有 titleRow.items 与 rows.items 的 item 个数应该都应一致, 用于布局
 *
 * @param props
 * @constructor
 */
export const UiItemLayout = (props: {
    titleRow?: {
        items: Array<{
            text: string
        }>
    }

    rows: Array<{
        items: Array<TypeLayoutItem>
    }>

    renderItem: (item: TypeLayoutItem) => {
        elem: JSX.Element
        className?: string
        prevGapClassName?: string
    }

    size?: 's' | 'm'
    onItemClick?: (item: TypeLayoutItem) => void
    onItemMouseEnter?: (item: TypeLayoutItem) => void
}) => {
    const size = props.size === 's' ? 'small' : 'medium';

    return <div className={cls('item-layout-wrapper')} data-size={size}>
        {renderTitleRow(props)}
        {renderContent(props)}
    </div>;
};
