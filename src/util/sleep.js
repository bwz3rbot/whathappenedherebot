module.exports =
    async (ms = 3000) => {
        await new Promise((res, rej) => {
            setTimeout(() => {
                res()
            }, ms);
        });
    }