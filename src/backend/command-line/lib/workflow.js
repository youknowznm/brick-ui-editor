/* eslint-disable */
/**
 * @file: workflow.js
 * @author: Liang
 */
var _ = require('lodash');
var config = require('common/config');
var utils = require('common/utils');
var sp = require('shell-promise');

var del = require('delete');
var cp = require('copy-dir');

utils.ensureLocalFileFromExample(utils.p(__dirname + '/../release-config-v2.js'));
var releaseConfig = require('../release-config-v2');

/**
 * 对应的一些内部使用 utils
 *
 * @start-def: ~workflowUtils: {}
 */
var workflowUtils = {

    /**
     * 获得当前的分支
     *
     * @def: .getCurrentBranch: () => Promise: resolve(branchName)
     *
     *  // 解析之后的 branch name
     *  branchName: string
     */
    getCurrentBranch(gitPath) {
        var spOpts = {
            cwd: gitPath,
            verbose: true
        };

        return sp('git rev-parse --abbrev-ref HEAD', spOpts)
            .then(function (currentBranch) {
                currentBranch = _.trim(currentBranch);
                return currentBranch;
            });
    },

    checkIfDirty(gitPath) {
        var spOpts = {
            cwd: gitPath,
            verbose: true
        };

        return sp('git status -s', spOpts)
            .then(function (diff) {
                if (diff) {
                    return true;
                }

                return false;

            });
    },

    checkoutBranch(gitPath, branchName) {
        var spOpts = {
            cwd: gitPath,
            verbose: true
        };

        return sp('git checkout ' + branchName, spOpts)
            .then(function () {
                return workflowUtils.getCurrentBranch(gitPath);
            })
            .then(function (currentBranchName) {
                if (currentBranchName !== branchName) {
                    utils.log('error: ' + branchName + '没能正确 checkout');
                }
            })
    },

    npmInstall: function (deps = [], {useCi = true, argv = '', client = 'npm', cwd} = {}) {
        var spOpts = {
            cwd,
            verbose: true
        }

        var cmd
        if (client === 'yarn') {
            cmd = 'yarn ' + (
                deps.length ? 'add ' + deps.join(' ') : 'install'
            )
        } else {
            cmd = `npm ${useCi && !deps.length ? 'ci' : 'install'} ` + deps.join(' ')
        }

        cmd = cmd + argv

        return sp(cmd, spOpts)
    },

    /**
     * 拉取最新更新
     *
     * @def: .updateBranch: gitPath => Promise
     */
    updateBranch(gitPath) {
        var spOpts = {
            cwd: gitPath,
            verbose: true
        };

        return sp('git pull origin', spOpts);
    },

    /**
     * 使用 matriks2 dest 发版
     *
     * @def: .matriks2Dest: (gitPath, prodKey) => Promise
     */
    matriks2Dest(gitPath, prodKey, otherFlagString) {
        var spOpts = {
            cwd: gitPath,
            verbose: true
        }

        return sp('matriks2 dest -k ' + prodKey + ' ' + (
            otherFlagString || ''
        ), spOpts)
    },

    /**
     * 使用 matriks2 dll
     *
     * @def: .matriks2Dll: ({ cwd }) => Promise
     */
    matriks2Dll: function ({cwd} = {}) {
        var spOpts = {
            cwd: cwd,
            verbose: true
        }

        return sp('matriks2 dll', spOpts)
    },

    /**
     * 使用 matriks2 gn-init
     */
    gnInit: function ({cwd} = {}) {
        var spOpts = {
            cwd: cwd,
            verbose: true
        }

        return sp('matriks2 gn-init', spOpts)
    },

    /**
     * 使用 matriks2 gn-update
     */
    gnUpdate: function ({cwd} = {}) {
        var spOpts = {
            cwd: cwd,
            verbose: true
        }

        return sp('matriks2 gn-update', spOpts)
    },

    /**
     * @def: .getCommitHash: gitPath => Promise: resolve(commitHash)
     *
     *  // 对应的 git repo 的当前 commit hash
     *  commitHash: string
     */
    getCommitHash(gitPath) {
        var spOpts = {
            cwd: gitPath,
            verbose: true
        };

        return sp('git rev-parse HEAD', spOpts)
            .then(function (commitHash) {
                return _.trim(commitHash);
            });
    },

    getUncommittedMsg(gitPath) {
        var spOpts = {
            cwd: gitPath,
            verbose: true
        };

        return  sp('git status --porcelain', spOpts)
            .then(function (uncommitted) {
                return _.trim(uncommitted)
            })
    },

    getReleaseCommitMsg: function () {
        const gitPath = config.path.root
        const spOpts = {
            cwd: gitPath,
            verbose: true
        }
        return sp('git rev-parse --abbrev-ref HEAD', spOpts)
            .then(function (releaseBranchName) {
                return _.trim(releaseBranchName)
            })
            .then(function (releaseBranchName) {
                return workflowUtils.getCommitHash(gitPath).then(function (commitHash) {
                    return releaseBranchName + ':' + commitHash
                })
            })
            .then(function (msg) {
                return workflowUtils.getUncommittedMsg(gitPath).then(function (uncommittedMsg) {
                    if (uncommittedMsg) {
                        msg += '\n\nuncommitted:\n' + uncommittedMsg
                    }

                    return msg
                })
            })
    },

    /**
     * git add .
     *
     * git commit -m `message`
     *
     * @def: .commitChange: gitPath, message => Promise
     *  gitPath: string
     *
     *  // 用于做提交的信息
     *  message: string
     */
    commitChange(gitPath, message) {
        var spOpts = {
            cwd: gitPath,
            verbose: true
        };

        return sp('git add .', spOpts)
            .then(function () {
                return sp('git commit -m \'' + message.split('\'').join('\\\'') + '\'', spOpts);
            });
    },

    /**
     * 编译前端代码, 替换 backend git 对应位置
     *
     * @def: .buildAndReplace: backendRepoPath, buildConfig => Promise
     *  // backend repo 绝对路径
     *  backendRepoPath: string
     *
     *  buildConfig: {}
     *      deployKey: string
     *      repoPath: string
     */
    buildFrontendAsset(backendRepoPath, buildConfig, otherFlagString) {

        return Promise.resolve()
        // 编译前端资源
            .then(function () {
                return workflowUtils.matriks2Dest(
                    config.path.root,
                    buildConfig.deployKey,
                    otherFlagString
                );
            });
    },

    replaceBuiltAsset(backendRepoPath, buildConfig) {
        return Promise.resolve()

        // 执行文件替换 - 删除原有资源
            .then(function () {

                utils.log('info: 删除相应的代码 extra/ & ' + buildConfig.deployFolder + '/');
                del.sync(
                    utils.p(backendRepoPath + '/' + buildConfig.deployFolder),
                    {force: true}
                );

                del.sync(
                    utils.p(backendRepoPath + buildConfig.deployFolder + '/extra'),
                    {force: true}
                );
            })

            // 替换文件 - 复制新资源
            .then(function () {
                utils.log('info: 复制到相应的代码 extra/ & ' + buildConfig.deployFolder + '/');

                cp.sync(
                    utils.p(config.path.dest + '/prod'),
                    utils.p(backendRepoPath + '/' + buildConfig.deployFolder)
                )

                cp.sync(
                    utils.p(config.path.dest + '/prod/extra'),
                    utils.p(backendRepoPath + buildConfig.deployFolder + '/extra')
                )
            })
    },

    pullFromICode(gitRepo, branchName) {
        var spOpts = {
            cwd: gitRepo,
            verbose: true
        };

        return sp(`git pull origin ${branchName || ''}`, spOpts);
    },

    pushToICode(gitRepo, branchName) {
        var spOpts = {
            cwd: gitRepo,
            verbose: true
        };

        return sp('git push origin ' + branchName + ':refs/for/' + branchName, spOpts);
    }
};

