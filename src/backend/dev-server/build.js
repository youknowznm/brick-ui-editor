/**
 * 对应 dest 命令的入口逻辑
 *
 * @file build
 * @author Liang
 */
var webpack = require('webpack');
var config = require('common/config');
var utils = require('common/utils');

var fs = require('fs');
var util = require('util');

var _ = require('lodash');

var del = require('delete');
var cp = require('copy-dir');

module.exports = {

    /**
     *
     * @def: opts: {}
     *  // webpack 构建之后, 出发 onBuilt 进行特殊处理 (如果有)
     *  onBuilt: function
     *
     *  // 对应 build-plans/ 下的 ${buildPlanKey}.js 的构建配置
     *  buildPlanKey: string
     *
     *  // 构建时, 是否输出 source map
     *  sourceMap: boolean
     *
     *  // 是否输出构建的性能数据
     *  enableProfiling: boolean
     *
     *  // minifyboolean
     *  minify:
     */
    execute(opts) {
        opts = opts || {};

        opts.buildPlanKey = opts.buildPlanKey || 'prod';

        var buildPlanConfigPath = utils.p(
            config.path.buildPlans + '/' + opts.buildPlanKey + '.js'
        );

        if (!fs.existsSync(buildPlanConfigPath)) {
            utils.log(`error: ${opts.buildPlanKey} 配置缺失, 请确保 ${buildPlanConfigPath}.js 是否存在.`);
        }

        var buildPlanConfig = require(buildPlanConfigPath);

        // 获取 webpack
        var getWebpackConfig = require('webpack-config/get-webpack-config-for-build');

        // 清除 prod 内容
        del.sync(config.path.prod, {
            force: true
        });
        utils.ensurePath(config.path.prod);
        utils.ensurePath(config.path.prodPages);

        var webpackConfig = getWebpackConfig(buildPlanConfig, {
            minify: opts.minify,
            dev: false,
            sourceMap: opts.sourceMap,
            enableProfile: opts.enableProfiling,
            // presets: ['babel-polyfill']
        });

        // 构建
        var compiler = webpack(webpackConfig);
        compiler.run(function (ex, stats) {
            if (ex) {
                utils.log(['error: 遇到构建错误.', ex, ex.stack]);
                return;
            }

            util.log(String(stats));

            fs.writeFileSync(config.path.tmp + '/prod-build.txt', stats);
            if (opts.enableProfiling) {
                fs.writeFileSync(
                    config.path.tmp + '/prod-profile.json',
                    JSON.stringify(stats.toJson({
                        modules: true,
                        context: config.path.root,
                        assets: true,
                        source: false
                    }), null, 2)
                );
            }

            if (stats.hasErrors()) {
                utils.log(['error: ' + stats.toString('errors-only')]);
                throw new Error('构建出错, 请看打印日志')
            }

            opts.onBuilt && opts.onBuilt();

            utils.log(['info: 构建完成!']);
        });
    }
};
