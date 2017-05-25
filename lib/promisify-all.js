const _promisify = require('./promisify');

// apply promisify function to all elements of sourceObject included in key list
function promisifyAll(sourceObject, keys){
    // promisified output
    let promisifiedFunctions = {};

    // process each object key
    for (let name of keys){
        // function exist in source object ?
        if (name in sourceObject && typeof sourceObject[name] === 'function'){
            // create promisified named version
            promisifiedFunctions[name] = _promisify(sourceObject[name], name);
        }
    }

    return promisifiedFunctions;
}

module.exports = promisifyAll;