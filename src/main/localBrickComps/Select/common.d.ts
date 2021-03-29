import { MenuItemId } from '@befe/brick-comp-menu';
import { SelectOptionGroupProps } from './option-group';
export declare type OptionValue = MenuItemId;
export interface OptionObject {
    value: OptionValue;
    label: string;
    disabled?: boolean;
    type?: SelectOptionGroupProps['type'];
    children?: OptionObject[];
}
export declare type SelectValue = null | OptionValue | OptionValue[] | OptionObject | OptionObject[];
