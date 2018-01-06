
setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git add README.md
  git commit --message "[ci skip] Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote remove origin
  git remote add origin https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git
  git push --quiet origin HEAD:${TRAVIS_BRANCH} > /dev/null 2>&1
}

setup_git
commit_website_files
upload_files
