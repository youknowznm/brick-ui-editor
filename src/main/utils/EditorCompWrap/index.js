import * as React from 'react'
import {default as c} from 'classnames'
import {observer} from 'mobx-react'
import {findDOMNode} from 'react-dom'

import Draggable from 'react-draggable'

import './style.scss'

import {debounce} from 'lodash-es';

import {COMP_TYPES} from '../../config'

@observer
class EditorCompWrap extends React.Component {

  // static displayName = `${OriginComponent.displayName}EditorWrap`

  // contentDOM = null
  wrapDOM = null

  state = {
    prevDeltaX: 0,
    prevDeltaY: 0,
  }

  static propTypes = {
    // editorWidth: PropTypes.number.isRequired,
    // editorHeight: PropTypes.number.isRequired,
    // deltaX,
    // deltaY,
  }

  componentDidMount() {
    this.setState({
      prevDeltaX: this.props.deltaX,
      prevDeltaY: this.props.deltaY,
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 选中时, 设置 compResizeHandler 为当前组件的
    if (prevProps.activeComponentId !== prevProps.id && this.isSelected) {
      this.props.setCompResizeHandler(this.compResizeHandler)
    }
    // 取消选中时, 置空 compResizeHandler
    if (prevProps.activeComponentId === prevProps.id && !this.isSelected) {
      this.props.setCompResizeHandler(null)
    }
  }

  get isSelected() {
    return this.props.activeComponentId === this.props.id
  }

  get compTypeData() {
    return COMP_TYPES[this.props.originName] || null
  }

  processWrapDOMRef = wrapDOM => {
    this.wrapDOM = wrapDOM
  }

  processContentDOMRef = reactElem => {
    this.contentRef = reactElem
  }

  compResizeHandler = () => {
    let wrapWidth = 0
    let wrapHeight = 0
    const wrapDOM = findDOMNode(this.contentRef)
    if (wrapDOM) {
      const computedStyle = document.defaultView.getComputedStyle(wrapDOM)
      wrapWidth = parseInt(computedStyle.width, 10)
      wrapHeight = parseInt(computedStyle.height, 10)
    }
    return {
      wrapWidth,
      wrapHeight
    }
  }

  get draggableWrapProps() {
    const {
      props,
      state,
    } = this
    const {
      prevDeltaX,
      prevDeltaY,
    } = state
    const {
      id
    } = props
    return {
      position: {
        x: prevDeltaX,
        y: prevDeltaY
      },
      bounds: '.editor-content',
      handle: '.has-drag-cursor',
      onStart: () => {
        this.props.setActiveComponentId(id)
      },
      onDrag: debounce((e, ui) => {
        const {x, y} = ui
        this.setState({
          prevDeltaX: x,
          prevDeltaY: y,
        })
        this.props.compDragHandler({
          deltaX: x,
          deltaY: y,
        })
      }),
      onStop: (e, ui) => {
        const {x, y} = ui
        this.setState({
          prevDeltaX: x,
          prevDeltaY: y,
        })
        this.props.compDragHandler({
          deltaX: x,
          deltaY: y,
        })
      }
    }
  }

  wrapCompInControllers = children => {
    const {
      props,
      state
    } = this
    const {
      prevDeltaX,
      prevDeltaY,
    } = state
    const {
      id,
      editorWidth,
      editorHeight,
      wrapWidth,
      wrapHeight,
    } = props
    return <div className="controllers">
      {children}
      <div
        className="action-layer has-drag-cursor"
        onClick={() => {
          props.triggerDemoDrawer(false)
          props.triggerControlPanelDrawer(false)
        }}
      >
      </div>
      {/* TODO: 标尺*/}
      {/*<span className="ruler left" style={{*/}
      {/*    left: -deltaX / 2,*/}
      {/*    bottom: '100%',*/}
      {/*    zIndex: 3,*/}
      {/*    transform: 'translate(-50%, 50%)'*/}
      {/*}}>*/}
      {/*    {deltaX}px*/}
      {/*</span>*/}
      <i className="aligner tl hor" style={{
        width: prevDeltaX,
        left: -prevDeltaX
      }}/>
      {/*<span className="ruler top" style={{*/}
      {/*    top: -deltaY / 2,*/}
      {/*    right: '100%',*/}
      {/*    zIndex: 3,*/}
      {/*    transform: 'translate(50%, -50%)'*/}
      {/*}}>*/}
      {/*    {deltaY}px*/}
      {/*</span>*/}
      <i className="aligner tl ver" style={{
        height: prevDeltaY,
        top: -prevDeltaY
      }}/>
      <i className="aligner tr hor" style={{
        width: editorWidth - prevDeltaX - wrapWidth,
        right: -(editorWidth - prevDeltaX - wrapWidth)
      }}/>
      <i className="aligner tr ver" style={{
        height: prevDeltaY,
        top: -prevDeltaY
      }}/>
      <i className="aligner br hor" style={{
        width: editorWidth - prevDeltaX - wrapWidth,
        right: -(editorWidth - prevDeltaX - wrapWidth)
      }}/>
      <i className="aligner br ver" style={{
        height: editorHeight - prevDeltaY - wrapHeight,
        bottom: -(editorHeight - prevDeltaY - wrapHeight)
      }}/>
      <i className="aligner bl hor" style={{
        width: prevDeltaX,
        left: -prevDeltaX
      }}/>
      <i className="aligner bl ver" style={{
        height: editorHeight - prevDeltaY - wrapHeight,
        bottom: -(editorHeight - prevDeltaY - wrapHeight)
      }}/>
      {/*<span className="ruler width" style={{*/}
      {/*    bottom: '-100%',*/}
      {/*    left: '50%',*/}
      {/*    zIndex: 3,*/}
      {/*    transform: 'translate(50%, -50%)'*/}
      {/*}}>*/}
      {/*    {wrapWidth}px*/}
      {/*</span>*/}
      <div className="selected-layer has-drag-cursor">
        <span className="spot tl"/>
        <span className="spot tr"/>
        <span className="spot br"/>
        <span className="spot bl"/>
      </div>
    </div>
  }

  render() {
    const {
      props,
      state,
      compTypeData,
    } = this
    const {
      prevDeltaX,
      prevDeltaY,
    } = state
    const {
      originProps,
      id,
      wrapWidth,
      wrapHeight
    } = props
    if (compTypeData === null) {
      return null
    }
    return <Draggable {...this.draggableWrapProps}>
      <div
        className={c(
          'editor-comp-wrap',
          this.isSelected && 'selected',
        )}
        style={{
          width: wrapWidth,
          height: wrapHeight
        }}
        ref={this.processWrapDOMRef}
      >
        {
          this.wrapCompInControllers(
            <compTypeData.Element
              ref={this.processContentDOMRef}
              {...originProps}
            />
          )
        }
      </div>
    </Draggable>
  }
}

export default EditorCompWrap
