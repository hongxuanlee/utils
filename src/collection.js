'use strict';

const _ = {};

module.exports = _;

_.identity = n => n;

_.isString = str => typeof str === 'string';

_.isArray = arr => Array.isArray(arr);

_.isFunction = func => typeof func === 'function';

_.isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

_.countBy = (collection, iteratee=_.identity) => {
    let keys = Object.keys(collection);
    let res = {};
    keys.forEach(k => {
        let val = iteratee(collection[k]);
        if(!res[val]){
            res[val] = 0;
        }
        res[val] += 1;
    });
    return res;
};
