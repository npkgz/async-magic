const _assert = require('assert');
const _asyncMagic = require('../async-magic');

// get timediff as float from hrtime components
function tdiff(t0, t1){
    const t0s = t0[0] + t0[1]/1000000000;
    const t1s = t1[0] + t1[1]/1000000000;
    return t1s-t0s;
}

// sleep testing
describe('sleep', function(){

    it('should intercept the execution for ~500ms', async function(){
        const t0 = process.hrtime();

        await _asyncMagic.sleep(500);

        const t1 = process.hrtime();

        // calculate difference
        const diff = tdiff(t0, t1);

        // should be in range
        if (diff > 0.490 && diff < 0.510){
            _assert.ok('In Range');
        }else{
            _assert.fail(diff, 0.5, 'Out of Range (0.01s)');
        }
    });

});
