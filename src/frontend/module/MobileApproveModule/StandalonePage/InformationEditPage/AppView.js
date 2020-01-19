/**
 * @file PAGE_NAME 页面入口组件
 * @author YOURNAME
 */

import {
    React,
    Component,
    h,
    suh,
    c
} from '@befe/utils/dev-pattern-vm/index-mobile';

export default class AppView extends Component {

    componentDidMount() {
        setTimeout(() => {
            if (!this.textarea) {
                return;
            }

            this.textarea.focus();
        }, 200);
    }

    render() {
        const {local} = this.props;
        let className = 'app-view';

        if (local.moduleClassName) {
            className += ` app-view-${local.moduleClassName}`;
        }

        const wordCount = local.wordingLimit - local.text.length;

        return h.div(className, {},

            h.textarea({
                ref: textarea => (this.textarea = textarea),
                value: local.text,
                onChange: local.handleTextChange
            }),

            h.span(
                c('wording-count',
                    {
                        'content-overflow': wordCount < 0
                    }
                ),

                {},

                wordCount,
                ' 字'
            ),
        );
    }
}
