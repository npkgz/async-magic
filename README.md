async-magic
=========================

Promises FTW! A pure promised based, straight forward async toolbox for Node.js **>=7.6**.

```
yarn add async-magic --save
```

Features
------------------------------

* Convert callback based functions into promised based once (with named functions)
* Advanced promised based control flows
* Designed to run with the pure power of native `Promise`, `await` and `async function`
* Run a set of promised functions in parallel with given number of maximum parallel tasks
* Queue promised based function including arguments
* Standalone, no external dependencies required
* No backward compatibility layer

API
------------------------------

 * `promisify` - Promisify a callback-based function
 * `promisifyAll` - Promisify a set of callback-based functions
 * `wait` - [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) alias
 * `PromiseResolver` - Utility function to cache a promised function including arguments for resolving. Required for advanced, promised based, control flows
 * `parallel` - Executes multiple `PromiseResolver` in parallel with given task limit
 * `series` - Executes multiple `PromiseResolver` in series


async-magic::promisify
------------------------------

**Description:** Promisify a callback-based function

**Requirements:**

 * Last function argument has to be the callback (Nodejs Standard)
 * The first argument of the callback has to be a possible error (Nodejs Standard)

**Syntax:** `fn:function = promisify(fn:function, [functionName:String])`

**Arguments:**

 * fn:function - the callback based function which should be converted into a promise based
 * functionName:String(optinal) - an optional name which is used as native js function name

**Example:**

```js
const _asyncMagic = require('async-magic');
const _fs = require('fs');

// create promisified fs-stat. set "stat" as native function name
const fsStat = _asyncMagic.promisify(_fs, 'stat');

// use promisified version
(async function(){
    const fstats = await _fsStat(__filename);
    console.log('Size:', fstats.size);
})();
```

async-magic::promisifyAll
------------------------------

**Description:** Promisify a set of callback-based functions

**Syntax:** `promisifiedFunctionSet:Object = promisifyAll(functionSet:Object, functionNames:StringArray)`

**Arguments:**

 * functionSet:Object - a set of functions identified by the objects keys
 * functionNames:StringArray - a list of the object keys which should be promisified (names are also taken as native function names!)

**Example:**

Promisify some fs functions. Just as showcase, take a look at [fs-magic](https://www.npmjs.com/package/fs-magic) - it is based on async-magic.

```js
const _asyncMagic = require('async-magic');
const _fs = require('fs');

// list of fs methods to promisify
const fsApi = [
    'access',
    'appendFile',
    'chmod'
];

// create promisified fs version
const _fsPromised = _asyncMagic.promisifyAll(_fs, fsApi);

// use promisified version
(async function(){
    const fstats = await _fsPromised.stat(__filename);
    console.log('Size:', fstats.size);
})();
```

async-magic::wait
------------------------------

**Description:** A [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) alias - waits until each promise has been completed or a single error occurs

**Syntax:** `p:Promise = wait(promises:Array)`

```js
const _asyncMagic = require('async-magic');
const _fsMagic = require('fs-magic');

// stat multiple files at once
(async function(){
    const stats = await _asyncMagic.wait([
        _fsMagic.stat('file1.txt'),
        _fsMagic.stat('file2.txt'),
        _fsMagic.stat('file3.txt')
    ]);
})();
```

async-magic::PromiseResolver
------------------------------

**Description:** Utility function to cache a promised function including arguments for resolving. Required for advanced, promised based, control flows

**Syntax:** `p:PromiseResolver = PromiseResolver(fn:function, [...args:any])`

```js
const _asyncMagic = require('async-magic');
const _fsMagic = require('fs-magic');

(async function(){
    // caches the function with given arguments
    const task = PromiseResolver(_fsMagic.stat, 'file1.txt');
    
    // resolves the promise with predefined arguments
    const stat = await task.resolve();
})();
```

async-magic::parallel
------------------------------

**Description:** Executes multiple `PromiseResolver` in parallel with given task limit

**Syntax:** `results:array = parallel(resolvers:array, [limit:int=1000])`

```js
const _asyncMagic = require('async-magic');
const _fsMagic = require('fs-magic');

(async function(){
    // task list
    const tasks = [];
    
    // stat a large list of files 
    tasks.push(PromiseResolver(_fsMagic.stat, 'file1.txt'));
    tasks.push(PromiseResolver(_fsMagic.stat, 'file2.txt'));
    ...
    tasks.push(PromiseResolver(_fsMagic.stat, 'fileN.txt'));
    
    // resolves the promise with predefined arguments
    // limit the number of parallel executed promises to 100 (IO handle limitation)
    const stats = await _asyncMagic.parallel(tasks, 100);
})();
```

async-magic::series
------------------------------

**Description:** Executes multiple `PromiseResolver` in series

**Syntax:** `results:array = series(resolvers:array)`

```js
const _asyncMagic = require('async-magic');
const _fsMagic = require('fs-magic');

(async function(){
    // task list
    const tasks = [];
    
    // stat a large list of files 
    tasks.push(PromiseResolver(_fsMagic.stat, 'file1.txt'));
    tasks.push(PromiseResolver(_fsMagic.stat, 'file2.txt'));
    ...
    tasks.push(PromiseResolver(_fsMagic.stat, 'fileN.txt'));
    
    // resolves the promise with predefined arguments)
    const stats = await _asyncMagic.series(tasks);
})();
```

FAQ
------------------------------

**What is the difference between named and anonymous functions ?**

Named functions contains its function-name as immutable `.name` attribute. This is especially useful during debugging, because the stacktrace will display the plain-text function name instead of "anonymous"

```js
const _asyncMagic = require('../async-magic');
const _fs = require('fs');

// create a unnamed (standard) version and a named one
const promisedStat = _asyncMagic.promisify(_fs.stat);
const namedPromisedStat = _asyncMagic.promisify(_fs.stat, 'stat');

// show function names (immutable .name attribute is set)
console.log(promisedStat.name); //=> anonymous
console.log(namedPromisedStat.name); //=> stat
```

Any Questions ? Report a Bug ? Enhancements ?
---------------------------------------------
Please open a new issue on [GitHub](https://github.com/AndiDittrich/Node.async-magic/issues)

License
-------
async-magic is OpenSource and licensed under the Terms of [The MIT License](LICENSE.md)