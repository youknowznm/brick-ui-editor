module.exports = {
    presets: [
        ['@babel/env', {
            loose: true,
            modules: false,
            targets: '> 1%, last 2 versions, ie 11',
            corejs: 3,
            useBuiltIns: 'entry',
        }],
        '@babel/typescript',
        '@babel/react',
    ],
    plugins: [
        '@babel/transform-runtime',
        '@babel/proposal-class-properties',
        'babel-plugin-typescript-to-proptypes',
    ],
}
