const npath = require('path');
const _ = require('lodash');

module.exports = function(plop, data, utils) {
    /**
     * @def template.component-vm
     *  raw:
     *      compName
     *      shouldInjectApp yes | no
     *      shouldUseReaction: yes | no
     *  derived:
     *      compClass
     *      compCSSWrapper
     *      compReactClass
     *      compStateClass
     */
    plop.setGenerator('component-vm', {
        prompts: [
            {
                type: 'input',
                name: 'compName',
                message: '组件名称是什么?'
            },
            {
                type: 'confirm',
                default: false,
                name: 'shouldInjectApp',
                message: '是否需要向组件内部注入 mobx 的全局 app?'
            },
            {
                type: 'confirm',
                default: true,
                name: 'shouldUseReaction',
                message: '是否需要引入 ReactionManager 的联动管理模式?'
            },
            {
                type: 'confirm',
                default: true,
                name: 'useDemo',
                message: '是否需要引入 demo?'
            }
        ],
        actions: function(inputs) {
            const compName = _.upperFirst(_.camelCase(inputs.compName))
            inputs.compName = compName
            inputs.compClass = compName;
            inputs.compCSSWrapper = _.kebabCase(compName) + '-wrapper';
            inputs.compReactClass = compName + 'View';
            inputs.compStateClass = compName + 'State';

            const compPath = '{{currentPath}}/{{compClass}}VM';

            let actions = [
                {
                    type: 'add',
                    data,
                    path: compPath + '/index.js',
                    template: utils.template(__dirname, 'index.js')
                },
                {
                    type: 'add',
                    data,
                    path: compPath + '/style.use.less',
                    template: utils.template(__dirname, 'style.use.less')
                },
                {
                    type: 'add',
                    data,
                    path: compPath + '/View.js',
                    template: utils.template(__dirname, 'View.js')
                }
            ];

            if (inputs.useDemo) {
                const demoCasePageGenerator = plop.getGenerator('demo-case-page')
                inputs.demoPageCaseName = 'normal'
                inputs.compName = inputs.compClass
                actions = actions.concat(demoCasePageGenerator.actions(inputs, compPath))
            }

            return actions;
        }
    });
};
