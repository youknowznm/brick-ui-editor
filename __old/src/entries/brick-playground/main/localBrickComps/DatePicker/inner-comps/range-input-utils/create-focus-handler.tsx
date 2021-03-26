import * as React from 'react';

type TypeFocusHandlerOpts = {
    onFocus?: () => void
    onBlur?: () => void
};

export function createFocusHandler(
    comp: React.Component<any, any>,
    propName: string,
) {
    const opts: TypeFocusHandlerOpts = {};

    function setFocus(focus: boolean) {
        comp.setState({
            [propName]: focus
        });
    }

    return {
        init(
            initOpts: TypeFocusHandlerOpts = {}
        ) {
            Object.assign(opts, initOpts);
        },
        handleFocus() {
            setFocus(true);
            opts.onFocus && opts.onFocus();
        },
        handleBlur() {
            setFocus(false);
            opts.onBlur && opts.onBlur();
        }
    };
}
