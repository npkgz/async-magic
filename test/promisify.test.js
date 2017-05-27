const _assert = require('assert');
const _asyncMagic = require('../async-magic');
const _fs = require('fs');

// test functions
function myTest1(x, cb){
    cb(null, x);
}
function myTest2(x, y, z, cb){
    cb(null, x + y + z);
}
function myTest3(x, y, z, cb){
    cb(null, x, y, z);
}
function myTestError(x, cb){
    cb(new Error('Custom Error'));
}
function myTestInternalError(x, cb){
    if (x == 0){
        throw new Error('Unhandled Internal Exception');
    }    
    cb(new Error('Custom Error'));
}

// promisification tests upon fs module
describe('promisify', function(){

    it('should return a function', function(){
        const testFn = _asyncMagic.promisify(_fs.stat);
        _assert.equal(typeof testFn, 'function');
    });

    it('should throw an exepction if no function is provided', function(){
        _assert.throws(function(){
            const testFn = _asyncMagic.promisify(_fs.statx)
        });
    });

    it('should return a function with default name', function(){
        const testFn = _asyncMagic.promisify(_fs.stat);
        _assert.equal(testFn.name, 'anonymous');
    });

    it('should return a function with default name', function(){
        const testFn = _asyncMagic.promisify(_fs.stat, null);
        _assert.equal(testFn.name, 'anonymous');
    });

    it('should return a function with custom name', function(){
        const testFn = _asyncMagic.promisify(_fs.stat, 'customFnName');
        _assert.equal(testFn.name, 'customFnName');
    });

    it('should return a function with its original name', function(){
        const myTestFn = _asyncMagic.promisify(myTest1);
        _assert.equal(myTest1.name, myTestFn.name);
    });

    it('should throw an exepction if callback is called with an error', function(done){
        const testFn = _asyncMagic.promisify(myTestError);

        testFn(1,2,3).then(function(res){
            done(new Error('Unexcepted Result'));
        }).catch(function(err){
            done();
        });
    });

    it('should throw an exepction if an error occcures inside the function', function(done){
        const testFn = _asyncMagic.promisify(myTestInternalError);

        testFn(0).then(function(res){
            done(new Error('should throw an exeception..'));
        }).catch(function(err){
            done();
        });
    });

    it('should return a stat object of the current file', function(){
        const testFn = _asyncMagic.promisify(_fs.stat);
        return testFn(__filename);
    });

    it('should throw an exception because of a stat error', function(done){
        const testFn = _asyncMagic.promisify(_fs.stat);

        testFn('./invalid-file.txt').then(function(res){
            done(new Error('unreachable code executed'));
        }).catch(function(err){
            done();  
        });
    });

    it('should return a singular argument as singular result', function(done){
        const testFn = _asyncMagic.promisify(myTest1);

        testFn(1234).then(function(res){
            done(_assert.equal(res, 1234));
        }).catch(function(err){
            done(err);
        });
    });

    it('should return a array argument as singular result', function(done){
        const testFn = _asyncMagic.promisify(myTest2);

        testFn(1,2,3).then(function(res){
            done(_assert.equal(res, 6));
        }).catch(function(err){
            done(err);
        });
    });

    it('should return a array argument as array result', function(done){
        const testFn = _asyncMagic.promisify(myTest3);

        testFn(1,2,3).then(function(res){
            done(_assert.deepEqual(res, [1,2,3]));
        }).catch(function(err){
            done(err);
        });
    });
});
