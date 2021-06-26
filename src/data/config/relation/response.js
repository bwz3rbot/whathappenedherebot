module.exports =
    async () => {
        console.log("CREATE TABLE [response]");
        await global.pool.query(
            `CREATE TABLE IF NOT EXISTS response(
                id TEXT UNIQUE NOT NULL,
                created_utc INT NOT NULL,
                body TEXT NOT NULL,
                parent_id TEXT NOT NULL,
                FOREIGN KEY(parent_id) REFERENCES mention(id) ON UPDATE CASCADE
            );`
        );
    }