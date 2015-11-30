uniform mat4 transform;

attribute vec4 vertex;
//attribute vec4 color;

varying vec4 vertColor;

void main() {
  gl_Position = transform * vertex;    
 // vertColor = color;
}