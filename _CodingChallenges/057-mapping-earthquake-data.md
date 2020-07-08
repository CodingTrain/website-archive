---
title: "Mapping Earthquake Data"
redirect_from: CodingChallenges/57-mapping-earthquake-data.html
video_number: 57
date: 2017-02-13
video_id: ZiYdOwOrGyc
repository: CC_057_Earthquake_Viz
web_editor: i0icLNOuf

links:
  - title: "Mapbox.js"
    url: https://www.mapbox.com/mapbox.js/api/v3.0.1/
  - title: "Web Mercator on Wikipedia"
    url: https://en.wikipedia.org/wiki/Web_Mercator
  - title: "Earthquake Database"
    url: http://earthquake.usgs.gov/data/

videos:
  - title: "Videos on working with data and APIs"
    url: /Tutorials/10-working-with-data
  - title: "Regular Expression playlist"
    url: /Courses/programming-with-text/2-regular-expressions

contributions:
  - title: "3D Globe in P5.JS"
    author: "Dollee"
    source: https://github.com/dolleebhatia/p5.js-EarthquakeDataVisualization-3D
  - title: "Current weather API"
    author: "kubo550"
    source: https://github.com/kubo550/Current-Weather-API
  - title: "Recoveries: COVID19"
    author:
      name: "Ashik Paul"
      url: "https://github.com/AshikPaul"
    url: "https://ashikpaul.github.io/COVID19_Recoveries/"
    source: "https://github.com/Ashikpaul/COVID19_Recoveries"
---
In this coding challenge, I visualize earthquake data from the [USGS](http://earthquake.usgs.gov/data/) by mapping the latitude, longitude and the magnitude of earthquakes with p5.js.

The map imagery is pulled from [mapbox.js](https://www.mapbox.com/mapbox.js/api/v3.0.1/) and the math demonstrated coverts latitude, longitude to x,y via [Web Mercator](https://en.wikipedia.org/wiki/Web_Mercator).
