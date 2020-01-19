/**
 * @file APP_NAME
 * @author YOURNAME
 */

import {
    start,
    i18n
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import 'frontend/wrapper/erp-pc';
import '../wrapper';

import '../style.less';

import AppVM from '../AppVM';
import {generateUIDemoSitemap} from '../generate-ui-demo-sitemap';

import routes, {menu} from '@befe/erp-comps/v2/gallery/routes';

const appVM = new AppVM({
    appViewName: 'ui-demo-shared'
});

const siteMap = generateUIDemoSitemap(menu, 'shared');

appVM.layoutModel.setSiteMap(
    siteMap
);

// no i18n
// i18n.load()
//     .then(() => start(routes, appVM));

start(routes, appVM);
