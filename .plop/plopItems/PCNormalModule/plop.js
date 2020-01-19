const npath = require('path');
const _ = require('lodash');

module.exports = function (plop, data, utils) {
    /**
     * @def: template.pc-normal-module
     *  raw:
     *      moduleName
     *      layoutKey
     *      shouldInjectKey
     *      shouldInjectApp
     *  derived:
     *      moduleCSSWrapper
     *      moduleClass
     */
    plop.setGenerator('pc-normal-module', {

        prompts: [
            {
                type: 'input',
                name: 'moduleName',
                message: '业务模块名称是什么? (不需要加入 Module 后缀)',
                validate: utils.validators.required('业务模块名称')
            },
            // {
            //     type: 'confirm',
            //     default: true,
            //     name: 'shouldInjectKey',
            //     message: '是否注入 page key (indexPage) 到 props.app 中'
            // },
            // page 都注入
            // {
            //     default: true,
            //     name: 'shouldInjectApp',
            //     message: '是否注入 app 到 index page React 组件中'
            // }
        ],

        actions: function (inputs) {
            const indexPageGenerator = plop.getGenerator('pc-normal-page');
            const moduleNameBase = _.camelCase(inputs.moduleName);
            const moduleNameConst = _.snakeCase(moduleNameBase).toUpperCase();

            inputs.moduleName = inputs.moduleName + 'Module';
            inputs.moduleNameBaseKebab = _.kebabCase(moduleNameBase);
            inputs.moduleNameKebab = _.kebabCase(inputs.moduleName);
            inputs.moduleClass = _.upperFirst(_.camelCase(inputs.moduleName));
            inputs.moduleCSSWrapper = inputs.moduleNameKebab + '-wrapper';


            inputs.moduleNameConst = 'MODULE_' + moduleNameConst;
            inputs.siteMapNameConst = 'SITE_MAP_' + moduleNameConst;
            inputs.indexPageConst = 'PAGE_' + moduleNameConst + '_INDEX';

            // for index page
            inputs.pageName = 'Index';
            inputs.shouldInjectKey = true;
            inputs.shouldInjectApp = true;

            const compPath = '{{currentPath}}/{{moduleName}}';

            return [
                {
                    type: 'add',
                    data,
                    path: compPath + '/index.js',
                    template: utils.template(__dirname, 'index.js')
                },
                {
                    type: 'add',
                    data,
                    path: compPath + '/routes.js',
                    template: utils.template(__dirname, 'routes.js')
                },
                {
                    type: 'add',
                    data,
                    path: compPath + '/AppVM.js',
                    template: utils.template(__dirname, 'AppVM.js')
                },
                {
                    type: 'add',
                    data,
                    path: compPath + '/style.less',
                    template: utils.template(__dirname, 'style.less')
                },
                // 大部分开发场景不会在模块层级使用 wrapper
                // {
                //     type: 'add',
                //     data,
                //     path: compPath + '/wrapper.js',
                //     template: utils.template(__dirname, 'wrapper.js')
                // },
                {
                    type: 'add',
                    data,
                    path: compPath + '/site-map.js',
                    template: utils.template(__dirname, 'site-map.js')
                },
                ...indexPageGenerator.actions(inputs, compPath)
                // {
                //     type: 'add',
                //     data,
                //     path: compPath + '/IndexPageVM/index.js',
                //     template: utils.template(__dirname, 'IndexPageVM/index.js')
                // },
                // {
                //     type: 'add',
                //     data,
                //     path: compPath + '/IndexPageVM/style.use.less',
                //     template: utils.template(__dirname, 'IndexPageVM/style.use.less')
                // },
                // {
                //     type: 'add',
                //     data,
                //     path: compPath + '/IndexPageVM/View.js',
                //     template: utils.template(__dirname, 'IndexPageVM/View.js')
                // }
            ]
        }
    });
};
