#! /bin/sh
# agile 流水线构建

# 先进行必要的 ci 初始化
source $(dirname $0)/initialize-ci.sh

echo "-------- build start --------"
echo WEBPACK_ENV: ${WEBPACK_ENV}

source $(dirname $0)/setup.sh
echo "-------- setup finished --------"

npm run build || exit 1
echo "-------- build finished --------"

