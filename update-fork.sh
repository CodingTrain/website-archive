#!/bin/bash
git remote add upstream git://github.com/CodingTrain/website.git
git fetch upstream
git pull upstream master
git remote remove upstream
