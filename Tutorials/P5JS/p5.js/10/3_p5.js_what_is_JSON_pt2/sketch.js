/* https://vimeo.com/144162102
JSON source (5:05) https://github.com/dariusk/corpora/blob/master/data/animals/birds_antarctica.json
Video referenced (9:05)"createP from DOM" https://vimeo.com/142698165 */

var data;

function preload() {
  data = loadJSON("birds.json");
}

function setup() {
  //createCanvas(400, 400);
  // var bird = data.birds[1].members[2];
  //createP[bird];

  var birds = data.birds;

  for (var i = 0; i < birds.length; i++) {
    createElement('h1', birds[i].family);
    var members = birds[i].members;
    for (var j = 0; j < members.length; j++) {
      createDiv(members[j]);
    }
  }
}