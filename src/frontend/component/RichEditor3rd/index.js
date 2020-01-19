import React from 'react';
import {h, c} from '@befe/utils/wrapper/erp';
import i18n from '@befe/utils/i18n/easy-i18n';
import style from './component.use.less';
import {detectBrowser} from '@befe/utils/lib/browser';

import 'froala-editor/js/froala_editor.min.js';
import 'froala-editor/js/languages/zh_cn.js';

import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
// import 'froala-editor/js/plugins/fullscreen.min';
import 'froala-editor/js/plugins/code_beautifier.min.js';
// import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/inline_style.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';

/**
 * ?TODO 待验证
 */
// import 'froala-editor/js/third_party/embedly.min.js'
// import 'froala-editor/css/third_party/embedly.min.css'

// import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/gray.min.css';
import 'froala-editor/css/froala_editor.min.css';

// import 'froala-editor/css/plugins/fullscreen.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/code_view.min.css';
import 'froala-editor/css/plugins/table.min.css';
import 'froala-editor/css/plugins/char_counter.min.css';

import 'font-awesome/css/font-awesome.css';
import $ from 'jquery';
import FroalaEditor from 'react-froala-wysiwyg';
// import {detect} from 'browser-detect';
global.$ = global.jQuery = $;

const translationLang = () => {
    $.FE.LANGUAGE.zh_cn.translation['Word Paste Detected'] = '检测到Word内容';
    $.FE.LANGUAGE.zh_cn.translation.Keep = '保留';
    $.FE.LANGUAGE.zh_cn.translation.Clean = '清除';
    $.FE.LANGUAGE.zh_cn.translation.Break = '插入行';
};

export default class RichEditor3rd extends React.Component {
    static defaultProps = {}

    state = {
        browser: {}
    }

    componentWillMount() {
        style.use();
        // let  browser = detect()
        // this.setState({
        //     browser: browser
        // })
        translationLang();
    }

    componentWillReceiveProps(nextProps) {
        //     if (nextProps.editable) {
        //         if (this.froalaEditor) {
        //             this.froalaEditor.edit.on();
        //         }
        //     } else {
        //         if (this.froalaEditor) {
        //             this.froalaEditor.edit.off();
        //         }
        //     }
    }

    componentWillUnmount() {
        style.unuse();
    }

    get lang() {
        let lang = document.body.lang || i18n.getLang().lang || 'zh_cn';
        return lang.toLowerCase().replace(/-/g, '_');
    }

    renderError() {
        return h.div('unavailable', {},
            h.div('browser-incompatibility', {},
            ),
            h.p('tips', {}, _i('froala-editor-error-tips'))
        );
    }

    render() {
        const {config = {}, ...props} = this.props;
        const browser = window.BROWSER = detectBrowser();
        let isIE9 = window.BROWSER.name === 'ie' && window.BROWSER.version.slice(0, 1) === '9';
        return (
        h.div('froala-rich-editor', {
            style: {
                whiteSpace: 'pre-wrap'
            }
        },
            h(FroalaEditor, {
                config: {
                    key: 'QF4B3D3A13hC7D6D5D5D2E3B2C6A6B7cODOe1HLEBFZOTGHW==', // 'Qg1Ti1LXd2URVJh1DWXG==', // 'ACTIVATION_KEY', // 激活 key
                    theme: 'gray',
                    // language: this.lang,
                    language: config.lang,
                    toolbarButtons: [
                        'bold', 'italic', 'underline', 'color', '|', 'fontSize', '|', 'undo', 'redo'
                    ],
                    toolbarButtonsXS: [
                        'bold', 'italic', 'underline', 'color', '|', 'fontSize',
                        'outdent', 'indent', 'align', '|', 'formatOL', 'formatUL', '|', 'undo', 'redo'
                    ],
                    toolbarButtonsMD: [
                        'bold', 'italic', 'underline', 'color', '|', 'fontSize',
                        'outdent', 'indent', 'align', '|', 'formatOL', 'formatUL', '|', 'undo', 'redo'
                    ],
                    toolbarButtonsSM: [
                        'bold', 'italic', 'underline', 'color', '|', 'fontSize',
                        'outdent', 'indent', 'align', '|', 'formatOL', 'formatUL', '|', 'undo', 'redo'
                    ],
                    enter: $.FroalaEditor.ENTER_BR,
                    htmlRemoveTags: ['script'],
                    // htmlAllowedEmptyTags: ['table', 'strong', 'th', 'tr', 'p', 'td'],
                    placeholderText: '',
                    // charCounter: true, // 是否开启统计字数
                    // charCounterMax: 2000, // 最大输入字数,目前只支持英文字母
                    fontSize: ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
                        '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
                    fontSizeSelection: true,
                    // toolbarButtonsXS: ['undo', 'redo', '-', 'bold', 'italic', 'underline'], 小屏下也要显示完整操作键
                    imagePaste: false,
                    toolbarSticky: false, // 是否让 toolbar 保持可见
                    tabSpaces: 4,
                    wordPasteModal: false, // 复制 word 有格式会弹出框
                    pastePlain: false, // 粘贴保持格式

                    wordAllowedStyleProps: ['background', 'color', 'text-align', 'font-size', 'font-weight'],
                    wordDeniedTags: ['br'],
                    // wordAllowedStyleProps: [],
                    wordDeniedAttrs: ['width', 'style'],
                    // ['font-family', 'font-size', 'background', 'color', 'width', 'text-align',
                    // 'vertical-align', 'background-color', 'padding', 'margin', 'height', 'margin-top', 'margin-left',
                    // 'margin-right', 'margin-bottom', 'text-decoration', 'font-weight', 'font-style'],
                    lineBreakerOffset: 10,
                    lineBreakerTags: ['table', 'hr', 'form'],

                    tableCellMultipleStyles: false,
                    tableEditButtons: ['tableHeader', 'tableRows', 'tableColumns', 'tableCellBackground',
                        'tableCellVerticalAlign', 'tableCellHorizontalAlign', 'tableRemove'],
                    htmlUntouched: true, // Leave the HTML inside the editor untouched without doing any special processing to it except HTML cleaning.
                    htmlExecuteScripts: false, // Allow running scripts that are entered in Code View.
                    ...config
                },
                onModelChange: this.handleModalChange, // console.log.bind(console, 'onModelChange'),
                tag: 'textarea',
                ...props
            }),
            isIE9
                ? this.renderError()
                : null
        )
        );
    }

    handleModalChange = e => {
        const {onChange} = this.props;
        if (typeof onChange === 'function') {
            onChange(e);
        }

    }
}
