/**
 * @file url utils
 * @author Liang
 */

import _ from 'lodash';

import urlUtils from '@befe/utils/dev-pattern-vm/utils/urlUtils';
import startStats from '@befe/utils/lib/start-stats';
import spaErrorDetector from '@befe/utils/lib/spa-error-detector';

urlUtils.startStats = startStats;
_.extend(urlUtils, spaErrorDetector);

export const URL_CONSTS = {
    logout: '/bprouting/BpFlowRouting?logout=true'
};

export default urlUtils;
