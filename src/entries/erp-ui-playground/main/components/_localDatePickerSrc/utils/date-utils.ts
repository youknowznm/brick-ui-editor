import {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import {TypeLayoutItem} from '../ui-comps/types';
import {range} from '@befe/brick-utils';

export const weekTitleRow = {
    items: '一二三四五六日'
        .split('')
        .map(text => ({text}))
};

/**
 * 0 年开始, 每个区间 0 ~ 11, 12 ~ 23, ...
 *
 * @param year
 */
export function getYearRows(year: number) {
    const startYear = year - year % 12;

    return range(0, 3)
        .map(
            rowIndex => ({
                items: range(0, 2)
                    .map(
                        colIndex => {
                            const currentYear = rowIndex * 3 + colIndex + startYear;

                            return {
                                type: 'year',
                                key: currentYear,
                                text: currentYear,
                            };
                        }
                    )
            })
        );
}

export function getMonthRows(year?: number): { items: TypeLayoutItem[]; }[] {
    return range(0, 3)
        .map(
            rowIndex => ({
                items: range(0, 2)
                    .map(
                        colIndex => {
                            const monthKey = rowIndex * 3 + colIndex + 1;

                            const item: TypeLayoutItem = {
                                key: monthKey,
                                text: `${monthKey}月`,
                            };

                            if (year) {
                                item.data = {
                                    type: 'month',
                                    date: dayjs(new Date(year, monthKey - 1))
                                };
                            }

                            return item;
                        },
                    ),
            }),
        );
}

export const nonYearMonthRows = getMonthRows();

const cachedDateRows: {
    [monthKey: string]: TypeLayoutRow[]
} = {};

function getDateItem(date: Dayjs, currMonth: number): TypeLayoutItem {
    return {
        key: date.valueOf(),
        text: date.date(),
        data: {
            type: 'date',
            date: date,
            outside: date.month() !== currMonth
        }
    };
}

type TypeLayoutRow = {
    items: TypeLayoutItem[]
};

const getMonthKey = (year: number, month: number) => `${year}:${month}`;

export function getDateRows(year: number, month: number) {
    const currMonthKey = getMonthKey(year, month);

    if (cachedDateRows[currMonthKey]) {
        return cachedDateRows[currMonthKey];
    }

    const firstDateOfCurrentMonth = dayjs(new Date(year, month))
        .startOf('month');
    const currMonth = firstDateOfCurrentMonth.month();

    let dayOfFirstDate = firstDateOfCurrentMonth.day() - 1;
    dayOfFirstDate = dayOfFirstDate === -1 ? 6 : dayOfFirstDate;

    let dateValue = firstDateOfCurrentMonth
        .subtract(dayOfFirstDate, 'day');

    const rows: TypeLayoutRow[] = [];
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        const row: TypeLayoutRow = {items: []};

        rows.push(row);

        for (let colIndex = 0; colIndex < 7; colIndex++) {
            row.items.push(getDateItem(dateValue, currMonth));
            dateValue = dateValue.add(1, 'day');
        }
    }

    cachedDateRows[currMonthKey] = rows;
    return rows;
}

export function getYearList(
    highlightedYear: number,
    yearStart = 12,
    yearEnd = 12
) {
    return range(
        highlightedYear - 12,
        highlightedYear + 12
    ).map(
        year => ({text: year, key: year})
    );
}

export function getQuarterRows(year: number): TypeLayoutRow[] {
    return range(0, 3)
        .map(quarter => {
            return {
                items: [{
                    key: quarter,
                    text: `Q${quarter + 1}`,

                    data: {
                        type: 'quarter',
                        date: dayjs(new Date(year, quarter * 3))
                    }
                }],
            };
        });
}
