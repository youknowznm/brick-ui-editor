import {action} from 'mobx';
import * as React from 'react';
import {Pagination, PaginationProps} from "@befe/brick";

export function initPagination(
    paginationProps: PaginationProps,
    onChange: () => void
): {
    render: () => React.ReactElement
} {
    const changePageNum = action((pageNum: number): void => {
        paginationProps.pageNum = pageNum;
        onChange();
    });
    const changePageSize = action((pageSize: number): void => {
        paginationProps.pageSize = pageSize;
        onChange();
    });

    return {
        render(): React.ReactElement {
            return <Pagination
                onChangePageNum = {changePageNum}
                onChangePageSize={changePageSize}
                {...paginationProps}
            />
        }
    }
}
