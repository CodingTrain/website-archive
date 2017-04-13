import peasy.*;
import peasy.org.apache.commons.math.*;
import peasy.org.apache.commons.math.geometry.*;

//Constant x axis vector
static final PVector X_AXIS = new PVector(1, 0, 0);

//Initial loading tracking
volatile boolean loaded = false;
boolean init = false;

//Earth
PShape earth;
float earthRadius = 600;

//Animation
float animAngle = 0;

//Dynamic camera (mouse controlled)
PeasyCam cam;

/*
// Coordinate system test data : easily located cities + coordinate center (lat 0°, long 0°);
 PVector[] cities = new PVector[] {
 new PVector(48.866667, 2.333333),                     //Paris, France
 new PVector(5.1611312, -52.6493342),                  //Kourou, French Guyane
 new PVector(21.3069444, -157.85833330000003),         //Honolulu, Hawaï
 new PVector(-37.81361100000001, 144.96305600000005),  //Melbourne, Australia
 new PVector(40.7127837, -74.00594130000002),          //NY, NY
 new PVector(34.0522342, -118.2436849),                //LA, CA
 new PVector(-33.9248685, 18.424055299999963),         //Kape city, South Africa
 new PVector(35.6894875, 139.69170639999993),          //Tokyo, Japan
 new PVector(-54.8019121, -68.30295109999997),         //Ushuaïa, Argentina
 };
 PVector center = new PVector(0, 0);
 */

//Earthquake data
Table quakes;
color quakeColor = color(255, 0, 220);
double maxMag = 0;

void setup() {
  size(800, 600, P3D);
  //fullScreen(P3D);

  //Load data in new Thread so window doesn't seam frozen for a few seconds
  thread("loadData");
}

void draw() {

  background(51);

  if (!loaded) {        //Loading: show loader
    drawLoader();
  } else if (!init) {   //Done loading: initialize camera
    initView();
  } else {              //Initialized: Do actual rendering

    //Draw Earth
    lights();
    rotateY(animAngle);
    shape(earth);

    /*
    //Draw coordinate transform test data
     drawPlace(center, color(0, 255, 0), 10);
     for (PVector city : cities)
     drawPlace(city, color(150, 220, 255), 50);
     */

    //Draw earthquake data
    for (TableRow quake : quakes.rows()) {
      PVector latlong = new PVector(quake.getFloat("latitude"), quake.getFloat("longitude"));
      double mag = Math.pow(10, quake.getDouble("mag"));     //Undo log scale
      /* double mag = quake.getDouble("mag");                //Keep log scale */
      mag = mag * earthRadius / maxMag; //magnitude mapped between 0 and earthRadius<=>maxMag
      drawPlace(latlong, quakeColor, (float) mag);
    }

    //rotate earth by a small angle every frame around y axis (animation)
    animAngle += .01;
  }
}



void drawPlace(PVector latlong, color col, float boxHeight) {

  //Convert latitude and longitude into radians
  float lat = radians(latlong.x);
  float lon = radians(latlong.y);

  //offset altitude by half the intended box height so it's drawn right on Earth's surface
  // (boxes will "grow" from their center)
  float alt = earthRadius + boxHeight / 2;

  //Direct geographic to cartesian coordinates transform 
  // https://vvvv.org/blog/polar-spherical-and-geographic-coordinates#geographic-coordinates
  float cx = alt * cos(lat) * cos(lon);
  float cy = alt * cos(lat) * sin(lon);
  float cz = alt * sin(lat);

  //Fix computer graphics axis not inline with typical cartesian system => gx = cx, gy = -cz, gz = -cy 
  // plus on Nasa texture, [0°, 0°] at center instead of middle-left <=> rotated 180° around gy => x = -gx, y = gy, z = -gz
  // so x = -cx, y = -cz, z = cy
  float x = -cx, y = -cz, z = cy;

  //Compute box rotation angle and axis from x unit vector 
  // (box will be stretched along x axis, then rotated accordingly)
  PVector dir = new PVector(x, y, z);
  float xAngle = PVector.angleBetween(X_AXIS, dir);
  PVector rotAxis = X_AXIS.cross(dir); //Rotation axis obtained by cross-product

  //Apply transforms, draw box and revert
  pushMatrix();
  translate(x, y, z);
  rotate(xAngle, rotAxis.x, rotAxis.y, rotAxis.z);
  fill(col, 128);
  box(boxHeight, 10, 10);
  popMatrix();
}




void loadData() {
  //Create textured sphere for earth
  PImage tex = loadImage("http://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74167/world.200410.3x5400x2700.jpg");
  earth = createShape(SPHERE, earthRadius);
  earth.setStroke(false);
  earth.setFill(color(255, 255, 255)); //Don't no why but setting a fill color is required here
  earth.setTexture(tex);

  //Load earthquake data and find maximum magnitude
  quakes = loadTable("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv", "header");
  for (TableRow quake : quakes.rows()) {
    double mag = Math.pow(10, quake.getDouble("mag"));   //Undo log scale
    /* double mag = quake.getDouble("mag");              //Keep log scale */
    if (mag > maxMag)
      maxMag = mag;
  }

  //Done loading
  loaded = true;
}

void initView() {
  //Draw text
  fill(200);
  noStroke();
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Animating now", width / 2, height / 2);
  //Init moving camera at some reasonable distance given window size and Earth radius
  float dist = constrain(6. * earthRadius - width, 2 * earthRadius, 10 * earthRadius);
  cam = new PeasyCam(this, dist);
  //Reset animation
  animAngle = 0;
  //Done initializing
  init = true;
}

void drawLoader() {

  //Draw text
  fill(200, 200, 255, 100 * animAngle + 5);
  noStroke();
  textSize(40);
  textAlign(LEFT, TOP);
  text("Loading...", 40, 40);
  fill(200);
  textSize(16);
  textAlign(RIGHT, BOTTOM);
  text("Use mouse: left drag to rotate, wheel or right drag to zoom", width - 20, height - 20);

  translate(width / 2, height / 2);

  //Draw ugly spinning loader
  rotate(-animAngle);
  stroke(100, 100, 128);
  strokeWeight(8);
  fill(88);
  ellipse(0, 0, height / 2, height / 2);
  noStroke();
  fill(100, 100, 128);
  arc(0, 0, height / 2, height / 2, 0, PI / 2);
  rotate(PI);
  arc(0, 0, height / 2, height / 2, 0, PI / 2);
  rotate(2 * animAngle);
  fill(50, 50, 128);
  arc(0, 0, height / 2, height / 2, 0, PI / 2);
  rotate(PI);
  arc(0, 0, height / 2, height / 2, 0, PI / 2);
  
  //rotate loader by a small angle for animation
  animAngle += .01;
}