// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/0Mq2CxspF5s

// var txt;

function loadFile() {
  loadStrings("rainbow.txt", fileLoaded);
}

function fileLoaded(data) {
  // txt = data;
  createP(join(data, "<br/>"));
}

function fileSelected(file) {
  createP(file.name + " " + file.size + " " + file.type);

  if (file.type == "text") {
    createP(file.data);
  } else {
    createP("I need a text file.");
  }
  // console.log(file);
}

function setup() {
  noCanvas();

  createFileInput(fileSelected);

  var button = select("#loadfile");
  button.mousePressed(loadFile);

  // console.log(txt);
}
