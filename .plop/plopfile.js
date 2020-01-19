const npath = require('path');

module.exports = function (plop) {
    const plopUtils = require('../src/@befe/utils/dev-pattern-vm/_Template/lib/plop-utils');

    const projectGlobalConfigPath = npath.resolve(__dirname, 'inferred-config.js');
    plopUtils.setGlobal(require(projectGlobalConfigPath));

    // 默认是转向 frontend 下的 template 文件夹,
    // 但是你需要根据实际情况进行调整
    require('../src/@befe/utils/dev-pattern-vm/_Template/plop-index.js')(plop);
    require('./plop-index')(plop);
};
