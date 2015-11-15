// var p;

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

}

function addPhoto() {
  var img = createImg('apples2.jpg');
  img.size(100, 100);
  
  // img.parent(p);
  img.parent(this);
 
}















