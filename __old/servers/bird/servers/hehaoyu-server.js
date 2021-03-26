process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //  <------ 使用8050时要加上这行，忽略https的证书

const passwordSuffix = {
    8010: 'by1t',
    8030: 'Most3FDA',
    8050: 'pp5x',
    8070: 'xx7y'
};

let loginUser = 'fengjunhui'; // 登录用户
// loginUser = 'xieyiqiu'
// loginUser = 'chengxuanfeng'

function loginInfo(user, suffix) {
    let loginCode = {};
    loginCode[user] = user + suffix;
    return loginCode;
}

const server8070 = {
    server: 'http://fssc.dev.weiyun.baidu.com:8819/',
    plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, passwordSuffix['8070']),
    reloginSeq: 35
};

const hehaoyuServer8050 = {
    server: 'http://fssc.dev.weiyun.baidu.com:8819/',
    reloginSeq: 35,
    cookie: 'BAIDUID=9C3745104D916602B010E595663B2C5E:FG=1; BIDUPSID=9C3745104D916602B010E595663B2C5E; PSTM=1564994168; MCITY=-131%3A; BDSFRCVID=cAFOJeCin6dmEPvwgWUPtBWfymKK0gvTH6eC7uab42g8ca4quazlEG0P_x8g0KubPEBeogKK0mOTHv-F_2uxOjjg8UtVJeC6EG0Ptf8g0f5; H_BDCLCKID_SF=tRk8oIL2fIvMqRjnMPoKq4u_KxrXb-uXKKOLVh7yX-OkeqOJ2Mt5M4tFDptJb4RGJC3tBM7aKKj-8xTF-nrF2jtpeGtft6_DJRusL-35HDKWKROvhjRkj4PgyxomtjjC52TjKPQ5tlRaq-bt3PjBhqKO5t5XLUkqKCOH-CQayIoDsRTyQJbmQhLRQttjQPThfIkja-KEB4JHob7TyU42hf47yhDL0q4Hb6b9BJcjfU5MSlcNLTjpQT8r5MDOK5OuJRLHVCDbtD0WhDv65nt_-tFX-xTaetJXfK7CKq7F5lOEDCQghfom5R-s3noT-UjU5j5LahkM5-QxOKQNLTJh-tj3DxtO5-_J-6TKXJRN3KJm_PP9bT3v5tDrQt5-2-biWbRL2Mbdbj6P_IoG2Mn8M4bb3qOpBtQmJeTxoUJ25DnJhbLGe4bK-Tr0jGKH3S; BDUSS=DBNM0ZPczN2b1dkZ3JEQ2JDdVZBVTlZelowfkh1aHdvMzdJMklhQ05OWlFpaHBlRVFBQUFBJCQAAAAAAAAAAAEAAAArgSdL18~S7di8w6jB-gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFD98l1Q~fJdV; UUAP_P_TOKEN=PT-413292437407219713-cSgC9OmVNR-uuap; H_PS_PSSID=1429_21094_30210_30284_26350; delPer=0; UUAP_P_TOKEN_OFFLINE=PT-414819543001608193-i7Es8dTr7a-erp8050; accToken=lbEgPvPicCJPShicW17MpiqQx9qHnr4dqwCZ/I/9sfg-153347-mcu3gn0P0X4XM3JhJML0dejd2gdqDItCrNaZsS2QJ6u2RbtpQPXip1FejSJlT7Gc; fssc-8050Uss=lbEgPvPicCJPShicW17MpiqQx9qHnr4dqwCZ/I/9sfg-153346-XdvDyHAbDEsJIlVZFHaRp9YAk5e4OvFOrmpz3vVOtrFiCc5mmiWxlJAS1JIKIFLM; eapSassVisitUrl=http://fssc.dev.weiyun.baidu.com:8819/'
}

module.exports = hehaoyuServer8050;
