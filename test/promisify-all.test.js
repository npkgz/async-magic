const _assert = require('assert');
const _asyncMagic = require('../async-magic');
const _fs = require('fs');

// test functions
const testFunctionSet = {
    myTest1: function(x, cb){
        cb(null, x);
    },
    myTest2: function(x, y, z, cb){
        cb(null, x + y + z);
    },
    myTest3: function(x, y, z, cb){
        cb(null, x, y, z);
    },
    myTestError: function(x, cb){
        cb(new Error('Custom Error'));
    },
    myTestInternalError: function(x, cb){
        if (x == 0){
            throw new Error('Unhandled Internal Exception');
        }    
        cb(new Error('Custom Error'));
    }
};
// selected API
const testFunctionSetApi = ['myTest1', 'myTest2', 'myTest3', 'myTestError'];



// promisification tests upon fs module
describe('promisify-all', function(){

    it('should return an array of functions', function(){
        const testFns = _asyncMagic.promisifyAll(testFunctionSet, testFunctionSetApi);

        // array elements all of type function ?
        let isFunction = true;
        for (let name in testFns){
            isFunction = isFunction && (typeof testFns[name] == 'function');
        }
        _assert.equal(isFunction, true);
    });

    it('should return na array of functions of same length as given keys', function(){
        const testFns = _asyncMagic.promisifyAll(testFunctionSet, testFunctionSetApi);
        _assert.equal(Object.keys(testFns).length, testFunctionSetApi.length);
    });
});
