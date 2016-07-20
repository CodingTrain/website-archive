#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

varying vec4 vertColor;

//input color
uniform vec4 fragColor;

void main() {

  //outputColor
  gl_FragColor = fragColor;
}