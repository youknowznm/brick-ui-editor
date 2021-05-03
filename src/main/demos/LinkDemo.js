import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _ComposedLink from '../composedComps/Link'

const Link = wrapDemoComp(_ComposedLink)

const LinkDemo = () => {
  return <div className="demo-block link-demo-block">
    {/* ===== 0 basic ===== */}
    <div>
      <div>
        <h3 className="demo-type-desc inline">普通</h3>
        <Link href={'https://erp.baidu.com'}>erp.baidu.com</Link>
        <Link disabled={true} href={'https://erp.baidu.com'}>erp.baidu.com</Link>
      </div>
      <div>
        <h3 className="demo-type-desc inline">加强</h3>
        <Link type={'intensive'}>erp.baidu.com</Link>
        <Link type={'intensive'} disabled={true}>erp.baidu.com</Link>
      </div>
    </div>
    <Divider className="demo-block-separator"/>
    {/* ===== 1 size ===== */}
    <div>
      <h3 className="demo-type-desc">尺寸</h3>
      <div>
        <Link size={'sm'}>erp.baidu.com</Link>
      </div>
      <div>
        <Link size={'md'}>erp.baidu.com</Link>
      </div>
    </div>
    <Divider className="demo-block-separator"/>
  </div>
}

LinkDemo.wrapName = 'LinkDemo'

export default LinkDemo
