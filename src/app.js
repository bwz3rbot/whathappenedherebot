require('dotenv').config();
const reddit = require('./snoowrap/requester');
const pushshift = require('./pushshift/requester');
const sleep = require('./util/sleep');
const database = require('./data/methods');
const run =
    async () => {
        const mentions = await reddit.getInbox({
            filter: 'mentions',
            limit: 10
        });
        for (const mention of mentions) {
            // Does mention already exist?
            console.log('selectding mention by id: ', mention.id);
            const exists = await database.mention.select.by.id(mention.id);
            // If yes, skip
            if (exists.rows.length === 0) {
                console.log("Processing mention...");
                // Set parent type (comment/submission)
                let parentType;
                mention.parent_id.startsWith("t3_") ?
                    parentType = 'submission' :
                    parentType = 'comment';

                // Insert new mention
                await database.mention.insert({
                    id: mention.id,
                    created_utc: mention.created_utc,
                    body: mention.body,
                    parent_id: mention.parent_id,
                    parent_type: parentType,
                    subreddit: mention.subreddit_name_prefixed.split('r/')[1]
                });

                // Fetch by id from pushshift
                const fetched = await pushshift({
                    type: parentType,
                    id: mention.parent_id
                });

                // If response is already deleted
                if (
                    fetched.data.data.length === 1 &&
                    fetched.data.data.body &&
                    fetched.data.data.body === '[deleted]' ||
                    fetched.data.data.title &&
                    fetched.data.data.title === '[deleted]'
                ) {
                    // await mention.reply(`Sorry! Couldn't catch this one before it was deleted :(`);
                } else if (fetched.data.data.length === 1) {
                    const fetchedDate = new Date(fetched.data.data[0].created_utc * 1000);
                    // Respond to mention
                    const replyText = `*${fetched.data.data[0].body || fetched.data.data[0].title}*
                    - ${fetched.data.data[0].author} ${fetchedDate.getUTCFullYear()}/${fetchedDate.getMonth()}/${fetchedDate.getDate()}`;
                    console.log(replyText);
                    const reply = await mention.reply(replyText);
                    // Insert response
                    await database.response.insert({
                        id: reply.id,
                        created_utc: reply.created_utc,
                        parent_id: mention.id,
                        body: reply.body,
                    });
                } else if (fetched.data.data.lengh === 0) {
                    // await mention.reply(`Oops! It's too soon to find this ${parentType}! The one that got away...`);
                }
            }
        }
        await sleep(10000);
        return run();
    };


(async () => {
    await database.init();
    await run();
})();