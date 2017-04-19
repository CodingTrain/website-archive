// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var font;
var vehicles = [];
var txt1 = "hi";
var txt2 = "there";
var textBool = true;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(600, 300);
  background(51);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);
  var points = font.textToPoints(txt1, 100, 200, 192, {
    sampleFactor: 0.25
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    }

}

function draw() {
  background(51);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}

function keyPressed() {
  if (keyCode === 32) {
      if (!textBool) {
        var points = font.textToPoints(txt1, 100, 200, 192, {
          sampleFactor: 0.25
        });
        textBool = true;

        if (points.length > vehicles.length) {
          for (var i =0; i < vehicles.length; i++) {
              var pt = points[i];
              var v = vehicles[i];
              v.newTarget(pt.x, pt.y);
            }
            for (var i = vehicles.length; i < points.length; i++) {
              var pt = points[i];
              var vehicle = new Vehicle(pt.x, pt.y);
              vehicles.push(vehicle);
              }
        } else if (points.length < vehicles.length){
          for (var i = vehicles.length; i > points.length; i--) {
              vehicles.pop();
            }
            for (var i =0; i < points.length; i++) {
            var pt = points[i];
            var v = vehicles[i];
            v.newTarget(pt.x, pt.y);
          }
        } else {
            for (var i =0; i < points.length; i++) {
            var pt = points[i];
            var v = vehicles[i];
            v.newTarget(pt.x, pt.y);
          }
       }
     }

     else {
      var points = font.textToPoints(txt2, 100, 200, 192, {
        sampleFactor: 0.25
      });
      textBool = false;

      if (points.length > vehicles.length) {
        for (var i =0; i < vehicles.length; i++) {
            var pt = points[i];
            var v = vehicles[i];
            v.newTarget(pt.x, pt.y);
          }
          for (var i = vehicles.length; i < points.length; i++) {
            var pt = points[i];
            var vehicle = new Vehicle(pt.x, pt.y);
            vehicles.push(vehicle);
            }
      } else if (points.length < vehicles.length) {
        for (var i = vehicles.length; i > points.length; i--) {
            vehicles.pop();
          }
          for (var i =0; i < points.length; i++) {
          var pt = points[i];
          var v = vehicles[i];
          v.newTarget(pt.x, pt.y);
        }
      } else {
      for (var i =0; i < points.length; i++) {
          var pt = points[i];
          var v = vehicles[i];
          v.newTarget(pt.x, pt.y);
        }
     }
    }
  }
}
