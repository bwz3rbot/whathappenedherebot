/* Init All Database Tables */
module.exports =
    async (skip) => {
        console.log(`init db:(${process.env.DBNAME})`);
        // Bind pool
        process.env.PGHOST ?
            require('./config/localpool') :
            require('./config/pool');
        // Init tables
        if (!skip) {
            await require('./config/parent/mention')();
            await require('./config/relation/response')();
        }
    }