const {localIdentName} = require('./config')
module.exports = {
    presets: [
        ['@babel/env', {
            loose: true,
            targets: '> .5%, last 2 versions, ie>=11',
            modules: false,
            corejs: '3',
            useBuiltIns: 'usage',
            // debug: true
        }],
        '@babel/typescript',
        '@babel/react'
    ],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                'legacy': true
            }
        ],
        ['@babel/proposal-class-properties',
            {
                'loose': true
            }
        ],
        'add-module-exports',
        '@babel/plugin-syntax-dynamic-import',
        'react-hot-loader/babel',
        'babel-plugin-typescript-to-proptypes',
        ['react-css-modules', {
            'filetypes': {
                '.scss': {
                    'syntax': 'postcss-scss'
                }
            },
            'generateScopedName': localIdentName
        }],
    ]
}
