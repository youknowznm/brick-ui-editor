/**
 * @file date-picker
 * @author zhengliangliang
 * @owner zhengliangliang:2019-12-02
 */
import * as React from 'react';
// import * as PropTypes from 'prop-types'
import {isObjectNestedEquals} from '@befe/brick-utils';
import {IDatePickerProps, InnerDatePicker} from '../inner-comps/inner-date-picker';

function wrapCompWithSCU<T>(
    Component: T,
    shouldComponentUpdate: (nextProps: any, nextState: any) => boolean
): T {
    class WrappedComponent extends React.Component {
        shouldComponentUpdate = shouldComponentUpdate;

        state = {};

        render() {
            // @ts-ignore
            return <Component {...this.props} />;
        }
    }

    Object.keys(Component)
        // @ts-ignore
        .map(staticProp => (WrappedComponent[staticProp] = Component[staticProp]));

    // @ts-ignore
    return WrappedComponent;
}

export const DatePicker = wrapCompWithSCU(
    InnerDatePicker,
    function (this: JSX.Element, nextProps: IDatePickerProps) {
        return !isObjectNestedEquals(
            this.props,
            nextProps,
            {
                style: null,
                popupStyle: null
            }
        );
    }
);
