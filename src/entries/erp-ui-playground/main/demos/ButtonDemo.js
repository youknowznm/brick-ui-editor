import * as React from 'react'

import wrapDemoComp from '../components/wrapDemoComp'

import {Button as OriginButton} from '@befe/brick'
import {SvgEdit} from '@befe/brick-icon'

const Button = wrapDemoComp(OriginButton)

export default class ButtonDemo extends React.Component {

    render() {
        return <div>
            <div className="demo-group">
                <Button>normal</Button>
                <Button type={'intensive'}>intensive</Button>
                <Button type={'important'}>important</Button>
                <Button type={'translucent'}>translucent</Button>
                <Button type={'plain'}>plain</Button>
            </div>
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
            
        </div>
    }
}

