import * as React from 'react'
import {ICON_GROUP_MAP_MAIN} from '@befe/brick-icon/src/main/group-map'

const getSvgByName = string => {
    if (typeof string !== 'string') {
        return string
    }
    if (string === '') {
        return null
    }
    for (let groupKey in ICON_GROUP_MAP_MAIN) {
        let group = ICON_GROUP_MAP_MAIN[groupKey]
        for (let iconKey in group) {
            let icon = group[iconKey]
            if (icon.name === string) {
                return icon
            }
        }
    }
    return null
}

export default getSvgByName
