import React, {ReactNode} from 'react';
import {Container, Row, Col} from '@befe/brick-comp-grid/src/index'
import {observer} from "mobx-react";
import {MySection} from '../section';

import './style.mod.scss'

export interface TypeFormFieldSet {
    [fielName: string]: typeConfig
}

export interface TypeMyFormProps {
    fieldSet: TypeFormFieldSet
    fieldsOrder: Array<string[]>
    sectionTitle?: string,
    colSpan?: number
}

type typeConfig = {
    label: string
    component: any
    colSpan?: number,
    required?: boolean
}

@observer
export class MyForm extends React.Component<TypeMyFormProps, {}> {
    getColSpan(fieldName: string): number {
        const config = this.props.fieldSet[fieldName];
        if (config.colSpan) {
            return config.colSpan
        } else if (this.props.colSpan) {
            return this.props.colSpan
        }
        else {
            return 8
        }
        // return config.colSpan ? config.colSpan : 8
    }

    renderForm(): ReactNode {
        const fieldSet = this.props.fieldSet;
        return (
            <div styleName='my-form'>
                <Container>
                    {
                        this.props.fieldsOrder.map((row: string[], rowIdx: number): ReactNode => {
                            return (
                                <Row key={`row-${rowIdx}`}>
                                    {
                                        row.map((fieldName: string, colIdx: number): ReactNode => {
                                            return (
                                                <Col
                                                    span={this.getColSpan(fieldName)}
                                                    key={`col-${rowIdx}-${colIdx}`}
                                                >
                                                    <div styleName='my-form-label'>
                                                        {fieldSet[fieldName].required ? <span styleName='required-icon'>*</span> : ''}
                                                        <label>
                                                            {this.props.fieldSet[fieldName].label}
                                                        </label>
                                                    </div>
                                                    <div styleName='my-form-display'>
                                                        {
                                                            this.props.fieldSet[fieldName].component.render
                                                                ? this.props.fieldSet[fieldName].component.render()
                                                                : this.props.fieldSet[fieldName].component

                                                        }
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            )
                        })
                    }
                </Container>
            </div>
        )
    }

    renderSectionForm(): ReactNode {
        return (
            <MySection title={this.props.sectionTitle!}>
                {this.renderForm()}
            </MySection>
        )
    }

    render(): ReactNode {
        return (
            this.props.sectionTitle ? this.renderSectionForm() : this.renderForm()
        )
    }
}
