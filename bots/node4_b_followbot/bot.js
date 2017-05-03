console.log('The follow bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

// Setting up a user stream
var stream = T.stream('user');

// Anytime someone follows me
stream.on('follow', followed);

function followed(eventMsg) {
  console.log("Follow event!");
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  /* If you follow someone, follow bot works again.
     It tweets like '.@yourTwitterName do you like rainbows'
     So, to prevent this, we make an if clause
     id_str is your twitter account id (eventMsg.source.id_str)
     */
  if(eventMsg.source.id_str !== 'your_twitter_account_id_here'){
	tweetIt('.@' + screenName + ' do you like rainbows?');
  }
}


function tweetIt(txt) {

	var tweet = {
	  status: txt
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
