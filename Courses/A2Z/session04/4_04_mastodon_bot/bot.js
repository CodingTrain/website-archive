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

toot();
setInterval(toot, 24 * 60 * 60 * 1000);


function toot() {
  const num = Math.floor(Math.random() * 100);
  const params = {
    spoiler_text: "The meaning of life is: ",
    status: num
  }

  M.post('statuses', params, (error, data) => {
    if (error) {
      console.error(error);
    } else {
      //fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
      //console.log(data);
      console.log(`ID: ${data.id} and timestamp: ${data.created_at}`);
      console.log(data.content);
    }
  });
}