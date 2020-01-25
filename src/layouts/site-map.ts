import * as React from 'react'
import {SITE_MAP_SYSTEM} from 'src/entries/system/site-map'
import {SITE_MAP_OPERATION} from 'src/entries/operation/site-map'
export interface SiteNode {
    /**
     * 权限 key，不是必须的，没有则会调过权限校验
     */
    permissionKey?: string

    /**
     * 显示名称
     */
    label?: string | React.ReactNode

    /**
     * 站内资源 path
     */
    path?: string

    /**
     * 站内资源所属模块
     */
    entry?: string

    /**
     * 站外资源地址
     */
    url?: string

    /**
     * 子项
     */
    children?: SiteNode[]
}

export const PAGE_ERP_HOME = {
    title: () => 'ERP 首页',
    // 走全局配置
    url: '',
}

export const PAGE_HOME = {
    title: () => '首页',
}

export const SITE_MAP: SiteNode = {
    children: [
        SITE_MAP_OPERATION,
        SITE_MAP_SYSTEM,
    ],
}
