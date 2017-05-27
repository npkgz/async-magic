const _assert = require('assert');
const _asyncMagic = require('../async-magic');
const _fs = require('fs');

// test functions (promised based)
const myTest0 = _asyncMagic.promisify(function (cb){
    cb(null, true);
});

const myTest1 = _asyncMagic.promisify(function (x, cb){
    cb(null, x);
});
const myTest2 = _asyncMagic.promisify(function (x, y, z, cb){
    setTimeout(function(){
        cb(null,x+y+z)
    }, 51);
});

// asynchronous control flow testing
describe('PromiseResolver', function(){

    it('should resolve a function on calling resolve() without args', function(done){
        const r = _asyncMagic.PromiseResolver(myTest0);

        r.resolve().then(function(value){
            done(_assert.equal(value, true));

        }).catch(function(e){
            done(e);
        })
    });

    it('should resolve a function on calling resolve() with queued arg', function(done){
        const r = _asyncMagic.PromiseResolver(myTest1, 111);

        r.resolve().then(function(value){
            done(_assert.equal(value, 111));

        }).catch(function(e){
            done(e);
        })
    });

    it('should resolve a function on calling resolve() with queued args', function(done){
        const r = _asyncMagic.PromiseResolver(myTest2, 1, 10, 100);

        r.resolve().then(function(value){
            done(_assert.equal(value, 111));

        }).catch(function(e){
            done(e);
        })
    });
});
