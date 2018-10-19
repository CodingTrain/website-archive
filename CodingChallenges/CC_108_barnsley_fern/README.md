Code for adding the rainbow colors:

```java
// −2.1820 < x < 2.6558 and 0 ≤ y < 9.9983
void drawPoint() {
  colorMode(HSB,255,255,255);
  stroke(map(y, 0, 9.9983,0,255),255,255,200);
  strokeWeight(2);
  float px = map(x, -2.1820, 2.6558, 0, width);
  float py = map(y, 0, 9.9983, height, 0);
  point(px, py);
}
```

Timecode where I implement the rainbow in the live stream: 

https://youtu.be/_9ZerP7pGvc?t=1h43m43s
