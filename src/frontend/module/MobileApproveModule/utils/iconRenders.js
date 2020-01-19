import {
    h
} from '@befe/utils/dev-pattern-vm/index-mobile';

function getIconRenderer(type, src) {
    return ({props = {}} = {}) => {
        return h.span(`icon-${type} mobile-icon`, props,
            h.img({
                src
            })
        );
    };
}

export default {
    arrowBlueDown: getIconRenderer('arrow-blue-down', require('../image/icon/arrow-blue-down.svg')),
    arrowBlueUp: getIconRenderer('arrow-blue-up', require('../image/icon/arrow-blue-up.svg')),
    arrowBlueRight: getIconRenderer('arrow-blue-right', require('../image/icon/arrow-blue-right.svg')),
    arrowGreyRight: getIconRenderer('arrow-grey-right', require('../image/icon/arrow-grey-right.svg')),
    checkboxChecked: getIconRenderer('checkbox-checked', require('../image/icon/checkbox-checked.svg')),
    checkboxDisabled: getIconRenderer('checkbox-disabled', require('../image/icon/checkbox-disabled.svg')),
    checkboxUnchecked: getIconRenderer('checkbox-unchecked', require('../image/icon/checkbox-unchecked.svg')),
    deleteIcon: getIconRenderer('delete-icon', require('../image/icon/delete-icon.svg'))
};
