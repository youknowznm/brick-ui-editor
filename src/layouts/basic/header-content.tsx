import * as React from 'react'
import { ErpLogo, HeadNav, Link } from '@befe/brick';
import {HeadMenu} from './header-menu'
export const HeaderContent = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const erpLogo = <ErpLogo subhead={'智享中心'}/>;
    let userMenu = [
        {
            id: 'i18n',
            label: '语言/Language',
            children: [
                {
                    id: 'zh-CN',
                    selected: true,
                    label: '中文',
                    onClick: () => {
                        console.log('zh-CN');
                    }
                },
                {
                    id: 'en-US',
                    label: 'English',
                    onClick: () => {
                        console.log('en-US');
                    }
                }
            ]
        },
        {
            id: 'logout',
            label: '退出/Logout',
            onClick: () => {
                console.log('logout');
            }
        }
    ];
    return (
      <div className='app-header' ref={ref}>
            <div className='app-header-inner'>
                <div className='app-header-logo'>
                    <Link>ERP</Link>
                </div>
                <div className='app-header-menu'>
                    <HeadMenu/>
                </div>
            </div>
        </div>



        // {/*<HeadNav*/}
        //     {/*logo={erpLogo}*/}
        //     {/*userMenu={userMenu}*/}
        //     {/*userInfoPrimary={'张同学（B12345)'}*/}
        //     {/*userInfoSecondary={'企业智能平台部'}*/}
        //     {/*menu={[*/}
        //         {/*{*/}
        //             {/*label: 'xxxx'*/}
        //         {/*}*/}
        //     {/*]}*/}
        // {/*/>*/}

    )
})
HeaderContent.displayName = 'HeaderContent'
