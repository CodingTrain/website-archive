---
title: "Self Avoiding Walk"
video_number: 162
date: 2021-06-03
video_id: m6-cm6GZ1iw
repository: CC_162_self_avoiding_walk

variations:
  - name: "Basic Self Avoiding Walk"
    lang: "p5js"
    folder: "basic"
    web_editor: 2_4gyDD_9
  - name: "Self Avoiding Walk with Backtracking"
    lang: "p5js"
    folder: "backtracking"
    web_editor: dRWS3A9nq
  - name: "Self Avoiding Walk 3D"
    lang: "p5js"
    folder: "3d"
    web_editor: D0ONOlCDT
  - name: "Self Avoiding Walk with Bezier"
    lang: "p5js"
    folder: "bezier"
    web_editor: KFbX0NWgh
  - name: "Self Avoiding Walk with Recursion"
    lang: "p5js"
    folder: "recursion"
    web_editor: UPxBk1YiB
  - name: "Random Walk with Alpha"
    lang: "p5js"
    folder: "alpha-random-walk"
    web_editor: IEw2RkDnJ

links:
  - title: "Self Avoiding Walk (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Self-avoiding_walk
  - title: "The complexity of counting self-avoiding walks in subgraphs of two-dimensional grids and hypercubes"
    url: https://www.sciencedirect.com/science/article/pii/S030439750300080X
  - title: "The pivot algorithm: A highly efficient Monte Carlo method for the self-avoiding walk (sci-hub)"
    url: https://sci-hub.st/10.1007/bf01022990

videos:
  - title: "Random Walker - Coding Challenge 52"
    author: "The Coding Train"
    url: /CodingChallenges/052-random-walk
  - title: "Minesweeper - Coding Challenge 71"
    author: "The Coding Train"
    url: /CodingChallenges/071-minesweeper
  - title: "filter() - Array Functions"
    author: "The Coding Train"
    url: /Tutorials/16-javascript-es6/16.8-filter
  - title: "Maze Generator - Coding Challenge 10"
    author: "The Coding Train"
    url: /CodingChallenges/010.1-maze-dfs-p5
  - title: "Recursion - Coding Train 77"
    author: "The Coding Train"
    url: /CodingChallenges/077-recursion
  - title: "A* Pathfinding Algorithm - Coding Challenge 51"
    author: "The Coding Train"
    url: /CodingChallenges/051.1-astar
  - title: "3D Self Avoiding Walk - Coding Train Live (May 27, 2021)"
    author: "The Coding Train"
    video_id: jlK1SJr-FBc?t=4353

topics:
  - title: "Choo choo! Welcome!"
    time: "0:00"
  - title: "Explain! How can we go about this?"
    time: "1:05"
  - title: "Code! Let's add a visited grid."
    time: "2:29"
  - title: "Code! What are the options for movement now?"
    time: "6:25"
  - title: "Code! Let's check the edges."
    time: "10:34"
  - title: "I could stop here but wait."
    time: "12:34"
  - title: "Explain! How can we think about backtracking?"
    time: "13:30"
  - title: "Code! Let's make a spot class and a path variable."
    time: "15:15"
  - title: "Code! Now backtracking!"
    time: "24:23"
  - title: "Whoops! Copying allOptions was a mistake."
    time: "29:38"
  - title: "Code! Maybe we need an end condition."
    time: "31:19"
  - title: "Yay! It worked."
    time: "32:09"
  - title: "This could take awhile. Could it be improved?"
    time: "32:22"

contributions:
  - title: "Random walk with random colours, random alpha and random size!"
    author:
      name: "Arnav"
      url: "https://github.com/SwirlingYoungCoder"
    url: "https://editor.p5js.org/arnavraspberrypi/present/-RI1f2-__"
    source: "https://github.com/SwirlingYoungCoder/Nature-Of-Code"
  - title: "Quasi self avoiding walk, coloring most visited sites!"
    author:
      name: "Renan Butkeraites"
      url: "https://github.com/butkeraites"
    url: "https://editor.p5js.org/butkeraites/full/AWcZE5WBI"
    source: "https://editor.p5js.org/butkeraites/sketches/AWcZE5WBI"
    - title: "Self avoiding walk on a non rectangular lattice"
    author:
      name: "Omar Essilfie-Quaye"
      url: "https://github.com/omareq"
    url: "https://omareq.github.io/random-walk/"
    source: "https://github.com/omareq/omareq.github.io/tree/master/random-walk/"
---

It's finally time to attempt a Self-Avoiding Walk! In this video, I quickly visualize a simple JavaScript p5.js implementation of a self-avoiding walk. I then tackle the more complex problem of backtracking to find a solution to a space-filling self-avoiding walk. 
