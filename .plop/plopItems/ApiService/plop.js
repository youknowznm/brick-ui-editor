const npath = require('path');
const _ = require('lodash');

module.exports = function (plop, data, utils) {

    function prompts(inquirer) {
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'apiModuleName',
                    message: 'api 模块的名称? (不需要 -api 后缀)',
                }
            ])
            .then(inputs => {
                inputs.apiModuleFile = _.kebabCase(inputs.apiModuleName) + '-api';

                return inputs;
            })
    }

    plop.setGenerator('api-service-module', {

        prompts,

        actions: [
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{apiModuleFile}}.js',
                template: utils.template(__dirname, 'index.js')
            }
        ]
    })
};
