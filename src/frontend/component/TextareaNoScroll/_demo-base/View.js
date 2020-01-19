import React from 'react';
import {h} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import View from '../index';

export default class BaseView extends React.Component {
    render() {
        return h.div(
            {},
            h.div(
                {},
                h.h3({}, '控制型'),
                h(View, {
                    maxLength: 10,
                    overflowText: '好的 OKR 要足够精练',
                    value: this.local.value,
                    onChange: evt => {
                        this.local.assign({
                            value: evt.target.value
                        });
                    }
                })
            ),
            h.div({}, h.h3({}, '非控制型'), h(View, {
                maxLength: 10,
                placeholder: 'lalal',
                overflowText: '好的 OKR 要足够精练'
            }))
        );
    }
}
