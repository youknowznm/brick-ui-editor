import * as React from 'react'

import Divider from "@material-ui/core/Divider";

import wrapDemoComp from '../utils/wrapDemoComp'

import _Section from '../composedComps/Section'
const Section = wrapDemoComp(_Section)

const SectionDemo = () => {

    return <div className="demo-block section-demo-block">
        <Section
            title={'区域标题'}
        />
        <Divider className="demo-block-separator" />
    </div>
}

SectionDemo.wrapName = 'SectionDemo'

export default SectionDemo
