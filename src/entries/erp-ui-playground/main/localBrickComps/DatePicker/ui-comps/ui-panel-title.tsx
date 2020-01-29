import * as React from 'react';
import cx from 'classnames';
import {brk, cls} from '../utils/cls';
import {
    SvgFastLeft,
    SvgFastRight,
    SvgPlainLeft,
    SvgPlainRight,
    SvgPlainDown,
    SvgPlainUp
} from '@befe/brick-icon';
import {Icon} from '@befe/brick-comp-icon';

/**
 * @for-mobx
 *
 * @param props
 * @constructor
 */
export const UiPanelTitle = (props: {
    text: string
    hasZooming?: boolean
    isZooming: boolean
    shouldShowInner?: boolean
    actionShowType: 'both' | 'left' | 'right'

    onFastLeftClick: () => void
    onFastRightClick: () => void
    onPlainLeftClick?: () => void
    onPlainRightClick?: () => void
    onZoomingClick?: () => void
}) => {
    const [
        plainLeftElem,
        plainRightElem,
    ] = props.shouldShowInner ? [
        <Icon
            className={brk('nav-icon')}
            svg={SvgPlainLeft}
            onClick={props.onPlainLeftClick}
        />,
        <Icon
            className={brk('nav-icon')}
            svg={SvgPlainRight}
            onClick={props.onPlainRightClick}
        />,
    ] : [];

    const navBackElem = props.actionShowType === 'both' || props.actionShowType === 'left'
        ? <div className={brk('nav-back')}>
            <Icon
                className={brk('nav-icon')}
                svg={SvgFastLeft}
                onClick={props.onFastLeftClick}
            />
            {plainLeftElem}
        </div>
        : null;

    const navForwardElem = props.actionShowType === 'both' || props.actionShowType === 'right'
        ? <div className={brk('nav-forward')}>
            {plainRightElem}
            <Icon className={brk('nav-icon')}
                  svg={SvgFastRight}
                  onClick={props.onFastRightClick}
            />
        </div>
        : null;

    console.log({navBackElem, navForwardElem}, props);

    const zoomingIconElem = props.hasZooming
        ? <Icon className={brk('zooming')}
                svg={props.isZooming ? SvgPlainUp : SvgPlainDown}
                onClick={props.onZoomingClick}

        />
        : null;

    return <div className={cx(cls('title'))}>
        {navBackElem}
        {navForwardElem}
        <div className={brk('panel-title')}>
            <span className={brk('title-text')}>
                {props.text}
            </span>
            {zoomingIconElem}
        </div>
    </div>;
};
