const _asyncMagic = require('../async-magic');
const _fs = require('fs');

// list of fs methods to promisify - all sync methods are ignored!
const fsApi = [
    'access',
    'appendFile',
    'chmod',
    'chown',
    'close',
    'fchmod',
    'fchown',
    'fdatasync',
    'fstat',
    'fsync',
    'ftruncate',
    'futimes',
    'lchown',
    'link',
    'lstat',
    'mkdir',
    'mkdtemp',
    'open',
    'read',
    'readFile',
    'readdir',
    'readlink',
    'realpath',
    'rename',
    'rmdir',
    'stat',
    'symlink',
    'truncate',
    'unlink',
    'utimes',
    'write',
    'writeFile'
];

// create promisified fs version
const _fsPromised = _asyncMagic.promisifyAll(_fs, fsApi);

const promisedStat = _asyncMagic.promisify(_fs.stat);
const namedPromisedStat = _asyncMagic.promisify(_fs.stat, 'stat');

console.log(_fs.stat.toString());

(async function(){

    try{

        console.log(promisedStat);
        console.log(promisedStat.name);
        console.log(namedPromisedStat.name);
        console.log(typeof promisedStat);

        const stat = await promisedStat(__filename);
        console.log(stat);

        const estat = await promisedStat('xxx');
        console.log(estat);

    }catch(e){
        console.error(e);
    }


    try{

        console.log(_fsPromised.stat);
        console.log(_fsPromised.stat.name);
        console.log(typeof _fsPromised.stat);

        const stat = await _fsPromised.stat(__filename);
        console.log(stat);

        const estat = await _fsPromised.stat('xxx');
        console.log(estat);

    }catch(e){
        console.error(e);
    }

})();