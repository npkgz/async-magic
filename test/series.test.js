const _assert = require('assert');
const _asyncMagic = require('../async-magic');
const _fs = require('fs');

// test functions (promised based)
const myTest1 = _asyncMagic.promisify(function (x, cb){
    cb(null, x);
});

// asynchronous control flow testing
describe('series', function(){

    it('should resolve a single function in series', function(done){
        // create wrapped promises
        const resolvers = [
            _asyncMagic.PromiseResolver(myTest1, 1)
        ];

        // resolve promises, wait for completition
        _asyncMagic.series(resolvers).then(function(results){
            done(_assert.deepEqual(results, [1]));
        
        }).catch(function(e){
            done(e);
        });
    });

    it('should resolve 781 functions in series;', function(done){
        // create wrapped promises
        let resolvers = [];

        // create 1k resolvers
        for (let i=0;i<781;i++){
            resolvers.push(
                _asyncMagic.PromiseResolver(myTest1, 1)
            );
        }

        // resolve promises, wait for completition
        _asyncMagic.series(resolvers).then(function(results){
            done(_assert.equal(results.length, 781));
        
        }).catch(function(e){
            done(e);
        
        });
    });

    it('should keep the result ordering equal to resolver input ordering', function(done){
        // create wrapped promises
        let resolvers = [];
        let expectedResults = [];

        // create 1k resolvers
        for (let i=0;i<1000;i++){
            resolvers.push(
                _asyncMagic.PromiseResolver(myTest1, i)
            );
            expectedResults.push(i);
        }

        // resolve promises, wait for completition
        _asyncMagic.series(resolvers).then(function(results){
            // compare with expected result
            done(_assert.deepEqual(results, expectedResults));
        
        }).catch(function(e){
            done(e);
        
        });
    });
});
