## 背景
页面常见 Loading 状态,通常我们会根据页面或者组件手动写Loading
状态

Loading 状态项目中基本大同小异,相同的Loading 可以使用方法包装;
    
    
## 使用方法
```
    
        import hocLoading from 'frontend/utils/loading'
        
        @hocLoading(void 0, {withDelayFirstly: true})
        @suh(pageStyle)
        class UseLoadingPart extends Component {
        
            render() {
                return h.div({
                    style: {
                        height: '300px',
                        lineHeight: '200px',
                        fontSize: '24px',
                        textAlign: 'center'
                    }
                }, 'Loading');
            }
        }
        
        export default class UseLoadingDemoView extends Component {
            static shouldInjectApp = true;
        
            static demoKey = 'use-loading-demo'
            static demoName = 'use-loading-demo'
        
            state = {
                isLoading: false
            }
            renderCaseTitle(caseName) {
                return h.h4({}, `UI Demo case : ${caseName}`);
            }
        
            render() {
                const {props, local} = this;
        
                return h.div('use-loading-demo', {},
                    h(Button, {
                        type: 'primary',
                        onClick: e => this.setState({
                            isLoading: !this.state.isLoading
                        })
                    }, '点击我切换Loading'),
                    this.renderCaseTitle('compomnent use loading'),
                    h(UseLoadingPart, {
                        isLoading: this.state.isLoading,
                    }),
                    h.div('demo-case-section', {},
                    ),
                );
            }
        }
```
    
    
## 常用配置

- 方法内置默认 Loading 组件, 可配置;

    - 传入 function 返回 值为需要展示的 Loading 样式组件;
   

- 默认通过 props 中 isLoading 属性判断是否 显示Loading状态;

- vm 模式下需通过传入vm = true, 则默认通过 local.isLoading 判断 是否显示Loading 状态;

 

| 参数 | explain | type | default |
| :---: | :---: | :---| :--- |
| vm     | 是否是vm 模式 | boolean | false |
| timeout | 延时显示 | number  | 1000 |
| withDelayFirstly | 第一次加载是否延时 | boolean  | false |
| className | 类名 | string |  |

    
### demo
 
 [demo](./demo/_demo-use-loading/index.js)
 
 

 

 

