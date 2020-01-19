import {post} from '@befe/utils/dev-pattern-vm/utils/ajaxAgent2';

export function getTestDataService(theme, personId, options) {
    return post(
        theme,
        '/get-test-data',
        {
            data: {personId},
            ...options
        }
    );
}
