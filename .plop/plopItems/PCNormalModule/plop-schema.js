
const schema = require('@befe/utils/dev-pattern-vm/jsdef/schema');

schema({
    idcModule: {
        attrs: {
            moduleName: 'string',
            layoutKey: 'string : commonLayout',

            shouldInjectKey: 'string : yes | no',
            shouldInjectApp: 'string : yes | no'
        },
        derived: {
            moduleCSSWrapper: 'string',
            moduleClass: 'string'
        },
        preset: {
            userName: 'string',
            today: 'string'
        }
    }
}, 'plop/template');
