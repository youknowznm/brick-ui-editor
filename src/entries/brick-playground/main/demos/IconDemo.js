import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {ICON_GROUP_MAP_MAIN} from '@befe/brick-icon/src/main/group-map'

import {capitalize} from "lodash-es";

import _Icon from '../composedComps/Icon'
const Icon = wrapDemoComp(_Icon)

const IconDemo = () => {

    const renderIconCreator = group => iconName => {
        const svg = group[iconName]
        return (
            <li key={iconName}>
                <Icon svgName={svg.name} />
                <p>{iconName}</p>
            </li>
        )
    }

    const renderGroup = (groupName) => {
        const group = ICON_GROUP_MAP_MAIN[groupName]
        const renderIcon = renderIconCreator(group)
        return (
            <div className={'icon-group'} key={groupName}>
                <h4 className="icon-type-desc">{capitalize(groupName)}</h4>
                <ul className={'icon-list'} >
                    {Object.keys(group).map(renderIcon)}
                </ul>
                <Divider className="demo-block-separator" />
            </div>
        )
    }

    return <div className="demo-block icon-demo-block">
        {/*/!* ===== 0 basic ===== *!/*/}
        {/*<div>*/}
        {/*    <ul className={'icon-list'}>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgCalendar} />*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgHi} />*/}
        {/*        </li>*/}
        {/*    </ul>*/}
        {/*    <ul className={'icon-list'}>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgSignInfo} style={{color: '#4C84FF'}} />*/}
        {/*            <p>#4C84FF</p>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgSignTick} style={{color: '#39BF45'}} />*/}
        {/*            <p>#39BF45</p>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgSignExclamation} style={{color: '#F27C49'}} />*/}
        {/*            <p>#F27C49</p>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgSignCross} style={{color: '#E64552'}} />*/}
        {/*            <p>#E64552</p>*/}
        {/*        </li>*/}

        {/*    </ul>*/}
        {/*    <ul className={'icon-list'}>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgEdit} style={{fontSize: 12}} />*/}
        {/*            <p>12px</p>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgEdit} style={{fontSize: 14}} />*/}
        {/*            <p>14px</p>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgEdit} style={{fontSize: 16}} />*/}
        {/*            <p>16px</p>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgEdit} style={{fontSize: 20}} />*/}
        {/*            <p>20px</p>*/}
        {/*        </li>*/}
        {/*    </ul>*/}
        {/*    <ul className={'icon-list'}>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgLoading} spin={true} />*/}
        {/*            <p>true</p>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgLoading} spin={1.5} />*/}
        {/*            <p>1.5</p>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgLoading} spin={2} />*/}
        {/*            <p>2</p>*/}
        {/*        </li>*/}
        {/*        <li>*/}
        {/*            <Icon svg={SvgLoading} spin={3} />*/}
        {/*            <p>3</p>*/}
        {/*        </li>*/}
        {/*    </ul>*/}
        {/*</div>*/}
        {/*<Divider className="demo-block-separator" />*/}
        {/* ===== 0 basic ===== */}
        <div className="icon-group-map">
            {Object.keys(ICON_GROUP_MAP_MAIN).map(renderGroup)}
            <Icon />
        </div>
    </div>
}

export default IconDemo
