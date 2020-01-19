/**
 * @file vendor.dll.build
 * @author Liang
 */
let del = require('del')
let config = require('common/config')
let webpack = require('webpack')

del.sync(config.path.dllProd, { force: true })
del.sync(config.path.dllDev, { force: true })

function buildDll(label, dllWebpackConfig) {
    let compilerDev = webpack(dllWebpackConfig)

    compilerDev.run(function (err) {
        if (err) {
            console.error(err)
            return
        }

        console.log(`[SUCCESS] dll bundler script for [${label}] 编译完成, 请笑纳...`)
    })
}

buildDll(
    'PC Normal React-Mobx Development Vendor',
    require('webpack-config/dll-config/pc-normal-dll-webpack-config-dev')
);

buildDll(
    'PC Normal React-Mobx Production Vendor',
    require('webpack-config/dll-config/pc-normal-dll-webpack-config-prod')
);

buildDll(
    'Mobile Normal React-Mobx Development Vendor',
    require('webpack-config/dll-config/mobile-normal-dll-webpack-config-dev')
);

buildDll(
    'Mobile Normal React-Mobx Production Vendor',
    require('webpack-config/dll-config/mobile-normal-dll-webpack-config-prod')
);

buildDll(
    'Mobile General React-Mobx, React-Router Development Vendor',
    require('webpack-config/dll-config/mobile-general-dll-webpack-config-dev')
);

buildDll(
    'Mobile General React-Mobx, React-Router Production Vendor',
    require('webpack-config/dll-config/mobile-general-dll-webpack-config-prod')
);
