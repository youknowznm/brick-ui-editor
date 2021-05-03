import * as React from 'react'

export default class Section extends React.Component {

  static displayName = 'Section'

  static defaultProps = {
    title: '',
    width: 540,
    height: 360,
  }

  render() {
    const {
      title,
      width,
      height,
    } = this.props

    return <div
      className="brick-editor-section"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {
        title !== '' && <h3 className="section-title">{title}</h3>
      }
    </div>
  }
}
