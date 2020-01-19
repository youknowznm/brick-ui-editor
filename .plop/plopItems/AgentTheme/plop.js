const npath = require('path');
const _ = require('lodash');

module.exports = function (plop, data, utils) {

    function prompts(inquirer) {
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'agentThemeName',
                    message: 'agent theme 模块名称? (不需要 -agent-theme 后缀)',
                }
            ])
            .then(inputs => {
                inputs.agentThemeFile = _.kebabCase(inputs.agentThemeName) + '-agent-theme';

                return inputs;
            })
    }

    plop.setGenerator('agent-theme-module', {

        prompts,

        actions: [
            {
                type: 'add',
                data,
                path: '{{currentPath}}/{{agentThemeFile}}.js',
                template: utils.template(__dirname, 'index.js')
            }
        ]
    })
};
