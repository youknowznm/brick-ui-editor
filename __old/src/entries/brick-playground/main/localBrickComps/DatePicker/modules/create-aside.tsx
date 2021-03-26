import {InnerDatePicker} from '../inner-comps/inner-date-picker';
import {createRef} from './create-ref';
import {UiAside} from '../ui-comps/ui-aside';
import {getYearList} from '../utils/date-utils';
import * as React from 'react';

export function createAside(
    comp: InnerDatePicker,
    opts: {
        displayProp: 'displayedDate' | 'zoomedDisplayedDate'
    }
) {
    const {displayProp} = opts;

    const asideRef = createRef<UiAside>();

    const context = {
        yearAnchor: 0
    };

    function getDisplayed() {
        return comp.state[displayProp]!;
    }

    function handleYearChange(year: string | number) {
        // @ts-ignore
        comp.setState({
            [displayProp]: getDisplayed().year(~~year)
        });
    }


    function syncAsideScroll() {
        comp.actionQueue.pushAction(
            () => {
                if (asideRef.elem) {
                    asideRef.elem.scrollToItem(
                        getDisplayed().year()
                    );
                }
            }
        );
    }

    function setYearRangeAnchor(yearAnchor: number) {
        context.yearAnchor = yearAnchor;
    }

    return {
        setYearRangeAnchor,
        syncAsideScroll,

        render() {
            const displayedYear = getDisplayed().year();
            return <UiAside
                itemKeySelected={displayedYear}

                asideItems={
                    getYearList(
                        context.yearAnchor,
                        comp.props.yearStart,
                        comp.props.yearEnd,
                    )
                }

                onChange={handleYearChange}
                ref={asideRef.ref}
            />;
        },

        extendApi<T>(api: T) {
            return Object.assign(api, {
                setYearRangeAnchor,
                syncAsideScroll,
            });
        }
    };
}
