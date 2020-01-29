import * as React from 'react'
import * as TestRenderer from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
// import {fastForward, createControlledPromise} from '@befe/brick-utils/src/testing'

import { Toast, ToastProps } from './index'

describe('Toast', () => {
    it('renders correctly', () => {
        const wrapper = render(<Toast />)
        expect(wrapper).toMatchSnapshot()
    })

    it('mount correctly', () => {
        expect(() => TestRenderer.create(<Toast />)).not.toThrow()
    })

    it('unmount properly', () => {
        const wrapper = shallow(<Toast />)
        wrapper.unmount()

        // 应该做一些实际的清理测试，比如
        // - addEventListener -> removeEventListener
        // - setInterval / setTimeout -> clearInterval / clearTimeout

        expect(wrapper.instance()).toBe(null)
    })
})
