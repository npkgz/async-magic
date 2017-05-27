const _assert = require('assert');
const _asyncMagic = require('../async-magic');
const _fs = require('fs');

// test functions (promised based)
const myTest1 = _asyncMagic.promisify(function (x, cb){
    cb(null, x);
});
const myTest2 = _asyncMagic.promisify(function (x, cb){
    setTimeout(function(){
        cb(null,x)
    }, 110);
});
const myTest3 = _asyncMagic.promisify(function (x, cb){
    setTimeout(function(){
        cb(null,x)
    }, 510);
});
const myTest4 = _asyncMagic.promisify(function (x, cb){
    setTimeout(function(){
        cb(new Error('Test Error'),x)
    }, 510);
});

// asynchronous control flow testing
describe('wait', function(){

    it('should wait until all promises has been resolved', async function(){
        // wait for completition
        const results = await _asyncMagic.wait([
            myTest1(1),
            myTest2(10),
            myTest3(100)
        ]);

        _assert.deepEqual(results, [1,10,100]);
    });

     it('should stop and throw an error if an error occurs', function(done){
        // wait for completition
        _asyncMagic.wait([
            myTest1(1),

            // will fail
            myTest4(1111),

            myTest2(10),
            myTest3(100)

        ]).then(function(result){
            done(new Error('Should throw an error'));

        }).catch(function(e){
            done();
        });

    });

});
