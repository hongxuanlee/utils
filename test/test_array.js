const _ = require('../src/array.js');
const expect = require('chai').expect;

describe('Array chunk', () => {
    it('should throw type error', () => {
        let fn = () => _.chunk(1);
        expect(fn).to.throw(TypeError);
    });
    it('should chunk arr 1', () => {
        let res = _.chunk(['a', 'b', 'c', 'd'], 2);
        expect(res).to.deep.equal([['a', 'b'], ['c', 'd']]);
    });
    it('should chunk arr 2', () => {
        let res = _.chunk(['a', 'b', 'c', 'd'], 3);
        expect(res).to.deep.equal([['a', 'b', 'c'], ['d']]);
    });
});

describe('Array compact', () => {
    it('should throw type error', () => {
        let fn = () => _.compact(1);
        expect(fn).to.throw(TypeError);
    });
    it('should compact arr 1', () => {
        let res = _.compact([0, 1, false, 2, '', 3]);
        expect(res).to.deep.equal([1, 2, 3]);
    });
});

describe('Array difference/differenceBy', () => {
    it('should throw type error', () => {
        let fn = () => _.difference(1);
        expect(fn).to.throw(TypeError);
    });
    it('should difference arr', () => {
        let res = _.difference([2, 1], [2, 3]);
        expect(res).to.deep.equal([1]);
    });
    it('should differenceBy arr 1', () => {
        let res = _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
        expect(res).to.deep.equal([1.2]);
    });
    it('should differenceBy arr 2', () => {
        let res = _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
        expect(res).to.deep.equal([{ 'x': 2 }]);
    });    
});

describe('Array fill', () => {
    it('should throw type error', () => {
        let fn = () => _.fill(1);
        expect(fn).to.throw(TypeError);
    });
    it('should fill arr', () => {
        let arr1 = [1, 2, 3];
        let arr2 = Array(3);
        let arr3 = [4, 6, 8, 10];
        _.fill(arr1, 'a');
        _.fill(arr2, 2);
        _.fill(arr3, '*', 1, 3)
        expect(arr1).to.deep.equal(['a', 'a', 'a']);
        expect(arr2).to.deep.equal([2, 2, 2]);
        expect(arr3).to.deep.equal([4, '*', '*', 10]);
    });
});

describe('Array fromPairs', () => {
    it('should throw type error', () => {
        let fn = () => _.fromPairs([1, 2, 3]);
        expect(fn).to.throw(TypeError);
    });
    it('should fromPairs', () => {
        expect(_.fromPairs([['a', 1], ['b', 2]])).to.deep.equal({ 'a': 1, 'b': 2 } );
    });
});

describe('Array find index', () => {
    it('should throw type error', () => {
        let fn = () => _.findIndex(1);
        expect(fn).to.throw(TypeError);
    });
    it('should find Index', () => {
        let users = [{
            'user': 'barney',
            'active': false
        }, {
            'user': 'fred',
            'active': false
        }, {
            'user': 'pebbles',
            'active': true
        }];
        let res1 = _.findIndex(users, function(o) {
            return o.user == 'barney';
        });
        expect(res1).to.equal(0);
        let res2 = _.findIndex(users, {
            'user': 'fred',
            'active': false
        });
        expect(res2).to.equal(1);
        let res3 = _.findIndex(users, ['active', false]);
        expect(res3).to.equal(0)
        let res4 = _.findIndex(users, 'active');
        expect(res4).to.equal(2)
    })
})

describe('Array flatten', () => {
    it('should throw type error', () => {
        let fn = () => _.flatten();
        expect(fn).to.throw(TypeError);
    });
    it('should flatten array', () => {
        expect(_.flatten([1, [2, [3, [4]], 5]])).to.deep.equal([1, 2, [3, [4]], 5]);
    });
});

describe('Array flatten deep', () => {
    it('should throw type error', () => {
        let fn = () => _.flattenDeep();
        expect(fn).to.throw(TypeError);
    });
    it('should flatten array', () => {
        expect(_.flattenDeep([1, [2, [3, [4]], 5]])).to.deep.equal([1, 2, 3, 4, 5]);
    });
});

