/**
 * @file 用于快速管理多项目中的共享资源
 * @author Liang
 */

var fs = require('fs');
var config = require('common/config');
var utils = require('common/utils');
var sp = require('shell-promise');
var _ = require('lodash');

var BEFE_PATH = utils.p(config.path.frontendModules + '/@befe/');
var VERSION_PATH = utils.p(BEFE_PATH + '/version.json');

var gitNpmUtils = {

    readVersion: function () {
        var versionString = fs.readFileSync(VERSION_PATH).toString();

        return JSON.parse(versionString);
    },

    writeVersion: function (versionInfo) {
        fs.writeFileSync(
            utils.p(VERSION_PATH),
            JSON.stringify(versionInfo, null, 4)
        );
    },

    readRepoVersion: function (repoKey) {
        var versionInfo = gitNpmUtils.readVersion();
        var repoVersionInfo = versionInfo[repoKey];
        if (!repoVersionInfo) {
            utils.log('error: 没有找到对应的 repo 配置信息 ' + repoKey);
            process.exit(1);
        }

        return repoVersionInfo;
    },

    updateRepo: function (repoKey) {
        var repoVersionInfo = gitNpmUtils.readRepoVersion(repoKey);

        var updatePromise = utils.newPromise();
        var repoPath = utils.p(BEFE_PATH + '/' + repoKey);

        updatePromise = updatePromise
            .then(function () {
                return sp('git fetch', {
                    cwd: repoPath,
                    verbose: true
                });
            })
            .then(function () {
                return sp('git checkout ' + repoVersionInfo.branch, {
                    cwd: repoPath,
                    verbose: true
                });
            })
            .then(function () {
                if (repoVersionInfo.hash) {
                    return sp('git reset --hard ' + repoVersionInfo.hash, {
                        cwd: repoPath,
                        verbose: true
                    });
                }

            })
            .catch(function (ex) {
                utils.log(['error', ex, ex.stack]);
                process.exit(1);
            });

        return updatePromise;
    },

    initRepo: function (repoKey) {
        // opts : key
        var repoVersionInfo = gitNpmUtils.readRepoVersion(repoKey);

        var initPromise = utils.newPromise();
        var repoPath = utils.p(BEFE_PATH + '/' + repoKey);

        initPromise = initPromise
            .then(function () {
                if (fs.existsSync(repoPath)) {
                    utils.log('warn: 目标repo ' + repoKey + '已存在, 跳过处理....');
                    throw new Error('skipped');
                }
                else {
                    return sp('git clone ' + repoVersionInfo.remote + ' ' + repoKey, {
                        cwd: BEFE_PATH,
                        verbose: true
                    });
                }
            })
            .then(function () {
                return gitNpmUtils.updateRepo(repoKey);
            })
            .catch(function (ex) {
                utils.log(['error', ex, ex.stack]);
                process.exit(1);
            });

        return initPromise;
    },

    lockRepo: function (repoKey) {

        var lockPromise = utils.newPromise();
        var repoPath = utils.p(BEFE_PATH + '/' + repoKey);

        lockPromise = lockPromise
            .then(function () {
                return sp('git rev-parse HEAD', {
                    cwd: repoPath,
                    verbose: true
                });
            })
            .then(function (hash) {
                hash = _.trim(hash);

                var versionInfo = gitNpmUtils.readVersion();
                versionInfo[repoKey].hash = hash;
                gitNpmUtils.writeVersion(versionInfo);
            });

        return lockPromise;
    },

    pushRepo: function (repoKey, commitMessage) {
        var pushPromise = utils.newPromise();
        var repoPath = utils.p(BEFE_PATH + '/' + repoKey);

        if (!commitMessage) {
            utils.log('error: 请指定 commit message, 例如: `matriks2 gn-push utils -m "something"`');
            process.exit(1);
        }

        pushPromise = pushPromise
            .then(function () {
                return sp('git add .', {
                    cwd: repoPath,
                    verbose: true
                });
            })
            .then(function () {
                return sp('git commit -m "' + commitMessage + '"', {
                    cwd: repoPath,
                    verbose: true
                });
            })
            .then(function () {
                return sp('git push origin', {
                    cwd: repoPath,
                    verbose: true
                });
            })
            .then(function () {
                return gitNpmUtils.lockRepo(repoKey);
            })
            .catch(function (ex) {
                utils.log(['warn: repo ' + repoKey + ' push时出现问题', ex, ex.stack]);
            });

        return pushPromise;
    },

    pullRepo: function (repoKey) {
        var pullPromise = utils.newPromise();
        var repoPath = utils.p(BEFE_PATH + '/' + repoKey);

        pullPromise = pullPromise
            .then(function () {
                return sp('git pull origin', {
                    cwd: repoPath,
                    verbose: true
                });
            })
            .then(function () {
                return gitNpmUtils.lockRepo(repoKey);
            });

        return pullPromise;
    },

    streeRepo: function (repoKey) {
        var streePromise = utils.newPromise();

        return streePromise
            .then(function () {
                return sp('open -a SourceTree ' + repoKey, {
                    cwd: BEFE_PATH
                });
            });
    },

    checkRepo: function (repoKey) {
        var repoVersionInfo = gitNpmUtils.readRepoVersion(repoKey);
        var repoPath = utils.p(BEFE_PATH + '/' + repoKey);

        return sp('git rev-parse HEAD', {
            cwd: repoPath
        })
            .then(function (hash) {
                hash = _.trim(hash);

                if (hash !== repoVersionInfo.hash) {
                    utils.log('warn: 检查到 version.json 与共享项目 commit hash 不一致, '
                        + '请检查, 或运行 `matriks gn-lock` : ' + repoKey);
                }

            });
    },

    forEachRepo: function (callback, opts) {
        opts = opts || {};
        var forEachRepoPromise = utils.newPromise();

        var versionInfo = gitNpmUtils.readVersion(); // ?

        for (var repoKey in versionInfo) {
            (function (repoKeyInClosure) {

                if (opts.shouldCheckRepoCleaness) {
                    var spSubRepo = {
                        cwd: utils.p(BEFE_PATH + '/' + repoKeyInClosure),
                        verbose: true
                    };

                    forEachRepoPromise = forEachRepoPromise
                        .then(function () {
                            return sp('git status -s', spSubRepo);
                        })
                        .then(function (diff) {
                            if (diff) {
                                utils.log('error: 子项目 ' + repoKeyInClosure + ' 检查到有更改, 请手动处理之后再执行命令.');
                                process.exit(1);
                            }

                        })
                        .then(function () {
                            return sp('git branch -r --contains HEAD', spSubRepo);
                        })
                        .then(function (branches) {
                            if (!branches) {
                                utils.log('error: 子项目' + repoKeyInClosure
                                    + ' 存在未推送到远端的 commit, 请手动处理后再执行命令.');
                                process.exit(1);
                            }

                        });
                }

                forEachRepoPromise = forEachRepoPromise.then(function () {
                    return callback(repoKeyInClosure);
                });
            })(repoKey);
        }

        return forEachRepoPromise;
    },

    forSingleRepoOrEveryRepo: function (methodName, repoKey, opts) {

        /**
         * opts: {}
         *  preHandler: function
         *  postHandler: function
         */
        opts = opts || {};
        var promise = utils.newPromise();

        if (repoKey) {
            gitNpmUtils[methodName](repoKey);
        }
        else {
            promise = promise
                .then(function () {
                    if (opts.preHandler) {
                        return opts.preHandler();
                    }

                })
                .then(function () {
                    return gitNpmUtils.forEachRepo(function (repoKey) {
                        utils.log('info: 处理 repo ' + repoKey + ' 操作: ' + methodName);
                        return gitNpmUtils[methodName](repoKey);
                    }, {
                        shouldCheckRepoCleaness: opts.shouldCheckRepoCleaness
                    });
                })
                .then(function () {
                    if (opts.postHandler) {
                        return opts.postHandler();
                    }

                })
                .catch(function (ex) {
                    utils.log(['error', ex, ex.stack]);
                    process.exit(1);
                });
        }

        return promise;
    },

    init: function (opts) {
        gitNpmUtils.forSingleRepoOrEveryRepo('initRepo', opts.key);
    },

    // pull: function (opts) {
    //     gitNpmUtils.forSingleRepoOrEveryRepo('pullRepo', opts.key);
    // },
    //
    // push: function (opts) {
    //     gitNpmUtils.forSingleRepoOrEveryRepo('pushRepo', opts.key, {
    //         message: opts.message
    //     });
    // },

    update: function (opts) {
        gitNpmUtils.forSingleRepoOrEveryRepo('updateRepo', opts.key, {
            shouldCheckRepoCleaness: true
        });
    },

    check: function (opts) {
        gitNpmUtils.forSingleRepoOrEveryRepo('checkRepo', opts.key);
    },

    lock: function (opts) {
        var versionJson;
        gitNpmUtils.forSingleRepoOrEveryRepo('lockRepo', opts.key, {
            preHandler: function () {
                versionJson = JSON.stringify(gitNpmUtils.readVersion());
                var gitCheckPromise = sp('git status -s', {
                    cwd: config.root,
                    verbose: true
                })
                    .then(function (diff) {
                        if (diff) {
                            utils.log('error: 检查到父级项目有未提交的更改, 请先处理后再执行 gn-lock.');
                            process.exit(1);
                        }

                    });

                return gitCheckPromise;
            },
            postHandler: function () {
                if (versionJson !== JSON.stringify(gitNpmUtils.readVersion())) {
                    var gitCommitPromise = sp('git add .', {
                        cwd: config.root,
                        verbose: true
                    })
                        .then(function () {
                            return sp('git commit -m "chore: gn-lock"', {
                                cwd: config.root,
                                verbose: true
                            });
                        })
                        .then(function () {
                            utils.log('info: lock 完毕.');
                        });

                    return gitCommitPromise;
                }

                utils.log('info: version.json 并无更新, 不用进行 lock.');

            },
            shouldCheckRepoCleaness: true
        });
    },

    stree: function (opts) {
        if (opts.key === '.') {
            sp('open -a SourceTree .', {
                cwd: config.root
            });
        }
        else {
            gitNpmUtils.forSingleRepoOrEveryRepo('streeRepo', opts.key);
        }
    }
};

module.exports = gitNpmUtils;
