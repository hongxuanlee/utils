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
        let fn = () => _.compact(1);
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

        // let res1 = _.findIndex(users, function(o) {
        //     return o.user == 'barney';
        // });
        // expect(res1).to.equal(0);
        // let res2 = _.findIndex(users, {
        //     'user': 'fred',
        //     'active': false
        // });
        // expect(res2).to.equal(1);
        // let res3 = _.findIndex(users, ['active', false]);
        // expect(res3).to.equal(0)
        let res4 = _.findIndex(users, 'active');
        expect(res4).to.equal(2)
    })
})




