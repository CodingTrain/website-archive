// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

const gif = require('./commands/gif.js');
const choochoo = require('./commands/choochoo.js');

const commands = { choochoo, gif };

module.exports = async function(msg) {
  if (msg.channel.id == '715786219770085396') {
    let tokens = msg.content.split(' ');
    let command = tokens.shift();
    if (command.charAt(0) === '!') {
      command = command.substring(1);
      commands[command](msg, tokens);
    }
  }
};
