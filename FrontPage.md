---
layout: base
permalink: /
style: >
  text-align: center
---

<br>

***

**Welcome to TheCodingTrain's code repository!**

Here you can find all videos made on TheCodingTrain with the corresponding code available for download and a working live example running in the browser.

Happy Coding!

***


## Coding Challenges
Watch me take on some viewer submitted Coding Challenges in p5.js and Processing!
{% include 3-modules/video-list.html videos=site.CodingChallenges limit=3 reverse=true %}
<br>

## Tutorials
Here you can find all tutorials made by Daniel Shiffman on TheCodingTrain.  
If you are searching for tutorials made by guests, you can check them out [here]({{ site.baseurl }}{% link _GuestTutorials/index.md %}).
{% include 3-modules/video-list.html videos=site.Tutorials limit=3 reverse=true %}
<br>

## Streams
Watch all the unedited Live Streams!
{% include 3-modules/video-list.html videos=site.Streams limit=3 reverse=true %}
<br>

{% assign upcomingStreams = site.Streams | where_exp: 'video', 'video.date > site.time' %}
{% assign numberOfUpcomingVideos = upcomingStreams | size %}
{% if numberOfUpcomingVideos > 0 %}
## Upcoming Streams
Tune in to TheCodingTrain live on YouTube every friday!
{% include 3-modules/video-list.html videos=upcomingStreams future=true %}
<br>
{% endif %}
