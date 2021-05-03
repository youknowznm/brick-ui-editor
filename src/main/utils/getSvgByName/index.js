import * as React from 'react'
import {ICON_GROUP_MAP_MAIN} from '../ICON_GROUP_MAP'

const getSvgByName = string => {
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
