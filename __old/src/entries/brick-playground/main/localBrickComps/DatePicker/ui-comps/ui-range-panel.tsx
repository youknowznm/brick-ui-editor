import * as React from 'react';
import {cls} from '../utils/cls';
import {UiPanel} from './ui-panel';
import {TypePickerContentType} from './types';

/**
 * @for-mobx
 *
 * @param props
 * @constructor
 */
export const UiRangePanel = (props: {
    leftContentType: TypePickerContentType
    leftTitleElem: JSX.Element
    leftAsideElem?: JSX.Element
    leftContentElem: JSX.Element

    rightContentType: TypePickerContentType
    rightTitleElem: JSX.Element
    rightAsideElem?: JSX.Element
    rightContentElem: JSX.Element

    actionElem?: JSX.Element
}) => {
    return <div className={cls('range-wrapper')}>
        <UiPanel
            actionElem={props.actionElem}
            titleElem={props.leftTitleElem}
            asideElem={props.leftAsideElem}
            contentElem={props.leftContentElem}
            contentType={props.leftContentType}
        />
        <UiPanel
            titleElem={props.rightTitleElem}
            asideElem={props.rightAsideElem}
            contentElem={props.rightContentElem}
            contentType={props.rightContentType}
        />
    </div>;
};
