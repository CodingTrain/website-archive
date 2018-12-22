require('dotenv').config();
const Mastodon = require('mastodon-api');
const fs = require('fs');

console.log("Mastodon Bot starting...");

const M = new Mastodon({
  client_key: process.env.CLIENT_KEY,
  client_secret: process.env.CLIENT_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  api_url: 'https://botsin.space/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
})

//toot();
//setInterval(toot, 24 * 60 * 60 * 1000);

const listener = M.stream('streaming/user')
listener.on('error', err => console.log(err))


listener.on('message', msg => {
  // fs.writeFileSync(`data${new Date().getTime()}.json`, JSON.stringify(msg, null, 2));
  // console.log('user event');
  // console.log(msg);
  if (msg.event === 'notification') {
    const acct = msg.data.account.acct;
    if (msg.data.type === 'follow') {
      toot(`@${acct} Welcome aboard!`);
    } else if (msg.data.type === 'mention') {

      const regex1 = /(like|favou?rite|❤)/i;
      const content = msg.data.status.content;
      const id = msg.data.status.id;
      // console.log(`mention: ${id} ${content}`);
      if (regex1.test(content)) {
        M.post(`statuses/${id}/favourite`, (error, data) => {
          if (error) console.error(error);
          else console.log(`Favorited ${id} ${data.id}`);
        });
      }
      const regex2 = /(boost|reblog|retweet|🚂)/i;
      if (regex2.test(content)) {
        M.post(`statuses/${id}/reblog`, (error, data) => {
          if (error) console.error(error);
          else console.log(`Reblogged ${id} ${data.id}`);
        });
      }

      const regex3 = /\?/i;
      if (regex3.test(content)) {
        console.log('I got a question');
        const num = Math.floor(Math.random() * 100);
        const reply = `@${acct} The meaning of life is: ${num}`;
        toot(reply, id);
      }
    }
  }
});

function toot(content, id) {
  const params = {
    status: content
  }
  if (id) {
    params.in_reply_to_id = id;
  }
  M.post('statuses', params, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      //fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
      //console.log(data);
      console.log(`ID:${data.id}and timestamp:${data.created_at} `);
      console.log(data.content);
    }
  });
}