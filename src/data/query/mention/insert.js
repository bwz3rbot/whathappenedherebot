/* Insert into mention */
module.exports =
    async ({
        id,
        created_utc,
        subreddit,
        body,
        parent_id,
        parent_type
    }) => {
        console.log("Inserting into mention: ",{
            id,
            created_utc,
            subreddit,
            body,
            parent_id,
            parent_type
        });
        return global.pool.query(
            `INSERT INTO
            mention
            (
                id,
                created_utc,
                subreddit,
                body,
                parent_id,
                parent_type
            )
            VALUES
            (
                $1,$2,$3,
                $4,$5,$6
            );`,
            [
                id,
                created_utc,
                subreddit,
                body,
                parent_id,
                parent_type
            ]
        );
    }