require('dotenv').config();
const Mastodon = require('mastodon-api');
const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);

console.log("Mastodon Bot starting...");

const M = new Mastodon({
  client_key: process.env.CLIENT_KEY,
  client_secret: process.env.CLIENT_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  api_url: 'https://botsin.space/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
})

const cmd = 'processing-java --sketch=`pwd`/treegen --run';


function tooter() {
  toot()
    .then(response => console.log(response))
    .catch(error => console.error(error));
}

tooter();
setInterval(tooter, 24 * 60 * 60 * 1000);

async function toot() {
  // Step 1
  const response1 = await exec(cmd);
  const out = response1.stdout.split('\n');
  const angle = out[0];
  const stream = fs.createReadStream('treegen/tree.png');

  // Step 2: Upload Media
  const params1 = {
    file: stream,
    description: `A randomly generated fractal tree with ${angle}`
  }
  const response2 = await M.post('media', params1);
  const id = response2.data.id;

  // Step 3
  const params2 = {
    status: `Behold my beautiful tree with angle ${angle} degrees`,
    in_reply_to_id: reply_id,
    media_ids: [id]
  }
  const response3 = await M.post('statuses', params2)
  return {
    success: true,
    angle: angle
  };
}