import * as React from 'react';
import {brk, cls} from '../utils/cls';
import {TypeAsideItem, TypeUIAsideProps, TypeUIAsideState} from './types';
import {createRef} from '../modules/create-ref';

interface IAsideItem {
    key: number | string
}

/**
 * @for-mobx
 *
 * @param props
 * @constructor
 */
export class UiAside extends React.Component<TypeUIAsideProps, TypeUIAsideState> {
    state = {
        isHovering: false,
        paddingLeft: null
    };

    originWidth = 0;
    asideRef = createRef<HTMLDivElement>();

    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        this.originWidth = this.asideRef.elem!.clientWidth;
    }

    componentDidUpdate(
        prevProps: Readonly<TypeUIAsideProps>,
        prevState: Readonly<TypeUIAsideState>,
        snapshot?: any
    ): void {
        if (
            this.state.paddingLeft === null
            && !prevState.isHovering && this.state.isHovering
        ) {
            this.setState({
                paddingLeft: this.originWidth - this.asideRef.elem!.clientWidth
            });
        }
    }

    scrollToItem(itemKey: string | number) {
        const current: HTMLElement = this.asideRef.elem!;
        if (!current) {
            return;
        }

        const elem = (current.querySelector(`[data-key="${itemKey}"]`) as HTMLElement);
        if (!elem) {
            return;
        }

        const offsetTop = elem.offsetTop;

        const SCROLL_MARGIN = 100;
        current.scrollTop = offsetTop - SCROLL_MARGIN;
    }

    handleMouseEnter = () => {
        this.setState({
            isHovering: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
            isHovering: false
        });
    };

    handleSelectItem = (itemKey: number | string, item: TypeAsideItem) => {
        const onChange = this.props.onChange;
        onChange && onChange(itemKey, item);
    };

    render() {
        const props = this.props;

        return <div className={cls('aside')}
                    data-hover-status={this.state.isHovering ? 'hover' : null}
                    ref={this.asideRef.ref}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
        >
            {props.asideItems.map(
                item => {
                    return <div
                        className={brk('aside-item')}
                        key={item.key}
                        data-key={item.key}
                        data-state={props.itemKeySelected === item.key ? 'selected' : null}
                        style={{paddingLeft: this.state.isHovering ? this.state.paddingLeft + 'px' : ''}}
                        onClick={() => this.handleSelectItem(item.key, item)}
                    >
                        {item.text}
                    </div>;
                }
            )}
        </div>;
    }
}
