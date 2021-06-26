/* Select from mention */
module.exports = {
    by: {
        id: async (id) => {
            return global.pool.query(
                `SELECT * FROM
                mention
                WHERE
                id = $1;`,
                [id]
            );
        }
    }
}