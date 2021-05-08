# brick-ui-editor

个人设计和开发, 基于 react + mobx + material-ui, 面向团队内 PM 同学的的原型稿生成工具  
演示请见[这里](https://youknowznm.github.io/demos/brick-ui-editor/)  

截图在本文末尾

### 特点

1. 基于团队新组件库 `brick`, 符合公司设计规范
2. 在原型中维持组件的交互功能, 所见即所得
3. 最重要的, 可携带 UI 渲染的来源数据, 直接供前端开发使用
4. 旨在解决项目数量多, U 同学资源不足的痛点

### 用法
  
#### 左侧抽屉

- 根据分类, 展示了 `brick` 组件的所有可能的实例, 并保留了交互效果
- 按住 meta 键(mac 的 `command`, windows 的 `ctrl`), 实例上产生可交互的蒙层
- 点击以添加其到画布的默认位置

#### 画布

- 添加的组件, 同样也是可交互的普通组件 
- 按住 meta 键也会展示蒙层, 可进行拖拽和编辑
- 选中的组件展示它的宽高和坐标, 同时渲染辅助标线
- 右侧可以编辑所有 UI 相关的 `prop`
  - 针对字符串, 布尔值, 枚举值等等类型, 提供不同的编辑方式
  - 图标类 `prop` 通过特殊的图标选择器编辑

#### 上方抽屉

- 可设置原型的名称, 作者, 画布宽高等信息
- 分享: 序列化当前画布的内容, 复制至剪贴板, 用于保存或分享
- 读取: 将已有的原型存档 json 数据, 写入当前画布
- 重置: 清空画布内容, 根据当前视口重置其宽高

#### 其它

- 画布数据的变动会写入 `localStorage`, 刷新后自动恢复

#### 复制以下的 json, 去[演示](https://youknowznm.github.io/demos/brick-ui-editor/)读取试下

```json
{"BP_ARCHIVE_NAME":"演示用画布","BP_AUTHOR":"ZNM","BP_ARCHIVE_DATA":[{"id":"bf0ia4m","originName":"ComposedHeadNav","originProps":{"userInfoPrimary":"ZNM（B999999）","userInfoSecondary":"企业智能平台部","menuItems":[{"id":"option_1","label":"使用说明","_index":0,"tableData":{"id":0}}],"group1Label":"功能列表","group1MenuItems":[{"id":"option_11","label":"option_11"},{"id":"option_12","label":"option_12","disabled":true}],"projectName":"示例项目","group1Type":"group","group2Label":"","group2Type":"group","group2MenuItems":[],"group3Label":"","group3Type":"group","group3MenuItems":[],"width":"850"},"wrapWidth":850,"wrapHeight":60,"deltaX":21,"deltaY":6},{"id":"88n0un1","originName":"ComposedMenu","originProps":{"size":"sm","menuItems":[{"id":"option_1","label":"业务单据","_index":0,"tableData":{"id":0}},{"id":"option_2","label":"发票开具","disabled":false,"_index":1,"tableData":{"id":1}},{"id":"产品 3","label":"空白发票","disabled":false,"_index":2,"tableData":{"id":2}},{"id":"产品 4","label":"发票查询","disabled":false,"_index":3,"tableData":{"id":3}}],"group1Label":"基础设置","group1MenuItems":[{"id":"option_11","label":"option_11"},{"id":"option_12","label":"option_12","disabled":true}],"group2Label":"权限控制","group2MenuItems":[{"id":"option_21","label":"option_21"},{"id":"option_22","label":"option_22","disabled":true}],"group3Label":"","group3MenuItems":[],"layout":"vertical","group1Type":"popper","group2Type":"popper","group3Type":"popper","width":"210"},"wrapWidth":210,"wrapHeight":220,"deltaX":19,"deltaY":71},{"id":"eruz8k2","originName":"Section","originProps":{"title":"查找集设置","width":"633","height":"479"},"wrapWidth":633,"wrapHeight":479,"deltaX":238,"deltaY":99},{"id":"y801rz0","originName":"ComposedBreadcrumb","originProps":{"data":[{"label":"首页","_index":0,"tableData":{"id":0}},{"label":"基础设置","_index":1,"tableData":{"id":1}},{"label":"查找集设置","_index":2,"tableData":{"id":2}}],"divider":"/","size":"sm","width":240},"wrapWidth":240,"wrapHeight":18,"deltaX":238,"deltaY":74},{"id":"t5g1rds","originName":"Typography","originProps":{"size":"sm","weight":"medium","children":"过滤器 1","type":"primary","width":50},"wrapWidth":50,"wrapHeight":20,"deltaX":258,"deltaY":153},{"id":"wmqhu6o","originName":"Typography","originProps":{"size":"sm","children":"过滤器 2","type":"primary","width":50,"weight":"medium"},"wrapWidth":50,"wrapHeight":20,"deltaX":470,"deltaY":154},{"id":"r28z2gq","originName":"Typography","originProps":{"size":"sm","children":"过滤器 3","type":"primary","width":50,"weight":"medium"},"wrapWidth":50,"wrapHeight":20,"deltaX":695,"deltaY":154},{"id":"tmma3pl","originName":"ComposedSuggest","originProps":{"placeholder":"占位符 A","menuItems":[{"id":"option_1","label":"option_1"},{"id":"option_2","label":"option_2"},{"id":"option_3","label":"option_3"}],"group1Label":"分类 1","group1MenuItems":[{"id":"option_11","label":"option_11"},{"id":"option_12","label":"option_12","disabled":true}],"group2Label":"分类 2","group2MenuItems":[{"id":"option_21","label":"option_21"},{"id":"option_22","label":"option_22","disabled":true}],"group3Label":"分类 3","group3MenuItems":[{"id":"option_31","label":"option_31"},{"id":"option_32","label":"option_32","disabled":true}],"disabled":false,"group1Type":"group","group2Type":"group","group3Type":"group","width":"135"},"wrapWidth":135,"wrapHeight":28,"deltaX":312,"deltaY":149},{"id":"gnfp3ab","originName":"ComposedMultipleSelect","originProps":{"placeholder":"占位符 B","size":"xs","menuItems":[{"value":"option_1","label":"option_1"},{"value":"option_2","label":"option_2"},{"value":"option_3","label":"option_3"}],"group1Label":"分类 1","group1MenuItems":[{"value":"option_11","label":"option_11"},{"value":"option_12","label":"option_12","disabled":true}],"group2Label":"分类 2","group2MenuItems":[{"value":"option_21","label":"option_21"},{"value":"option_22","label":"option_22","disabled":true}],"group3Label":"分类 3","group3MenuItems":[{"value":"option_31","label":"option_31"},{"value":"option_32","label":"option_32","disabled":true}],"disabled":false,"group1Type":"group","group2Type":"group","group3Type":"group","width":"136"},"wrapWidth":136,"wrapHeight":24,"deltaX":525,"deltaY":151},{"id":"l66nqvt","originName":"ComposedRadioGroup","originProps":{"defaultValue":["item_1"],"options":[{"value":"item_1","label":"有","checked":true,"_index":0,"tableData":{"id":0}},{"value":"item_2","label":"无","disabled":false,"_index":1,"tableData":{"id":1}}],"type":"normal","size":"sm","width":"108"},"wrapWidth":108,"wrapHeight":18,"deltaX":756,"deltaY":155},{"id":"71n2bgx","originName":"ComposedButton","originProps":{"iconName":"SvgEditPencil","type":"important","children":"新增","size":"xs","color":"normal","shape":"normal","loadingIconName":"","disabled":false,"loading":false},"wrapWidth":64,"wrapHeight":24,"deltaX":256,"deltaY":191},{"id":"lk85oi7","originName":"ComposedButton","originProps":{"disabled":false,"iconName":"SvgTransmitDownload","type":"intensive","children":"模板下载","size":"xs","color":"normal","shape":"normal","loadingIconName":"","loading":false},"wrapWidth":82,"wrapHeight":24,"deltaX":332,"deltaY":191},{"id":"bhfobqx","originName":"ComposedButton","originProps":{"color":"success","type":"important","children":"提交","size":"xs","shape":"normal","iconName":"","loadingIconName":"","disabled":false,"loading":false},"wrapWidth":64,"wrapHeight":24,"deltaX":460,"deltaY":191},{"id":"9zcikv8","originName":"ComposedButton","originProps":{"color":"error","iconName":"SvgTrash","type":"important","children":"","size":"xs","shape":"normal","loadingIconName":"","disabled":false,"loading":false},"wrapWidth":24,"wrapHeight":24,"deltaX":425,"deltaY":191},{"id":"3nv7982","originName":"ComposedTable","originProps":{"data":[{"key1":"数据1","key2":"数据2","key3":"数据3","key4":"数据4","key5":"数据5","key6":"数据6","key7":"数据7","key8":"数据8","key9":"数据9","key10":"数据10"},{"key1":"数据1","key2":"数据2","key3":"数据3","key4":"数据4","key5":"数据5","key6":"数据6","key7":"数据7","key8":"数据8","key9":"数据9","key10":"数据10"},{"key1":"数据1","key2":"数据2","key3":"数据3","key4":"数据4","key5":"数据5","key6":"数据6","key7":"数据7","key8":"数据8","key9":"数据9","key10":"数据10"},{"key1":"数据1","key2":"数据2","key3":"数据3","key4":"数据4","key5":"数据5","key6":"数据6","key7":"数据7","key8":"数据8","key9":"数据9","key10":"数据10"},{"key1":"数据1","key2":"数据2","key3":"数据3","key4":"数据4","key5":"数据5","key6":"数据6","key7":"数据7","key8":"数据8","key9":"数据9","key10":"数据10"}],"columns":[{"key":"key1","thContent":"ID","align":"center","_index":0,"tableData":{"id":0}},{"key":"key2","thContent":"名称","align":"center","_index":1,"tableData":{"id":1}},{"key":"key3","thContent":"类型","align":"center","_index":2,"tableData":{"id":2}},{"key":"key4","thContent":"生效时间","align":"center","_index":3,"tableData":{"id":3}},{"key":"key5","thContent":"失效时间","align":"center","_index":4,"tableData":{"id":4}},{"key":"key6","thContent":"购方名称","align":"center","_index":5,"tableData":{"id":5}},{"key":"key7","thContent":"销方名称","align":"center","_index":6,"tableData":{"id":6}},{"key":"key8","thContent":"标题8","align":"center","_index":7,"tableData":{"id":7}},{"key":"key9","thContent":"标题9","align":"center","_index":8,"tableData":{"id":8}},{"key":"key10","thContent":"标题10","align":"center","_index":9,"tableData":{"id":9}}],"useCheckbox":true,"operationsLabelsJoined":"编辑 删除","width":"626"},"wrapWidth":626,"wrapHeight":272,"deltaX":242,"deltaY":238},{"id":"u543e14","originName":"ComposedPagination","originProps":{"total":100,"size":"xs","simple":false,"disabled":false,"showTotal":true,"showSizeOptions":true,"showJumper":true,"width":"620"},"wrapWidth":620,"wrapHeight":50,"deltaX":247,"deltaY":520}],"BP_PLAYGROUND_WIDTH":1133,"BP_PLAYGROUND_HEIGHT":597}
```

### 问题

项目组件库 `brick` 的 npm 包使用我们公司内部的源 `http://registry.npm.baidu-int.com`.  
所以除非接入内网安装依赖, 否则是无法进行二次开发的.

### 技术点

详见这篇[文章](https://youknowznm.com/article?id=WhycgKN)

### 截图

#### 1. hover 左侧抽屉, 查看和选取使用组件

![](https://youknowznm.github.io/demos/images/brick-ui-editor/demo-1.png)

#### 2. 出现在画布, 可编辑 UI 相关的 prop

![](https://youknowznm.github.io/demos/images/brick-ui-editor/demo-2.png)

#### 3. 分享或读取已有的画布

![](https://youknowznm.github.io/demos/images/brick-ui-editor/demo-3.png)

#### 4. 最终效果

![](https://youknowznm.github.io/demos/images/brick-ui-editor/demo-4.png)
