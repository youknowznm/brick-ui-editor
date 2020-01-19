#! /bin/sh
# agile 流水线构建到微云独立部署
# 关联配置 ci.yml, webpack-config/env-config.js
# authors: chenmanqing, zhengliangliang, yucong02, ztc01, wujun07

# 构建
source $(dirname $0)/build.sh

### 判断是否存在output目录，如果存在则彻底删除
if [ -d "output" ]; then
  run "rm -rf output"
fi

### 重新创建 output 目录
run "mkdir output"

### 打包整个目录作为构建产物到 output
run "cd ./dest/prod"
run "zip -rq --symlinks ../../output/output.zip ."

echo "-------- output finished --------"
