/**
 * @file APP_NAME 用于
 * @author YOURNAME
 */

import {
    BaseAppView,
    BaseModel,
    bindView,
    observable,
    computed,
    action
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import {ERPLayoutModel} from '../../layout/ERPLayoutVM/ERPLayoutModel/ERPLayoutModel';
import {pcNormalUrlUtils} from '../../utils/url-utils/pc-normal-url-utils';
import {pcNormalAgentTheme} from 'frontend/service/agent-theme/pc-normal-agent-theme';

@bindView(BaseAppView)
export default class AppVM extends BaseModel {
    @observable appViewName = 'ui-demo'
    @observable menu;

    @observable layoutModel;

    @action
    initProps() {
        this.layoutModel = new ERPLayoutModel({
            shouldShowSidebar: true,
            isSidebarCollapsed: false,
            shouldCheckPermission: false,

            urlUtils: pcNormalUrlUtils,
            agentTheme: pcNormalAgentTheme,

            logoInfo: {
                erpUrl: '',
                homeUrl: '',
                subTitle: 'UIDemo'
            }
        });
    }

    constructor(initProps, syncProps) {
        super(undefined, syncProps);
        this.setProps(initProps);
        this.initProps();
    }

    updateCurrentPage(props) {
        this.layoutModel.setCurrentPage(
            this.appViewName,
            props.location.pathname,
            props.location.query,
        );
    }

    init(props) {
        this.updateCurrentPage(props);
    }

    update(props) {
        this.updateCurrentPage(props);
    }
}
