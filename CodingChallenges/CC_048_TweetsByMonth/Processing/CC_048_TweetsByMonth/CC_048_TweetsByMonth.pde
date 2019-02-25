// Obamathon
// https://github.com/ITPNYU/Obamathon
// YouTube video tutorial: https://youtu.be/UrznYJltZrU
// Javascript transcription: Chuck England

import java.util.*;
import java.text.*;

// Class to hold the monthly totals and word counts.
class Count { 
  int total;
  IntDict words;
  Count() { 
    total = 1;
    words = new IntDict();
  }

  void add(String word) {
    int wordCount = 1;
    int value = words.get(word, 0);
    wordCount = value + 1;
    words.add(word, wordCount);
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

  size(800, 600);
  JSONArray tweets = potus.getJSONArray("tweets");
  DateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss z");
  // Look at every tweet
  for (int i = 0; i < tweets.size(); i++) {
    JSONObject tweet = tweets.getJSONObject(i);
    //println(tweet);
    Date date;
    try {
      date = df.parse(tweet.getString("timestamp"));
    } 
    catch (ParseException e) {
      println("error parsing date: " + e);
      continue;
    }
    // Determine month and year
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    int month = cal.get(Calendar.MONTH);
    int year = cal.get(Calendar.YEAR);
    String key = String.format("%d/%02d", year, month);
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
    String[] words = txt.split("\\W+");

    // Count each time a word appears
    for (int j = 0; j < words.length; j++) {
      String word = words[j].toLowerCase();
      if (word.length() > 0) {
        count.add(word);
      }
    }
  }
  background(0);

  // Reverse the order
  StringList months = new StringList(counts.keySet());
  months.sort();

  // Normalize all the data by finding the maximum number
  int maxtweets = 0;
  for (int i = 0; i < months.size(); i++) {
    String month = months.get(i);
    int num = counts.get(month).total;
    if (num > maxtweets) {
      maxtweets = num;
    }
  }
  float w = width / months.size();

  // Graph the data
  for (int i = 0; i < months.size(); i++) {
    String month = months.get(i);
    int num = counts.get(month).total;
    // Height of bar is number of tweets
    float h = map(num, 0, maxtweets, 0, 300);
    fill(200);
    rect(i * w, height - h, w - 1, h);

    // Find the word with the largest counts
    // This could be improved.
    IntDict wordCounts = counts.get(month).words;
    String[] words = wordCounts.keyArray();
    int biggest = 0;
    String biggestWord = "";
    for (int j = 0; j < words.length; j++) {
      String word = words[j];
      if (wordCounts.get(word) > biggest && !ignore.contains(word) && word.length() > 3) {
        biggest = wordCounts.get(word);
        biggestWord = word;
      }
    }
    // Draw the word
    noStroke();
    fill(255);
    text(biggestWord, i * w, height - h - 5);
  }

  fill(0, 255, 255);
  textSize(36);
  textAlign(CENTER);
  text("Obamathon Word Count by Date Example", width / 2, 40);
}
