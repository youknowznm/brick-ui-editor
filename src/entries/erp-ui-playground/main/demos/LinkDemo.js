import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../components/wrapDemoComp'

import {Link as OriginLink} from '@befe/brick'

const Link = wrapDemoComp(OriginLink)

const LinkDemo = () => {
    return <div className="demo-block link-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <div>
                <Link href={'https://erp.baidu.com'}>erp.baidu.com</Link>
                <Link type={'intensive'}>erp.baidu.com</Link>
            </div>
            <div>
                <Link disabled={true} href={'https://erp.baidu.com'}>erp.baidu.com</Link>
                <Link type={'intensive'} disabled={true} onClick={e => {console.log('it should not happen')}}>erp.baidu.com</Link>
            </div>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        <div>
            <div>
                <Link>erp.baidu.com</Link>
            </div>
            <div>
                <Link size={'sm'}>erp.baidu.com</Link>
            </div>
            <div style={{fontSize: '14px'}}>
                <Link>erp.baidu.com</Link>
            </div>
            <div>
                <Link size={'md'}>erp.baidu.com</Link>
            </div>
        </div>
    </div>
}

export default LinkDemo
