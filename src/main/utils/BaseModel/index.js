// 复用 matriks2 utils 的 BaseModel

import {action} from 'mobx';

const _setProps = action((target, props) => {
  if (!props) {
    return;
  }

  Object.assign(target, props);
});

export default class BaseModel {
  setProps(props) {
    _setProps(this, props);
    return this;
  }
}