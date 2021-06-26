module.exports = {
    init: require('./init'),
    mention: {
        select: require('./query/mention/select'),
        insert: require('./query/mention/insert')
    },
    response: {
        select: require('./query/response/select'),
        insert: require('./query/response/insert')
    }
}