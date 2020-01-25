## Development
### node version
- ^v10.15 lts

### scripts
- `npm run setup` 初始化安装
- `npm run dev` 启动 dev server
- `npm run build` 构建 production
- `npm run start` 启动 prod server
- `npm run dll:dev` 构建 dev dll，在打到 vendor 包里的依赖有更新是需要重新执行
- `npm run dll:prod` 构建 prod dll，在打到 vendor 包里的依赖有更新是需要重新执行

### idea
- mark root directory as resource root: Preference > Directory
- enable eslint: Preference > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint > Automatic ESLint Configuration

### react
- 不使用旧的 lifecycle api `componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate`
- 使用新的 `getDerivedStateFromProps`, `getSnapshotBeforeUpdate`
- prefer `Function Components` to `Class Component`

### prefer `named exports` to `default exports`
- 通常情况下使用 `named exports`
- 某些情景，可将 `defaul exports` 作为特殊的 `named exports` 使用（比如 demo 使用 `require.context` 动态加载页面以及demo cases）
- 主要原因
    - 首先两者没有冲突，`default exports` 完全可以理解为一种特殊的 `named exports`，是一种命名上的约定
    - 考虑有周全的明确命名的正向约束
    - 易于扩展 
    - generally more easy to statically analyze, and IDEs have an easier time of autocompleting / autoimporting functions by name
    - default exports cause losing some ES6 module benefits (tree-shaking and faster access to imports)
- `named exports` vs `default exports`? refs 
    - https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad   
    - https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/
    - https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    - https://blog.bigfont.ca/export-default-vs-export-in-typescript/
    - https://news.ycombinator.com/item?id=15765409

### typescript-eslint
- 谨慎地，先尽量保持 base/recommended 配置，以便于提示快速学习 ts 直到我们有 ts best practice 的理解

### 样式
### react css module
- entries / pages 写模块样式
    - 样式文件后缀 `.mod.scss` 
    - 样式应用在 `props.styleName`， 如 `<div styleName="some-class-name" />`
- components / layout 写全局样式
    - 样式文件后缀 `.scss`
    - 样式应用在 `props.className`，如 <div className="some-class-name" />
- references
    - https://github.com/gajus/react-css-modules
    - https://github.com/gajus/babel-plugin-react-css-modules

### sass guide
- https://css-tricks.com/sass-style-guide/
- https://sass-guidelin.es/

#### 克制 selector lists 长度 和 nesting 深度
- https://sass-lang.com/documentation/style-rules#nesting
- 深度一般建议不要超过 4 层
- 善用[interpolation](https://sass-lang.com/documentation/interpolation)
    - 如，components/button/src/style.scss 关于"反白文字"的处理
    
#### 关于 theme variable
- !default variable 的规则是“先入为主”，所以 theme-overrides 要在引入 theme 之前
- 普通 variable 是后置覆盖


