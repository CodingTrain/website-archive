console.log('Beep beep! 🤖');

const Discord = require('discord.js');
const client = new Discord.Client();
client.login('NzY0MTQxODAzODA4MDk2MzA5.X4B8gw.PqLWbrrjFD761g_Btba_5AUdr_U');

client.on('ready', readyDiscord);

function readyDiscord() {
  console.log('💖');
}

const replies = [
  '🚂🌈💖',
  'Choo choo!',
  'Ding! 🛎',
  'Never forget this dot!'
]

client.on('message', gotMessage);

function gotMessage(msg) {
  if (msg.channel.id == '715786219770085396' && msg.content === 'choo choo') {
    // msg.reply('🚂🌈💖');
    const index = Math.floor(Math.random() * replies.length);
    msg.channel.send(replies[index]);
  }
}