'use strict';

const _ = {};
module.exports = _;

_.iteratee = n => n;

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

_.differenceBy = (arr, values, iteratee = _.iteratee) => {
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
}

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
}

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
}

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
    for (var i = fromIndex; i < arr.length; i++) {
        if (fn(arr[i])) {
            return i;
        }
    }
    return -1;
}


