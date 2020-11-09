# Choo Choo Discord Bot!

[<img src="https://i.ytimg.com/vi/7A-bnPlxj4k/maxresdefault.jpg" alt="Discord Bot Tutorial" width="320">](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4)

🚂🌈💖🤖 All aboard! [Coding Train Tutorial Videos](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6avBYxeBSwF48YhAnSn_sA4) 🚂🌈💖🤖

## Steps to create new bot 

1. Create node project and install discord.js module.

```
$ npm init
$ npm install discord.js
```

2. [Create an application](https://discord.com/developers/applications/) - optionally set name, description, avatar.

3. Select Bot from left navigation and "Add Bot" - set name and icon.

4. Add bot to the A2Z server with the url: `https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot`

5. Write the code!

Login to bot account:
```javascript
const Discord = require('discord.js');
const client = new Discord.Client();
client.login('YOUR BOT TOKEN');
```

Callback for when the bot is connected and ready:
```javascript
client.once('ready', () => {
  console.log('Ready!');
});
```

Callback for when a message is posted:
```javascript
client.on('message', gotMessage);

function gotMessage(msg) {
  console.log(msg.content);
}
```

9. Run the bot!

```
$ node index.js
```

## Limit to one server and one channel

1. Enable developer mode in Discord (Settings->Appearance->Enable Developer Mode).
2. Copy server ID.
3. Copy channel ID.

```javascript
const serverID = 'SERVER ID';
const channelID = 'CHANNEL ID';

client.on('message', gotMessage);

function gotMessage(msg) {
  // Only for this server and this channel
  if (msg.guild.id === serverID && msg.channel.id === channelID) {
    // Reply to the message ping!
    if (msg.content === 'ping') {
      msg.channel.send('pong');
    }
  }
}
```

## Store token and other secrets in .env file.

1. Install [dotenv package](https://www.npmjs.com/package/dotenv).
```
$ npm install dotenv
```

2. Create `.env` file:

```
SERVERID=123456789
CHANNELID=123456789
TOKEN=123456789
```

3. Load environment variables using `dotenv` and `.env`:

```javascript
require('dotenv').config();
const serverID = process.env.SERVERID;
const channelID = process.env.CHANNELID;
const TOKEN = process.env.TOKEN;
```
