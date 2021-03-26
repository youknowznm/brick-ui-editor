import {Dayjs} from 'dayjs';

export type TypeActionLink = {
    key: string
    text: string
    onClick: () => void
};
export type TypeDatePickerMode = 'date' | 'month' | 'quarter';
export type TypePickerSize = 's' | 'm';
export type TypeDateValue = Date | Dayjs | null;
export type TypePickerStatus = 'normal' | 'error';
