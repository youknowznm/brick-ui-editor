import * as React from 'react'

import {Radio} from '@befe/brick'
// import '@befe/brick-comp-radio/src/index.scss'

export default class RadioGroup extends React.Component {

  static displayName = 'ComposedRadioGroup'

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
      defaultValue,
      size,
      options,
      width
    } = this.props
    return <div
      className="composed-radio-group"
      style={{
        width: `${width}px`
      }}
    >
      {
        options.map((item, index) => {
          return <Radio
            key={index}
            type={type}
            size={size}
            disabled={item.disabled}
            indeterminate={item.indeterminate}
            checked={item.checked}
          >
            {item.label}
          </Radio>
        })
      }
    </div>
  }
}
