console.log('The follow bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

// Setting up a user stream
var stream = T.stream('user');

// To ensure we don't tweet ourselves, we must get our user data.
var my_screen_name = null;

T.get('account/verify_credentials', { skip_status: true }, function(err, data, response) {
  my_screen_name = data.screen_name;
  console.log('Using account ' + my_screen_name);
});

// Anytime someone follows me
stream.on('follow', followed);

function followed(eventMsg) {
  console.log("Follow event!");
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  /* If you follow someone, follow bot works again.
     It tweets like '.@yourTwitterName do you like rainbows'
     So, to prevent this, we make an if clause
     using your twitter screenName
     */
  if (screenName !== my_screen_name) {
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
