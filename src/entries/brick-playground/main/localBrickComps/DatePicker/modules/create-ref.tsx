export function createRef<T>() {
    let elem: T | null = null;

    return {
        get elem(): T | null {
            return elem;
        },
        ref(node: T | null) {
            elem = node;
        }
    };
}
