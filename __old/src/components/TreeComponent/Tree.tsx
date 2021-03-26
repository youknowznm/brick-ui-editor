/**
 * @file Tree
 * @author v_wuchangdong
 * @owner 2019-11-27
 */
import * as React from 'react';
import { convertTreeToEntities } from './util';

export type Entity = {
    key: string
    childKey: Array<string>
    parentKey: string | null
}

export type KeyEntities = {
    [treeNodeKey: string]: Entity;
}

export type CheckEvent = {
    checked: boolean
    checkedKey: string
    event: Element
}

export interface TreeProps {

    children?: Array<React.ReactElement> | React.ReactElement

    checkable?: boolean

    defaultCheckedKeys?: Array<string>

    defaulthalfCheckedKeys?: Array<string>

    defaultExpandedKeys?: Array<string>

    defaultActiveKey?: string

    onCheck?: (halfCheckedKeys: Array<string>, checkedKeys: Array<string>, checkEvent: CheckEvent) => void

    onSelect?: (activeKey: string) => void
}

export interface TreeState {

    halfCheckedKeys: Array<string>

    checkedKeys: Array<string>

    expandedKeys: Array<string>

    treeNodes?: Array<React.ReactElement>

    keyEntities: KeyEntities

    activeKey?: string
}

export class Tree extends React.PureComponent<TreeProps, TreeState> {
    static defaultProps = {
        checkable: false,
        defaultCheckedKeys: [],
        defaulthalfCheckedKeys: [],
        defaultExpandedKeys: [],
        defaultActiveKey: ''
    }

    constructor(props: TreeProps) {
        super(props);

        this.state = ({
            halfCheckedKeys: [],
            checkedKeys: [],
            expandedKeys: [],
            keyEntities: {},
            activeKey: ''
        });
    }

    static getDerivedStateFromProps(props: TreeProps, state: TreeState) {
        function shouldSetState(name: string) {
            return !(name in state);
        }

        if (shouldSetState('treeNodes')) {
            const { children } = props;
            let treeNodes: Array<React.ReactElement> = [];
            const newState: TreeState = {
                ...state,
                ...props
            };

            if (Array.isArray(children)) {
                treeNodes = children;
            }
            else if (children) {
                treeNodes.push(children);
            }
            newState.treeNodes = treeNodes;

            const entities: KeyEntities = {};
            treeNodes.forEach(item => {
                convertTreeToEntities(item, item.props.nodeKey, entities, null);
            });
            newState.keyEntities = entities;
            return newState;
        }
        return null;
    }

    renderTreeNode = (child: React.ReactElement, key: string) => {
        return React.cloneElement(child, {
            key,
            nodeKey: key,
            treeLevel: 0,
            activeKey: this.state.activeKey,
            checkable: this.props.checkable,
            isHalfChecked: this.state.halfCheckedKeys.includes(key),
            isChecked: this.state.checkedKeys.includes(key),
            isExpanded: this.state.expandedKeys.includes(child.props.nodeKey),
            halfCheckedKeys: this.state.halfCheckedKeys,
            checkedKeys: this.state.checkedKeys,
            expandedKeys: this.state.expandedKeys,
            keyEntities: this.state.keyEntities,
            onCheck: this.handleCheck,
            onSelect: this.handleSelect,
            updateExpanded: this.updateExpanded,
            isSingle: !('children' in child.props)
        });
    }

    handleCheck = (halfCheckedKeys: Array<string>, checkedKeys: Array<string>, checkEvent: CheckEvent) => {
        const { onCheck } = this.props;
        this.setState({
            halfCheckedKeys,
            checkedKeys
        });
        onCheck && onCheck(halfCheckedKeys, checkedKeys, checkEvent);
    }

    handleSelect = (activeKey: string) => {
        const { onSelect } = this.props;
        this.setState({
            activeKey
        });
        onSelect && onSelect(activeKey);
    }

    updateExpanded = (expandedKeys: Array<string>) => {
        this.setState({
            expandedKeys
        });
    }



    render() {
        const { treeNodes } = this.state;
        return (
            <div className = "component-tree">
                {treeNodes
                    && treeNodes.map((item: React.ReactElement, index) => this.renderTreeNode(item, item.props.nodeKey))}
            </div>
        );
    }
}
