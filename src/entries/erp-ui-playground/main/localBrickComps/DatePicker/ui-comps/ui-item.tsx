import * as React from 'react';
import {brk} from '../utils/cls';
import {TypeItemEvent, TypeItemStatus, TypeLayoutItem} from './types';

type TypeItemProps = TypeLayoutItem & TypeItemStatus & TypeItemEvent & { value?: string | number; };

type TypeItemState = {
    isHover: boolean
    isActive: boolean
};

/**
 * @for-mobx
 */
export class UILayoutItem extends React.Component<TypeItemProps, TypeItemState> {

    state: TypeItemState = {
        isHover: false,
        isActive: false,
    };

    handleMouseEnter = () => {
        this.setState({
            isHover: true,
            isActive: false,
        });
    };

    handleMouseLeave = () => {
        this.setState({isHover: false});
    };

    handleMouseDown = () => {
        this.setState({isActive: true});
    };

    handleMouseUp = () => {
        this.setState({isActive: false});
        console.log('item: mouse up');
    };

    handleClick = () => {
        const props = this.props;
        if (props.outside) {
            props.onClickOutside!(props.value);
        } else if (!props.disabled) {
            props.onClick && props.onClick(props.value);
        }
        console.log('item: click');
    };

    get actionStatus() {
        const state = this.state;
        return state.isActive && state.isHover ? 'active'
            : state.isHover ? 'hover'
                : 'default';
    }

    render() {
        const props = this.props;

        return <div
            className={brk('content-item')}

            data-action-status={this.actionStatus}

            data-outside={props.outside}
            data-disabled={props.disabled}
            data-selected={props.selected}
            data-range-type={props.rangeType}
            data-today={props.today}

            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}

            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}

            onClick={this.handleClick}
        >
            {props.text}
            {/*<span className={brk('item-text')}>{props.text}</span>*/}
        </div>;
    }
};
