var _ = require('lodash');
var config = require('common/config');
var utils = require('common/utils');
var sp = require('common/sp');
var gitNpm = require('./lib/git-npm');
var workflowCommands = require('./lib/workflow');
var fs = require('fs');

/**
 * 用于提供给 Command 使用的 utils, 主要是一些统一的信息处理
 */
var commandUtils = {

    _commander: null,

    /**
     * @def: commander => commander
     */
    optionsSetPort(commander) {
        commandUtils.setCommander(commander);

        commandUtils._commander
            .option('-p, --dev-port <devPort>', '设置前端开发服务器端口 (开发运行时)')
            .option('-t, --prod-test-port <prodTestPort>', '设置前端测试服务器端口 (构建后的静态资源查看服务器)')
            .option('-d, --prod-port <prodPort>',
                '设置后端服务器接口 (这个后端指的是如果用种子项目开发一些简单的后端服务起的后端)');

        return commandUtils.getCommander();
    },

    /**
     * 获得并返回本 commander utils
     *
     * @def: commander => #@commandUtils
     */
    setCommander(commander) {
        if (commander) {
            commandUtils._commander = commander;
        }

        return commandUtils;
    },

    /**
     * 得到 utils 包裹的 commander 实例
     *
     * @def: commander => commander
     */
    getCommander(commander) {
        commandUtils.setCommander(commander);
        
        const withErrors = (action)=> {
            return async (...args) => {
                console.error(args)
                try {
                    await action(...args)
                } catch(e) {
                    console.error(e)
                    process.exitCode = 1
                }
            }
        }
        const action = commandUtils._commander.action.bind(commandUtils._commander)
        commandUtils._commander.action = async (fn) => {
            return action(withErrors(fn))
        }
        return commandUtils._commander;
    },

    /**
     *
     * @def: opts, config => undefined
     *  // 从命令行抽取得到的 options
     *  opts: #@CommanderOptions
     *      devPort: string
     *      prodTestPort: string
     *      prodPort: string
     *
     *  config: #@ProjectConfig
     *      devPort: string
     *      prodTestPort: string
     *      prodPort: string
     */
    setPortConfig(opts, config) {
        if (opts.devPort) {
            config.devPort = opts.devPort;
        }

        if (opts.prodTestPort) {
            config.prodTestPort = opts.prodTestPort;
        }

        if (opts.prodPort) {
            config.prodPort = opts.prodPort;
        }

    }
};

/**
 *
 * @def: deps => undefined
 *  // injected dependencies
 *  deps: {}
 *      commander: #@Commander
 */
