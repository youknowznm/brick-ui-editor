import React, { useState } from 'react';
import './style.mod.scss'
import { Container, Row, Col, Input, Select, Button, Link } from '@befe/brick'
import { observable } from 'mobx'
interface ControlProps {
    name: string;
    type: string;
    label: string;
    props?: any;
}
interface SearchPanelProps {
    /**
     * field数据
     */
    field: ControlProps[]
    /**
     * 查询回调
     */
    onSearch: (val: ControlProps | {}) => void
}
interface SearchPanelState {
    /**
     * render数组
     */
    fieldArr: any
    /**
     * 存储控件的值
     */
    fieldValue: { [propName: string]: string;}
}
class SearchPanel extends React.PureComponent<SearchPanelProps, SearchPanelState> {
    cacheFieldValue:any = {}
    state = {
        fieldArr: [],
        fieldValue: {}
    }
    componentDidMount() {
        this.adaptFieldValue(this.props.field)
    }
    adaptFieldValue(fields: ControlProps[], num: number = 3) {
        let len = fields.length;
        let rowNum = len % num === 0 ? len / num : Math.floor((len / num) + 1);
        let res = [];
        for (let i = 0; i < rowNum; i++) {
            let temp = fields.slice(i * num, i * num + num);
            res.push(temp);
        }
        this.setState({
            fieldArr: res
        })
        return res;
    }
    handleChange(obj: ControlProps, e: React.FormEvent<HTMLInputElement>) {
        if (obj.type === 'Input') {
            this.cacheFieldValue[obj.name] = (e.target as HTMLInputElement).value
        }
        if (obj.type === 'Select') {
            this.cacheFieldValue[obj.name] = e
        }
        this.setState({
            fieldValue: {
                ...this.cacheFieldValue,
            }
        })
    }
    handleClick() {
        this.props.onSearch(this.state.fieldValue);
    }
    resetValue() {
        let resetObj: { [propName: string]: string; } = {};
        this.cacheFieldValue = {};
        for(let id in this.state.fieldValue) {
            resetObj[id] = '';
        }
        this.setState({
            fieldValue: resetObj
        })
    }
    renderCol(obj: ControlProps) {
        switch(obj.type) {
            case 'Input': return <Col span={8} key={obj.name}>
                <div styleName="col-wrapper">
                    <div styleName="col-label">{obj.label}</div><Input onChange={this.handleChange.bind(this, obj)} {...obj.props}/>
                </div>
            </Col>;
            case 'Select': return <Col span={8} key={obj.name}>
                <div styleName="col-wrapper">
                    <div styleName="col-label">{obj.label}</div><Select onChange={this.handleChange.bind(this, obj)} {...obj.props}/>
                </div>
            </Col>;
        }
    }
    render() {
        return (
            <div styleName="search-panel-container">
                <Container>
                    {this.state.fieldArr.map((item:[], index)=><Row key={index}>
                        {item.map((obj: ControlProps) => this.renderCol(obj))}
                    </Row>)}
                </Container>
                <div styleName="search-panel-button">
                    <Button type={'important'} onClick={this.handleClick.bind(this)}>查询</Button>
                    <Button type={'plain'} onClick={this.resetValue.bind(this)}>重置</Button>
                </div>
            </div>
        )
    }
};
export default SearchPanel;
