module.exports = function (plop, data, utils) {
    utils.preset = utils.preset || {};

    Object.assign(utils.preset, {
        layoutChoices: [{
            name: 'commonLayout : 通用layout',
            value: 'commonLayout'
        }]
    });
};
