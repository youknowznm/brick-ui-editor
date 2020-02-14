import * as React from 'react'

import wrapDemoComp from '../utils/wrapDemoComp'

import _Section from '../composedComps/Section'
const Section = wrapDemoComp(_Section)

const SectionDemo = () => {

    return <div className="demo-block section-demo-block">
        <Section
            title={'区域标题'}
        />
    </div>
}

SectionDemo.wrapName = 'SectionDemo'

export default SectionDemo
