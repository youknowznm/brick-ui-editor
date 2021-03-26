import * as React from 'react';
export declare type TabPaneId = string | number;
export interface TabsContextValue {
    activeId?: TabPaneId | null;
}
export declare const TabsContext: React.Context<TabsContextValue>;
