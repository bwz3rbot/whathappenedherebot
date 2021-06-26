/* SELECT from comment + submission */
module.exports = {
    by: {
        id: async (id) => {
            return global.pool.query(
                `SELECT * FROM
                response
                WHERE
                id = $1;`,
                [id]
            );
        }
    }
}