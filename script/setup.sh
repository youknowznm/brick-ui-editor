#! /bin/bash
# 清理并安装项目依赖
rm -rf node_modules
npm install -dd

# 初始化`@befe`公共库
./node_modules/.bin/matriks2 gn-init || exit 1

# dll打包
./node_modules/.bin/matriks2 dll || exit 1

# copy birdfile
cp src/backend/bird/birdfile.js.example src/backend/bird/birdfile.js
