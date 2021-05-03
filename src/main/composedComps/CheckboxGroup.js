import * as React from 'react'

import {Checkbox} from '@befe/brick'
// import '@befe/brick-comp-checkbox/src/index.scss'

export default class ComposedCheckboxGroup extends React.Component {

  static displayName = 'ComposedCheckboxGroup'

  static defaultProps = {
    type: 'normal',
    size: 'sm',
    options: [
      {
        value: '',
        label: '',
        indeterminate: false,
        disabled: false,
        checked: false,
      }
    ],
    width: 400
  }

  render() {
    const {
      type,
      // defaultValue,
      size,
      options,
      width
    } = this.props
    return <div
      className="composed-checkbox-group"
      style={{
        width: `${width}px`
      }}
    >
      {
        options.map((item, index) => {
          return <Checkbox
            key={index}
            type={type}
            size={size}
            disabled={item.disabled}
            indeterminate={item.indeterminate}
            checked={item.checked}
          >
            {item.label}
          </Checkbox>
        })
      }
    </div>
  }
}
