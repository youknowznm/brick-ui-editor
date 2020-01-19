/**
 * @file APP_NAME 用于
 * @author YOURNAME
 */

import {observable, action} from 'mobx';
import GlobalState from 'common/react-mobx-initer/global-state';

export default class AppState extends GlobalState {
    constructor(props) {
        super(props);
    }

    /**
     * 业务模块代码
     */
    @action
    setStates(states) {
        for (let key in states) {
            if (states.hasOwnProperty(key)) {
                this[key] = states[key];
            }

        }
    }
}
