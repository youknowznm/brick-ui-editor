import * as React from 'react';
import './style.mod.scss';
import {Button} from '@befe/brick-comp-button/src/index';
import {Container, Row, Col} from '@befe/brick';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

interface Renderable {
    render: () => React.ReactElement
}

type SearchPanelOptionsModel = {
    fieldConfig: {
        colSpan: number
        config: {
            [propName: string]: {
                label: string
                component: Renderable
            }
        }
        order: string[][]
    }
    onSearch: () => void
    onReset: () => void
}
let forTypeSearchPanelOption: SearchPanelOptionsModel;

export function createSearchPanel() {
    const rawContext: typeof forTypeSearchPanelOption.fieldConfig = {
        colSpan: 8,
        config: {},
        order: [],
    };
    let onSearch: typeof forTypeSearchPanelOption.onSearch = (): void => {
    };
    let onReset: typeof forTypeSearchPanelOption.onReset = (): void => {
    };
    const UICol = observer((props: {
        label: string
        component: Renderable
    }) => {
        return <Col span={rawContext.colSpan}>
            <div styleName="col-wrapper">
                <div styleName="col-label">
                    {props.label}
                </div>
                <div styleName="col-content">
                    {props.component.render()}
                </div>
            </div>
        </Col>;
    });
    const UIRow = observer((props: {
        config: typeof forTypeSearchPanelOption.fieldConfig
        keyList: string[]
    }) => {
        return <Row>
            {props.keyList.map(
                key => {
                    const configItem = props.config.config[key];
                    if (!configItem) {
                        return;
                    }
                    return <UICol
                        key={key}
                        label={configItem.label}
                        component={configItem.component}
                    />;
                }
            )}
        </Row>;
    });
    const UIFormItem = observer((
        props: {
            config: typeof forTypeSearchPanelOption.fieldConfig
        }
    ) => {
        const {config} = props;
        return <Container>
            {config.order.map(
                (keyList, index) => {
                    return <UIRow
                        key={index}
                        config={props.config}
                        keyList={keyList}
                    />;
                }
            )}
        </Container>;
    });
    return {
        init(opts: SearchPanelOptionsModel) {
            Object.assign(rawContext, opts.fieldConfig);
            onSearch = opts.onSearch;
            onReset = opts.onReset;
        },
        render() {
            return (
                <div styleName="search-panel-container">
                    <UIFormItem
                        config={rawContext}
                    />
                    <div styleName="search-panel-button">
                        <Button
                            type='important'
                            onClick={onSearch}
                        >
                            查询
                        </Button>
                        <Button
                            type='plain'
                            onClick={onReset}
                        >
                            重置
                        </Button>
                    </div>
                </div>
            );
        }
    };
}
