import {observable} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import {ERPLayoutModel} from '../ERPLayoutVM/ERPLayoutModel';
import {pcNormalAgentTheme} from 'frontend/service/agent-theme/pc-normal-agent-theme';
import {pcNormalUrlUtils} from 'frontend/utils/url-utils/pc-normal-url-utils';
import {SITE_MAP} from './site-map';
import {SHOW_SIDE_MENU, SHOW_HEAD_MENU, SHOW_BREAD_CRUMB} from '../ERPLayoutVM/ERPLayoutModel/layout-consts';

export default class CommonLayoutModel extends ERPLayoutModel {
    agentTheme = pcNormalAgentTheme;
    urlUtils = pcNormalUrlUtils;
    defaultShowOnList = [
        SHOW_SIDE_MENU,
        SHOW_BREAD_CRUMB
    ];
    @observable logoInfo = {
        erpUrl: '/',
        homeUrl: '#/index',
        subTitle: '子系统'
    };
    @observable customProfileMenu = [
        {
            key: 'logout',
            text: _i('header_menu_logout'),
            onClick: e => this.logout()
        }
    ];

    constructor(props) {
        super(props);
        this.setSiteMap(SITE_MAP);
    }
}