/**
 * 提供 git workflow 的一些命令处理接口
 *
 * @start-def: command.Workflow: {}
 */
var workflowCommands = {

    /**
     * 发布当前分支
     *
     * - 确定 backend git repo path 的合法性
     * - 得到当前 repo branch name
     * - 检查 branch name 合法性, 只用 release-config.js 里有配置的 #@command.Workflow.config.branches 可以执行发布
     * - 切换后端 local repo 的分支
     *  - 确保后端 repo 没有未提交的更改
     *      - 如果有, 警告并终止处理
     *  - 全量拉取最新代码
     * - 执行 matriks2 dest -k ... (根据 develop-one / develop-two 分支名确定)
     * - 替代后端 git icode 的特定代码
     *  - dist/BUILD_KEY/...
     *  - dist/extra/...
     * - git add . && git commit -m
     *  - 加入 fe git repo 的commit hash
     * - 在后端 git path 下使用 git push origin HEAD:refs/for/BRANCH_NAME
     * - 提取 url, 打印, 并尝试在 browser 中打开
     *
     * @def: .release: (opt) => undefined
     *  opt:
     *      feBranch
     *      rdBranch
     *      otherFlagString
     *      useCi
     *      skipDll
     *      skipInstall
     */
    release: function (opts) {
        var feBranch = opts.feBranch;
        var rdBranch = opts.rdBranch || 'master';
        var otherFlagString = opts.otherFlagString;
        var releasePlanKey = opts.releasePlanKey || 'prod'

        var buildConfig = releaseConfig.planList[releasePlanKey];
        var backendRepoPath = buildConfig.backendLocalRepoPath;

        if (!backendRepoPath) {
            // 确保 backend repo 没有未提交代码
            utils.log('error: 请配置好本地的 release config 中的 backendLocalRepoPath');
            throw new Error();
        }
        if (backendRepoPath.indexOf('/EXAMPLE_DEMO_PATH/') !== -1) {
            utils.log('error: 虽然 config 文件存在, 但请配置好正确的本地的 release config 中的 backendLocalRepoPath');
            throw new Error('error: 虽然 config 文件存在, 但请配置好正确的本地的 release config 中的 backendLocalRepoPath');
        }

        Promise.resolve()
            .then(function () {
                return workflowUtils.checkIfDirty(config.path.root)
            })
            .then(function (isDirty) {
                if (opts.dirtyCheck && isDirty) {
                    throw new Error('当前存在未 commit 的改动，如需忽略这些改动进行发版，请使用 --no-dirty-check 选项')
                }
            })
            .then(function (isDirty) {
                if (isDirty) {
                    throw new Error('当前存在未 commit 的改动')
                }
            })
            .then(workflowUtils.getCurrentBranch)
            .then(function (currentBranch) {
                if (feBranch && feBranch !== currentBranch) {
                    return workflowUtils
                        .checkoutBranch(config.path.root, feBranch)
                        .then(() => feBranch)
                }
                return currentBranch
            })
            .then(function (currentBranch) {
                return workflowUtils.pullFromICode(config.path.root, currentBranch)
            })
            .then(function () {
                // npm install(ci)
                return (
                    !opts.skipInstall &&
                    workflowUtils.npmInstall([], {
                        useCi: opts.useCi,
                        cwd: config.path.root
                    })
                )
            })
            .then(function () {
                // matriks2 dll
                return !opts.skipDll && workflowUtils.matriks2Dll({cwd: config.path.root})
            })
            .then(function () {
                // matriks2 gn-init
                return workflowUtils.gnInit({cwd: config.path.root})
            })
            .then(function () {
                // matriks2 gn-update
                return workflowUtils.gnUpdate({cwd: config.path.root})
            })
            // 根据配置的 branch 对应的 buildKeys 进行编译和代码替换
            .then(function () {
                return workflowUtils.buildFrontendAsset(backendRepoPath, buildConfig, otherFlagString)
            })

            .then(function () {
                return workflowUtils.checkoutBranch(backendRepoPath, rdBranch)
            })

            .then(function () {
                return workflowUtils.pullFromICode(backendRepoPath, rdBranch)
            })

            .then(function () {
                return workflowUtils.replaceBuiltAsset(backendRepoPath, buildConfig)
            })

            .then(function () {
                return workflowUtils.getReleaseCommitMsg()
            })

            // @todo: 当 master release 时候, 或者外部传参强制 version
            // 需要打 version (tag) && git push fe-origin
            .then(function (commitMessage) {
                // @todo: 可能需要改成其他的 icafe 卡片
                return workflowUtils.commitChange(backendRepoPath, 'fe release ' + commitMessage + '\n\nbefe-erp-769')
            })

            .then(function () {
                return workflowUtils.pushToICode(backendRepoPath, rdBranch)
            })
            .catch( ex => {
                utils.log(['error', ex, ex.stack])
                process.exit(1)
            })
    }
};

module.exports = workflowCommands;
