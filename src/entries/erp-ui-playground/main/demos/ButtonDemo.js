import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Button as OriginButton} from '@befe/brick'
import {SvgEdit, SvgGear} from '@befe/brick-icon'

const Button = wrapDemoComp(OriginButton)

const ButtonDemo = () => {
    const loading = true;
    return <div className="demo-block">
        {/* <Divider className="demo-block-separator" /> */}
        {/* ===== 0 basic ===== */}
        <div className="demo-group">
            <Button>普通</Button>
            <Button type={'intensive'}>加强</Button>
            <Button type={'important'}>重要</Button>
            <Button type={'translucent'}>半透明</Button>
            <Button type={'plain'}>纯文字</Button>
        </div>
        <div className="demo-group">
            <Button disabled={true}>普通</Button>
            <Button disabled={true} type={'intensive'}>加强</Button>
            <Button disabled={true} type={'important'}>重要</Button>
            <Button disabled={true} type={'translucent'}>半透明</Button>
            <Button disabled={true} type={'plain'}>纯文字</Button>
        </div>
        <div className="demo-group">
            <Button icon={SvgEdit}>普通</Button>
            <Button icon={SvgEdit} type={'intensive'}>加强</Button>
            <Button icon={SvgEdit} type={'important'}>重要</Button>
            <Button icon={SvgEdit} type={'translucent'}>半透明</Button>
            <Button icon={SvgEdit} type={'plain'}>纯文字</Button>
        </div>
        <div className="demo-group">
            <Button disabled={true} icon={SvgEdit}>普通</Button>
            <Button disabled={true} icon={SvgEdit} type={'intensive'}>加强</Button>
            <Button disabled={true} icon={SvgEdit} type={'important'}>重要</Button>
            <Button disabled={true} icon={SvgEdit} type={'translucent'}>半透明</Button>
            <Button disabled={true} icon={SvgEdit} type={'plain'}>纯文字</Button>
        </div>
        <div className="demo-group">
            <Button icon={SvgEdit}/>
            <Button icon={SvgEdit} type={'intensive'}/>
            <Button icon={SvgEdit} type={'important'}/>
            <Button icon={SvgEdit} type={'translucent'}/>
            <Button icon={SvgEdit} type={'plain'} />
        </div>
        <div className="demo-group">
            <Button disabled={true} icon={SvgEdit}/>
            <Button disabled={true} icon={SvgEdit} type={'intensive'}/>
            <Button disabled={true} icon={SvgEdit} type={'important'}/>
            <Button disabled={true} icon={SvgEdit} type={'translucent'}/>
            <Button disabled={true} icon={SvgEdit} type={'plain'} />
        </div>
        {/* <div className="demo-group button-ghost">
            <Button type={'ghost'}>ghost</Button>
            <Button type={'ghost'}>幽灵</Button>
            <Button disabled={true} type={'ghost'}>禁用</Button>
            <Button icon={SvgEdit} type={'ghost'} />
        </div> */}
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        <div className="demo-group">
            <Button size={'xs'}>xs</Button>
            <Button size={'xs'}>超小号</Button>
            <Button size={'xs'} icon={SvgEdit} />
            <Button size={'xs'} type={'intensive'}>超小号</Button>
            <Button size={'xs'} type={'important'}>超小号</Button>
            <Button size={'xs'} icon={SvgEdit} type={'plain'}>文字按钮</Button>
            <Button size={'xs'} icon={SvgEdit} type={'plain'} />
        </div>
        <div className="demo-group">
            <Button size={'sm'}>sm</Button>
            <Button size={'sm'}>小号</Button>
            <Button size={'sm'} icon={SvgEdit} />
            <Button size={'sm'} type={'intensive'}>小号</Button>
            <Button size={'sm'} type={'important'}>小号</Button>
            <Button size={'sm'} type={'plain'}>文字按钮</Button>
            <Button size={'sm'} icon={SvgEdit} type={'plain'} />
        </div>
        <div className="demo-group">
            <Button size={'md'}>md</Button>
            <Button size={'md'}>中号</Button>
            <Button size={'md'} icon={SvgEdit}/>
            <Button size={'md'} type={'intensive'}>中号</Button>
            <Button size={'md'} type={'important'}>中号</Button>
            <Button size={'md'} type={'plain'}>文字按钮</Button>
            <Button size={'md'} icon={SvgEdit} type={'plain'} />
        </div>
        <div className="demo-group">
            <Button size={'lg'}>lg</Button>
            <Button size={'lg'}>大号</Button>
            <Button size={'lg'} icon={SvgEdit}/>
            <Button size={'lg'} type={'intensive'}>大号</Button>
            <Button size={'lg'} type={'important'}>大号</Button>
            <Button size={'lg'} type={'plain'}>文字按钮</Button>
            <Button size={'lg'} icon={SvgEdit} type={'plain'} />
        </div>
        <div className="demo-group">
            <Button size={'xl'}>xl</Button>
            <Button size={'xl'}>特大号</Button>
            <Button size={'xl'} icon={SvgEdit}/>
            <Button size={'xl'} type={'intensive'}>特大号</Button>
            <Button size={'xl'} type={'important'}>特大号</Button>
            <Button size={'xl'} type={'plain'}>文字按钮</Button>
            <Button size={'xl'} icon={SvgEdit} type={'plain'} />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 color ===== */}
        <div className="demo-group">
            <Button color={'primary'}>普通</Button>
            <Button color={'primary'} type={'intensive'}>加强</Button>
            <Button color={'primary'} type={'important'}>重要</Button>
            <Button color={'primary'} type={'translucent'}>半透明</Button>
            <Button color={'primary'} type={'plain'}>纯文字</Button>
            <Button color={'primary'} type={'plain'} icon={SvgEdit}/>
        </div>
        <div className="demo-group">
            <Button>普通</Button>
            <Button color={'success'} type={'intensive'}>加强</Button>
            <Button color={'success'} type={'important'}>重要</Button>
            <Button color={'success'} type={'translucent'}>半透明</Button>
            <Button color={'success'} type={'plain'}>纯文字</Button>
            <Button color={'success'} type={'plain'} icon={SvgEdit}/>
        </div>
        <div className="demo-group">
            <Button>普通</Button>
            <Button color={'error'} type={'intensive'}>加强</Button>
            <Button color={'error'} type={'important'}>重要</Button>
            <Button color={'error'} type={'translucent'}>半透明</Button>
            <Button color={'error'} type={'plain'}>纯文字</Button>
            <Button color={'error'} type={'plain'} icon={SvgEdit}/>
        </div>
        <div className="demo-group">
            <Button>普通</Button>
            <Button color={'warning'} type={'intensive'}>加强</Button>
            <Button color={'warning'} type={'important'}>重要</Button>
            <Button color={'warning'} type={'translucent'}>半透明</Button>
            <Button color={'warning'} type={'plain'}>纯文字</Button>
            <Button color={'warning'} type={'plain'} icon={SvgEdit}/>
        </div>
        {/* <div className="demo-group button-ghost">
            <Button type={'ghost'}>default</Button>
            <Button color={'primary'} type={'ghost'}>primary</Button>
            <Button color={'success'} type={'ghost'}>success</Button>
            <Button color={'error'} type={'ghost'}>error</Button>
            <Button color={'warning'} type={'ghost'}>warning</Button>
            <Button type={'ghost'} icon={SvgEdit} />
            <Button color={'success'} type={'ghost'} icon={SvgEdit} />
            <Button color={'error'} type={'ghost'} icon={SvgEdit} />
            <Button color={'warning'} type={'ghost'} icon={SvgEdit} />
        </div> */}
        <div className="demo-group">
            <Button color={'primary'} icon={SvgEdit}/>
            <Button color={'primary'} icon={SvgEdit} type={'intensive'}/>
            <Button color={'primary'} icon={SvgEdit} type={'important'}/>
            <Button color={'primary'} icon={SvgEdit} type={'translucent'}/>
            <Button color={'primary'} icon={SvgEdit} type={'plain'} />
        </div>
        <div className="demo-group">
            <Button color={'success'} icon={SvgEdit}/>
            <Button color={'success'} icon={SvgEdit} type={'intensive'}/>
            <Button color={'success'} icon={SvgEdit} type={'important'}/>
            <Button color={'success'} icon={SvgEdit} type={'translucent'}/>
            <Button color={'success'} icon={SvgEdit} type={'plain'} />
        </div>
        <div className="demo-group">
            <Button color={'error'} icon={SvgEdit}/>
            <Button color={'error'} icon={SvgEdit} type={'intensive'}/>
            <Button color={'error'} icon={SvgEdit} type={'important'}/>
            <Button color={'error'} icon={SvgEdit} type={'translucent'}/>
            <Button color={'error'} icon={SvgEdit} type={'plain'} />
        </div>
        <div className="demo-group">
            <Button color={'warning'} icon={SvgEdit}/>
            <Button color={'warning'} icon={SvgEdit} type={'intensive'}/>
            <Button color={'warning'} icon={SvgEdit} type={'important'}/>
            <Button color={'warning'} icon={SvgEdit} type={'translucent'}/>
            <Button color={'warning'} icon={SvgEdit} type={'plain'} />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 3 loading ===== */}
        <div className="demo-group">
            <Button loading={loading} loadingDelayInMS={0}>普通</Button>
            <Button loading={loading} type={'intensive'}>加强</Button>
            <Button loading={loading} type={'important'}>重要</Button>
            <Button loading={loading} type={'translucent'}>半透明</Button>
            <Button loading={loading} type={'plain'}>纯文字</Button>
        </div>
        <div className="demo-group">
            <Button loading={loading} icon={SvgEdit}>普通</Button>
            <Button loading={loading} icon={SvgEdit} loadingIcon={SvgGear}>普通</Button>
            <Button loading={loading} icon={SvgEdit} />
            <Button loading={loading} icon={SvgEdit} loadingType={'icon-only'}>普通</Button>
            <Button loading={loading} loadingType={'icon-only'}>普通</Button>
        </div>
        {/* <div className="demo-group button-ghost">
            <Button loading={loading} type={'ghost'}>ghost</Button>
            <Button loading={loading} type={'ghost'}>幽灵</Button>
            <Button loading={loading} disabled={true} type={'ghost'}>禁用</Button>
            <Button loading={loading} type={'ghost'} icon={SvgEdit} />
        </div> */}
        <div className="demo-group">
            <Button loading={loading} shape={'capsule'} loadingDelayInMS={0}>普通</Button>
            <Button loading={loading} shape={'capsule'} type={'intensive'}>加强</Button>
            <Button loading={loading} shape={'capsule'} type={'important'}>重要</Button>
            <Button loading={loading} shape={'capsule'} type={'translucent'}>半透明</Button>
            <Button loading={loading} shape={'capsule'} type={'plain'}>纯文字</Button>
        </div>
        <div className="demo-group">
            <Button loading={loading} shape={'capsule'} icon={SvgEdit}>普通</Button>
            <Button loading={loading} shape={'capsule'} icon={SvgEdit} loadingIcon={SvgGear}>普通</Button>
            <Button loading={loading} shape={'capsule'} icon={SvgEdit} />
            <Button loading={loading} shape={'capsule'} icon={SvgEdit} loadingType={'icon-only'}>普通</Button>
            <Button loading={loading} shape={'capsule'} loadingType={'icon-only'}>普通</Button>
        </div>
        {/* <div className="demo-group button-ghost">
            <Button shape={'capsule'} loading={loading} type={'ghost'}>ghost</Button>
            <Button shape={'capsule'} loading={loading} type={'ghost'}>幽灵</Button>
            <Button shape={'capsule'} loading={loading} disabled={true} type={'ghost'}>禁用</Button>
            <Button shape={'capsule'} loading={loading} type={'ghost'}><Icon svg={SvgEdit}/></Button>
            <Button shape={'capsule'} loading={loading} style={{minWidth: 'auto'}} type={'ghost'}><Icon svg={SvgEdit}/></Button>
            <Button shape={'capsule'} loading={loading} type={'ghost'} icon={SvgEdit} />
        </div> */}
        <Divider className="demo-block-separator" />
        {/* ===== 6 shape ===== */}
        <div className="demo-group">
            <Button shape={'capsule'}>normal</Button>
            <Button shape={'capsule'} type={'intensive'} >intensive</Button>
            <Button shape={'capsule'} type={'important'}>important</Button>
            <Button shape={'capsule'} type={'translucent'}>translucent</Button>
            <Button shape={'capsule'} type={'plain'}>plain</Button>
        </div>
        <div className="demo-group">
            <Button shape={'capsule'} icon={SvgEdit}>普通</Button>
            <Button shape={'capsule'} icon={SvgEdit} />
            <Button shape={'capsule'} type={'plain'} icon={SvgEdit} />
        </div>
        {/* <div className="demo-group button-ghost">
            <Button shape={'capsule'} type={'ghost'}>ghost</Button>
            <Button shape={'capsule'} type={'ghost'}>幽灵</Button>
            <Button shape={'capsule'} disabled={true} type={'ghost'}>禁用</Button>
            <Button shape={'capsule'} type={'ghost'} icon={SvgEdit}>幽灵</Button>
            <Button shape={'capsule'} type={'ghost'} icon={SvgEdit} />
        </div> */}
    </div>
}

export default ButtonDemo
