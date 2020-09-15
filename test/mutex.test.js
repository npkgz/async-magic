const _assert = require('assert');
const _asyncMagic = require('../async-magic');

// asynchronous control flow testing
describe('Mutex', function(){

    it('should continue directly', async function(){

        // create Mutex
        const mutex = new _asyncMagic.Mutex();

        // acquire lock
        await mutex.acquire();

        // should be locked
        _assert.strictEqual(mutex.isLocked(), true)

        // unlock
        mutex.release();
        
        // ok
        return Promise.resolve(_assert.strictEqual(mutex.isLocked(), false));
    });

    it('should block until first process released', function(done){

        // execution ordering
        const results = [];

        // create Mutex
        const mutex = new _asyncMagic.Mutex();

        // try to aquire mutext
        mutex.acquire()
        .then(function(){
            // wait 200ms
            _asyncMagic.sleep(200)
                .then(function(){
                    // should be locked
                    _assert.strictEqual(mutex.isLocked(), true)
                    results.push(1);
                    mutex.release();
                });
        });

        // try to aquire mutext
        mutex.acquire()
        .then(function(){
            // should be locked
            _assert.strictEqual(mutex.isLocked(), true)

            results.push(2);
            mutex.release();
            done(_assert.deepEqual(results, [1,2]));
        });
    
    });
});
