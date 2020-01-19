const npath = require('path');
const _ = require('lodash');

module.exports = function (plop, data, utils) {

    /**
     * @def: template.pc-normal-page
     *  raw:
     *      pageName
     *      shouldInjectKey
     *      shouldUseReaction
     *  derived:
     *      pageClass
     *      pageCSSWrapper
     *      pageCompClass
     */
    plop.setGenerator('pc-normal-page', {

        prompts: [
            {
                type: 'input',
                name: 'pageName',
                message: '页面名称是什么? (不需要 PageVM 后缀)',
                validate(input) {
                    const done = this.async();

                    if (!_.trim(input)) {
                        done('你需要输入非空的页面名称');
                    }
                    else {
                        done(null, true);
                    }
                }
            },
            // page 总是注入 app
            // {
            //     type: 'confirm',
            //     default: true,
            //     name: 'shouldInjectApp',
            //     message: '是否需要向组件内部注入 mobx 的全局 app?'
            // },
            {
                type: 'confirm',
                default: true,
                name: 'shouldUseReaction',
                message: '是否需要引入 ReactionManager 的联动管理模式?'
            },
            {
                type: 'confirm',
                default: true,
                name: 'shouldInjectKey',
                message: '本页面的状态是否需要注入到 props.app 中?'
            },
            // 没必要在这里自定义 injectKey
            // {
            //     type: 'input',
            //     when: inputs => inputs.shouldInjectKey,
            //     name: 'injectKey',
            //     message: '本页面的状态是否需要注入到 props.app 中? (如果留空, 则不进行注入)'
            // }
        ],

        actions: function (inputs, modulePath = '{{currentPath}}') {
            Object.assign(inputs, {
                // page 总是注入 app
                shouldInjectApp: true,
                pageClass: _.upperFirst(_.camelCase(inputs.pageName)) + 'PageVM',
                pageCompClass: _.upperFirst(_.camelCase(inputs.pageName)) + 'PageView',
                pageCSSWrapper: _.kebabCase(inputs.pageName) + '-page-wrapper',
            });

            if (!inputs.injectKey) {
                inputs.injectKey = _.camelCase(inputs.pageName) + 'Page'
            }

            return [
                {
                    type: 'add',
                    data,
                    path: modulePath + '/{{pageClass}}/index.js',
                    template: utils.template(__dirname, 'index.js')
                },
                {
                    type: 'add',
                    data,
                    path: modulePath + '/{{pageClass}}/style.use.less',
                    template: utils.template(__dirname, 'style.use.less')
                },
                {
                    type: 'add',
                    data,
                    path: modulePath + '/{{pageClass}}/View.js',
                    template: utils.template(__dirname, 'View.js')
                }
            ]
        }
    });
};
