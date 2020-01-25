import { Entity, KeyEntities } from './Tree';

type nodeKey = string;
type ParentKey = nodeKey | null
export function convertTreeToEntities(treeNode: React.ReactElement, nodeKey: nodeKey, entities: KeyEntities, parentKey: ParentKey) {
    const entity: Entity = {
        key: treeNode.props.nodeKey,
        childKey: [],
        parentKey
    };

    entities[nodeKey] = entity;

    const { children } = treeNode.props;
    mapChildren(children, (item: React.ReactElement) => {
        entity.childKey.push(item.props.nodeKey);
        convertTreeToEntities(item, item.props.nodeKey, entities, treeNode.props.nodeKey);
    });
}

export function mapChildren(
    children: React.ReactElement | undefined | React.ReactElement[],
    callback: (child: React.ReactElement) => void): any {
    if (Array.isArray(children)) {
        return children.map(item => callback(item));
    }
    else if (children) {
        return callback(children);
    }
    return null;
}

export function treeNodeKeyAdd(arr: string[], val: string): string[] {
    const temp = [...arr];
    if (temp.indexOf(val) === -1) {
        temp.push(val);
    }
    return temp;
}

export function treeNodeKeyDel(arr: string[], val: string): string[] {
    const temp = [...arr];
    const index = temp.indexOf(val);
    if (index === -1) {
        return arr;
    }
    temp.splice(index, 1);
    return temp;
}

export function compareArrSubset(subArr: string[], totalArr: string[]): boolean {
    return subArr.every(item => totalArr.includes(item));
}

export function compareArrIntersection(subArr: string[], totalArr: string[]): boolean {
    return subArr.some(item => totalArr.includes(item));
}
