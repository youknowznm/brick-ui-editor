const npath = require('path');
const _ = require('lodash');

const currentCompName = npath.basename(process.cwd())

module.exports = function (plop, data, utils) {
    /**
     * @def: template.demo-page
     *  raw:
     *      compVM
     *      compPageName
     *  derived:
     *      compDemoClass
     *      compDemoStateClass
     *      compStateInjectKey
     *
     *      compDemoKey
     *      compDemoName
     *      compDemoReactClass
     *      compDemoCssWrapper
     *
     *      compVMClass
     *      compVMInstance
     */
    plop.setGenerator('demo-case-page', {
        prompts: [
            {
                type: 'input',
                name: 'demoPageCaseName',
                message: 'demo 页面的 case 名称是？',
                default: 'normal'
            }
        ],
        actions: function (inputs, compPath = '{{currentPath}}') {
            if (!inputs.compName) {
                inputs.compName = currentCompName
            }
            const compName =  _.upperFirst(_.camelCase(inputs.compName)).replace(/[V][Mm]$/, '');

            const demoPageCaseNameUpper = _.upperFirst(inputs.demoPageCaseName);
            const demoPageCaseNameKebab = _.kebabCase(inputs.demoPageCaseName);

            const compDemoClass = compName + demoPageCaseNameUpper + 'DemoPage';
            const compDemoKebab = _.kebabCase(compName) + `-${demoPageCaseNameKebab}-demo-page`;

            inputs.compDemoClass = compDemoClass;
            inputs.compDemoStateClass = compDemoClass + 'State';
            inputs.compDemoReactClass = compDemoClass + 'View';
            inputs.compDemoCssWrapper = compDemoKebab;

            inputs.compDemoStateInjectKey = _.camelCase(compDemoClass);
            inputs.compDemoKey = _.kebabCase(compName) + `/${demoPageCaseNameKebab}`;
            inputs.compDemoName = demoPageCaseNameKebab === 'normal' ?  compName : compName + `.${demoPageCaseNameKebab}`;

            inputs.compVMClass = compName + 'VM';
            inputs.compVMInstance = _.camelCase(compName) + 'VM';

            const demoPagePath = npath.join(compPath, '_demo-' + demoPageCaseNameKebab);
            const demoPageTplDir = __dirname;

            return [
                {
                    type: 'add',
                    data,
                    path: demoPagePath + '/index.js',
                    template: utils.template(demoPageTplDir, 'index.js')
                }, {
                    type: 'add',
                    data,
                    path: demoPagePath + '/View.js',
                    template: utils.template(demoPageTplDir, 'View.js')
                }, {
                    type: 'add',
                    data,
                    path: demoPagePath + '/style.use.less',
                    template: utils.template(demoPageTplDir, 'style.use.less')
                },
            ];
        }
    });
};
