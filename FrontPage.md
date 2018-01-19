---
layout: base
permalink: /
style: >
  text-align: left
---

<br>

***

# Welcome to The Coding Train's Code Repository!
{: style="text-align: center;"}

Here you can find all videos made on [The Coding Train](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw) with the corresponding code available for download and working live examples running in the browser.

_Happy Coding!_

***


## Coding Challenges
Watch me take on some viewer submitted Coding Challenges in p5.js and Processing!
{: style="text-align: center;"}
{% include 3-modules/video-list.html videos=site.CodingChallenges limit=3 reverse=true %}
<br>

## Tutorials
Here you can find all tutorials made by Daniel Shiffman on TheCodingTrain.  
If you are searching for tutorials made by guests, you can check them out [here]({{ site.baseurl }}{% link _GuestTutorials/index.md %}).
{: style="text-align: center;"}
{% include 3-modules/video-list.html videos=site.Tutorials limit=3 reverse=true %}
<br>

## Streams
Watch all the unedited Live Streams!
{: style="text-align: center;"}
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
