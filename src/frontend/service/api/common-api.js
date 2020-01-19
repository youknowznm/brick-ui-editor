import {post} from '@befe/utils/dev-pattern-vm/utils/ajaxAgent2';

export function getCompanySuggestService(theme, {
        queryString,
        ledgerId = '',
        limitCount = 10
    }) {
    return post(theme,
        '/oiem/setup/getCompInfo',
        {
            data: {
                inputValue: queryString,
                ledgerId: ledgerId || undefined,
                limitCount
            }
        }
    ).then(resp => {
        return resp.data.map(
            item => ({
                value: item.compCode,
                label: item.compName
            })
        );
    });
}
