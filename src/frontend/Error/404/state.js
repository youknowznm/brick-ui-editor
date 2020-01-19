/**
 * @file 页面状态
 * @author YOURNAME
 */

import {
    extendObservable,
    computed,
    observable,
    action
} from 'mobx';
import _ from 'lodash';

import agent from 'utils/ajax-agent';

export default class PageState {
    @observable initialized = false

    @action
    setStates(states) {
        for (let key in states) {
            if (states.hasOwnProperty(key)) {
                this[key] = states[key];
            }

        }
    }

    init() {
        this.setStates({
            initialized: true
        });
    }

    exit() {}
}
