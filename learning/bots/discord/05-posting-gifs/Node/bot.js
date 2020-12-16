// Posting GIFs
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/05-posting-gifs.html
// https://youtu.be/Q6nWCGUVC6s

console.log('Beep beep! 🤖');

require('dotenv').config();

const fetch = require("node-fetch");

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
  // if (msg.channel.id == "715786219770085396") {
  // use cleanContent instead of content to remove tagging
  let tokens = msg.cleanContent.split(" ");

  if (tokens[0] === "!choochoo") {
    const index = Math.floor(Math.random() * replies.length);
    msg.channel.send(replies[index]);
  } else if (tokens[0] == "!gif") {
    let keywords = "coding train";
    if (tokens.length > 1) {
      keywords = tokens.slice(1, tokens.length).join(" ");
    }
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
    let response = await fetch(url);
    let json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);
    msg.channel.send(json.results[index].url);
    msg.channel.send("GIF from Tenor: " + keywords);
  }
// }
}