describe('Array flatten depth', () => {
    it('should throw type error', () => {
        let fn = () => _.flattenDepth();
        expect(fn).to.throw(TypeError);
    });
    it('should flatten array', () => {
        expect(_.flattenDepth([1, [2, [3, [4]], 5]], 1)).to.deep.equal([1, 2, [3, [4]], 5]);
        expect(_.flattenDepth([1, [2, [3, [4]], 5]], 2)).to.deep.equal([1, 2, 3, [4], 5]);
    });
});

describe('Array intersection', () => {
    it('should throw type error', () => {
        let fn = () => _.intersection([1,2],3);
        expect(fn).to.throw(TypeError);
    });
    it('should intersection array', () => {
        expect(_.intersection([2, 1], [2, 3])).to.deep.equal([2]);
        expect(_.intersection([2, 1], [2, 1, 9], [2, 1, 3, 4])).to.deep.equal([2, 1]);
    });
});

describe('Array intersectionBy', () => {
    it('should throw type error', () => {
        let fn = () => _.intersectionBy([1,2],[1,2,3]);
        expect(fn).to.throw(TypeError);
    });
    it('should intersection arrayBy', () => {
        expect(_.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)).to.deep.equal([2.1]);
        expect(_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x')).to.deep.equal([{ 'x': 1 }]);
    });
});

describe('Array pull', () => {
    it('should throw type error', () => {
        let fn = () => _.pull();
        expect(fn).to.throw(TypeError);
    });
    it('should pull array', () => {
        let array = ['a', 'b', 'c', 'a', 'b', 'c'];
        _.pull(array, 'a', 'c');
        expect(array).to.deep.equal(['b', 'b']);
    });
});

describe('Array pull All', () => {
    it('should throw type error', () => {
        let fn = () => _.pullAll();
        expect(fn).to.throw(TypeError);
    });
    it('should pull array', () => {
        let array = ['a', 'b', 'c', 'a', 'b', 'c'];
        _.pullAll(array, ['a', 'c']);
        expect(array).to.deep.equal(['b', 'b']);
    });
});

describe('Array pull All By', () => {
    it('should throw type error', () => {
        let fn = () => _.pullAllBy();
        expect(fn).to.throw(TypeError);
    });
    it('should pull array', () => {
        var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
        _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
        expect(array).to.deep.equal([{ 'x': 2 }]);
    });
});

describe('Array remove', () => {
    it('should throw type error', () => {
        let fn = () => _.remove();
        expect(fn).to.throw(TypeError);
    });
    it('should array remove', () => {
        let array = [1, 2, 3, 4];
        let evens = _.remove(array, function(n) {
          return n % 2 == 0;
        });
        expect(array).to.deep.equal([1, 3]);
        expect(evens).to.deep.equal([2, 4]);
    });
});

describe('Array reverse', () => {
    it('should throw type error', () => {
        let fn = () => _.reverse();
        expect(fn).to.throw(TypeError);
    });
    it('should array reverse', () => {
        let array = [1, 2, 3];
        _.reverse(array);
        expect(array).to.deep.equal([3, 2, 1]);
        let array1 = [1, 2, 3, 4];
        _.reverse(array1);
        expect(array1).to.deep.equal([4, 3, 2, 1]);
    });
});

describe('Array union', () => {
    it('should throw type error', () => {
        let fn = () => _.union([1,2],1);
        expect(fn).to.throw(TypeError);
    });
    it('should array union', () => {
        expect(_.union([2], [1, 2])).to.deep.equal([2, 1]);
    });
});

describe('Array uniq', () => {
    it('should throw type error', () => {
        let fn = () => _.uniq();
        expect(fn).to.throw(TypeError);
    });
    it('should array uniq', () => {
        expect(_.uniq([2, 1, 2])).to.deep.equal([2, 1]);
    });
});

describe('Array zip', () => {
    it('should throw type error', () => {
        let fn = () => _.zip([1,2], 1);
        expect(fn).to.throw(TypeError);
    });
    it('should array uniq', () => {
        expect(_.zip(['a', 'b'], [1, 2], [true, false])).to.deep.equal([['a', 1, true], ['b', 2, false]] );
    });
});





