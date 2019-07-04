var sliders = [];

var angle = 0;

function setup() {
  noCanvas();
  // Make a whole bunch of sliders and fill an array
  for (var i = 0; i < 100; i++) {
    sliders[i] = createSlider(0, 255, 50);
  }
}

function draw() {
  var offset = 0;
  // Set the position of each slider dynamically using map()
  for (var i = 0; i < sliders.length; i++) {
    // Map sine function to range from 0 to 100 for slider
    var x = map(sin(angle+offset), -1, 1, 0, 255);
    // Control the slider
    sliders[i].value(x);
    offset += 0.25;
  }
  angle += 0.1;
}
