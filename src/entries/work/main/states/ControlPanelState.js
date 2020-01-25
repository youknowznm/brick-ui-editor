import * as React from 'react';
import {c} from 'classnames';
import {toJS, computed, observable, action} from 'mobx';
import {observer} from 'mobx-react';

export default class State extends BaseModel {

    // 编辑中标识
    @observable editingFlag = false;

    // 请求中标识
    @observable loadingFlag = false;
}
