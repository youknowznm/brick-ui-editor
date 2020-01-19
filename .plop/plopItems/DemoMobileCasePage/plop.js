const npath = require('path');
const _ = require('lodash');

module.exports = function (plop, data, utils) {
    function prompts(inquirer) {
        return inquirer
            .prompt([{
                type: 'input',
                name: 'demoPageName',
                message: 'demo 页面的名称'
            }])
            .then(inputs => {
                const compClass = _.upperFirst(_.camelCase(inputs.demoPageName));

                const compDemoClass = compClass + 'Demo';
                const compDemoKebab = _.kebabCase(compDemoClass);
                inputs.compDemoClass = compDemoClass;
                inputs.compDemoStateClass = compDemoClass + 'State';
                inputs.compDemoStateInjectKey = _.camelCase(compDemoClass);
                inputs.compDemoKey = compDemoKebab;
                inputs.compDemoName = compDemoClass;
                inputs.compDemoReactClass = compDemoClass + 'View';
                inputs.compDemoCssWrapper = compDemoKebab;

                const compVMClass = compClass + 'VM';
                inputs.compVMClass = compVMClass;
                inputs.compVMInstance = _.camelCase(compClass) + 'VM';

                return inputs;
            });
    }

    /**
     * @def: template.demo-page
     *  raw:
     *      compName
     *      caseName
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
    plop.setGenerator('demo-mobile-case-page', {
        prompts,
        actions(inputs) {
            const compPath = '{{currentPath}}';
            const demoPagePath = npath.join(compPath, '_demo-' + _.kebabCase(inputs.demoPageName));
            const demoPageTplDir = __dirname;

            return [
                // demo page
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
