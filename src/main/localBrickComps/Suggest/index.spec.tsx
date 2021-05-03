import * as React from 'react'
import * as TestRenderer from 'react-test-renderer'
import {shallow, mount, render} from 'enzyme'
// import {fastForward, createControlledPromise} from '@befe/brick-utils/src/testing'

import {Suggest, SuggestProps} from './index'

describe('Suggest', () => {
    it('renders correctly', () => {
        const wrapper = render(<Suggest/>)
        expect(wrapper).toMatchSnapshot()
    })

    it('mount correctly', () => {
        expect(() => TestRenderer.create(<Suggest/>)).not.toThrow()
    })

    it('unmount properly', () => {
        const wrapper = shallow(<Suggest/>)
        wrapper.unmount()

        // 应该做一些实际的清理测试，比如
        // - addEventListener -> removeEventListener
        // - setInterval / setTimeout -> clearInterval / clearTimeout

        expect(wrapper.instance()).toBe(null)
    })
})
