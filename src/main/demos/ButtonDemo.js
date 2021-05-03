import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Button from '../composedComps/Button'

const Button = wrapDemoComp(_Button)

const ButtonDemo = () => {
  const loading = true;
  return <div className="demo-block">
    {/* <Divider className="demo-block-separator" /> */}
    {/* ===== 0 basic ===== */}
    <h3 className="demo-type-desc">类型</h3>
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
      <Button iconName="SvgEdit">普通</Button>
      <Button iconName="SvgEdit" type={'intensive'}>加强</Button>
      <Button iconName="SvgEdit" type={'important'}>重要</Button>
      <Button iconName="SvgEdit" type={'translucent'}>半透明</Button>
      <Button iconName="SvgEdit" type={'plain'}>纯文字</Button>
    </div>
    <div className="demo-group">
      <Button disabled={true} iconName="SvgEdit">普通</Button>
      <Button disabled={true} iconName="SvgEdit" type={'intensive'}>加强</Button>
      <Button disabled={true} iconName="SvgEdit" type={'important'}>重要</Button>
      <Button disabled={true} iconName="SvgEdit" type={'translucent'}>半透明</Button>
      <Button disabled={true} iconName="SvgEdit" type={'plain'}>纯文字</Button>
    </div>
    <div className="demo-group">
      <Button iconName="SvgEdit"/>
      <Button iconName="SvgEdit" type={'intensive'}/>
      <Button iconName="SvgEdit" type={'important'}/>
      <Button iconName="SvgEdit" type={'translucent'}/>
      <Button iconName="SvgEdit" type={'plain'}/>
    </div>
    <div className="demo-group">
      <Button disabled={true} iconName="SvgEdit"/>
      <Button disabled={true} iconName="SvgEdit" type={'intensive'}/>
      <Button disabled={true} iconName="SvgEdit" type={'important'}/>
      <Button disabled={true} iconName="SvgEdit" type={'translucent'}/>
      <Button disabled={true} iconName="SvgEdit" type={'plain'}/>
    </div>
    {/* <div className="demo-group button-ghost">
            <Button type={'ghost'}>ghost</Button>
            <Button type={'ghost'}>幽灵</Button>
            <Button disabled={true} type={'ghost'}>禁用</Button>
            <Button iconName="SvgEdit" type={'ghost'} />
        </div> */}
    <Divider className="demo-block-separator"/>
    {/* ===== 1 size ===== */}
    <h3 className="demo-type-desc">尺寸</h3>
    <div className="demo-group">
      <Button size={'xs'}>xs</Button>
      <Button size={'xs'}>超小号</Button>
      <Button size={'xs'} iconName="SvgEdit"/>
      <Button size={'xs'} type={'intensive'}>超小号</Button>
      <Button size={'xs'} type={'important'}>超小号</Button>
      <Button size={'xs'} iconName="SvgEdit" type={'plain'}>文字按钮</Button>
      <Button size={'xs'} iconName="SvgEdit" type={'plain'}/>
    </div>
    <div className="demo-group">
      <Button size={'sm'}>sm</Button>
      <Button size={'sm'}>小号</Button>
      <Button size={'sm'} iconName="SvgEdit"/>
      <Button size={'sm'} type={'intensive'}>小号</Button>
      <Button size={'sm'} type={'important'}>小号</Button>
      <Button size={'sm'} type={'plain'}>文字按钮</Button>
      <Button size={'sm'} iconName="SvgEdit" type={'plain'}/>
    </div>
    <div className="demo-group">
      <Button size={'md'}>md</Button>
      <Button size={'md'}>中号</Button>
      <Button size={'md'} iconName="SvgEdit"/>
      <Button size={'md'} type={'intensive'}>中号</Button>
      <Button size={'md'} type={'important'}>中号</Button>
      <Button size={'md'} type={'plain'}>文字按钮</Button>
      <Button size={'md'} iconName="SvgEdit" type={'plain'}/>
    </div>
    <div className="demo-group">
      <Button size={'lg'}>lg</Button>
      <Button size={'lg'}>大号</Button>
      <Button size={'lg'} iconName="SvgEdit"/>
      <Button size={'lg'} type={'intensive'}>大号</Button>
      <Button size={'lg'} type={'important'}>大号</Button>
      <Button size={'lg'} type={'plain'}>文字按钮</Button>
      <Button size={'lg'} iconName="SvgEdit" type={'plain'}/>
    </div>
    <div className="demo-group">
      <Button size={'xl'}>xl</Button>
      <Button size={'xl'}>特大号</Button>
      <Button size={'xl'} iconName="SvgEdit"/>
      <Button size={'xl'} type={'intensive'}>特大号</Button>
      <Button size={'xl'} type={'important'}>特大号</Button>
      <Button size={'xl'} type={'plain'}>文字按钮</Button>
      <Button size={'xl'} iconName="SvgEdit" type={'plain'}/>
    </div>
    <Divider className="demo-block-separator"/>
    {/* ===== 2 color ===== */}
    <h3 className="demo-type-desc">颜色</h3>
    <div className="demo-group">
      <Button color={'primary'}>普通</Button>
      <Button color={'primary'} type={'intensive'}>加强</Button>
      <Button color={'primary'} type={'important'}>重要</Button>
      <Button color={'primary'} type={'translucent'}>半透明</Button>
      <Button color={'primary'} type={'plain'}>纯文字</Button>
      <Button color={'primary'} type={'plain'} iconName="SvgEdit"/>
    </div>
    <div className="demo-group">
      <Button>普通</Button>
      <Button color={'success'} type={'intensive'}>加强</Button>
      <Button color={'success'} type={'important'}>重要</Button>
      <Button color={'success'} type={'translucent'}>半透明</Button>
      <Button color={'success'} type={'plain'}>纯文字</Button>
      <Button color={'success'} type={'plain'} iconName="SvgEdit"/>
    </div>
    <div className="demo-group">
      <Button>普通</Button>
      <Button color={'error'} type={'intensive'}>加强</Button>
      <Button color={'error'} type={'important'}>重要</Button>
      <Button color={'error'} type={'translucent'}>半透明</Button>
      <Button color={'error'} type={'plain'}>纯文字</Button>
      <Button color={'error'} type={'plain'} iconName="SvgEdit"/>
    </div>
    <div className="demo-group">
      <Button>普通</Button>
      <Button color={'warning'} type={'intensive'}>加强</Button>
      <Button color={'warning'} type={'important'}>重要</Button>
      <Button color={'warning'} type={'translucent'}>半透明</Button>
      <Button color={'warning'} type={'plain'}>纯文字</Button>
      <Button color={'warning'} type={'plain'} iconName="SvgEdit"/>
    </div>
    {/* <div className="demo-group button-ghost">
            <Button type={'ghost'}>default</Button>
            <Button color={'primary'} type={'ghost'}>primary</Button>
            <Button color={'success'} type={'ghost'}>success</Button>
            <Button color={'error'} type={'ghost'}>error</Button>
            <Button color={'warning'} type={'ghost'}>warning</Button>
            <Button type={'ghost'} iconName="SvgEdit" />
            <Button color={'success'} type={'ghost'} iconName="SvgEdit" />
            <Button color={'error'} type={'ghost'} iconName="SvgEdit" />
            <Button color={'warning'} type={'ghost'} iconName="SvgEdit" />
        </div> */}
    <div className="demo-group">
      <Button color={'primary'} iconName="SvgEdit"/>
      <Button color={'primary'} iconName="SvgEdit" type={'intensive'}/>
      <Button color={'primary'} iconName="SvgEdit" type={'important'}/>
      <Button color={'primary'} iconName="SvgEdit" type={'translucent'}/>
      <Button color={'primary'} iconName="SvgEdit" type={'plain'}/>
    </div>
    <div className="demo-group">
      <Button color={'success'} iconName="SvgEdit"/>
      <Button color={'success'} iconName="SvgEdit" type={'intensive'}/>
      <Button color={'success'} iconName="SvgEdit" type={'important'}/>
      <Button color={'success'} iconName="SvgEdit" type={'translucent'}/>
      <Button color={'success'} iconName="SvgEdit" type={'plain'}/>
    </div>
    <div className="demo-group">
      <Button color={'error'} iconName="SvgEdit"/>
      <Button color={'error'} iconName="SvgEdit" type={'intensive'}/>
      <Button color={'error'} iconName="SvgEdit" type={'important'}/>
      <Button color={'error'} iconName="SvgEdit" type={'translucent'}/>
      <Button color={'error'} iconName="SvgEdit" type={'plain'}/>
    </div>
    <div className="demo-group">
      <Button color={'warning'} iconName="SvgEdit"/>
      <Button color={'warning'} iconName="SvgEdit" type={'intensive'}/>
      <Button color={'warning'} iconName="SvgEdit" type={'important'}/>
      <Button color={'warning'} iconName="SvgEdit" type={'translucent'}/>
      <Button color={'warning'} iconName="SvgEdit" type={'plain'}/>
    </div>
    <Divider className="demo-block-separator"/>
    {/* ===== 3 loading ===== */}
    <h3 className="demo-type-desc">加载中</h3>
    <div className="demo-group">
      <Button loading={loading} loadingDelay={0}>普通</Button>
      <Button loading={loading} type={'intensive'}>加强</Button>
      <Button loading={loading} type={'important'}>重要</Button>
      <Button loading={loading} type={'translucent'}>半透明</Button>
      <Button loading={loading} type={'plain'}>纯文字</Button>
    </div>
    <div className="demo-group">
      <Button loading={loading} iconName="SvgEdit">普通</Button>
      <Button loading={loading} iconName="SvgEdit" loadingIconName="SvgGear">普通</Button>
      <Button loading={loading} iconName="SvgEdit"/>
      <Button loading={loading} iconName="SvgEdit" loadingType={'icon-only'}>普通</Button>
      <Button loading={loading} loadingType={'icon-only'}>普通</Button>
    </div>
    {/* <div className="demo-group button-ghost">
            <Button loading={loading} type={'ghost'}>ghost</Button>
            <Button loading={loading} type={'ghost'}>幽灵</Button>
            <Button loading={loading} disabled={true} type={'ghost'}>禁用</Button>
            <Button loading={loading} type={'ghost'} iconName="SvgEdit" />
        </div> */}
    <div className="demo-group">
      <Button loading={loading} shape={'capsule'} loadingDelay={0}>普通</Button>
      <Button loading={loading} shape={'capsule'} type={'intensive'}>加强</Button>
      <Button loading={loading} shape={'capsule'} type={'important'}>重要</Button>
      <Button loading={loading} shape={'capsule'} type={'translucent'}>半透明</Button>
      <Button loading={loading} shape={'capsule'} type={'plain'}>纯文字</Button>
    </div>
    <div className="demo-group">
      <Button loading={loading} shape={'capsule'} iconName="SvgEdit">普通</Button>
      <Button loading={loading} shape={'capsule'} iconName="SvgEdit" loadingIconName="SvgGear">普通</Button>
      <Button loading={loading} shape={'capsule'} iconName="SvgEdit"/>
      <Button loading={loading} shape={'capsule'} iconName="SvgEdit" loadingType={'icon-only'}>普通</Button>
      <Button loading={loading} shape={'capsule'} loadingType={'icon-only'}>普通</Button>
    </div>
    {/* <div className="demo-group button-ghost">
            <Button shape={'capsule'} loading={loading} type={'ghost'}>ghost</Button>
            <Button shape={'capsule'} loading={loading} type={'ghost'}>幽灵</Button>
            <Button shape={'capsule'} loading={loading} disabled={true} type={'ghost'}>禁用</Button>
            <Button shape={'capsule'} loading={loading} type={'ghost'}><Icon svg={SvgEdit}/></Button>
            <Button shape={'capsule'} loading={loading} style={{minWidth: 'auto'}} type={'ghost'}><Icon svg={SvgEdit}/></Button>
            <Button shape={'capsule'} loading={loading} type={'ghost'} iconName="SvgEdit" />
        </div> */}
    <Divider className="demo-block-separator"/>
    {/* ===== 6 shape ===== */}
    <h3 className="demo-type-desc">形状</h3>
    <div className="demo-group">
      <Button shape={'capsule'}>normal</Button>
      <Button shape={'capsule'} type={'intensive'}>intensive</Button>
      <Button shape={'capsule'} type={'important'}>important</Button>
      <Button shape={'capsule'} type={'translucent'}>translucent</Button>
      <Button shape={'capsule'} type={'plain'}>plain</Button>
    </div>
    <div className="demo-group">
      <Button shape={'capsule'} iconName="SvgEdit">普通</Button>
      <Button shape={'capsule'} iconName="SvgEdit"/>
      <Button shape={'capsule'} type={'plain'} iconName="SvgEdit"/>
    </div>
    {/* <div className="demo-group button-ghost">
            <Button shape={'capsule'} type={'ghost'}>ghost</Button>
            <Button shape={'capsule'} type={'ghost'}>幽灵</Button>
            <Button shape={'capsule'} disabled={true} type={'ghost'}>禁用</Button>
            <Button shape={'capsule'} type={'ghost'} iconName="SvgEdit">幽灵</Button>
            <Button shape={'capsule'} type={'ghost'} iconName="SvgEdit" />
        </div> */}
    <Divider className="demo-block-separator"/>
  </div>
}

ButtonDemo.wrapName = 'ButtonDemo'

export default ButtonDemo