module.exports = function (deps) {
    var commander = deps.commander;

    var config = require('common/config');

    var extraMatriks2CommandIndexPath = utils.j(
        config.path.frontendModules,
        '@befe',
        'utils',
        'command-line/matriks2/index.js',
    );


    console.log(extraMatriks2CommandIndexPath);
    if (fs.existsSync(extraMatriks2CommandIndexPath)) {
        var extraCommandLoader = require(extraMatriks2CommandIndexPath);
        if (typeof extraCommandLoader === 'function') {
            extraCommandLoader(
                commander,
                commandUtils,
                {
                    config,
                    utils,
                }
            );
        }
    }

    commandUtils
        .getCommander(commander.command('dll'))
        .description('进行 webpack 的 dll 打包')
        .action(function (opts) {
            require('../dev-server/dll-build/build-vendor-dll');
        });

    commandUtils
        .getCommander(commander.command('fecs', '进行 fecs 检查'))
        .action(function () {
            require('../fecs/check');
        });

    commandUtils
        .getCommander(commander.command('dest'))
        .description('进行前端项目构建, 请用 -h 看详细帮助')
        .option('-k, --build-plan-key <buildPlanKey>', '指定构建计划, 对应 build-plans/ 下的 js 配置文件')
        .option('-p, --enable-profile', '打开构建的性能检测开关, 如打开, 会输出 treemap 和 webpack profile 内容')
        .option('-s, --source-map', '是否输出 sourcemap')
        .option('--no-minify', '关闭 minify', Boolean, false)
        .action(function (opts) {
            process.env.NODE_ENV = process.env.NODE_ENV || 'production';
            require('../dev-server/build').execute({
                minify: opts.minify,
                sourceMap: opts.sourceMap,
                buildPlanKey: opts.buildPlanKey,
                enableProfiling: opts.enableProfile
            });
        });

    commandUtils
        .optionsSetPort(commander.command('dev'))
        .description('启动前端开发服务器')
        .option(
            '-l --log-level <level>',
            'debug | info | warn | error | silent',
            String,
            'info'
    )
        .action(function (opts) {
            process.env.NODE_ENV = process.env.NODE_ENV || 'development';
            commandUtils.setPortConfig(opts, config);
            require('../dev-server/server.dev')(opts);
        });

    commandUtils
        .optionsSetPort(commander.command('prod-test'))
        .description('启动前端测试开发服务器 (与开发服务器的区别在于加载的是构建后的前端资源)')
        .action(function (opts) {
            commandUtils.setPortConfig(opts, config);

            require('../dev-server/server.prod-test');
        });

    commandUtils
        .optionsSetPort(commander.command('prod'))
        .description('启动前端生产服务器, 加载的是构建后的前端资源, 且一般对于后端也是由种子工程提供的才有意义')
        .action(function (opts) {
            commandUtils.setPortConfig(opts, config);

            require('../dev-server/server.prod');
        });

    commandUtils
        .getCommander(commander.command('gn-init [key]'))
        .description('初始化 @befe 下注册的共享资源 git repo')
        .action(function (key, opts) {
            opts.key = key;
            gitNpm.init(opts);
        });

    commandUtils
        .getCommander(commander.command('gn-update [key]'))
        .description('利用当前的 version.json 更新 @befe 共享资源 git repo')
        .action(function (key, opts) {
            opts.key = key;
            gitNpm.update(opts);
        });

    commandUtils
        .getCommander(commander.command('gn-lock [key]'))
        .description('当 @befe 共享资源有更改, 且推送至子项目 git 之后, 将对应的 commit hash 记录到 version.json')
        .action(function (key, opts) {
            opts.key = key;
            gitNpm.lock(opts);
        });

    commandUtils
        .getCommander(commander.command('stree [key]'))
        .description('仅适用于 Mac, 用 SourceTree 打开对应的子共享项目 git, 如果缺省, 则打开所有的子共享项目 git')
        .action(function (key, opts) {
            opts.key = key;
            gitNpm.stree(opts);
        });

    commandUtils
        .getCommander(commander.command('gn-check [key]'))
        .description('检查 version.json 与 @befe 共享 git 的 commit hash 是否一致')
        .action(function (key, opts) {
            opts.key = key;
            gitNpm.check(opts);
        });

    /**
     * 中文集合（为了国际化）
     */
    commandUtils
        .getCommander(commander.command('gen-zh [files]'))
        .description('自动抽取中文话术, 生成 i18n 话术表')
        .option('-i --ignore <name>')
        .action(function (a, cmd) {
            var ignoreList = (cmd.ignore || '').split(',') || [];
            ignoreList.push('/extra/i18n/');

            require('../generate-zh')(
                require('./lib/minimist')(process.argv.slice(3))._, function (name) {

                    return cmd.ignore ? !ignoreList.some(function (ignore) {
                        return name.includes(ignore);
                    }) : true;
                }
            );
        });

    commandUtils
        .getCommander(commander.command('release [rd-branch]'))
        .description('构建前端项目, 并且推送到后端 git repo 中指定的前端资源目录下')
        .option('-b --fe-branch <branch>', '前端分支, 默认使用当前分支')
        .option('-k, --release-plan-key <releasePlanKey>', '指定发布计划, 对应 release-config-v2.js 配置文件中planList参数')
        .option('--no-dll', '跳过 dll ?', Boolean, false)
        .option('--no-install', '跳过 install ?', Boolean, false)
        .option('--no-ci', '不使用 npm ci', Boolean, false)
        .option('--no-dirty-check', '允许忽略未 commit 改动进行发版', Boolean, false)
        .action(function (rdBranch, command) {
            const argv = require('./lib/minimist')(process.argv.slice(3), { '--': true })
            workflowCommands.release({
                skipInstall: !command.install,
                skipDll: !command.dll,
                useCi: command.ci,
                feBranch: command.feBranch,
                releasePlanKey: command.releasePlanKey,
                rdBranch,
                dirtyCheck: command.dirtyCheck,
                otherFlagString: argv['--'].join(' ')
            });

            console.log('Release options', config);
            return Promise.resolve(workflowCommands.release(config))
        });
};
