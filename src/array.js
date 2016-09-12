'use strict';

const _ = {};
module.exports = _;

_.eq = (value, other) => value === other || (value !== value && other !== other);

_.identity = n => n;

_.isString = str => typeof str === 'string';

_.isArray = arr => Array.isArray(arr);

_.isFunction = func => typeof func === 'function';

_.isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

_.chunk = (arr, size = 1) => {
    if (!Array.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    let res = [];
    while (arr.length) {
        res.push(arr.splice(0, size));
    }
    return res
};

_.compact = (arr) => {
    if (!_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    return arr.filter(item => item && item !== '' && item !== 0);
};

_.difference = (arr, values) => {
    if (!arr || !_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    if (!values) {
        values = [];
    }
    if (!Array.isArray(values)) {
        values = [values];
    }
    return arr.filter(item => values.indexOf(item) === -1);
};

_.differenceBy = (arr, values, iteratee = _.identity) => {
    if (!arr || !_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    if (!values) {
        values = [];
    }
    if (!Array.isArray(values)) {
        values = [values];
    }
    let fn = (item) => {
        if (typeof iteratee === 'string') {
            return values.map(v => v[iteratee] !== item[iteratee]).reduce((pre, cur) => {
                return pre || cur;
            });
        }
        return values.map(iteratee).indexOf(iteratee(item)) === -1;
    }
    return arr.filter(fn);
};

_.fill = (arr, value, start = 0, end = arr.length) => {
    if (!arr || !_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    if (!value) {
        throw new Error('need value');
    }
    let len = end - start;
    let args = [start, len];
    while (len--) {
        args.push(value);
    }
    return [].splice.apply(arr, args);
};

_.fromPairs = (pairs) => {
    if (!pairs || !_.isArray(pairs)) {
        throw new TypeError(pairs + ' is not Array');
    }
    let checkPair = pair => {
        if (pair.length !== 2) {
            throw new TypeError(pair + ' should be pair');
        }
    };
    if (pairs.length === 1) {
        checkPair(pairs[0]);
        let obj = {};
        obj[pairs[0][0]] = pairs[0][1];
        return obj;
    }
    return pairs.reduce((pre, cur) => {
        let obj;
        if (!_.isObject(pre)) {
            obj = {};
            checkPair(pre);
            obj[pre[0]] = pre[1]
        }
        if (cur) {
            checkPair(cur);
            obj[cur[0]] = cur[1];
        }
        return obj;
    });
};

_.findIndex = (arr, predicate = _.iteratee, fromIndex = 0) => {
    if (!arr || !_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    let fn = (item) => {
        if (_.isFunction(predicate)) {
            return predicate(item);
        }
        if (_.isArray(predicate)) {
            predicate = _.fromPairs([predicate]);
        }
        if (_.isString(predicate)) {
            let obj = {};
            obj[predicate] = true;
            predicate = obj;
        }
        for (let key in predicate) {
            if (predicate[key] !== item[key]) {
                return false;
            }
        }
        return true
    }
    let len = arr.length;
    fromIndex = fromIndex - 1;
    while (++fromIndex < len) {
        if (fn(arr[fromIndex])) {
            return fromIndex;
        }
    }
    return -1;
};

_.flatten = (arr) => {
    if (!arr || !_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    let array = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if (_.isArray(arr[i])) {
            let args = arr[i];
            array.push.apply(array, args);
        } else {
            array.push(arr[i]);
        }
    }
    return array;
};

_.flattenDeep = (arr) => {
    if (!arr || !_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    let array = [];
    let deepEqual = (l, r) => JSON.stringify(l) === JSON.stringify(r);
    let preArr = arr;
    let newArr = _.flatten(arr);
    while (!deepEqual(preArr, newArr)) {
        preArr = newArr;
        newArr = _.flatten(newArr);
    }
    return newArr;
};

_.flattenDepth = (arr, depth = 1) => {
    if (!arr || !_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    let newArr = arr;
    while (depth--) {
        newArr = _.flatten(newArr);
    }
    return newArr;
};

_.intersection = (...args) => {
    return args.reduce((pre, cur) => {
        if (!_.isArray(pre)) {
            throw new TypeError(pre + ' is not Array');
        }
        if (!_.isArray(cur)) {
            throw new TypeError(cur + ' is not Array');
        }
        return pre.filter(ele => cur.indexOf(ele) > -1);
    });
};

_.intersectionBy = (...args) => {
    let comparator = args.pop();
    if (!_.isFunction(comparator) && !_.isString(comparator)) {
        throw new TypeError(comparator + 'should be function or property');
    }
    return args.reduce((pre, cur) => {
        if (!_.isArray(pre)) {
            throw new TypeError(pre + ' is not Array');
        }
        if (!_.isArray(cur)) {
            throw new TypeError(cur + ' is not Array');
        }
        return pre.filter(ele => {
            for (let i = 0; i < cur.length; i++) {
                if (_.isFunction(comparator)) {
                    if (comparator(ele) === comparator(cur[i])) {
                        return true
                    }
                } else if (_.isString(comparator)) {
                    if (ele[comparator] === cur[i][comparator]) {
                        return true
                    }
                }
            }
            return false;
        });
    });
};

_.pull = (...args) => {
    let arr = args.shift();
    if (!_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    if (!args.length) {
        return arr;
    }
    args.forEach(n => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === n) {
                arr.splice(i, 1);
            }
        }
    });
    return arr;
};

_.pullAll = (arr, values) => {
    if (!_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    if (!values || !values.length) {
        return arr;
    }
    values.forEach(n => {
        for (let i = 0; i < arr.length;) {
            if (arr[i] === n) {
                arr.splice(i, 1);
            } else {
                i++;
            }
        }
    });
    return arr;
};

_.pullAllBy = (arr, values, iteratee = _.identity) => {
    if (!_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    if (!values || !values.length) {
        return arr;
    }
    values.forEach(n => {
        for (let i = 0; i < arr.length;) {
            if (_.isFunction(iteratee)) {
                if (iteratee(arr[i]) === iteratee(n)) {
                    arr.splice(i, 1);
                } else {
                    i++;
                }
            } else {
                if (arr[i][iteratee] === n[iteratee]) {
                    arr.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
    });
    return arr;
};

_.remove = (arr, predicate = _.identity) => {
    if (!arr || !_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    let removed = [];
    for (let i = 0; i < arr.length;) {
        if (predicate(arr[i])) {
            removed.push(arr[i]);
            arr.splice(i, 1);
        } else {
            i++;
        }
    }
    return removed;
};

_.reverse = (arr) => {
    if (!arr || !_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    let len = arr.length;
    let tmp;
    for (let i = 0; i < len / 2; i++) {
        tmp = arr[len - 1 - i];
        arr[len - 1 - i] = arr[i];
        arr[i] = tmp;
    }
    return arr;
};

_.union = (...args) => {
    if (!args.length) {
        return [];
    }
    return args.reduce((pre, cur) => {
        if (!_.isArray(pre)) {
            throw new TypeError(pre + ' is not Array');
        }
        if (!_.isArray(cur)) {
            throw new TypeError(cur + ' is not Array');
        }
        cur.forEach(c => {
            if (pre.indexOf(c) === -1) {
                pre.push(c);
            }
        });
        return pre;
    });
};

_.uniq = (arr) => {
    if (!arr || !_.isArray(arr)) {
        throw new TypeError(arr + ' is not Array');
    }
    let newArr = [];
    arr.forEach(a => {
        if (newArr.indexOf(a) === -1) {
            newArr.push(a);
        }
    });
    return newArr;
};

_.zip = (...args) => {
    if (!args.length) {
        return [];
    }
    let newArr = [];
    args.forEach((f, i) => {
        if (!_.isArray(f)) {
            throw new TypeError(f + ' is not Array');
        }
        f.forEach((s, j) => {
            if (!newArr[j]) {
                newArr[j] = [];
            }
            newArr[j][i] = s;
        })
    });
    return newArr;
};