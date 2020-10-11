---
title: "Pages Contribution Guide"
---

*Last updated: October 8th 2020*

Pages who needs them? Well the Coding Train website. You may have noticed that the Coding Train website might be missing a page for any number of videos that have been released on YouTube. If you'd like to help by adding new pages or updating existing pages this guide should help you.

Everyone is welcome to work on the pages of the Coding Train website. In most cases you don't even need to understand how to code but if you're unfamiliar with how Git/GitHub works please checkout the [Coding Train's Git/GitHub series](https://thecodingtrain.com/beginners/git-and-github/). If you're new to the world of git version control the Coding Train website is a great open source project to get started with. There are no questions are stupid here on the Coding Train.

> ***Note:** Developing pages is much easier to do locally. Check out the [Core Contribution Guide](https://thecodingtrain.com/Guides/core-contribution-guide.html) for steps on setting up a local development environment.*

If the guide hasn't been updated in awhile then you might want to check in to make sure it's up to date before using it. Which leads us into the first thing to do.

## Check in before you start working.

Please [create an issue](https://github.com/CodingTrain/website/issues/new) on the repository before you start work to avoid two people working on the same project or working on a changes that won't be accepted when you make you're pull request. If there's already an issue that's requesting help then no need to make a new one but make sure you comment and say what you're working on.

## Where does the page go?

Think about how you would like to find a page from the landing page of the website. Which drop down menu would you click on and which section would you find you page in?

As a random (maybe not so random) example let's take the video about the random function in p5.js. It would be found under beginners and then p5.js. So it will go under `_beginners/p5js` and the page name would be `2.5-random.md` so the full path would be `_beginners/p5js/2.5-random.md`.

You might have a few questions. 

- **Why the underscore at the beginning of the first directory?** I'm glad you asked that's because of [Jekyll](https://jekyllrb.com/). Jekyll is the static site generated that we use for the Coding Train site. When jekyll is building the site it doesn't include directories that begin with `_` in the final site. This way the markdown pages don't end up on thecodingtrain.com only the html pages generated from the markdown.

- **Why no period in p5.js?** Because then it maybe interpreted by the computer as a JavaScript file. These days most computers are smart enough not to treat directories as file but there's always edge cases so why not try to avoid them.

- **Why that particular way of writing the page title?** As a rule of thumb we keep titles of pages to the video number `2.5` in this case followed by a `-` and then title of the video using `-` instead of spaces. Feel free to shorten the title within reason. Avoid using special characters or spaces because it can cause problems between operating systems when working with the repository.

- **What is .md?** `.md` stands for Markdown. It's a markup language like html but has less feature. It's generally used on GitHub instead of text files. However, in this case the contents of the page is mostly YAML and HTML but we mark it as markdown because that's what Jekyll wants.

If you are creating a new directory you will need an index.md page to make sure the videos are listed. Most of these will be for a series you are adding. Here's an example:

```yaml
---
title: # Series or Section Title
layout: series-index
redirect_from: # short urls or if series was moved
  - /p5js # would be an example, meaning https://thecodingtrain.com/p5js goes to this page
---

<!-- A couple sentences of description about series -->
```

If you've got further questions then don't hesitate to ask.

> ***Note:** We've been restructuring the site so pages might not be where you expect them to be as some haven't been moved. If you're unsure about where things are or want to know what to do in these weird case please reach out*

## What should I put in the page?

You find a template below witch covers most of options for the YAML section of the file. YAML stands for yet another markup language and we use it to basically make formatted list of video traits.

Please watch the whole video so you can include the links and videos sections in the page. Don't include dead links though.

```yaml
---
title: # Video name without series name
video_number: # Number of video. Example 2.5 (# is not needed that's a comment in yaml).
date: # Date video was released must be in YYYY-MM-DD format
video_id: # YouTube video id can get from hitting share on yt and it's the string after https://youtu.be/
ignore_filename: # Boolean defaults to false. Sometimes needed to pass unit tests with files that have 0.something as the number. Only use if necessary.
repository: # Location of code without top directory so "beginners/p5js/<code folder name>" would be "/p5js/<code folder name>"
web_editor: # The id for the main p5.js web editor sketch if there's a p5.js example.
can_contribute: # Boolean to allow contributions, defaults to true or false based on folder configuration in _config.yml
remake: # If this video has been remade and is in the archive include a the location of new page without .md. Example /beginners/p5js/1.3-shapes-and-drawing.
redirect_from: # If page has been moved then include it's old location (next two lines are an example)
  - # /Tutorials/1-p5js-basics/1.1-introduction
  - # /Tutorials/1-p5js-basics/1.1-introduction.html

variations: # Only need when multiple code examples with the same languages or library. Example: two p5.js code examples.
  - name: # Name of code example.
    lang: # Language or library used currently "p5js", "Processing", "Javascript" and "Nodejs" are the only supported options.
    folder: # The sub-folder name for the code example. This would be instead of P5 or Processing which are the defaults.
    web_editor: # Optional, if p5.js sketch then include link to a web editor version

links: # Links mentioned in the video
  - title: # What is this a link to?
    url: # The actual link
    author: # Optional, the creator of the content that is linked to.

videos: # Other YouTube videos mentioned in this video.
  - title: # Video name.
    author: # Who made the video.
    video_id: # YouTube video id see above for more info (do not include if it's a coding train video and it has a webpage.
    url: # If coding train video and has webpage then link to it here (example "/learning/nature-of-code/1.4-static-functions").
---
<!-- Video description, a 1-2 sentence description of video. Can be found at the beginning of the YouTube description. -->
```

## What about the code?

If the video you're working on has code in it then you want to make sure people can find it as that's one of the main reasons for the Coding Train website to exist.

Code goes in it's a similar place to the page itself but the path doesn't begin with an underscore. And you'll have to add a sub-folder for the code to be put in. As an example `_beginners/p5js/2.5-random.md` becomes `beginners/p5js/2.5-random/P5`. Each language or library has a default folder name which is automatically discovered and added to the page. `P5` for p5.js, `Processing` for Processing, `JavaScript` for JavaScript, and `Node` for Node.js. If another directory name is used it won't be detected unless it's added to in the variations section of the page.

The easiest way to find the code is in the description of the YouTube video but if it's not there then you can check [Coding Train p5.js web editor sketches](https://editor.p5js.org/codingtrain/sketches/), [Coding Train Repositories](https://github.com/CodingTrain), [Dan's GitHub](https://github.com/shiffman), and [RainbowCoder](https://github.com/RainbowCoder). If none of those work bring it up and we'll do our best to find it but in some case we might have to copy it from the video.

## Am I done yet?

Mostly it's sometimes easier to catch problems before making a pull request, especially if you made a lot of changes. So if you want to run unit tests and linting before hand here's how. You'll need [Node.js](https://nodejs.org) installed.

**Unit Testing**
```bash
# in root of website repository
cd unit-testing
npm install
npm test
```

**Linting**
```bash
# in root of website repository
npm install
npm run lint
```

If you've made it to hear then you should be all set to make a pull request. Thanks for all your help with the Coding Train website!