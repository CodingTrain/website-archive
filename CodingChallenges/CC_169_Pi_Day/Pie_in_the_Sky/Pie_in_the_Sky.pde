ArrayList<Pie> pies = new ArrayList<>();
Plate plate;
String digits;
String pi[];
int piCounter = 0;
Boolean gameOver = false;
String piShow;
int lineCounter = 0;
void setup() {
  size(800, 600);
  pi = loadStrings("one-million.txt");
  digits = "3.";
  plate = new Plate(width/2, 50);
  piShow = pi[lineCounter].substring(0, 2);
}
void draw() {
  if (gameOver) {
    background(255, 0, 0);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Gane Over. \nGo and Enjoy Some Pie! ", width/2, height/2);
    return;
  }
  background(0);
  fill(255);
  textSize(48);
  text(piShow.charAt(1), width-32, 50);
  fill(0, 255, 0);
  text(piShow.charAt(0), width-64, 50);
  if (random(1)<0.05) {
    pies.add(new Pie(random(width), random(-100, -20)));
  }
  for (Pie pie : pies) {
    pie.show();
    pie.update();
  }
  for (int i = pies.size()-1; i>=0; i--) {
    if (plate.catches(pies.get(i))) {
      int digit = pies.get(i).digit;
      //digits += pies.get(i).digit;
      //String test = pi.;
      int correctDigit = Character.getNumericValue((piShow.charAt(0)));
      if (correctDigit == digit) {
        digits += digit;
        piCounter++;
        if(piCounter == 50){
          lineCounter++;
          piCounter = 0;
        }
        piShow = pi[lineCounter].substring(piCounter, piCounter +2);
        pies.remove(i);
      } else {
        gameOver = true;
      }
    } else if (pies.get(i).pos.y > height-200 +pies.get(i).r) {
      pies.remove(i);
    }
  }
  plate.show();
  plate.update(mouseX);
  println(pies.size());
  fill(255);
  rect(width/2, height, width, 400);
  textSize(32);
  textAlign(CENTER);
  fill(0);
  text("Digits of pie", width/2, 425);
  text(digits, width/2, 450);
}
