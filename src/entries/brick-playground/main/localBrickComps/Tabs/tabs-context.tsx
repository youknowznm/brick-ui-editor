import * as React from 'react'

export type TabPaneId = string | number

export interface TabsContextValue {
    activeId?: TabPaneId | null
}

export const TabsContext = React.createContext<TabsContextValue>({})
