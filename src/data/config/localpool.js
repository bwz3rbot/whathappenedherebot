const Pool = require('pg').Pool;
module.exports = global.pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASS,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.DBNAME
});