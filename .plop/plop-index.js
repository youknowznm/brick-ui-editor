const plopUtils = require('../src/@befe/utils/dev-pattern-vm/_Template/lib/plop-utils');
const npath = require('path');

module.exports = function (plop) {
    plopUtils.loadGenerators(
        npath.resolve(__dirname, 'plopItems'),
        plop,
    );
};
