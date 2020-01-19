#! /bin/sh

# agile 流水线构建到后端代码库
# 关联配置 ci.yml, webpack-config/env-config.js
# authors: chenmanqing, zhengliangliang, yucong02, ztc01, wujun07

source $(dirname $0)/config-backend.sh

# 检查
if [ -z "$BACKEND_REPO" -o -z "$BACKEND_STATIC_PATH" ]; then
    echo "未配置 \$BACKEND_REPO 或 \$BACKEND_STATIC_PATH "
    echo "请检查 backend-config.sh，并正确配置后端仓库的远端地址 \$BACKEND_REPO 及发版到该仓库的路径 \$BACKEND_STATIC_PATH"
    exit 1
elif [ -z "$BACKEND_BRANCH" -o -z "$AGILE_TRIGGER_USER" -o -z "$AGILE_COMPILE_BRANCH" -o -z "$AGILE_REVISION" ]; then
    echo "未指定 \$BACKEND_BRANCH 或 \$AGILE_TRIGGER_USER 或 \$AGILE_REVISION"
    echo "请检查 ci.yml 中相应的 profile 中 command 中应包含："
    ehco "BACKEND_BRANCH=\$BACKEND_BRANCH"
    ehco "AGILE_TRIGGER_USER=\$AGILE_TRIGGER_USER"
    ehco "AGILE_COMPILE_BRANCH=\$AGILE_COMPILE_BRANCH"
    ehco "AGILE_REVISION=\$AGILE_REVISION"
    echo "且流水线相应阶段指定了构建参数："
    echo "BACKEND_BRANCH"
    echo "AGILE_TRIGGER_USER"
    echo "AGILE_COMPILE_BRANCH"
    echo "AGILE_REVISION"
    exit 1
fi

echo "\$AGILE_TRIGGER_USER: $AGILE_TRIGGER_USER"
echo "\$AGILE_REVISION: $AGILE_REVISION"
echo "\$BACKEND_REPO: $BACKEND_REPO"
echo "\$BACKEND_BRANCH: $BACKEND_BRANCH"
echo "\$BACKEND_STATIC_PATH: $BACKEND_STATIC_PATH"

# 构建
source $(dirname $0)/build.sh

# 后端仓库的本地地址
BACKEND_ROOT_PATH=$HOME/backend-repo
if [ -d "$BACKEND_ROOT_PATH" ]; then
  run "rm -rf $BACKEND_ROOT_PATH"
fi

# clone backend repo
run "git clone --branch $BACKEND_BRANCH ssh://$AGILE_TRIGGER_USER@$BACKEND_REPO $BACKEND_ROOT_PATH"
run "git config -f $BACKEND_ROOT_PATH/.git/config user.name $AGILE_TRIGGER_USER"
run "git config -f $BACKEND_ROOT_PATH/.git/config user.email $AGILE_TRIGGER_USER@baidu.com"

echo "-------- clone backend repo finished finished --------"

echo "pwd: $(pwd)"

DEST_PATH=$BACKEND_ROOT_PATH/$BACKEND_STATIC_PATH
if [ ! -d "$DEST_PATH" ]; then
  run "mkdir -p $DEST_PATH"
fi

# clean backend repo
###### 清空后端代码库里面的 fe 代码
run "rm -rf $DEST_PATH/*"

###### 将刚打包出来的内容移动到后端代码库
run "mv -f dest/prod/* $DEST_PATH/"

###### 在后端代码库提交
run "cd $BACKEND_ROOT_PATH"
run "git add ."
run "git commit -m 'fe release:$AGILE_COMPILE_BRANCH:$AGILE_REVISION'"
run "git push origin $BACKEND_BRANCH:refs/for/$BACKEND_BRANCH"

echo "-------- release to backend repo finished --------"
