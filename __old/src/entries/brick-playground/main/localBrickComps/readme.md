本目录的几个组件和正式 brick 的区别: 
本目录的几个组件和正式 brick 的区别: 

1. 移除了 DatePicker 的 log
2. 修改 Popper 的 ProtalContainer prop
3. 修改使用 Popper 的组件, 指向本目录的 Popper 而不是正式库的
4. MenuPopper 同上 (select, suggest, Tabs)
    ```js
    import {Menu, MenuItemId, MenuPopperProps, MenuItemSelectAll} from '@befe/brick-comp-menu'
    import {MenuPopper} from '../Menu'
    ```
5. Dialog 移除包裹的 Modal, 用 size 直接控制 .brick-dialog-wrap 的宽度
5. Dialog 接受传入的 bodyHeight prop 来控制 dialog body 高度

> 目前 brick 版本: db2f6c3b @200117
