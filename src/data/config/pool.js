const Pool = require('pg').Pool;
module.exports = global.pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});