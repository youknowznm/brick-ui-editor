/**
 * @file APP_NAME
 * @author YOURNAME
 */

import initer, {isDevMode} from 'common/react-mobx-initer';

// 项目全局 less
import 'common/style/main.less';
import './style.less';

import routes from './routes';
import AppState from './state';

const app = new AppState();

function start() {
    initer.initApp(
        routes,
        {
            app
        }
    );
}
app.initGlobal();
start();
if (isDevMode && module.hot) {
    module.hot.accept('./routes', start);
}
