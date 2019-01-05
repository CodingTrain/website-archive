// Obamathon
// https://github.com/ITPNYU/Obamathon
// YouTube video tutorial: https://youtu.be/UrznYJltZrU

import java.util.*;
import java.text.*;

class Count { 
  int total;
  Map<String, Integer> words;
  Count() { 
    total = 1;
    words = new HashMap<String, Integer>();
  }

  void add(String word) {
    int wordCount = 1;
    Integer value = words.get(word);
    if (value != null) {
      wordCount = value + 1;
    }
    words.put(word, wordCount);
  }
}

// All data
JSONObject potus;

// An object with a property for each month
Map<String, Count> counts = new HashMap<String, Count>();

// List of words to ignore
// This is silly and a better strategy would be to load from a text files
// or use an algorithm like TF-IDF to pick out unique words
Set<String> ignore = new HashSet<String>(Arrays.asList("the", "to", "we", "of", "and", "a", "http", "https", "our"));


void setup() {
  potus = loadJSONObject("flotus.json");

  size(600, 400);
  JSONArray tweets = potus.getJSONArray("tweets");
  DateFormat df = new SimpleDateFormat("yyyy-MM-DD hh:mm:ss z");
  // Look at every tweet
  for (int i = 0; i < tweets.size(); i++) {
    JSONObject tweet = tweets.getJSONObject(i);
    //println(tweet);
    Date date;
    try {
      date = df.parse(tweet.getString("timestamp"));
    } 
    catch (ParseException e) {
      println("error parsing date: "+ e);
      continue;
    }
    //// Determine month and year
    int month = date.getMonth() + 1;
    int year = date.getYear() + 1900;
    String key = String.format("%02d/%4d", month, year);
    println(key);

    // Increase the count by 1 for each tweet
    Count count = counts.get(key);
    if (count == null) {
      count = new Count();
      counts.put(key, count);
    } else {
      count.total++;
    }

    //// Tweet text
    String txt = tweet.getString("text");
    // Split up the words
    // The regex could be improved to deal with apostrophes and other
    // non word data.
    String[] words = txt.split("\\s+");

    // Count each time a word appears
    for (int j = 0; j < words.length; j++) {
      String word = words[j].toLowerCase();
      if (word.length() > 0) {
        count.add(word);
      }
    }
  }
  background(0);
  for (Map.Entry<String, Count> entry : counts.entrySet()) {
    Count count = entry.getValue();
    println(entry.getKey() + ": ");
    for (Map.Entry<String, Integer> wordEntry : count.words.entrySet()) {
      println("  " + wordEntry.getKey() + ": " + wordEntry.getValue().toString());
    }
  }

  // Reverse the order
  //var months = Object.keys(counts);
  //months.reverse();

  // Normalize all the data by finding the maximum number
  //var maxtweets = 0;
  //for (var i = 0; i < months.length; i++) {
  //  var month = months[i];
  //  var num = counts[month].total;
  //  if (num > maxtweets) {
  //    maxtweets = num;
  //  }
  //}
  //var w = width / months.length;

  //// Graph the data
  //for (var i = 0; i < months.length; i++) {
  //  var month = months[i];
  //  var num = counts[month].total;
  //  // Height of bar is number of tweets
  //  var h = map(num, 0, maxtweets, 0, 300);
  //  fill(200);
  //  rect(i * w, height - h, w - 1, h);

  //  // Find the word with the largest counts
  //  // This could be improved.
  //  var wordCounts = counts[month].words;
  //  var words = Object.keys(wordCounts);
  //  var biggest = 0;
  //  var biggestWord = '';
  //  for (var j = 0; j < words.length; j++) {
  //    var word = words[j];
  //    if (wordCounts[word] > biggest && !ignore[word] && word.length > 3) {
  //      biggest = wordCounts[word];
  //      biggestWord = word;
  //    }
  //  }
  //  // Draw the word
  //  fill(255);
  //  text(biggestWord, i * w, height - h - 5);

  //}
}
