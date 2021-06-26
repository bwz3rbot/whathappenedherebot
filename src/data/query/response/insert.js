/* Insert into response */
module.exports =
    async ({
        id,
        created_utc,
        body,
        parent_id
    }) => {
        return global.pool.query(
            `INSERT INTO
            response
            (
                id,
                created_utc,
                body,
                parent_id
            )
            VALUES
            (
                $1,$2,$3,$4
            );`,
            [
                id,
                created_utc,
                body,
                parent_id
            ]
        );
    }