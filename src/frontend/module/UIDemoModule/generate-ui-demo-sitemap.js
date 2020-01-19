export function generateUIDemoSitemap(menu, uiDemoName) {
    const toPage = item => ({
        title: () => item.name,
        path: item.path,
        module: `ui-demo-${uiDemoName}`
    });

    return {
        children: menu.map(siteNode => {
            const {
                name,
                path,
                key,
                children
            } = siteNode;
            const item = {};

            if (path) {
                Object.assign(item, toPage({name, path}));
                // item.page = toPage({name, path});
            }

            if (children && children.length) {
                item.key = key;
                item.title = () => name;
                item.isOpen = true;
                item.children = children.map(
                    child => Object.assign(child, toPage(child))
                );
            }

            return item;
        })
    };
}
