import dayjs from 'dayjs';

import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';

// 这个具有全局副作用...
// 其实我也不知道合不合适... 先加了观察观察
dayjs.extend(quarterOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

export * from './exported-comps/date-picker';
export * from './exported-comps/range-picker';
