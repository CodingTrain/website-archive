---
title: "Community Contribution Guide"
---

## Here's a video tutorial if you prefer that sort of thing!

[![How to add your contribution](http://i3.ytimg.com/vi/fkIr0inoQ7Y/hqdefault.jpg)](https://youtu.be/fkIr0inoQ7Y)

[How to add your contribution to The Coding Train website](https://youtu.be/fkIr0inoQ7Y)

&nbsp;

---

&nbsp;

If you want to add your own version of a coding challenge/tutorial/etc. to this repository, simply add a reference to your repository and/or working example to the corresponding collection file.

You may want to follow these simple steps:


## 1. Locate the file

Great! You decided to share your work with the world. To get started, locate the file corresponding to the coding challenge/tutorial/etc. you based your work on. You can find them inside the folders named `_collection-name` where `collection-name` is one of the following:

* CodingChallenges
* Courses
* Tutorials
* GuestTutorials

To show your work to as many people as possible, don't add your contributions to the streams-collection (even though this is technically possible) as they may navigate to the actual coding challenge/tutorial/etc. directly when searching for content.

If nobody has added the file you were looking for, feel free to add it yourself. Take a look at the [Content Contribution Guide](content-contribution-guide) to learn how.

> **Tip: Easier Navigation**  
> Use the video numbers given in the title (such as "Tutorial #1.2") to navigate through subfolders.


## 2. Add your contribution

All right, you found your file! Adding a reference to your work is as simple as locating `contributions:` in the YAML front matter (the text between the two `---`) of the corresponding file. If it doesn't exist yet, feel free to add it yourself.

Let's say you've made your own version of the number guessing chatbot coding challenge and located the right file (which can be found at `_CodingChallenges/79-number-guessing-chatbot.md`). It's front matter could look like this:

``` markdown
---
title: "Number Guessing Chatbot"
video_number: 79
date: 2017-10-13
video_id: zGe1m_bLOFk

contributions:
  - title: "My awesome version of the number guessing chatbot"
    author:
      name: "Daniel Shiffman"
      url: "http://shiffman.net"
    url: "https://codingtrain.github.io/Rainbow-Code"
    source: "https://github.com/codingtrain/Rainbow-Code"
---
```

As you can see, someone already made a contribution to this challenge. You can add yours right away by simply copy-pasting this section after the last entry in `contributions`:

``` yaml
- title: "Your version's title (choose a nice one!)"
  author:
    name: "Your name (will be displayed on the page)"
    url: "A link to your homepage/codepen/... (where people can find more of your work)"
  url: "A link to your version running (preferably) in the browser"
  source: "The link to your repository or website containing your version's code"
```

Lets say you're contribution can't be run in the browser and you have a youtube video showing what it does. Youtube video direct links won't be accepted by the system, so you have to add the video id found in the end of the url as the `video_id`. For example:

``` yaml
- title: "Your version's title (choose a nice one!)"
  author:
    name: "Your name (will be displayed on the page)"
    url: "A link to your homepage/codepen/... (where people can find more of your work)"
  video_id: "the video id to your youtube video"
  source: "The link to your repository or website containing your version's code"
```

You don't have to specify all key-value pairs! Only `title`, `author.name` and `url` are **required**! Also don't forget to replace the default values 😉 !

> **Tip: Edit on GitHub**  
> You don't actually have to clone the repository to add your contribution. Simply use the edit button in the top right corner (shaped like a pen).


## 3. Create a Pull Request

The last step is creating a pull request for your changes. Just choose "Pull Request" to create one. Fill out the required information (title and description) and hit "Open". Please try to **include a link to a running demo** (or video / gif /  screen capture) in the pull request's description. This makes it easy to  quickly view the contribution and provide feedback! There is also a place in the pull request template to include your preferences about your contribution being shared on The Coding Train's social media.

That's it! You will be notified as soon as a contributor with write access to this repository has reviewed your changes.

Thanks for sharing your work with the world!
