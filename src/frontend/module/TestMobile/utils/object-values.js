/***
 * @file object-values 兼容写法
 *
 * */
if (!Object.values) {
    Object.values = obj => {
        if (obj !== Object(obj)) {
            throw new TypeError('Object.values called on a non-object');
        }

        let val = [];
        let key;
        for (key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                val.push(obj[key]);
            }
        }
        return val;
    };
}
