/**
 * @file index.js
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2018/11/9
 *
 */
import {
    urlsync,
    BaseModel,
    observable,
    bindView as bind,
    h
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import View from './View';

@bind(View)
export default class Demo extends BaseModel {
    static demoPageKey = 'textarea-no-scroll/base';
    static demoPageName = 'TextareaNoScroll';

    @observable value = 'initial'
}
