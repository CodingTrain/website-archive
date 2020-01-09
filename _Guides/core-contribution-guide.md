---
title: "Core Contribution Guide"
---

This short guide will help you set up a local copy of the entire Coding Train
website so you can help us making it even better.


## Create a Fork

First of all you should create a fork of this repository. This is especially
necessary when you want your modification to be merged into the live site at
a later point. GitHub has an excellent
[guide](https://guides.github.com/activities/forking/) on how to fork a
project. Carry on after you have successfully forked the repository and
cloned your fork locally.

## Environment Setup

This website is build on top of Jekyll, which is a static site generator. To
build the website you need to be able to run Jekyll on your system.
In order to do so you can choose between using Docker or a native installation.

### Using Docker

To make your life _a lot_ easier you can use Docker to run Jekyll. Everything is already
configured and ready to go. Just make sure you have Docker and `docker-compose` installed on your system.
After that, simply run

```
$ docker-compose up
```
Linux users may have to use `sudo` to build the site. It is a minor change to the original command, simply run
```
$ sudo docker-compose up
```

Docker will then run a container with all dependencies installed.
Head over to `http://localhost:4000` to see the built site.
You can leave the container running in the background and it will keep watching
your changes and rebuilding certain parts if necessary.


### Using Native Jekyll Installation

#### Install Jekyll

In order to install Jekyll, head over to the [Jekyll Docs](https://jekyllrb.com/docs/) and follow the
instructions there. Once you've installed Jekyll you can try to build the
site.


#### Install Gems

Jekyll's build on top of Ruby and has some dependencies that need to be
installed as well in order to work properly. You can think of it similar to
NPM and Node.JS modules where "Gems" are the dependencies managed by
"Bundler". You can check out a more detailed explanation on [Jekyll's
website](https://jekyllrb.com/docs/ruby-101/).

To install the Gems needed by Jekyll, run the following command in your
terminal from where you've cloned your fork:

```
$ bundle install
```

This might take some time since Bundler now goes ahead and fetches all Gems
listed in a file called `Gemfile` which you can find at the root of the
project. 


#### Build The Site

After you've installed everything, you should be able to build the site. Just
run this command:

```
$ bundle exec jekyll build
```

Jekyll should now have created a new folder called `_site` with the finished version of the website inside. In order to view it, point a local webserver to that directory. One way you could do this is jump into the `_site` folder and run this command:

```
$ python -m SimpleHTTPServer
```

Now, fire up a web browser and go to `http://localhost:8000`. You should now have your own local copy of the website.

Keep in mind that after every change you've made, you need to rebuild the site using the build command as shown above. Since this gets annoying very quickly, Jekyll got you covered with another command:

```
$ bundle exec jekyll serve
```

This command doesn't finish by itself like the others did. Instead, it
instructs Jekyll to watch all your project files for changes and
automatically triggers a rebuild whenever you modify a file. Moreover, Jekyll
brings a built-in webserver that is reachable at `http://localhost:4000` as
long as the command is running so you also don't need to set up one yourself
like we did with the second command before.

At this point, you can finally start working! 🎉


## Create a Pull Request

Whenever you've finished working you can submit a pull request so that your
changes get merged into the actual website. If you don't know how to do so,
have a look at this handy
[guide](https://guides.github.com/activities/forking/#making-a-pull-request)
from GitHub.


## Troubleshooting

Sometimes, things don't work like they should. If you get stuck, don't worry!
Feel free to ask for help at any time! You can even join the `#website`
channel over on Slack if you are a member of The Coding Train.
