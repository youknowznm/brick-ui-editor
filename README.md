!!! 以下是 README.md 例子, 请根据项目实际信息更新 !!!
=======

### 启动开发环境
```sh
# make sure node 版本在6以上

# 如未曾安装过，先全局安装 matriks2 和 plop

npm install matriks2 -g
npm install plop -g

# 进行项目 setup
cd ${FE_SRC_REPO}
npm run setup

# 在 package.json 中补全字段 `icafe` (对应项目 icafe 空间 id) 用于使用 `issue-reporter`


# 启动开发环境
matriks2 dev


# 各个项目端口应该不同 默认 devPort 为 8988
# 启动项目时可在 src/backend/node_modules/common/config.js 配置 `devPort`, `prodTestPort`, `prodPort`

# 打开页面
# open http://localhost:8988

```

### 配置 issue-reporter
在 package.json 中补全字段 `icafe` (对应项目 icafe 空间 id) 用于使用 `issue-reporter`

```json
{
    "icafe": "befe-erp"
}
```

### 必要时的库更新
```sh
# lock `@befe`公共库 版本
matriks2 gn-lock 

# 更新 `@befe`公共库 版本
matriks2 gn-update

# dll打包
matriks2 dll
```

### 发版部署流水线
- 见 http://linky.dev.weiyun.baidu.com:8339/pages/linky.html#/index?main=_s_es64sb35ksr__20190423_1821&side=_s_fck3qcizgtw__20190424_1701
- 关键文件 ci.yml, script/config-backend.sh, webpack-config/env-config.js

