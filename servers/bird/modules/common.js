/**
 * @file 统一转发文件
 * @author lzheng
 */
module.exports = [
    // 统一做的转发, 根据相应需求修改
    {test: '/success', mock: 'common/success'},
    {test: '/failure', mock: 'common/failure'},
    // {test: '/api-context/(.*)', replace: '/$1'},
    {test: '/'},

    /** 用户组 **/
    // {test: '/user_group/queryList', mock: 'common/system/user-group-list'},
    // {test: '/user_group/init', mock: 'common/system/user-group-configure-list'},
    /** 数据权限管理 **/
    // {test: '/data_auth/view', mock: 'common/system/data-authority-management-list'},
    // {test: '/data_auth/operation', mock: 'common/system/data-authority-management-list'},
];
