import * as React from 'react'

export default class Typography extends React.Component {

    static displayName = 'Typography'

    static defaultProps = {
        children: '',
        type: 'primary', // heading primary active secondary hint disabled
        size: 'sm',
        width: 300,
        height: 50,
        align: 'left'
    }

    render() {
        const {
            width,
            height,
            size,
            align,
            type,
            ...restProps
        } = this.props

        return <p
            className={c(
                'brick-playground-typography',
                `font-size-${size}`,
                `text-align-${align}`,
                `type-${type}`,
            ) }
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
            {...restProps}
        />
    }
}

// themes/default.scss

// color: $color-text-normal;
// background: $color-bg-body;
// font-size: $font-size-base;

// $color-text-heading: color-gray(10) !default;
// $color-text-primary: $color-text-normal !default;
// $color-text-primary-active: $color-text-normal-active !default;
// $color-text-secondary: color-gray(8) !default;
// $color-text-hint: color-gray(7) !default;
// $color-text-disabled: color-gray(6) !default;

// $font-size-sm: 12px !default;
// $font-size-md: 14px !default;
// $font-size-lg: 16px !default;

// $font-weight-normal: 400 !default;
// $font-weight-medium: 500 !default;
// $font-weight-bold: 600 !default;
