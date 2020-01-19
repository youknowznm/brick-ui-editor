/**
 * @file url utils
 * @author Liang
 */

// '/travel'
// const MAP_CONTEXT = '';
const MAP_CONTEXT = window.APP_CONTEXT_TRAVEL;
// '/personal-service';
const PERSONAL_CONTEXT = window.APP_CONTEXT_PERSONAL;

const URL_CONST = {
    // 首页初始化, 查询卡片
    homeInit: MAP_CONTEXT + '/home_page/init',

    // 打车流程初始化数据
    orderInit: MAP_CONTEXT + '/order/page_init/{scene_type}',

    // 打车服务支持情况
    supportService: MAP_CONTEXT + '/order/support_service',

    // 智能目的地
    intelligent: MAP_CONTEXT + '/order/intelligent',

    // 车费预估
    farePrediction: MAP_CONTEXT + '/order/query_fare_prediction',

    // 下单
    order: MAP_CONTEXT + '/order/post_order',

    // 取消订单
    cancelOrder: MAP_CONTEXT + '/order/cancel_order',

    // 订单状态
    orderStatus: MAP_CONTEXT + '/order/order_status',

    // 司机位置
    driverLocation: MAP_CONTEXT + '/order/driver_location',

    // 订单提示信息
    travelMessage: MAP_CONTEXT + '/order/travel_message',

    // 订单详情
    orderDetail: MAP_CONTEXT + '/order/order_detail/{order_no}',

    // 确认订单
    feeConfirm: MAP_CONTEXT + '/order/feeConfirm',

    // 司机评价
    evaluateDriver: MAP_CONTEXT + '/order/evaluateDriver',

    // 联系客服
    customerService: MAP_CONTEXT + '/order/customerService',

    /** ********** 以下为个人中心URL配置 *************** */
    // 个人信息
    userInfo: PERSONAL_CONTEXT + '/personal/showUser',

    // 验证、修改手机号码
    modifyPhone: PERSONAL_CONTEXT + '/personal/modifyTel',

    // 设置公司/家的地址信息
    modifyAddressInfo: PERSONAL_CONTEXT + '/personal/modifyInfo',

    // 删除公司/家的地址
    deleteAddress: PERSONAL_CONTEXT + '/personal/modifyInfo',

    // 费用异议内容列表
    feesComplaintSet: MAP_CONTEXT + '/order/feeComplaintSet',

    // 费用异议
    feeComplaint: MAP_CONTEXT + '/order/feeComplaint',

    // 行程记录列表
    tripRecord: PERSONAL_CONTEXT + '/personal/trip',

    // 行程记录title中选择的订单类型（商务用车、专车）
    orderType: PERSONAL_CONTEXT + '/personal/orderTypes',

    // 手机验证码
    verificationCode: PERSONAL_CONTEXT + '/personal/buildCode',

    // 问题列表
    questions: PERSONAL_CONTEXT + '/personal/showQuestions',

    // 安全中心紧急联系人展示
    showContacts: PERSONAL_CONTEXT + '/personal/showContracts',

    // 添加、管理紧急联系人
    modifyContacts: PERSONAL_CONTEXT + '/personal/modifyContracts',

    // 删除紧急联系人
    deleteContacts: PERSONAL_CONTEXT + '/personal/delContracts',

    // 最后一行占位行
    occupyingRow: ''
};

export default URL_CONST;
