module.exports =
    async () => {
        console.log("CREATE TABLE [mention]");
        await global.pool.query(
            `CREATE TABLE IF NOT EXISTS mention(
                id TEXT UNIQUE NOT NULL,
                created_utc INT NOT NULL,
                subreddit TEXT NOT NULL,
                body TEXT NOT NULL,
                parent_id TEXT NOT NULL,
                parent_type TEXT NOT NULL
            );`
        );
    }