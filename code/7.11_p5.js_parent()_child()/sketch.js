var happy = ['rainbow', 'unicorn', 'purple', 'bacteria'];

function setup() {
  noCanvas();
  // var canvas = createCanvas(400, 400);
  // canvas.parent("canvasP");
  var button = select('#button');
  button.mousePressed(addItem);
}

// function draw() {
//   background(0);
//   ellipse(200,200,random(100), random(100));
// }
function addItem() {
  var r = floor(random(0, happy.length));
  var li = createElement('li', happy[r]);
  li.parent("happylist");
}
