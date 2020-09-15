// resolves multiple promises in series
async function series(resolvers){
    // buffer
    const results = [];

    // run resolvers in series
    for (const r of resolvers){
        // eslint-disable-next-line no-await-in-loop
        results.push(await r.resolve());
    }

    // return results
    return results;
}

module.exports = series;