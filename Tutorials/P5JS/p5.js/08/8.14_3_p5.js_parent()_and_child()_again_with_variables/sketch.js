// var p;
var images = [];
function setup() {
  noCanvas()
  for (var i = 0; i < 5; i++) {
    
    var p = createP('This is a link: ');
    p.style('background-color', '#CCC');
    p.style('padding', '24px');
    
    var a = createA('#', 'apples');
    a.mousePressed(addPhoto);
    a.parent(p);
  }
  
  var button = select('#clear');
  button.mousePressed(clearStuff);
}
function clearStuff() {
  for (var i = 0; i < images.length; i++) {
    images[i].remove();
    // images[i].hide();
  }
  images = [];
}
function addPhoto() {
  var img = createImg('appleImage.jpg');
  images.push(img);
  img.size(100, 100);
  // img.parent(p);
  // img.parent(this);
  var paragraph = this.parent();
  img.parent(paragraph);
}















