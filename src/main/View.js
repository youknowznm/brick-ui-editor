import * as React from 'react'
import c from 'classnames'
import {Provider, observer} from 'mobx-react'

import DemoListView from './view/DemoListView'
import ControlPanelView from './view/ControlPanelView'
import EditorView from './view/EditorView'
import AttrEditorView from './view/AttrEditorView'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Snackbar from '@material-ui/core/Snackbar'

import './style.scss'

import MainState from './State'

@observer
class View extends React.Component {

  local = {
    mainState: new MainState(),
  }

  componentDidMount() {
    const {local, props} = this
    this.registerMetaKeyListener()
    this.registerBodyMouseEnterListener()
    this.local.mainState.loadStorage()
  }

  registerMetaKeyListener = () => {
    const {local} = this
    window.addEventListener('keydown', event => {
      if (event.key === 'Meta') {
        local.mainState.setProps({
          metaKeyPressing: true
        })
      }
      if (event.key === 'Escape') {
        local.mainState.setProps({
          activeComponentId: ''
        })
      }
    })
    window.addEventListener('keyup', event => {
      if (event.key === 'Meta') {
        local.mainState.setProps({
          metaKeyPressing: false
        })
      }
    })
  }

  // 从其它应用切换至浏览器时, 移除焦点, 聚焦自身
  registerBodyMouseEnterListener = () => {
    const {local} = this
    window.document.body.addEventListener('mouseenter', event => {
      window.focus()
      local.mainState.setProps({
        metaKeyPressing: false
      })
    })
  }

  renderControlPanelDrawerTrigger = () => {
    return <div
      className="top-actions-drawer-trigger"
      onMouseOver={() => {
        this.local.mainState.triggerControlPanelDrawer(true)
        this.local.mainState.triggerDemoDrawer(false)
        this.local.mainState.setProps({
          activeComponentId: ''
        })
      }}
    >
      <MoreHorizIcon
        className="trigger-icon"
        fontSize="small"
      />
    </div>
  }

  renderDemoDrawerTrigger = () => {
    return <div
      className="demo-drawer-trigger"
      onMouseOver={() => {
        this.local.mainState.triggerDemoDrawer(true)
        this.local.mainState.triggerControlPanelDrawer(false)
        this.local.mainState.setProps({
          activeComponentId: ''
        })
      }}
    >
      <MoreVertIcon
        className="trigger-icon"
        fontSize="small"
      />
    </div>
  }

  renderToast = () => {
    return <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={this.local.mainState.toastFlag}
      message={this.local.mainState.msgToToast}
    />
  }

  render() {
    const {props, local} = this
    const {mainState} = local
    return <Provider pushUsedCompData={mainState.pushUsedCompData}>
      <div className={c(
        'index-page',
        mainState.metaKeyPressing && 'meta-key-pressed'
      )}>
        <DemoListView
          // showDemoDrawer={true}
          showDemoDrawer={mainState.showDemoDrawer}
        />
        {this.renderDemoDrawerTrigger()}
        <EditorView
          editorWidth={mainState.editorWidth}
          editorHeight={mainState.editorHeight}
          usedCompsDataArray={mainState.usedCompsDataArray}
          showDemoDrawer={mainState.showDemoDrawer}
          showControlPanelDrawer={mainState.showControlPanelDrawer}
          triggerDemoDrawer={mainState.triggerDemoDrawer}
          triggerControlPanelDrawer={mainState.triggerControlPanelDrawer}
          activeComponentId={mainState.activeComponentId}
          setActiveComponentId={id => {
            mainState.setProps({
              activeComponentId: id
            })
          }}
          setCompResizeHandler={func => {
            mainState.setProps({
              compResizeHandler: func
            })
          }}
          compDragHandler={mainState.compDragHandler}
        />
        <ControlPanelView
          showControlPanelDrawer={mainState.showControlPanelDrawer}
          usedCompsDataArray={mainState.usedCompsDataArray}
          triggerControlPanelDrawer={mainState.triggerControlPanelDrawer}
          clearAll={mainState.clearAll}
          archiveName={mainState.archiveName}
          setArchiveName={archiveName => {
            mainState.setProps({
              archiveName
            })
            mainState.saveArchiveName()
          }}
          author={mainState.author}
          setAuthor={author => {
            mainState.setProps({
              author
            })
            mainState.saveAuthor()
          }}
          copyStorageToClipboard={mainState.copyStorageToClipboard}
          loadFromCopy={mainState.loadFromCopy}
          editorWidth={mainState.editorWidth}
          editorHeight={mainState.editorHeight}
          setEditorWidth={val => {
            mainState.setProps({
              editorWidth: val
            })
            mainState.saveEditorWidth()
          }}
          setEditorHeight={val => {
            mainState.setProps({
              editorHeight: val
            })
            mainState.saveEditorHeight()
          }}
          resizeEditor={mainState.resizeEditor}
        />
        <AttrEditorView
          activeComponentData={mainState.activeComponentData}
          targetPropsChangeHandler={mainState.targetPropsChangeHandler}
          removeUsedComp={mainState.removeUsedComp}
        />
        {this.renderControlPanelDrawerTrigger()}
        {this.renderToast()}
      </div>
    </Provider>
  }
}

export default View