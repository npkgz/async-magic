const _assert = require('assert');
const _asyncMagic = require('../async-magic');
const _fs = require('fs');

// test functions (promised based)
const myTest1 = _asyncMagic.promisify(function (x, cb){
    cb(null, x);
});
const myTest2 = _asyncMagic.promisify(function (x, y, z, cb){
    setTimeout(function(){
        cb(null,x+y+z)
    }, 18);
});

// asynchronous control flow testing
describe('parallel', function(){

    it('should resolve a single functions in parallel', function(done){
        // create wrapped promises
        const resolvers = [
            _asyncMagic.PromiseResolver(myTest1, 1)
        ];

        // resolve promises, wait for completition
        _asyncMagic.parallel(resolvers).then(function(results){
            done(_assert.deepEqual(results, [1]));
        
        }).catch(function(e){
            done(e);
        
        });
    });

    it('should resolve two functions in parallel; default limit', function(done){
        // create wrapped promises
        const resolvers = [
            _asyncMagic.PromiseResolver(myTest1, 1),
            _asyncMagic.PromiseResolver(myTest2, 1, 10, 100)
        ];

        // resolve promises, wait for completition
        _asyncMagic.parallel(resolvers).then(function(results){
            done(_assert.deepEqual(results, [1, 111]));
        
        }).catch(function(e){
            done(e);
        
        });
    });

    it('should resolve two functions in parallel; chunk size 1', function(done){
        // create wrapped promises
        const resolvers = [
            _asyncMagic.PromiseResolver(myTest1, 1),
            _asyncMagic.PromiseResolver(myTest2, 1, 10, 100)
        ];

        // resolve promises, wait for completition
        _asyncMagic.parallel(resolvers, 1).then(function(results){
            done(_assert.deepEqual(results, [1, 111]));
        
        }).catch(function(e){
            done(e);
        
        });
    });

    it('should resolve 1000 functions in parallel; chunk size 100', function(done){
        // create wrapped promises
        let resolvers = [];

        // create 1k resolvers
        for (let i=0;i<500;i++){
            resolvers.push(
                _asyncMagic.PromiseResolver(myTest1, 1),
                _asyncMagic.PromiseResolver(myTest2, 1, 10, 100)
            );
        }

        // resolve promises, wait for completition
        // execution time ~18*10 ms
        _asyncMagic.parallel(resolvers, 100).then(function(results){
            // calculate result array sum
            done(_assert.equal(results.reduce( (acc,val) => acc+val), 56000));
        
        }).catch(function(e){
            done(e);
        
        });
    });

    it('should resolve 1000 functions in parallel; default limit', function(done){
        // create wrapped promises
        let resolvers = [];

        // create 1k resolvers
        for (let i=0;i<500;i++){
            resolvers.push(
                _asyncMagic.PromiseResolver(myTest1, 1),
                _asyncMagic.PromiseResolver(myTest2, 1, 10, 100)
            );
        }

        // resolve promises, wait for completition
        // execution time ~18*1 ms
        _asyncMagic.parallel(resolvers).then(function(results){
            // calculate result array sum
            done(_assert.equal(results.reduce( (acc,val) => acc+val), 56000));
        
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
        _asyncMagic.parallel(resolvers, 19).then(function(results){
            // compare with expected result
            done(_assert.deepEqual(results, expectedResults));
        
        }).catch(function(e){
            done(e);
        
        });
    });
});
