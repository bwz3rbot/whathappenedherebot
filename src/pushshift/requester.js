const shift = require('axios').default.create({
    baseURL: `https://api.pushshift.io/reddit`
});
module.exports =
    async ({
        type,
        id
    }) => shift.get(`/${type}/search?ids=${id}`);