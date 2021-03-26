/**
 * @file TreeNode
 * @author v_wuchangdong
 * @owner 2019-11-27
 */
import * as React from 'react';
import './style.scss';
import { default as c } from 'classnames';
import { Checkbox, Icon } from '@befe/brick';
import { SvgPlainRight } from '@befe/brick-icon';
import {
    mapChildren,
    treeNodeKeyAdd,
    treeNodeKeyDel,
    compareArrSubset,
    compareArrIntersection } from './util';
import { KeyEntities, Entity, CheckEvent } from './Tree';

export interface TreeNodeProps {

    nodeKey: string

    children?: React.ReactElement | Array<React.ReactElement>

    title: string | React.ReactElement

    activeKey: string

    halfCheckedKeys: Array<string>

    checkedKeys: Array<string>

    expandedKeys: Array<string>

    keyEntities: KeyEntities

    isChecked: boolean

    isHalfChecked: boolean

    isExpanded: boolean

    onCheck: (halfCheckedKeys: Array<string>, checkedKeys: Array<string>, checkEvent: CheckEvent) => void

    onSelect: (activeKey: string) => void

    updateExpanded: (expandedKeys: Array<string>) => void

    isSingle: boolean

    renderContent?: React.ReactElement | string

    checkable?: boolean

    treeLevel: number
}

export class TreeNode extends React.PureComponent<TreeNodeProps> {
    checkedKeys: string[]
    halfCheckedKeys: string[]

    static defaultProps = {
        title: '',
        activeKey: '',
        halfCheckedKeys: [],
        checkedKeys: [],
        expandedKeys: [],
        keyEntities: {},
        isChecked: false,
        isHalfChecked: false,
        isExpanded: false,
        isSingle: false,
        checkable: false,
        treeLevel: 0,
        onCheck: () => {},
        onSelect: () => {},
        updateExpanded: () => {}
    }

    constructor(props: TreeNodeProps) {
        super(props);
        this.checkedKeys = [];
        this.halfCheckedKeys = [];
    }

    renderTreeNode = (child: React.ReactElement, key: string) => {
        return React.cloneElement(child, {
            key,
            nodeKey: key,
            treeLevel: this.getTreeLevel(),
            activeKey: this.props.activeKey,
            checkable: this.props.checkable,
            isHalfChecked: this.props.halfCheckedKeys.includes(key),
            isChecked: this.props.checkedKeys.includes(key),
            isExpanded: this.props.expandedKeys.includes(child.props.nodeKey),
            halfCheckedKeys: this.props.halfCheckedKeys,
            checkedKeys: this.props.checkedKeys,
            expandedKeys: this.props.expandedKeys,
            keyEntities: this.props.keyEntities,
            onCheck: this.props.onCheck,
            onSelect: this.props.onSelect,
            updateExpanded: this.props.updateExpanded,
            isSingle: !('children' in child.props)
        });
    }

    getTreeLevel = (): number => {
        return this.props.treeLevel + 1;
    }

    addNodeChild = (parentNode: Entity) => {
        this.checkedKeys = treeNodeKeyAdd(this.checkedKeys, parentNode.key);
        this.halfCheckedKeys = treeNodeKeyDel(this.halfCheckedKeys, parentNode.key);
        parentNode.childKey.forEach(key => {
            this.addNodeChild(this.props.keyEntities[key]);
        });
    };

    delNodeChild = (parentNode: Entity) => {
        this.checkedKeys = treeNodeKeyDel(this.checkedKeys, parentNode.key);
        parentNode.childKey.forEach(key => {
            this.delNodeChild(this.props.keyEntities[key]);
        });
    };

    // 子节点取消勾选 父节点一定取消勾选 只是在此确定是否是半选还是不选
    delNodeParent = (node: Entity) => {
        if (node.parentKey) {
            this.checkedKeys = treeNodeKeyDel(this.checkedKeys, node.parentKey);
            const childrenKeys = this.props.keyEntities[node.parentKey].childKey;

            // 查看子节点集合与勾选和半勾选是否存在交集
            const isIntersection = compareArrIntersection(childrenKeys, [...this.checkedKeys, ...this.halfCheckedKeys]);
            if (isIntersection) {
                this.halfCheckedKeys = treeNodeKeyAdd(this.halfCheckedKeys, node.parentKey);
            }
            else {
                this.halfCheckedKeys = treeNodeKeyDel(this.halfCheckedKeys, node.parentKey);
            }
            this.delNodeParent(this.props.keyEntities[node.parentKey]);
        }
    };

