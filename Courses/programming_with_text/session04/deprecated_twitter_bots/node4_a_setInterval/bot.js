console.log('The bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

tweetIt();
setInterval(tweetIt, 1000*20);

function tweetIt() {

	var r = Math.floor(Math.random()*100);

	var tweet = {
	  status: 'random number ' + r + ' #codingrainbow'
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
	  if (err) {
	  	console.log("Something went wwrong!");
	  } else {
	    console.log("It worked!");
	  }
	}
}