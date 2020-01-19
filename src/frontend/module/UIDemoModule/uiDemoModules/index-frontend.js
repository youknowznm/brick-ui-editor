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

import getRoutes from '../getRoutes';
import AppVM from '../AppVM';
import {generateUIDemoSitemap} from '../generate-ui-demo-sitemap';

const routes = getRoutes([
    require.context('frontend', true, /\/_?demo(-[\w-]*)?\/index\.js$/)
]);

const appVM = new AppVM({
    appViewName: 'ui-demo-frontend'
});

appVM.layoutModel.setSiteMap(
    generateUIDemoSitemap(routes.menu, 'frontend')
);

// with i18n
i18n.load()
    .then(() => start(routes, appVM));

// start(routes, appVM);
