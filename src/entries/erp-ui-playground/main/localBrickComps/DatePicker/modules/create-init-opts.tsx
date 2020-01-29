import {codeWarningOnce, isDev} from '@befe/brick-utils';

export function createInitOpts<T>(moduleName: string) {
    let innerInitOpts: T;

    return {
        get inited() {
            return !!innerInitOpts;
        },

        init(initOpts: T) {
            innerInitOpts = initOpts;
        },

        get() {
            if (isDev()) {
                codeWarningOnce(
                    !!innerInitOpts,
                    `${moduleName} 需要 init() 一下`
                );
            }

            return innerInitOpts;
        }
    };
}
