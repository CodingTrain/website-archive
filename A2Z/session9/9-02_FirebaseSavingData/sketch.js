// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/7lEU1UEw3YI

var canvas;
var score;
var button;
var initialInput;
var submitButton;
var database;

function setup() {
  canvas = createCanvas(100, 100);
  score = 0;
  createP('Click the button to get points.')
  button = createButton('click');
  button.mousePressed(increaseScore);
  initialInput = createInput('initials');
  submitButton = createButton('submit');
  submitButton.mousePressed(submitScore);

  var config = {
    apiKey: "AIzaSyDsJ73sg9CjbMj08ibW8KuTYQ4WfV3faSM",
    authDomain: "my-not-awesome-project.firebaseapp.com",
    databaseURL: "https://my-not-awesome-project.firebaseio.com",
    storageBucket: "my-not-awesome-project.appspot.com",
    messagingSenderId: "583703514528"
  };
  firebase.initializeApp(config);
  database = firebase.database();
}

function submitScore() {
  var data = {
    initials: initialInput.value(),
    score: score
  }
  console.log(data);
  var ref = database.ref('scores');
  ref.push(data);
}

function increaseScore() {
  score++;
}

function draw() {
  background(0);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(score, width / 2, height / 2);
}