#! /bin/sh

# agile 流水线构建必要的初始化
# authors: chenmanqing, zhengliangliang, yucong02, ztc01, wujun07

# 以便于在流水线 log 出运行的命令
run() {
    echo "Run: $@"
    eval $@
}

export LC_ALL=zh_CN.UTF-8
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN.UTF-8

export PATH=$NODEJS_BIN_LATEST:$PATH

echo "node: $(node -v)"
echo "npm: $(npm -v)"

if [ -n "$AGILE_TRIGGER_USER" ]; then
    run "git config user.name $AGILE_TRIGGER_USER"
    run "git config user.email $AGILE_TRIGGER_USER@baidu.com"
fi

echo "-------- initialize-ci finished --------"
