// Hiding API Keys with .env
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/04-dotenv.html
// https://youtu.be/G2Yns7NUSq4

console.log('Beep beep! 🤖');

require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOTTOKEN);

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
  if (msg.channel.id == '715786219770085396' && msg.content === '!choochoo') {
    const index = Math.floor(Math.random() * replies.length);
    msg.channel.send(replies[index]);
  }
}
