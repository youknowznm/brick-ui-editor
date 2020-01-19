/**
 * @file 统一转发文件
 * @author lzheng
 */
module.exports = [
    // 统一做的转发, 根据相应需求修改
    {test: '/success', mock: 'common/success'},
    {test: '/failure', mock: 'common/failure'},

    // 根据项目实际的 context 进行配置
    // { test: '/(.*)', replace: '/some-context/$1' },
    // { test: '/some-other-context/(.*)', replace: '/$1' },

    // 最后匹配不到的都转发到后台
    {test: '/'},
];
