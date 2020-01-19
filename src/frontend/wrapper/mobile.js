/**
 * @file MobileApproveModuleModule 业务模块的 imports wrapper 入口
 * @author lzheng
 * @date 2018-08-02
 */

import i18n from '@befe/utils/i18n/easy-i18n-approval';

// =============== common =============
export { default as React, Component } from 'react';

// =============== Mobile related =============
export mobileApprovalUtils from 'frontend/utils/mobile-approval-utils';

// =============== APP ================
export agent from 'frontend/utils/ajax-agent';
export urlUtils, { URL_CONSTS } from 'frontend/utils/url-utils';

export iconRenders from '../module/MobileApproveModule/utils/iconRenders';

export { i18n };

i18n.loadLang(
    {
        zh: require('../module/MobileApproveModule/i18n-approval/zh').default,
        en: require('../module/MobileApproveModule/i18n-approval/en').default
    }
);
