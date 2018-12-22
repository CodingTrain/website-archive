// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/uw3GbsY_Pbc

var table;
var afinn = {}

function preload() {
  table = loadTable('AFINN-111.txt', 'tsv');
}

function setup() {
  noCanvas();
  console.log(table);
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);
    var word = row.get(0);
    var score = row.get(1);

    afinn[word] = score;
    //console.log(word, score);
  }
  console.log(afinn);
  save(afinn, 'afinn111.json');



}

function draw() {

}