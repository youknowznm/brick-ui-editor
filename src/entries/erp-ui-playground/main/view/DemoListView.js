import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import {Button} from '@befe/brick'
import {SvgEdit} from '@befe/brick-icon'

import {withStyles} from '@material-ui/core/styles'
import MUIDrawer from '@material-ui/core/Drawer'
import MUIButton from '@material-ui/core/Button'

import DemoListState from '../states/DemoListState'

import '../style/demo-list.scss'

@observer
export default class DemoListView extends React.Component {

    static propTypes = {
        // showDemoListDrawer
    }

    local = {
        demoListState: new DemoListState(),
    }

    constructor(props) {
        super(props)
        const {local} = this
    }

    componentDidMount() {
    }

    componentDidUpdate() {}

    componentWillReceiveProps() {}

    renderButtonDemos() {
        return <div>
            {/* <Button>普通</Button>
            <Button disabled={true} type={'intensive'}>加强</Button>
            <Button icon={SvgEdit} type={'important'}>重要</Button>
            <Button disabled={true} icon={SvgEdit} type={'translucent'}>半透明</Button>
            <Button disabled={true} icon={SvgEdit} type={'plain'}>纯文字</Button> */}

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

    render() {
        const {local, props} = this
        const {demoListState} = local
        return <div className="demo-list">
            <MUIDrawer
                className="demo-list-drawer"
                anchor="left"
                variant="persistent"
                open={props.showDemoListDrawer}
               
            >
                <div
                    className="demo-list-content"
                    style={{
                        width:`${props.demoListWidth}px`
                    }}    
                >
                    {this.renderButtonDemos()}
                </div>
            </MUIDrawer>
        </div>
    }
}
