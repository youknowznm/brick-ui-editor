import * as React from 'react'

import {Breadcrumb} from '@befe/brick'
// import '@befe/brick-comp-breadcrumb/src/index.scss'

export default class ComposedBreadcrumb extends React.Component {

  static displayName = 'ComposedBreadcrumb'

  static defaultProps = {
    size: 'sm',
    data: [
      {
        label: '标题 1',
        href: '#',
      }
    ],
    divider: '',
    width: 240
  }

  render() {
    const {
      width,
      divider,
      ...restProps
    } = this.props

    return <div
      style={{
        width: `${width}px`,
      }}
      className="composed-breadcrumb"
    >
      <Breadcrumb
        divider={divider !== '' ? divider : undefined}
        {...restProps}
      />
    </div>
  }
}
