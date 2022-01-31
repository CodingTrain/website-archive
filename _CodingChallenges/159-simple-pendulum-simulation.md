---
title: "Simple Pendulum Simulation"
video_number: 159
date: 2021-02-16
video_id: NBWMtlbbOag
web_editor: SN-39sHAC
repository: CC_159_simple_pendulum_simulation

variations:
  - name: "Pendulum OOP"
    lang: "p5js"
    folder: pendulum-oop
    web_editor: lJz1cmMp4
  - name: "Array of Pendulums"
    lang: "p5js"
    folder: array-of-pendulums
    web_editor: Bj82tUlIO

links:
  - title: "Nature of Code Playlist"
    url: /learning/nature-of-code/index
  - title: "Applications of Differential Equations - The Simple Pendulum"
    author: "San Joaquin Delta College"
    url: http://calculuslab.deltacollege.edu/ODE/7-A-2/7-A-2-h.html
  - title: "Simple Pendulum (myPhysicsLab.com)"
    url: https://www.myphysicslab.com/pendulum/pendulum-en.html
  - title: "Object Oriented Simple Pendulum (Nature of Code Book)"
    url: https://github.com/nature-of-code/noc-examples-p5.js/tree/master/chp03_oscillation/NOC_3_10_PendulumExampleSimplified

videos:
  - title: "Polar Coordinates - Nature of Code"
    author: "The Coding Train"
    url: /learning/nature-of-code/3.4-polar-coordinates
  - title: "3.2 Angular Motion - Nature of Code"
    author: "The Coding Train"
    url: /learning/nature-of-code/3.2-angular-motion
  - title: "Double Pendulum - Coding Challenge #93"
    author: "The Coding Train"
    url: /CodingChallenges/093-double-pendulum
  - title: "Coding Train Live! (February 6th 2021)"
    author: "The Coding Train"
    video_id: dpqNqyQCcbY

topics:
  - title: "Choo choo!! 2021 Coding Challenge!"
    time: "0:00"
  - title: "Code! Drawing a bob and an arm."
    time: "0:43"
  - title: "Explain! How are we going to think about this?"
    time: "1:08"
  - title: "Code! Add our main variables."
    time: "2:55"
  - title: "Explain! How do we figure out where the bob is? Trigonometry is the answer!"
    time: "3:20"
  - title: "Code! Use the polar coordinates formulas we just worked out."
    time: "4:39"
  - title: "Code! Let's use angular motion!"
    time: "6:30"
  - title: "Explain! What is the force of the pendulum? Trigonometry is the answer!"
    time: "7:55"
  - title: "Code! Add the pendulum force."
    time: "10:46"
  - title: "Whoops! Correction on why we multiply by -1."
    time: "12:04"
  - title: "Code! Add -1 to the formula."
    time: "13:34"
  - title: "Whoops! I figured out some things that I never really understood."
    time: "13:57"
  - title: "Code! Correct the 3 step process."
    time: "14:24"
  - title: "Something doesn't feel quite right."
    time: "15:32"
  - title: "Explain! Angular acceleration relates to the arm length!"
    time: "16:59"
  - title: "Code! Let's divide by length."
    time: "18:58"
  - title: "Code! You could add some damping."
    time: "19:54"
  - title: "Ideas! What could you do next?"
    time: "20:21"

contributions:
  - title: "Pendulum on a cart with PID controller"
    author:
      name: "Ewoud Dronkert"
      url: "https://ednl.github.io"
    url: "https://ednl.github.io/pidcart/"
    source: "https://github.com/ednl/pidcart"
  - title: "Colourful Pendulum in CodePen"
    author: "Indrayudh Chakraborty"
    url: "https://codepen.io/indra737/full/oNYeOQx"
    source: "https://codepen.io/indra737/pen/oNYeOQx"
  - title: "Simple Pendulum Simulation using Python"
    author:
      name: "Karan Kinariwala"
      url: "https://github.com/kkin1995"
    video_id: "G7EJsikYbrs"
    source: "https://github.com/kkin1995/simulations/tree/main/simple-pendulum"
  - title: "Up Down Left Right"
    author: "Josh Kenzer"
    url: https://editor.p5js.org/jkenzer/full/a-l3Gxark
    source: "https://editor.p5js.org/jkenzer/sketches/a-l3Gxark"
  - title: "Pendulum website"
    author: "Sarvagya singh"
    url: "https://pendulums-sarvagya.glitch.me/"
    source: "https://pendulums-sarvagya.glitch.me/"
  - title: "Calculating PI based on pendulum period"
    author: "Pieter De Schepper"
    url: "https://editor.p5js.org/pieterdeschepper/full/6oL3cR2Ve"
    source: "https://editor.p5js.org/pieterdeschepper/sketches/6oL3cR2Ve"
  - title: "Fun Pendulum Patterns"
    author: "basti486"
    url: "https://editor.p5js.org/8asti/full/39ZfCPZe8"
    source: "https://editor.p5js.org/8asti/sketches/39ZfCPZe8"
  - title: "Opposite pendulums simulation adding damping force"
    author: "Andrea Suárez (Drea007)"
    url: "https://editor.p5js.org/Drea007/full/M06hVV_ZF"
    source: "https://editor.p5js.org/Drea007/sketches/M06hVV_ZF"
  - title: "Rainbow pendulum waves (GeoGebra)"
    author:
      name: "Juan Carlos Ponce Campuzano"
      url: "https://jcponce.github.io"
    url: "https://www.geogebra.org/material/iframe/id/yz4sy6kg/width/605/height/600/border/888888/sfsb/true/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/true/rc/false/ld/false/sdz/true/ctl/false"
    source: "https://www.geogebra.org/m/bd5drkcu"
---

Choo choo! In this challenge, I build on chapter 3 (Oscillating Motion) of the Nature of Code series and simulate a simple pendulum in p5.js via angular acceleration.
