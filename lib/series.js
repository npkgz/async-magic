// resolves multiple promises in series
async function series(resolvers){
    // buffer
    let results = [];

    // run resolvers in series
    for (let r of resolvers){
        results.push(await r.resolve());
    }

    // return results
    return results;
}

module.exports = series;