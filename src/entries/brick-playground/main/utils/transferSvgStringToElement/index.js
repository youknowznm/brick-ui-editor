import * as React from 'react'
import {ICON_GROUP_MAP_MAIN} from '@befe/brick-icon/src/main/group-map'

const transferSvgStringToElement = string => {
    let svg = null
    for (let groupKey in ICON_GROUP_MAP_MAIN) {
        let group = ICON_GROUP_MAP_MAIN[groupKey]
        for (let iconKey in group) {
            let icon = group[iconKey]
            if (icon.name === string) {
                svg = icon
                break
            }
        }
    }
    return svg
}

export default transferSvgStringToElement
