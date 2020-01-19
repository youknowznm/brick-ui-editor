#! /bin/sh

# 独立部署到微云构建脚本
# 关联配置 ci.yml, webpack-config/env-config.js
# authors: chenmanqing, zhengliangliang, yucong02, ztc01, wujun07

# 先进行必要的 ci 初始化
source $(dirname $0)/initialize-ci.sh

echo "-------- build start --------"

echo WEBPACK_ENV: ${WEBPACK_ENV}

# npm run setup || exit 1
source $(dirname $0)/setup.sh
echo "-------- setup finished --------"

npm run build || exit 1
echo "-------- matriks2 build finished --------"

