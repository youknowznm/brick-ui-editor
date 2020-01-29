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

import PlaygroundCompWrap from '../utils/PlaygroundCompWrap'

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
        const {local, props} = this
        const {
            metaKeyPressing,
            componentInEditId,
            setEditingComponentId,
            triggerDemoDrawer,
            triggerControlPanelDrawer
        } = props
        return <div className="playground-content"
            onMouseOver={evt => {
                const {className} = evt.target
                if (className && className.indexOf('playground-content') > -1) {
                    props.triggerDemoDrawer(false)
                }
            }}
            onClick={evt => {
                const {className} = evt.target
                if (className && className.indexOf('playground-content') > -1) {
                    props.setEditingComponentId('')
                }
            }}
        >
            {props.usedCompsDataArray.map(item => {
                {/* console.log('componentsUsedData', item); */}
                {/* console.log('children', item.originCompProps.children); */}
                return <PlaygroundCompWrap
                    key={item.id}
                    id={item.id}
                    metaKeyPressing={metaKeyPressing}
                    componentInEditId={componentInEditId}
                    setEditingComponentId={setEditingComponentId}
                    triggerDemoDrawer={triggerDemoDrawer}
                    triggerControlPanelDrawer={triggerControlPanelDrawer}
                    originCompProps={item.originCompProps}
                    originCompState={item.originCompState}

                    // id: "gcxcsy5"
                    // originDisplayName: "Button"
                    // originCompProps: {type: "important", children: "important", className: "", color: "normal", disabled: false, …}
                    // originCompState: {asyncLoading: false, showLoading: false}
                    // playgroundTop: 0
                    // playgroundLeft: 0
                />;
            })}
        </div>
    }

    render() {
        const {local, props, triggerDemoDrawer} = this
        const {demoListState} = local
        const {
            demoListWidth,
            showDemoListDrawer
        } = props
        const offSet = demoListWidth - 20
        return <div className="playground-wrap"
            style={{
                marginLeft: `${showDemoListDrawer ? offSet : 0}px`,
                right: `${showDemoListDrawer ? -offSet : 0}px`,
            }}
            >
            {this.renderPlaygroundContent()}
        </div>
    }
}
