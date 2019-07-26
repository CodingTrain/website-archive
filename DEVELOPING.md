If you want to efficiently develop you might want to install a few things :



to host a local server basicall follow [the github server guide](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll):

# Installing

1. check if ruby is installed with `ruby --version` if it responds with a version go to step 3
2. install ruby(with gem) which can be downloaded here: Windows : https://rubyinstaller.org/downloads/ 
3. run `gem install bundler` - necessary to install jekyll (which runs the server)
4. clone this repository
5. run `npm install to fetch npm dependencies`
6. navigate into the cloned repo ( `git clone ` )
7. run `bundle install` to get all the necessary dependencies<br>
    ( you might need to downgrade bundler to the required version )
    
    
# Hosting

to start your server run `jekyll serve --incremental` in the repo folder ( it will display the server ip to indeicate its ready)

use the [jekyll guide](https://jekyllrb.com/docs/usage/) for questions


