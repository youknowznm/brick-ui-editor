/**
 * @file inferred-config.js
 */

const findUp = require('find-up');
const parseGitConfig = require('@moyuyc/parse-git-config');
const localGitConfPath = findUp.sync('.git/config');

function throwGitUsernameError() {
    throw new Error(['你可能没有配置 git config --local user.name',
        '请通过 `git config user.name YOUR_NAME 配置',
        '同时请确保 `git config user.name YOUR_NAME@baidu.com` 也配置了'
    ].join('\n'));
}

if (localGitConfPath) {
    const gitConfig = parseGitConfig.sync({path: localGitConfPath});
    if (gitConfig.user && gitConfig.user.name) {
        module.exports = {
            userName: gitConfig.user.name
        };
    } else {
        throwGitUsernameError();
    }
} else {
    throwGitUsernameError();
}
