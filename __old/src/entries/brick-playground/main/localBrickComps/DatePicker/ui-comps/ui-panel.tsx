import * as React from 'react';
import {cls} from '../utils/cls';
import {TypePickerContentType} from './types';

/**
 * @for-mobx
 */
export const UiPanel = (props: {
    titleElem: JSX.Element
    asideElem?: JSX.Element
    contentElem: JSX.Element

    /**
     * 用于确认内容布局类型, 一般只考虑显示的元素布局, 如日期选择和周选择, 其实都是一样的 "date" 排列
     */
    contentType: TypePickerContentType

    actionElem?: JSX.Element
}) => {
    return <div className={cls('panel-wrapper')} data-content-type={props.contentType}>
        <div className={cls('title-wrapper')}>
            {props.titleElem}
        </div>
        <div className={cls('content-wrapper')}>
            {props.asideElem}
            {props.contentElem}
        </div>
    </div>;
};
