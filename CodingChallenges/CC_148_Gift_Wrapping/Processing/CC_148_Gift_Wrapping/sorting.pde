// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/148-gift-wrapping.html
// https://youtu.be/YNyULRrydVI
// https://editor.p5js.org/codingtrain/sketches/IVE9CxBOF

// Gift Wrapping Algorithm


//https://forum.processing.org/two/discussion/19469/sort-a-pvector-array
import java.util.Collections;
import java.util.Comparator;
 
static final Comparator<PVector> VEC_CMP = new Comparator<PVector>() {
  @ Override final int compare(final PVector a, final PVector b) {
    int cmp;
    return
      (cmp = Float.compare(a.x, b.x)) != 0? cmp :
      Float.compare(a.y, b.y);
  }
};
 
