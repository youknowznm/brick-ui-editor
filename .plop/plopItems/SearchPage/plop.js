const npath = require('path');
const _ = require('lodash');

function prompts(inquirer) {
    return inquirer
        .prompt([
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
            {
                type: 'list',
                default: 'yes',
                choices: ['yes', 'no'],
                name: 'shouldInjectApp',
                message: '是否需要向组件内部注入 mobx 的全局 app?'
            },
            {
                type: 'list',
                default: 'yes',
                choices: ['yes', 'no'],
                name: 'shouldUseReaction',
                message: '是否需要引入 ReactionManager 的联动管理模式?'
            },
            {
                type: 'input',
                name: 'searchPageKey',
                message: '输入 search page 的关键词, 比如个人费用相关的, person cost',
                validate(input) {
                    const done = this.async();

                    if (!_.trim(input)) {
                        done('你需要输入非空的 search page 关键词');
                    }
                    else {
                        done(null, true);
                    }
                }
            }
        ])
        .then(inputs => {
            Object.assign(inputs, {
                pageClass: _.upperFirst(_.camelCase(inputs.pageName)) + 'PageVM',
                pageCompClass: _.upperFirst(_.camelCase(inputs.pageName)) + 'PageView',
                defaultInjectKey: _.camelCase(inputs.pageName) + 'Page',
                pageCSSWrapper: _.kebabCase(inputs.pageName) + '-page-wrapper',
                shouldInjectApp: inputs.shouldInjectApp === 'yes',
                shouldUseReaction: inputs.shouldUseReaction === 'yes',
                searchPageVarKey: _.upperFirst(_.camelCase(inputs.searchPageKey)),
                searchPageFilePrefix: _.kebabCase(inputs.searchPageKey),
            });

            return inputs;
        })
        .then(inputs => {
            return inquirer
                .prompt([
                    {
                        type: 'list',
                        default: 'yes',
                        choices: ['yes', 'no'],
                        name: 'shouldInjectKey',
                        message: '本页面的状态是否需要注入到 props.app 中?'
                    }
                ])
                .then(subInputs => {
                    if (subInputs.shouldInjectKey === 'yes') {
                        inputs.shouldInjectKey = true;

                        return inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    default: inputs.defaultInjectKey,
                                    name: 'injectKey',
                                    message: '本页面的状态是否需要注入到 props.app 中? (如果留空, 则不进行注入)'
                                }
                            ])
                            .then(injectKeyInputs => {
                                inputs.injectKey = injectKeyInputs.injectKey;
                                return inputs;
                            });
                    }

                    inputs.shouldInjectKey = false;
                    return inputs;

                });
        });
}

module.exports = function (plop, data, utils) {

    /**
     * @def: template.pc-normal-page
     *  raw:
     *      pageName
     *      searchPageKey
     *      shouldInjectKey
     *      shouldUseReaction
     *  derived:
     *      pageClass
     *      pageCSSWrapper
     *      pageReactClass
     *      searchPageVarKey
     *      searchPageFilePrefix
     */
    plop.setGenerator('search-page', {

        prompts,

        actions: [
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{pageClass}}/index.js',
                template: utils.template(__dirname, 'index.js')
            },
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{pageClass}}/style.use.less',
                template: utils.template(__dirname, 'style.use.less')
            },
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{pageClass}}/View.js',
                template: utils.template(__dirname, 'View.js')
            },
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{pageClass}}/{{searchPageFilePrefix}}-data.js',
                template: utils.template(__dirname, 'data.js')
            },
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{pageClass}}/{{searchPageFilePrefix}}-search.js',
                template: utils.template(__dirname, 'search.js')
            }
        ]
    });
};