    // 子节点勾选 父节点一定是勾选或者半勾选
    addNodeParent = (node: Entity) => {
        if (node.parentKey) {
            const childrenKeys = this.props.keyEntities[node.parentKey].childKey;

            // 判断子节点结合是否是勾选集合得子集
            const isSubset = compareArrSubset(childrenKeys, this.checkedKeys);
            if (isSubset) {
                this.checkedKeys = treeNodeKeyAdd(this.checkedKeys, node.parentKey);
                this.halfCheckedKeys = treeNodeKeyDel(this.halfCheckedKeys, node.parentKey);
            }
            else {
                this.halfCheckedKeys = treeNodeKeyAdd(this.halfCheckedKeys, node.parentKey);
            }
            this.addNodeParent(this.props.keyEntities[node.parentKey]);
        }
    };

    handleCheck = (changeEvent: Element, checked: boolean) => {
        const {
            keyEntities,
            nodeKey: key,
            onCheck
        } = this.props;

        this.checkedKeys = [...(this.props.checkedKeys)];
        this.halfCheckedKeys = treeNodeKeyDel(this.props.halfCheckedKeys, key);

        if (this.checkedKeys.includes(key)) {
            this.delNodeChild(keyEntities[key]);
            this.delNodeParent(keyEntities[key]);
        }
        else {
            this.addNodeChild(keyEntities[key]);
            this.addNodeParent(keyEntities[key]);
        }

        onCheck(this.halfCheckedKeys, this.checkedKeys, {
            checkedKey: key,
            checked,
            event: changeEvent
        });
    }

    handleSelect = () => {
        const { onSelect, nodeKey } = this.props;
        onSelect(nodeKey);
    }

    onSwitcherClick = () => {
        let expandedKeys: Array<string>;
        if (this.props.expandedKeys.includes(this.props.nodeKey)) {
            expandedKeys = treeNodeKeyDel(this.props.expandedKeys, this.props.nodeKey);
        }
        else {
            expandedKeys = treeNodeKeyAdd(this.props.expandedKeys, this.props.nodeKey);
        }
        this.props.updateExpanded(expandedKeys);
    }

    renderSwitcher() {
        const { isExpanded, isSingle, treeLevel } = this.props;
        const levelStyle = {
            marginLeft: `${treeLevel * 20}px`
        };
        return (
            <div className = {c(
                'tree-node-swicher', {
                    'tree-node-swicher-open': isExpanded
                })}
            onClick = {this.onSwitcherClick}
            style = {levelStyle}
            >
                {
                    isSingle
                        ? null
                        : <Icon svg = {SvgPlainRight} />
                }
            </div>
        );
    }

    renderCheckbox() {
        const { checkable, isChecked, isHalfChecked } = this.props;
        return (
            checkable
                ? <Checkbox
                    checked = {isChecked}
                    indeterminate = {isHalfChecked}
                    onChange = {this.handleCheck}
                ></Checkbox>
                : null
        );
    }

    renderItem() {
        return (
            <span className = "tree-node-title"
                onClick = {this.handleSelect}
            >
                {this.props.title}
            </span>
        );
    }

    renderContent() {
        const { renderContent } = this.props;
        return (
            renderContent
                ? <span className = "tree-node-custom">
                    {this.props.renderContent}
                </span>
                : null
        );
    }

    renderChildren() {
        const { children, isExpanded } = this.props;
        return (
            isExpanded
                ? <div>
                    {mapChildren(children, (item: React.ReactElement) => this.renderTreeNode(item, item.props.nodeKey))}
                </div>
                : null
        );
    }

    render() {
        const { nodeKey, activeKey } = this.props;
        return (
            <div className = {c(
                'tree-node', {
                    'tree-node-active': nodeKey === activeKey
                })}>
                {this.renderSwitcher()}
                {this.renderCheckbox()}
                {this.renderItem()}
                {this.renderContent()}
                {this.renderChildren()}
            </div>
        );
    }
}
