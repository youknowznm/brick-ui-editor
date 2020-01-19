/**
 * @file: i18n
 * @author: Cuttle Cong
 * @date: 2018/1/22
 * @description:
 */
import {transaction} from '@befe/utils/i18n/easy-i18n';
import agent from './ajax-agent';

export default from '@befe/utils/i18n/easy-i18n';

if (transaction && process.env.NODE_ENV === 'development') {
    transaction.on('error', err => {
        console.error(err);
        alert(err.toString());
    });
    transaction.setConfig({
        // async fetchLangInfo(data) {
        // },
        async fetchAuth() {
            const res = await agent.get('/_/i18n_edit_live/auth');
            if (res.code !== 200) {
                throw new Error('no-auth');
            }

            // throw new Error('no-auth')
        },
        async fetchUpdate({
                id,
                value,
                lang,
                source
            }) {
            console.log('source', source);
            const options = {
                data: {id, value, lang, module: global.COMPONENT_KEY}
            };
            const res = await agent.get('/_/i18n_edit_live/update', options);
            if (res.code !== 200) {
                throw new Error('update `' + id + '`error: ' + res.data);
            }

        },
        async fetchLangInfo(req) {
            // if (i18n.getLang().lang.replace(/_/g, '-') !== req.lang) {
            const options = {
                data: {...req, module: global.COMPONENT_KEY}
            };
            const res = await agent.get('/_/i18n_edit_live/get', options);
            if (res.code !== 200) {
                return false;
                // throw new Error('get `' + req.id + '`error: ' + res.data)
            }

            return res.data;

            // }
            // return false
        }
    });
}
