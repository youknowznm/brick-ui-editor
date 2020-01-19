/**
 * 一些全局性质的 service
 * 根据项目具体定义
 * */

import {post} from '@befe/utils/dev-pattern-vm/utils/ajaxAgent2';
import {i18n} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import agent from '@befe/utils/lib/ajax-agent';

/**
 * 获取 user context
 * */
export function fetchUserInfoService(theme) {
    // 从 bprouting 获取 user context
    return post(
        theme,
        '/bprouting/rest/api/user/context',
        {
            isRawURL: true
        }
    ).then(resp => {
        const rawData = resp.data;
        if (!rawData || resp.code !== '200') {
            return {
                rawData: {}
            };
        }

        const data = {
            ...rawData,
            // companyKey: rawData.companyKey,
            // departmentCode: rawData.departmentCode,  // bprouting user context 暂无 departmentCode
            departmentName: rawData.employeeDepartmentName,

            // email: rawData.emailAddress, // bprouting user context 暂无 emailAddress
            fullName: rawData.employeeName,
            avatarUrl: rawData.employeeWorkPhoto,

            employeeNumber: rawData.employeeNumber,
            userAccount: rawData.adUserName
        };
        return data;
    });
}

export function fetchPermissionsService() {
    return Promise.resolve([]);
}

export function logoutService() {
    return Promise.resolve('/bprouting/BpFlowRouting?logout=true');
}

const backendLangCodeMap = {
    'zh-CN': 'ZHS',
    'en-US': 'US'
};

export function switchLanguageService(theme, langCode) {
    const backendLangCode = backendLangCodeMap[langCode] || 'ZHS';
    const erpSwitchLangFetcher = post(
        theme,
        '/user/swith_language?locale=' + backendLangCode,
        {
            isRawURL: true
        }
    );

    // document.cookie = `contract_management_locale=${lang};path=/`;
    i18n.tellBackendSwitch(backendLangCode, erpSwitchLangFetcher);
}

export function fetchLanguageInfoService() {
    return Promise.resolve();
}
