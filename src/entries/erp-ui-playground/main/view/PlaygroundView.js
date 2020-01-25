import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import PlaygroundCompWrap from '../components/PlaygroundCompWrap'

import Card from '@material-ui/core/Card'

import PlaygroundState from '../states/PlaygroundState'

import '../style/playground.scss'

@observer
export default class PlaygroundView extends React.Component {

    static propTypes = {
        // triggerDemoDrawer
    }

    static defaultProps = {
        triggerDemoDrawer: () => {},
        setEditingComponentId: () => {},
    }

    local = {
        playgroundState: new PlaygroundState(),
    }

    constructor(props) {
        super(props)
        const {local} = this
    }

    componentDidMount() {
    }

    componentDidUpdate() {}

    componentWillReceiveProps() {
    }

    renderPlaygroundContent = () => {
        const {props} = this
        return <div className="playground-content"
            onMouseOver={evt => {
                if (evt.target.className.indexOf('playground') > -1) {
                    props.triggerDemoDrawer(false)
                }
            }}
            onClick={evt => {
                if (evt.target.className.indexOf('playground') > -1) {
                    props.setEditingComponentId('')
                }
            }}
        >
            {props.componentsUsed}
        </div>
    }

    renderBlockLayer = () => {
        const {local, props} = this
        const {
            playgroundWidth,
            playgroundHeight
        } = props
        // console.log(133, props.playgroundWidth, props.playgroundHeight)

        // const tl = 100
        // const tr = 100
        // const br = 100
        // const bl = 100
        // const width = 
        
        // return h.div('block-layer', {},
        //     h.div('area-top-left', {
        //         style: {
        //             top: 0,
        //             right: playgroundWidth - tl,
        //             bottom: playgroundHeight - bl,
        //             left: 0,
        //         }
        //     }),
        // )
    }

    render() {
        const {local, props, triggerDemoDrawer} = this
        const {demoPageState} = local
        const {
            demoPageWidth,
            showDemoPageDrawer
        } = props
        const offSet = demoPageWidth - 20
        return <div className="playground-wrap"
            style={{
                marginLeft: `${showDemoPageDrawer ? offSet : 0}px`,
                right: `${showDemoPageDrawer ? -offSet : 0}px`,
            }}
            >
            {this.renderPlaygroundContent()}
            {this.renderBlockLayer()}
        </div>
    }
}
