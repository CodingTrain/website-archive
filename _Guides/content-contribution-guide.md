---
title: "Content Contribution Guide"
---

You want to help with integrating new content into the repository? Great to hear that! Now let's see how you can help:

A new CodingTrain video has been released and you want to add it to the website so everyone else can find it there? OK, just follow these steps:


## Where to put it?

First of all, you have to find out to which category (or collection as [Jekyll](https://jekyllrb.com/) calls them) the video belongs. Available collections are:

* CodingChallenges
* Tutorials
* GuestTutorials
* Courses
* Streams

Selecting the right one is pretty straight forward. You can find the corresponding folders in the root directory of this repository preceded by an `_`.

For some collections (namely tutorials and courses - this does **not** apply to streams and coding challenges) you will find subdirectories in the collection's folder. You also have to decide, to which subcategory the video belongs. This is necessary to help Jekyll build nice URLs. In most cases, the correct subfolder has already been created. Otherwise, feel free to do it yourself. You can follow the video number (like Tutorial 1.2) if you are unsure about how to name it. In this case, `1` would indicate that this video is part of tutorial one (which therefore is a subcategory of the collection). Such a subcategory is called a "series".


## What's a series?

A series is just a collection of related videos. There can be two types of them: A series of videos as found in tutorials (the path structure looks like `_Tutorials/<tutorial-name>/<video-name>.md`) or a series of more series which contain videos like you can see in the courses collection (path here is `_Courses/<course-name>/<session-name>/<video-name>.md`).

If you take a look inside a series folder, you will find a file called `index.md`. This file contains meta-information about the series such as:

``` markdown
---
title: "Put the series's title here"
subtitle: "Put the series's subtitle here (only used for tutorials)"
series_number: <series number>
layout: series-index
---

Put a short description of the series here.
```

Taking a closer look at those properties:

| Property        | Description                                                          | Example            |
| --------------- | -------------------------------------------------------------------- | ------------------ |
| `title`         | The series's title                                                   | `"P5.JS Basics"`   |
| `subtitle`      | The series's subtitle (for tutorials, put the type of tutorial here) | `"P5.JS Tutorial"` |
| `series_number` | The series's number (will be used for sorting - must be an integer)  | `1`                |


## How to name everything?

There is a pretty simple naming convention you should follow. The filename for each video should **always** start with the video's number. Let's keep the example from above. The video you want to add is called "1.2: p5.js Workflow - p5.js Tutorial" (as of the date this article was written).

If you take a look inside the `_Tutorials` collection folder, you will already find several subfolders, especially one named `1-p5js-basics` (again, `1` coming from `1.2`). Everything after the first number should be a short title of the series. If you find yourself creating a subfolder of any collection, make sure to provide that as well which should't be that hard.

Next up: the filename! Each file inside a collection starts with the number corresponding to the video's title on YouTube followed by a short title (or less-than-five-words-summary). Please use `-` instead of `_` or spaces and remove any special characters like `&`, `#`, `+` and so on. Keep the title in an URL-like style, everything should be lowercase, no "stopwords" (and, or, with, ...), etc. In our example, the file you would have to create would be called `1.2-p5js-workflow.md`.


## What to put inside?

Every video file follows the same blueprint as below (you can even copy-paste this into the new file you created):

``` markdown
---
title: "Put the video's title here"
video_number: <primary video number>
date: YYYY-MM-DD
video_id: <copy id from YouTube>
---

Put a short description of the video here.
This can also be copied from the YouTube's description below the video.

Everything after the first paragraph will only be visible on the video's page, not in the video's summary.
```

The block between the two `---` is called YAML front matter. You can learn more about it in the [official Jekyll docs](https://jekyllrb.com/docs/frontmatter/)!

Now let's take a closer look at each property:

| Property         | Description                                                | Example            |
| ---------------- | ---------------------------------------------------------- | ------------------ |
| `title`          | The video's title (copy from YouTube)                      | `"p5.js Workflow"` |
| `video_number`   | The video's number                                         | `2`                |
| `date`           | The date this video has been released (copy from YouTube)  | `2017-10-31`       |
| `video_id`       | YouTube's video id from the URL (`...?v=HZD3wDRaec...`)    | `HZ4D3wDRaec`      |
| `repository`     | Path to the corresponding code files inside the repository | `/P5JS/p5.js/...`  |
| `live_example`   | Path to a running live example inside the repository       | `/P5JS/p5.js/...`  |
| `web_editor`     | The id of the sketch from the P5 Web Editor                | `HkDVpSvDm`        |
| `can_contribute` | Indicates wether community versions can be added later     | `true`             |

For coding challenges and streams, the video number may contain a decimal point when the stream/coding challenge is split into multiple parts. Important to know is that this only works if there are a maximum of nine parts. Otherwise, the sorting alogithm fails.

When specifying the repository, the full URL to the code will be build like this: `https://github.com/CodingTrain/Rainbow-Code/tree/master/<video-collection>/<repository>`. Make sure that this property start with a `/` because otherwise the URL won't be built correctly.

If you don't specify a `live_example`, the value of `repository` will be used automatically. To link to another folder containing the live example, just specify the folder the same way as you specified `repository`. It is also possible that there is no live_example even though there is a folder inside the repository containing the code (think Processing sketches). To disable the live example button, just set `live_example: false`.

If the code was written with the P5 Web Editor, don't specify `repository` or `live_example`. Use the `web_editor` property instead. The link to a running version will then be generated automatically.

If it should be possible to add community versions of this video using the `contributions` property (see the [Community Contribution Guide](community-contribution-guide)), set `can_contribute: true` which is the default for coding challenges so you don't need to explicitly speicfy it here. This is mainly useful for tutorials where it only makes sense for some videos to allow contributions. Streams should never have this option set.


## Wait, there's more!

Of course! There are a lot more of properties you can specify. Let's also look at them:

| Property | Description (or corresponding section in the video's description on YouTube) |
| -------- | ---------------------------------------------------------------------------- |
| `topics` | The topics spoken about in this <collection-name> (especially for streams)   |
| `links`  | Links discussed in this <collection-name>                                    |
| `videos` | Videos discussed in this <collection-name>                                   |
| `books`  | Books and Papers                                                             |
| `tools`  | Tools discussed in this <collection-name>                                    |

Each one of those itself is an array of link objects which can contain the following information:

| Property      | Description                                               | Example                      |
| ------------- | --------------------------------------------------------- | ---------------------------- |
| `title`       | The text shown for this link                              | `"The Nature of Code"`       |
| `author`      | The author of the resource linked to (think books/papers) |                              |
| `author.name` | The author's name                                         | `"Daniel Shiffman"`          |
| `author.url`  | A URL where people can find more of the author's work     | `http://shiffman.net`        |
| `time`        | The timecode to jump to in the video                      | `"14:42"`                    |
| `url`         | The link's url                                            | `https://natureofcode.com`   |
| `video_id`    | YouTube's video id (found in the video's url)             | `HZ4D3wDRaec`                |
| `playlist_id` | YouTube's playlist id (for linking to a series of videos) | `PLRqwX-V7Uu6Zy51Q-x9tMW...` |

Looking at this list, you may notice that you wouldn't use all of them at once, especially the last three as only one per link is supported of course. Speaking of them, `video_id` and `playlist_id` are rarely used as it is encouraged to link to videos and playlists that are already part of a collection. But if some third party video or playlist is referenced, please use those over a direct link as YouTube may decide to change its link style at some point in which case the new style has only to be applied at one central point rather than the entire repository.

It should be noted that the `topic` links are a little bit special as those will be present right next to the video beneath the description. It is encouraged to have this section be present especially for streams since they cover multiple topics in one video. Users are therefore able to skip to the part they are interested in. To enable this, you need `title`, `time` and `url` (which should link to the edited version of the video covering this topic in more detail).

But wait, we're still not done yet! What if you want to have a section not listed above? Thankfully there is an easy way to do this. Just add the following to your YAML front matter.

``` yaml
custom_sections:
  - title: "Other links I want to share"
    items:
      - title: "Processing Foundation"
        url: https://processingfoundation.org/
      ...
```

You can add as many custom sections with as many links as you want. Just a side note: The links under `items` are fully featured link objects so you can use the same properties as listed above!

&nbsp;

***

## Appendix A: Links within markdown files to other markdown files

If you want to link to another page from within a markdown file, you have to use the following snippet:

``` markdown
{% raw %}[link title here]({{ site.baseurl }}{% link _Collection/series/video-file.md %}){% endraw %}
```

Otherwise, links won't be resolved correctly because when using GitHub Pages, the website is hosted from within a subdirectory (for this site, it's `/Rainbow-Code`).
