// This file was auto-generated. Please do not edit it.

declare class p5 {
  // Properties from p5
  
  // src/3d/3d_primitives.js
  
  /**
   * Draw a plane with given a width and height
   */
  plane(width: number, height: number): p5
  
  /**
   * Draw a sphere with given raduis
   */
  sphere(radius: number, detail?: number): void
  
  /**
   * Draw an ellipsoid with given radius
   */
  ellipsoid(radiusx: number, radiusy: number, radiusz: number, detail?: number): p5
  
  /**
   * Draw a cylinder with given radius and height
   */
  cylinder(radius: number, height: number, detail?: number): p5
  
  /**
   * Draw a cone with given radius and height
   */
  cone(radius: number, height: number, detail?: number): void
  
  /**
   * Draw a torus with given radius and tube radius
   */
  torus(radius: number, tubeRadius: number, detail?: number): void
  
  /**
   * Draw a box with given width, height and depth
   */
  box(width: number, height: number, depth: number): p5
  
  // src/3d/camera.js
  
  /**
   * Sets camera position
   */
  camera(x: number, y: number, z: number): p5
  
  /**
   * Sets perspective camera
   */
  perspective(fovy: number, aspect: number, near: number, far: number): p5
  
  /**
   * Setup ortho camera
   */
  ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): p5
  
  // src/3d/light.js
  
  /**
   * Creates an ambient light with a color
   */
  ambientLight(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): p5
  
  // TODO: Fix directionalLight() errors in src/3d/light.js:
  //
  //   required param "x" follows an optional param
  //
  // directionalLight(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number, x: number|p5.Vector, y?: number, z?: number): p5
  
  // TODO: Fix pointLight() errors in src/3d/light.js:
  //
  //   required param "x" follows an optional param
  //
  // pointLight(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number, x: number|p5.Vector, y?: number, z?: number): p5
  
  // src/3d/material.js
  
  /**
   * Normal material for geometry
   */
  normalMaterial(): p5
  
  /**
   * Texture for geometry
   */
  texture(): p5
  
  /**
   * Basic material for geometry with a given color
   */
  basicMaterial(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): p5
  
  /**
   * Ambient material for geometry with a given color
   */
  ambientMaterial(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): p5
  
  /**
   * Specular material for geometry with a given color
   */
  specularMaterial(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): p5
  
  // src/color/creating_reading.js
  
  /**
   * Extracts the alpha value from a color or pixel array.
   */
  alpha(obj: any): void
  
  /**
   * Extracts the blue value from a color or pixel array.
   */
  blue(obj: any): void
  
  /**
   * Extracts the HSB brightness value from a color or pixel array.
   */
  brightness(color: any): void
  
  /**
   * Creates colors for storing in variables of the color datatype.
   */
  color(v1: number|string, v2?: number, v3?: number, alpha?: number): any[]
  
  /**
   * Extracts the green value from a color or pixel array.
   */
  green(color: any): void
  
  /**
   * Extracts the hue value from a color or pixel array.
   */
  hue(color: any): void
  
  // TODO: Fix lerpColor() errors in src/color/creating_reading.js:
  //
  //   param "c1" has invalid type: Array/Number
  //   param "c2" has invalid type: Array/Number
  //   return has invalid type: Array/Number
  //
  // lerpColor(c1: Array/Number, c2: Array/Number, amt: number): Array/Number
  
  /**
   * Extracts the HSL lightness value from a color or pixel array.
   */
  lightness(color: any): void
  
  /**
   * Extracts the red value from a color or pixel array.
   */
  red(obj: any): void
  
  /**
   * Extracts the saturation value from a color or pixel array.
   */
  saturation(color: any): void
  
  // src/color/setting.js
  
  /**
   * The background() function sets the color used for the background of the
   * p5.js canvas.
   */
  background(v1: number|string|p5.Color|p5.Image, v2?: number, v3?: number, a?: number): void
  
  /**
   * Clears the pixels within a buffer.
   */
  clear(): void
  
  // TODO: Fix colorMode() errors in src/color/setting.js:
  //
  //   param "mode" has invalid type: Number|Constant
  //   param "max1" has invalid type: Number|Constant
  //   param "max2" has invalid type: Number|Constant
  //   param "max3" has invalid type: Number|Constant
  //   param "maxA" has invalid type: Number|Constant
  //
  // colorMode(mode: number|Constant, max1?: number|Constant, max2?: number|Constant, max3?: number|Constant, maxA?: number|Constant): void
  
  /**
   * Sets the color used to fill shapes.
   */
  fill(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): void
  
  /**
   * Disables filling geometry.
   */
  noFill(): void
  
  /**
   * Disables drawing the stroke (outline).
   */
  noStroke(): void
  
  /**
   * Sets the color used to draw lines and borders around shapes.
   */
  stroke(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): void
  
  // src/core/2d_primitives.js
  
  /**
   * Draw an arc to the screen.
   */
  arc(a: number, b: number, c: number, d: number, start: number, stop: number, mode?: string): any
  
  /**
   * Draws an ellipse (oval) to the screen.
   */
  ellipse(a: number, b: number, c: number, d: number): p5
  
  /**
   * Draws a line (a direct path between two points) to the screen.
   */
  line(x1: number, y1: number, x2: number, y2: number): p5
  
  /**
   * Draws a point, a coordinate in space at the dimension of one pixel.
   */
  point(x: number, y: number): p5
  
  /**
   * Draw a quad.
   */
  quad(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): p5
  
  /**
   * Draws a rectangle to the screen.
   */
  rect(x: number, y: number, w: number, h: number, tl?: number, tr?: number, br?: number, bl?: number): p5
  
  /**
   * A triangle is a plane created by connecting three points.
   */
  triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): p5
  
  // src/core/attributes.js
  
  // TODO: Fix ellipseMode() errors in src/core/attributes.js:
  //
  //   param "mode" has invalid type: Number/Constant
  //
  // ellipseMode(mode: Number/Constant): p5
  
  /**
   * Draws all geometry with jagged (aliased) edges.
   */
  noSmooth(): p5
  
  // TODO: Fix rectMode() errors in src/core/attributes.js:
  //
  //   param "mode" has invalid type: Number/Constant
  //
  // rectMode(mode: Number/Constant): p5
  
  /**
   * Draws all geometry with smooth (anti-aliased) edges.
   */
  smooth(): p5
  
  // TODO: Fix strokeCap() errors in src/core/attributes.js:
  //
  //   param "cap" has invalid type: Number/Constant
  //
  // strokeCap(cap: Number/Constant): p5
  
  // TODO: Fix strokeJoin() errors in src/core/attributes.js:
  //
  //   param "join" has invalid type: Number/Constant
  //
  // strokeJoin(join: Number/Constant): p5
  
  /**
   * Sets the width of the stroke used for lines, points, and the border
   * around shapes.
   */
  strokeWeight(weight: number): p5
  
  // src/core/constants.js
  
  /**
   * HALF_PI is a mathematical constant with the value
   * 1.57079632679489661923.
   */
  HALF_PI: any
  
  /**
   * PI is a mathematical constant with the value
   * 3.14159265358979323846.
   */
  PI: any
  
  /**
   * QUARTER_PI is a mathematical constant with the value 0.7853982.
   */
  QUARTER_PI: any
  
  /**
   * TAU is an alias for TWO_PI, a mathematical constant with the
   * value 6.28318530717958647693.
   */
  TAU: any
  
  /**
   * TWO_PI is a mathematical constant with the value
   * 6.28318530717958647693.
   */
  TWO_PI: any
  
  // src/core/core.js
  
  /**
   * Called directly before setup(), the preload() function is used to handle
   * asynchronous loading of external files.
   */
  preload(): void
  
  /**
   * The setup() function is called once when the program starts.
   */
  // setup(): void
  
  /**
   * Called directly after setup(), the draw() function continuously executes
   * the lines of code contained inside its block until the program is stopped
   * or noLoop() is called.
   */
  draw(): void
  
  /**
   * Removes the entire p5 sketch.
   */
  remove(): void
  
  // src/core/curves.js
  
  /**
   * Draws a cubic Bezier curve on the screen.
   */
  bezier(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): any
  
  /**
   * Evaluates the Bezier at position t for points a, b, c, d.
   */
  bezierPoint(a: number, b: number, c: number, d: number, t: number): number
  
  /**
   * Evaluates the tangent to the Bezier at position t for points a, b, c, d.
   */
  bezierTangent(a: number, b: number, c: number, d: number, t: number): number
  
  /**
   * Draws a curved line on the screen between two points, given as the
   * middle four parameters.
   */
  curve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): any
  
  /**
   * Modifies the quality of forms created with curve() and curveVertex().
   */
  curveTightness(amount: number): any
  
  /**
   * Evaluates the curve at position t for points a, b, c, d.
   */
  curvePoint(a: number, b: number, c: number, d: number, t: number): number
  
  /**
   * Evaluates the tangent to the curve at position t for points a, b, c, d.
   */
  curveTangent(a: number, b: number, c: number, d: number, t: number): number
  
  // src/core/environment.js
  
  /**
   * The print() function writes to the console area of your browser.
   */
  print(contents: any): void
  
  /**
   * The system variable frameCount contains the number of frames that have
   * been displayed since the program started.
   */
  frameCount: any
  
  /**
   * Confirms if the window a p5.js program is in is "focused," meaning that
   * the sketch will accept mouse or keyboard input.
   */
  focused: any
  
  // TODO: Fix cursor() errors in src/core/environment.js:
  //
  //   param "type" has invalid type: Number/Constant
  //
  // cursor(type: Number/Constant, x?: number, y?: number): void
  
  /**
   * Specifies the number of frames to be displayed every second.
   */
  frameRate(fps?: number): number
  
  /**
   * Hides the cursor from view.
   */
  noCursor(): void
  
  /**
   * System variable that stores the width of the entire screen display.
   */
  displayWidth: any
  
  /**
   * System variable that stores the height of the entire screen display.
   */
  displayHeight: any
  
  /**
   * System variable that stores the width of the inner window, it maps to
   * window.innerWidth.
   */
  windowWidth: any
  
  /**
   * System variable that stores the height of the inner window, it maps to
   * window.innerHeight.
   */
  windowHeight: any
  
  /**
   * The windowResized() function is called once every time the browser window
   * is resized.
   */
  windowResized(): void
  
  /**
   * System variable that stores the width of the drawing canvas.
   */
  width: any
  
  /**
   * System variable that stores the height of the drawing canvas.
   */
  height: any
  
  /**
   * If argument is given, sets the sketch to fullscreen or not based on the
   * value of the argument.
   */
  fullscreen(val?: boolean): boolean
  
  /**
   * Sets the pixel scaling for high pixel density displays.
   */
  pixelDensity(val?: number): number
  
  /**
   * Returns the pixel density of the current display the sketch is running on.
   */
  displayDensity(): number
  
  /**
   * Gets the current URL.
   */
  getURL(): string
  
  /**
   * Gets the current URL path as an array.
   */
  getURLPath(): any[]
  
  /**
   * Gets the current URL params as an Object.
   */
  getURLParams(): any
  
  // src/core/rendering.js
  
  /**
   * Creates a canvas element in the document, and sets the dimensions of it
   * in pixels.
   */
  createCanvas(w: number, h: number, renderer?: string): any
  
  /**
   * Resizes the canvas to given width and height.
   */
  resizeCanvas(): void
  
  /**
   * Removes the default canvas for a p5 sketch that doesn't
   * require a canvas
   */
  noCanvas(): void
  
  /**
   * Creates and returns a new p5.Renderer object.
   */
  createGraphics(w: number, h: number, renderer: string): any
  
  // TODO: Fix blendMode() errors in src/core/rendering.js:
  //
  //   param "mode" has invalid type: String/Constant
  //
  // blendMode(mode: String/Constant): void
  
  // src/core/structure.js
  
  /**
   * Stops p5.js from continuously executing the code within draw().
   */
  noLoop(): void
  
  /**
   * By default, p5.js loops through draw() continuously, executing the code
   * within it.
   */
  loop(): void
  
  /**
   * The push() function saves the current drawing style settings and
   * transformations, while pop() restores these settings.
   */
  push(): void
  
  /**
   * The push() function saves the current drawing style settings and
   * transformations, while pop() restores these settings.
   */
  pop(): void
  
  /**
   * Executes the code within draw() one time.
   */
  redraw(): void
  
  // src/core/transform.js
  
  /**
   * Multiplies the current matrix by the one specified through the parameters.
   */
  applyMatrix(n00: number, n01: number, n02: number, n10: number, n11: number, n12: number): p5
  
  /**
   * Replaces the current matrix with the identity matrix.
   */
  resetMatrix(): p5
  
  /**
   * Rotates a shape the amount specified by the angle parameter.
   */
  rotate(angle: number): p5
  
  // TODO: Fix scale() errors in src/core/transform.js:
  //
  //   param "s" has invalid type: Number | p5.Vector | Array
  //
  // scale(s: Number | p5.Vector | Array, y?: number, z?: number): p5
  
  /**
   * Shears a shape around the x-axis the amount specified by the angle
   * parameter.
   */
  shearX(angle: number): p5
  
  /**
   * Shears a shape around the y-axis the amount specified by the angle
   * parameter.
   */
  shearY(angle: number): p5
  
  /**
   * Specifies an amount to displace objects within the display window.
   */
  translate(x: number, y: number): p5
  
  // src/core/vertex.js
  
  /**
   * Use the beginContour() and endContour() functions to create negative
   * shapes within shapes such as the center of the letter 'O'.
   */
  beginContour(): any
  
  // TODO: Fix beginShape() errors in src/core/vertex.js:
  //
  //   param "kind" has invalid type: Number/Constant
  //
  // beginShape(kind: Number/Constant): any
  
  /**
   * Specifies vertex coordinates for Bezier curves.
   */
  bezierVertex(x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): any
  
  /**
   * Specifies vertex coordinates for curves.
   */
  curveVertex(x: number, y: number): any
  
  /**
   * Use the beginContour() and endContour() functions to create negative
   * shapes within shapes such as the center of the letter 'O'.
   */
  endContour(): any
  
  // TODO: Fix endShape() errors in src/core/vertex.js:
  //
  //   param "mode" has invalid type: Number/Constant
  //
  // endShape(mode: Number): any
  
  /**
   * Specifies vertex coordinates for quadratic Bezier curves.
   */
  quadraticVertex(cx: number, cy: number, x3: number, y3: number): any
  
  /**
   * All shapes are constructed by connecting a series of vertices.
   */
  vertex(x: number, y: number): any
  
  // src/events/acceleration.js
  
  /**
   * The system variable deviceOrientation always contains the orientation of
   * the device.
   */
  deviceOrientation: any
  
  /**
   * The system variable accelerationX always contains the acceleration of the
   * device along the x axis.
   */
  accelerationX: any
  
  /**
   * The system variable accelerationY always contains the acceleration of the
   * device along the y axis.
   */
  accelerationY: any
  
  /**
   * The system variable accelerationZ always contains the acceleration of the
   * device along the z axis.
   */
  accelerationZ: any
  
  /**
   * The system variable pAccelerationX always contains the acceleration of the
   * device along the x axis in the frame previous to the current frame.
   */
  pAccelerationX: any
  
  /**
   * The system variable pAccelerationY always contains the acceleration of the
   * device along the y axis in the frame previous to the current frame.
   */
  pAccelerationY: any
  
  /**
   * The system variable pAccelerationZ always contains the acceleration of the
   * device along the z axis in the frame previous to the current frame.
   */
  pAccelerationZ: any
  
  /**
   * The system variable rotationX always contains the rotation of the
   * device along the x axis.
   */
  rotationX: any
  
  /**
   * The system variable rotationY always contains the rotation of the
   * device along the y axis.
   */
  rotationY: any
  
  /**
   * The system variable rotationZ always contains the rotation of the
   * device along the z axis.
   */
  rotationZ: any
  
  /**
   * The system variable pRotationX always contains the rotation of the
   * device along the x axis in the frame previous to the current frame.
   */
  pRotationX: any
  
  /**
   * The system variable pRotationY always contains the rotation of the
   * device along the y axis in the frame previous to the current frame.
   */
  pRotationY: any
  
  /**
   * The system variable pRotationZ always contains the rotation of the
   * device along the z axis in the frame previous to the current frame.
   */
  pRotationZ: any
  
  /**
   * The setMoveThreshold() function is used to set the movement threshold for
   * the deviceMoved() function.
   */
  setMoveThreshold(value: number): void
  
  /**
   * The setShakeThreshold() function is used to set the movement threshold for
   * the deviceShaken() function.
   */
  setShakeThreshold(value: number): void
  
  /**
   * The deviceMoved() function is called when the device is moved by more than
   * the threshold value along X, Y or Z axis.
   */
  deviceMoved(): void
  
  /**
   * The deviceTurned() function is called when the device rotates by
   * more than 90 degrees continuously.
   */
  deviceTurned(): void
  
  /**
   * The deviceShaken() function is called when the device total acceleration
   * changes of accelerationX and accelerationY values is more than
   * the threshold value.
   */
  deviceShaken(): void
  
  // src/events/keyboard.js
  
  /**
   * The boolean system variable keyIsPressed is true if any key is pressed
   * and false if no keys are pressed.
   */
  keyIsPressed: any
  
  /**
   * The system variable key always contains the value of the most recent
   * key on the keyboard that was typed.
   */
  key: any
  
  /**
   * The variable keyCode is used to detect special keys such as BACKSPACE,
   * DELETE, ENTER, RETURN, TAB, ESCAPE, SHIFT, CONTROL, OPTION, ALT, UP_ARROW,
   * DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW.
   */
  keyCode: any
  
  /**
   * The keyPressed() function is called once every time a key is pressed.
   */
  keyPressed(): void
  
  /**
   * The keyReleased() function is called once every time a key is released.
   */
  keyReleased(): void
  
  /**
   * The keyTyped() function is called once every time a key is pressed, but
   * action keys such as Ctrl, Shift, and Alt are ignored.
   */
  keyTyped(): void
  
  /**
   * The keyIsDown() function checks if the key is currently down, i.e.
   */
  keyIsDown(code: number): boolean
  
  // src/events/mouse.js
  
  /**
   * The system variable mouseX always contains the current horizontal
   * position of the mouse, relative to (0, 0) of the canvas.
   */
  mouseX: any
  
  /**
   * The system variable mouseY always contains the current vertical position
   * of the mouse, relative to (0, 0) of the canvas.
   */
  mouseY: any
  
  /**
   * The system variable pmouseX always contains the horizontal position of
   * the mouse in the frame previous to the current frame, relative to (0, 0)
   * of the canvas.
   */
  pmouseX: any
  
  /**
   * The system variable pmouseY always contains the vertical position of the
   * mouse in the frame previous to the current frame, relative to (0, 0) of
   * the canvas.
   */
  pmouseY: any
  
  /**
   * The system variable winMouseX always contains the current horizontal
   * position of the mouse, relative to (0, 0) of the window.
   */
  winMouseX: any
  
  /**
   * The system variable winMouseY always contains the current vertical
   * position of the mouse, relative to (0, 0) of the window.
   */
  winMouseY: any
  
  /**
   * The system variable pwinMouseX always contains the horizontal position
   * of the mouse in the frame previous to the current frame, relative to
   * (0, 0) of the window.
   */
  pwinMouseX: any
  
  /**
   * The system variable pwinMouseY always contains the vertical position of
   * the mouse in the frame previous to the current frame, relative to (0, 0)
   * of the window.
   */
  pwinMouseY: any
  
  /**
   * Processing automatically tracks if the mouse button is pressed and which
   * button is pressed.
   */
  mouseButton: any
  
  /**
   * The boolean system variable mouseIsPressed is true if the mouse is pressed
   * and false if not.
   */
  mouseIsPressed: any
  
  /**
   * The mouseMoved() function is called every time the mouse moves and a mouse
   * button is not pressed.<br><br>
   * Browsers may have different default
   * behaviors attached to various mouse events.
   */
  mouseMoved(): void
  
  /**
   * The mouseDragged() function is called once every time the mouse moves and
   * a mouse button is pressed.
   */
  mouseDragged(): void
  
  /**
   * The mousePressed() function is called once after every time a mouse button
   * is pressed.
   */
  mousePressed(): void
  
  /**
   * The mouseReleased() function is called every time a mouse button is
   * released.
   */
  mouseReleased(): void
  
  /**
   * The mouseClicked() function is called once after a mouse button has been
   * pressed and then released.<br><br>
   * Browsers may have different default
   * behaviors attached to various mouse events.
   */
  mouseClicked(): void
  
  /**
   * The function mouseWheel() is executed every time a vertical mouse wheel
   * event is detected either triggered by an actual mouse wheel or by a
   * touchpad.<br><br>
   * The event.delta property returns the amount the mouse wheel
   * have scrolled.
   */
  mouseWheel(): void
  
  // src/events/touch.js
  
  /**
   * The system variable touchX always contains the horizontal position of
   * one finger, relative to (0, 0) of the canvas.
   */
  touchX: any
  
  /**
   * The system variable touchY always contains the vertical position of
   * one finger, relative to (0, 0) of the canvas.
   */
  touchY: any
  
  /**
   * The system variable ptouchX always contains the horizontal position of
   * one finger, relative to (0, 0) of the canvas, in the frame previous to the
   * current frame.
   */
  ptouchX: any
  
  /**
   * The system variable ptouchY always contains the vertical position of
   * one finger, relative to (0, 0) of the canvas, in the frame previous to the
   * current frame.
   */
  ptouchY: any
  
  // TODO: Property "touches[]", defined in src/events/touch.js, is not a valid JS symbol name
  
  /**
   * The boolean system variable touchIsDown is true if the screen is
   * touched and false if not.
   */
  touchIsDown: any
  
  /**
   * The touchStarted() function is called once after every time a touch is
   * registered.
   */
  touchStarted(): void
  
  /**
   * The touchMoved() function is called every time a touch move is registered.
   */
  touchMoved(): void
  
  /**
   * The touchEnded() function is called every time a touch ends.
   */
  touchEnded(): void
  
  // src/image/image.js
  
  /**
   * Creates a new p5.Image (the datatype for storing images).
   */
  createImage(width: number, height: number): p5.Image
  
  // TODO: Fix saveCanvas() errors in src/image/image.js:
  //
  //   param "canvas" has invalid type: [selectedCanvas]
  //   param "filename" has invalid type: [String]
  //   param "extension" has invalid type: [String]
  //
  // saveCanvas(canvas: [selectedCanvas], filename: [String], extension: [String]): void
  
  /**
   * Capture a sequence of frames that can be used to create a movie.
   */
  saveFrames(filename: string, extension: string, duration: number, framerate: number, callback?: () => any): void
  
  // src/image/loading_displaying.js
  
  // TODO: Fix loadImage() errors in src/image/loading_displaying.js:
  //
  //   param "successCallback" has invalid type: Function(p5.Image)
  //   param "failureCallback" has invalid type: Function(Event)
  //
  // loadImage(path: string, successCallback?: Function(p5.Image), failureCallback?: Function(Event)): p5.Image
  
  /**
   * Draw an image to the main canvas of the p5js sketch
   */
  image(img: p5.Image, sx?: number, sy?: number, sWidth?: number, sHeight?: number, dx?: number, dy?: number, dWidth?: number, dHeight?: number): void
  
  /**
   * Sets the fill value for displaying images.
   */
  tint(v1: number|any[], v2?: number|any[], v3?: number|any[], a?: number|any[]): void
  
  /**
   * Removes the current fill value for displaying images and reverts to
   * displaying images with their original hues.
   */
  noTint(): void
  
  /**
   * Set image mode.
   */
  imageMode(m: string): void
  
  // src/image/pixels.js
  
  // TODO: Property "pixels[]", defined in src/image/pixels.js, is not a valid JS symbol name
  
  // TODO: Fix blend() errors in src/image/pixels.js:
  //
  //   param "srcImage" has invalid type: p5.Image|undefined
  //
  // blend(srcImage: p5.Image|undefined, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number, blendMode: number): void
  
  // TODO: Fix copy() errors in src/image/pixels.js:
  //
  //   param "srcImage" has invalid type: p5.Image|undefined
  //
  // copy(srcImage: p5.Image|undefined, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
  
  /**
   * Applies a filter to the canvas.
   */
  filter(filterType: string, filterParam: number): void
  
  /**
   * Returns an array of [R,G,B,A] values for any pixel or grabs a section of
   * an image.
   */
  get(x?: number, y?: number, w?: number, h?: number): any[]|p5.Image
  
  /**
   * Loads the pixel data for the display window into the pixels[] array.
   */
  loadPixels(): void
  
  /**
   * <p>Changes the color of any pixel, or writes an image directly to the
   * display window.</p>
   * <p>The x and y parameters specify the pixel to change and the c parameter
   * specifies the color value.
   */
  set(x: number, y: number, c: number|any[]|any): void
  
  // TODO: Fix updatePixels() errors in src/image/pixels.js:
  //
  //   param "w" is defined multiple times
  //
  // updatePixels(x?: number, y?: number, w?: number, w?: number): void
  
  // src/io/files.js
  
  /**
   * Loads an opentype font file (.otf, .ttf) from a file or a URL,
   * and returns a PFont Object.
   */
  loadFont(path: string, callback?: () => any): any
  
  /**
   * Loads a JSON file from a file or a URL, and returns an Object or Array.
   */
  loadJSON(path: string, callback?: () => any, errorCallback?: () => any, datatype?: string): any|any[]
  
  /**
   * Reads the contents of a file and creates a String array of its individual
   * lines.
   */
  loadStrings(filename: string, callback?: () => any, errorCallback?: () => any): any[]
  
  // TODO: Fix loadTable() errors in src/io/files.js:
  //
  //   param "options" has invalid type: String|Strings
  //
  // loadTable(filename: string, options?: string|Strings, callback?: () => any): any
  
  /**
   * Reads the contents of a file and creates an XML object with its values.
   */
  loadXML(filename: string, callback?: () => any, errorCallback?: () => any): any
  
  /**
   * Method for executing an HTTP GET request.
   */
  httpGet(path: string, data?: any, datatype?: string, callback?: () => any, errorCallback?: () => any): void
  
  /**
   * Method for executing an HTTP POST request.
   */
  httpPost(path: string, data?: any, datatype?: string, callback?: () => any, errorCallback?: () => any): void
  
  /**
   * Method for executing an HTTP request.
   */
  httpDo(path: string, method?: string, data?: any, datatype?: string, callback?: () => any, errorCallback?: () => any): void
  
  // TODO: Fix save() errors in src/io/files.js:
  //
  //   param "objectOrFilename" has invalid type: [Object|String]
  //   param "filename" has invalid type: [String]
  //   param "options" has invalid type: [Boolean/String]
  //
  // save(objectOrFilename: [Object|String], filename: [String], options: [Boolean/String]): void
  
  /**
   * Writes the contents of an Array or a JSON object to a .json file.
   */
  saveJSON(json: any[]|any, filename: string, optimize?: boolean): void
  
  /**
   * Writes an array of Strings to a text file, one line per String.
   */
  saveStrings(list: any[], filename: string): void
  
  /**
   * Writes the contents of a Table object to a file.
   */
  saveTable(Table: p5.Table, filename: string, options?: string): void
  
  // src/math/calculation.js
  
  /**
   * Calculates the absolute value (magnitude) of a number.
   */
  abs(n: number): number
  
  /**
   * Calculates the closest int value that is greater than or equal to the
   * value of the parameter.
   */
  ceil(n: number): number
  
  /**
   * Constrains a value between a minimum and maximum value.
   */
  constrain(n: number, low: number, high: number): number
  
  // TODO: Fix dist() errors in src/math/calculation.js:
  //
  //   required param "x2" follows an optional param
  //   required param "y2" follows an optional param
  //
  // dist(x1: number, y1: number, z1?: number, x2: number, y2: number, z2?: number): number
  
  /**
   * Returns Euler's number e (2.71828...) raised to the power of the n
   * parameter.
   */
  exp(n: number): number
  
  /**
   * Calculates the closest int value that is less than or equal to the
   * value of the parameter.
   */
  floor(n: number): number
  
  /**
   * Calculates a number between two numbers at a specific increment.
   */
  lerp(start: number, stop: number, amt: number): number
  
  /**
   * Calculates the natural logarithm (the base-e logarithm) of a number.
   */
  log(n: number): number
  
  /**
   * Calculates the magnitude (or length) of a vector.
   */
  mag(a: number, b: number): number
  
  /**
   * Re-maps a number from one range to another.
   */
  map(value: number, start1: number, stop1: number, start2: number, stop: number): number
  
  /**
   * Determines the largest value in a sequence of numbers, and then returns
   * that value.
   */
  max(n0: number|any[]): number
  
  /**
   * Determines the smallest value in a sequence of numbers, and then returns
   * that value.
   */
  min(n0: number|any[]): number
  
  /**
   * Normalizes a number from another range into a value between 0 and 1.
   */
  norm(value: number, start: number, stop: number): number
  
  /**
   * Facilitates exponential expressions.
   */
  pow(n: number, e: number): number
  
  /**
   * Calculates the integer closest to the n parameter.
   */
  round(n: number): number
  
  /**
   * Squares a number (multiplies a number by itself).
   */
  sq(n: number): number
  
  /**
   * Calculates the square root of a number.
   */
  sqrt(n: number): number
  
  // src/math/math.js
  
  /**
   * Creates a new p5.Vector (the datatype for storing vectors).
   */
  createVector(x?: number, y?: number, z?: number): void
  
  // src/math/noise.js
  
  /**
   * Returns the Perlin noise value at specified coordinates.
   */
  noise(x: number, y: number, z: number): number
  
  /**
   * Adjusts the character and level of detail produced by the Perlin noise
   *  function.
   */
  noiseDetail(lod: number, falloff: number): void
  
  /**
   * Sets the seed value for <b>noise()</b>.
   */
  noiseSeed(seed: number): void
  
  // src/math/random.js
  
  /**
   * Sets the seed value for random().
   */
  randomSeed(seed: number): void
  
  /**
   * Return a random number.
   */
  random(min: number, max: number): number
  
  /**
   * Returns a random number fitting a Gaussian, or
   *  normal, distribution.
   */
  randomGaussian(mean: number, sd: number): number
  
  // src/math/trigonometry.js
  
  /**
   * The inverse of cos(), returns the arc cosine of a value.
   */
  acos(value: number): number
  
  /**
   * The inverse of sin(), returns the arc sine of a value.
   */
  asin(value: number): number
  
  /**
   * The inverse of tan(), returns the arc tangent of a value.
   */
  atan(value: number): number
  
  /**
   * Calculates the angle (in radians) from a specified point to the coordinate
   * origin as measured from the positive x-axis.
   */
  atan2(y: number, x: number): number
  
  /**
   * Calculates the cosine of an angle.
   */
  cos(angle: number): number
  
  /**
   * Calculates the sine of an angle.
   */
  sin(angle: number): number
  
  /**
   * Calculates the tangent of an angle.
   */
  tan(angle: number): number
  
  /**
   * Converts a radian measurement to its corresponding value in degrees.
   */
  degrees(radians: number): number
  
  /**
   * Converts a degree measurement to its corresponding value in radians.
   */
  radians(degrees: number): number
  
  // TODO: Fix angleMode() errors in src/math/trigonometry.js:
  //
  //   param "mode" has invalid type: Number/Constant
  //
  // angleMode(mode: Number/Constant): void
  
  // src/typography/attributes.js
  
  // TODO: Fix textAlign() errors in src/typography/attributes.js:
  //
  //   param "horizAlign" has invalid type: Number/Constant
  //   param "vertAlign" has invalid type: Number/Constant
  //
  // textAlign(horizAlign: Number/Constant, vertAlign: Number/Constant): number
  
  /**
   * Sets/gets the spacing, in pixels, between lines of text.
   */
  textLeading(leading: number): any|number
  
  /**
   * Sets/gets the current font size.
   */
  textSize(theSize: number): any|number
  
  // TODO: Fix textStyle() errors in src/typography/attributes.js:
  //
  //   param "theStyle" has invalid type: Number/Constant
  //
  // textStyle(theStyle: Number/Constant): any|string
  
  /**
   * Calculates and returns the width of any character or text string.
   */
  textWidth(theText: string): number
  
  // src/typography/loading_displaying.js
  
  /**
   * Draws text to the screen.
   */
  text(str: string, x: number, y: number, x2: number, y2: number): any
  
  /**
   * Sets the current font that will be drawn with the text() function.
   */
  textFont(f: any|string): any
  
  // src/utilities/array_functions.js
  
  /**
   * Adds a value to the end of an array.
   */
  append(array: any[], value: any): void
  
  // TODO: Fix arrayCopy() errors in src/utilities/array_functions.js:
  //
  //   required param "dst" follows an optional param
  //
  // arrayCopy(src: any[], srcPosition?: number, dst: any[], dstPosition?: number, length?: number): void
  
  /**
   * Concatenates two arrays, maps to Array.concat().
   */
  concat(a: any[], b: any[]): any[]
  
  /**
   * Reverses the order of an array, maps to Array.reverse()
   */
  reverse(list: any[]): void
  
  /**
   * Decreases an array by one element and returns the shortened array,
   * maps to Array.pop().
   */
  shorten(list: any[]): any[]
  
  /**
   * Randomizes the order of the elements of an array.
   */
  shuffle(array: any[], bool?: boolean): any[]
  
  /**
   * Sorts an array of numbers from smallest to largest, or puts an array of
   * words in alphabetical order.
   */
  sort(list: any[], count?: number): void
  
  /**
   * Inserts a value or an array of values into an existing array.
   */
  splice(list: any[], value: any, position: number): void
  
  /**
   * Extracts an array of elements from an existing array.
   */
  subset(list: any[], start: number, count?: number): any[]
  
  // src/utilities/conversion.js
  
  /**
   * Converts a string to its floating point representation.
   */
  float(str: string): number
  
  /**
   * Converts a boolean, string, or float to its integer representation.
   */
  int(n: string|boolean|number|any[]): number
  
  /**
   * Converts a boolean, string or number to its string representation.
   */
  str(n: string|boolean|number|any[]): string
  
  /**
   * Converts a number or string to its boolean representation.
   */
  boolean(n: string|boolean|number|any[]): boolean
  
  /**
   * Converts a number, string or boolean to its byte representation.
   */
  byte(n: string|boolean|number|any[]): number
  
  /**
   * Converts a number or string to its corresponding single-character
   * string representation.
   */
  char(n: string|number|any[]): string
  
  /**
   * Converts a single-character string to its corresponding integer
   * representation.
   */
  unchar(n: string|any[]): number
  
  /**
   * Converts a number to a string in its equivalent hexadecimal notation.
   */
  hex(n: number|any[]): string
  
  /**
   * Converts a string representation of a hexadecimal number to its equivalent
   * integer value.
   */
  unhex(n: string|any[]): number
  
  // src/utilities/string_functions.js
  
  /**
   * Combines an array of Strings into one String, each separated by the
   * character(s) used for the separator parameter.
   */
  join(list: any[], separator: string): string
  
  /**
   * This function is used to apply a regular expression to a piece of text,
   * and return matching groups (elements found inside parentheses) as a
   * String array.
   */
  match(str: string, regexp: string): any[]
  
  /**
   * This function is used to apply a regular expression to a piece of text,
   * and return a list of matching groups (elements found inside parentheses)
   * as a two-dimensional String array.
   */
  matchAll(str: string, regexp: string): any[]
  
  /**
   * Utility function for formatting numbers into strings.
   */
  nf(num: number|any[], left?: number, right?: number): string|any[]
  
  /**
   * Utility function for formatting numbers into strings and placing
   * appropriate commas to mark units of 1000.
   */
  nfc(num: number|any[], right?: number): string|any[]
  
  /**
   * Utility function for formatting numbers into strings.
   */
  nfp(num: number|any[], left?: number, right?: number): string|any[]
  
  /**
   * Utility function for formatting numbers into strings.
   */
  nfs(num: number|any[], left?: number, right?: number): string|any[]
  
  /**
   * The split() function maps to String.split(), it breaks a String into
   * pieces using a character or string as the delimiter.
   */
  split(value: string, delim: string): any[]
  
  /**
   * The splitTokens() function splits a String at one or many character
   * delimiters or "tokens." The delim parameter specifies the character or
   * characters to be used as a boundary.
   */
  splitTokens(value: string, delim?: string): any[]
  
  /**
   * Removes whitespace characters from the beginning and end of a String.
   */
  trim(str?: string|any[]): string|any[]
  
  // src/utilities/time_date.js
  
  /**
   * p5.js communicates with the clock on your computer.
   */
  day(): number
  
  /**
   * p5.js communicates with the clock on your computer.
   */
  hour(): number
  
  /**
   * p5.js communicates with the clock on your computer.
   */
  minute(): number
  
  /**
   * Returns the number of milliseconds (thousandths of a second) since
   * starting the program.
   */
  millis(): number
  
  /**
   * p5.js communicates with the clock on your computer.
   */
  month(): number
  
  /**
   * p5.js communicates with the clock on your computer.
   */
  second(): number
  
  /**
   * p5.js communicates with the clock on your computer.
   */
  year(): number
  
  // Properties from p5.dom
  
  // lib/addons/p5.dom.js
  
  // TODO: Fix select() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element|Null
  //
  // select(name: string, container?: string): Object/p5.Element|Null
  
  /**
   * Searches the page for elements with the given class or tag name (using the '.' prefix
   * to specify a class and no prefix for a tag) and returns them as p5.Elements
   * in an array.
   */
  selectAll(name: string, container?: string): any[]
  
  /**
   * Removes all elements created by p5, except any canvas / graphics
   * elements created by createCanvas or createGraphics.
   */
  removeElements(): void
  
  // TODO: Fix createDiv() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createDiv(html: string): Object/p5.Element
  
  // TODO: Fix createP() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createP(html: string): Object/p5.Element
  
  // TODO: Fix createSpan() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createSpan(html: string): Object/p5.Element
  
  // TODO: Fix createImg() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createImg(src: string, alt?: string, successCallback?: () => any): Object/p5.Element
  
  // TODO: Fix createA() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createA(href: string, html: string, target?: string): Object/p5.Element
  
  // TODO: Fix createSlider() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createSlider(min: number, max: number, value?: number): Object/p5.Element
  
  // TODO: Fix createButton() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createButton(label: string, value?: string): Object/p5.Element
  
  // TODO: Fix createCheckbox() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createCheckbox(label?: string, value?: boolean): Object/p5.Element
  
  // TODO: Fix createSelect() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createSelect(multiple?: boolean): Object/p5.Element
  
  // TODO: Fix createRadio() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createRadio(divId?: string): Object/p5.Element
  
  // TODO: Fix createInput() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createInput(value?: number): Object/p5.Element
  
  // TODO: Fix createFileInput() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createFileInput(callback?: () => any, multiple?: string): Object/p5.Element
  
  // TODO: Fix createVideo() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createVideo(src: string|any[], callback?: any): Object/p5.Element
  
  // TODO: Fix createAudio() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createAudio(src: string|any[], callback?: any): Object/p5.Element
  
  // TODO: Fix createCapture() errors in lib/addons/p5.dom.js:
  //
  //   param "type" has invalid type: String|Constant|Object
  //   return has invalid type: Object/p5.Element
  //
  // createCapture(type: string|Constant|any, callback: () => any): Object/p5.Element
  
  // TODO: Fix createElement() errors in lib/addons/p5.dom.js:
  //
  //   return has invalid type: Object/p5.Element
  //
  // createElement(tag: string, content?: string): Object/p5.Element
  
  // Properties from p5.sound
  
  // lib/addons/p5.sound.js
  
  /**
   * <p>Returns the Audio Context for this sketch.
   */
  getAudioContext(): any
  
  /**
   * Returns a number representing the master amplitude (volume) for sound 
   * in this sketch.
   */
  getMasterVolume(): number
  
  /**
   * <p>Scale the output of all sound in this sketch</p>
   * Scaled between 0.0 (silence) and 1.0 (full volume).
   */
  masterVolume(volume: number|any, rampTime?: number, timeFromNow?: number): void
  
  // TODO: Property "p5.soundOut", defined in lib/addons/p5.sound.js, is not a valid JS symbol name
  
  /**
   * Returns a number representing the sample rate, in samples per second,
   * of all sound objects in this audio context.
   */
  sampleRate(): number
  
  /**
   * Returns the frequency value of a MIDI note value.
   */
  midiToFreq(midiNote: number): number
  
  // TODO: Fix soundFormats() errors in lib/addons/p5.sound.js:
  //
  //   param "formats" has invalid type: String|Strings
  //
  // soundFormats(formats: string|Strings): void
  
  // TODO: Property "{String} failedPath path to the file that failed to load", defined in lib/addons/p5.sound.js, is not a valid JS symbol name
  
}

declare namespace p5 {
  // src/color/p5.Color.js
  
  class Color {
    /**
     * We define colors to be immutable objects.
     */
    constructor()
  }
  
  // src/core/p5.Element.js
  
  class Element {
    /**
     * Base class for all elements added to a sketch, including canvas,
     * graphics buffers, and other HTML elements.
     */
    constructor(elt: string, pInst?: any)
    
    /**
     * Underlying HTML element.
     */
    elt: any
    
    /**
     * Attaches the element to the parent specified.
     */
    parent(parent: string|any): p5.Element
    
    /**
     * Sets the ID of the element
     */
    id(id: string): p5.Element
    
    // TODO: Fix class() errors in src/core/p5.Element.js:
    //
    //   param "class" is a reserved word in JS
    //
    // class(class: string): p5.Element
    
    /**
     * The .mousePressed() function is called once after every time a
     * mouse button is pressed over the element.
     */
    mousePressed(fxn: () => any): p5.Element
    
    /**
     * The .mouseWheel() function is called once after every time a
     * mouse wheel is scrolled over the element.
     */
    mouseWheel(fxn: () => any): p5.Element
    
    /**
     * The .mouseReleased() function is called once after every time a
     * mouse button is released over the element.
     */
    mouseReleased(fxn: () => any): p5.Element
    
    /**
     * The .mouseClicked() function is called once after a mouse button is
     * pressed and released over the element.
     */
    mouseClicked(fxn: () => any): p5.Element
    
    /**
     * The .mouseMoved() function is called once every time a
     * mouse moves over the element.
     */
    mouseMoved(fxn: () => any): p5.Element
    
    /**
     * The .mouseOver() function is called once after every time a
     * mouse moves onto the element.
     */
    mouseOver(fxn: () => any): p5.Element
    
    /**
     * The .changed() function is called when the value of an
     * element is changed.
     */
    changed(fxn: () => any): p5.Element
    
    /**
     * The .input() function is called when any user input is
     * detected with an element.
     */
    input(fxn: () => any): p5.Element
    
    /**
     * The .mouseOut() function is called once after every time a
     * mouse moves off the element.
     */
    mouseOut(fxn: () => any): p5.Element
    
    /**
     * The .touchStarted() function is called once after every time a touch is
     * registered.
     */
    touchStarted(fxn: () => any): p5.Element
    
    /**
     * The .touchMoved() function is called once after every time a touch move is
     * registered.
     */
    touchMoved(fxn: () => any): p5.Element
    
    /**
     * The .touchEnded() function is called once after every time a touch is
     * registered.
     */
    touchEnded(fxn: () => any): p5.Element
    
    /**
     * The .dragOver() function is called once after every time a
     * file is dragged over the element.
     */
    dragOver(fxn: () => any): p5.Element
    
    /**
     * The .dragLeave() function is called once after every time a
     * dragged file leaves the element area.
     */
    dragLeave(fxn: () => any): p5.Element
    
    // TODO: Fix drop() errors in src/core/p5.Element.js:
    //
    //   param "callback" is defined multiple times
    //
    // drop(callback: () => any, callback: () => any): p5.Element
    
    // lib/addons/p5.dom.js
    
    // TODO: Fix addClass() errors in lib/addons/p5.dom.js:
    //
    //   param "class" is a reserved word in JS
    //   return has invalid type: Object/p5.Element
    //
    // addClass(class: string): Object/p5.Element
    
    // TODO: Fix removeClass() errors in lib/addons/p5.dom.js:
    //
    //   param "class" is a reserved word in JS
    //   return has invalid type: Object/p5.Element
    //
    // removeClass(class: string): Object/p5.Element
    
    /**
     * Attaches the element  as a child to the parent specified.
     */
    child(child?: string|any|p5.Element): p5.Element
    
    // TODO: Fix html() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.Element|String
    //
    // html(html?: string): Object/p5.Element|string
    
    // TODO: Fix position() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.Element
    //
    // position(x?: number, y?: number): Object/p5.Element
    
    // TODO: Fix style() errors in lib/addons/p5.dom.js:
    //
    //   param "value" is defined multiple times
    //   param "value" is defined multiple times
    //   param "value" is defined multiple times
    //   return has invalid type: String|Object/p5.Element
    //
    style(property: string, value?: string|number|p5.Color, value1?: string|number, value2?: string|number, value3?: string|number): string|p5.Element
    
    // TODO: Fix attribute() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: String|Object/p5.Element
    //
    // attribute(attr: string, value?: string): string|Object/p5.Element
    
    // TODO: Fix value() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: String|Object/p5.Element
    //
    // value(value?: string|number): string|Object/p5.Element
    
    // TODO: Fix show() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.Element
    //
    // show(): Object/p5.Element
    
    // TODO: Fix hide() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.Element
    //
    // hide(): Object/p5.Element
    
    // TODO: Fix size() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.Element
    //
    // size(w?: number, h?: number): Object/p5.Element
    
    /**
     * Removes the element and deregisters all listeners.
     */
    remove(): void
  }
  
  // src/core/p5.Graphics.js
  
  class Graphics extends p5.Element {
    // TODO: Fix p5.Graphics() errors in src/core/p5.Graphics.js:
    //
    //   required param "whether" follows an optional param
    //
    // constructor(elt: string, pInst?: any, whether: boolean)
    
  }
  
  // src/core/p5.Renderer.js
  
  class Renderer extends p5.Element {
    // TODO: Fix p5.Renderer() errors in src/core/p5.Renderer.js:
    //
    //   required param "whether" follows an optional param
    //
    // constructor(elt: string, pInst?: any, whether: boolean)
    
  }
  
  // src/image/p5.Image.js
  
  class Image {
    /**
     * Creates a new p5.Image.
     */
    constructor(width: number, height: number, pInst: any)
    
    /**
     * Image width.
     */
    width: any
    
    /**
     * Image height.
     */
    height: any
    
    // TODO: Property "pixels[]", defined in src/image/p5.Image.js, is not a valid JS symbol name
    
    /**
     * Loads the pixels data for this image into the [pixels] attribute.
     */
    loadPixels(): void
    
    // TODO: Fix updatePixels() errors in src/image/p5.Image.js:
    //
    //   param "x" has invalid type: Integer|undefined
    //   param "y" has invalid type: Integer|undefined
    //   param "w" has invalid type: Integer|undefined
    //   param "h" has invalid type: Integer|undefined
    //
    // updatePixels(x: number|undefined, y: number|undefined, w: number|undefined, h: number|undefined): void
    
    // TODO: Fix get() errors in src/image/p5.Image.js:
    //
    //   return has invalid type: Array/Color | p5.Image
    //
    // get(x?: number, y?: number, w?: number, h?: number): Array/Color | p5.Image
    
    /**
     * Set the color of a single pixel or write an image into
     * this p5.Image.
     */
    set(x: number, y: number, a: number|any[]|any): void
    
    /**
     * Resize the image to a new width and height.
     */
    resize(width: number, height: number): void
    
    // TODO: Fix copy() errors in src/image/p5.Image.js:
    //
    //   param "srcImage" has invalid type: p5.Image|undefined
    //
    // copy(srcImage: p5.Image|undefined, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void
    
    /**
     * Masks part of an image from displaying by loading another
     * image and using it's blue channel as an alpha channel for
     * this image.
     */
    mask(srcImage: p5.Image): void
    
    // TODO: Fix filter() errors in src/image/p5.Image.js:
    //
    //   param "value" has invalid type: Number|undefined
    //
    // filter(operation: string, value: number|undefined): void
    
    // TODO: Fix blend() errors in src/image/p5.Image.js:
    //
    //   param "srcImage" has invalid type: p5.Image|undefined
    //
    // blend(srcImage: p5.Image|undefined, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number, blendMode: number): void
    
    /**
     * Saves the image to a file and force the browser to download it.
     */
    save(filename: string, extension: string): void
  }
  
  // src/io/p5.Table.js
  
  class Table {
    /**
     * Table objects store data with multiple rows and columns, much
     * like in a traditional spreadsheet.
     */
    constructor(rows?: any[])
    columns: any
    rows: any
    
    /**
     * Use addRow() to add a new row of data to a p5.Table object.
     */
    addRow(row?: p5.TableRow): void
    
    /**
     * Removes a row from the table object.
     */
    removeRow(id: number): void
    
    // TODO: Fix getRow() errors in src/io/p5.Table.js:
    //
    //   return has invalid type: TableRow
    //
    // getRow(rowID: number): TableRow
    
    /**
     * Gets all rows from the table.
     */
    getRows(): any[]
    
    // TODO: Fix findRow() errors in src/io/p5.Table.js:
    //
    //   return has invalid type: TableRow
    //
    // findRow(value: string, column: number|string): TableRow
    
    /**
     * Finds the rows in the Table that contain the value
     * provided, and returns references to those rows.
     */
    findRows(value: string, column: number|string): any[]
    
    // TODO: Fix matchRow() errors in src/io/p5.Table.js:
    //
    //   return has invalid type: TableRow
    //
    // matchRow(regexp: string, column: string|number): TableRow
    
    /**
     * Finds the first row in the Table that matches the regular
     * expression provided, and returns a reference to that row.
     */
    matchRows(regexp: string, column?: string|number): any[]
    
    /**
     * Retrieves all values in the specified column, and returns them
     * as an array.
     */
    getColumn(column: string|number): any[]
    
    /**
     * Removes all rows from a Table.
     */
    clearRows(): void
    
    /**
     * Use addColumn() to add a new column to a Table object.
     */
    addColumn(title?: string): void
    
    /**
     * Returns the total number of rows in a Table.
     */
    getRowCount(): number
    
    /**
     * <p>Removes any of the specified characters (or "tokens").</p>
     * 
     * <p>If no column is specified, then the values in all columns and
     * rows are processed.
     */
    removeTokens(chars: string, column?: string|number): void
    
    /**
     * Trims leading and trailing whitespace, such as spaces and tabs,
     * from String table values.
     */
    trim(column: string|number): void
    
    /**
     * Use removeColumn() to remove an existing column from a Table
     * object.
     */
    removeColumn(column: string|number): void
    
    /**
     * Stores a value in the Table's specified row and column.
     */
    set(column: string|number, value: string|number): void
    
    /**
     * Stores a Float value in the Table's specified row and column.
     */
    setNum(row: number, column: string|number, value: number): void
    
    /**
     * Stores a String value in the Table's specified row and column.
     */
    setString(row: number, column: string|number, value: string): void
    
    /**
     * Retrieves a value from the Table's specified row and column.
     */
    get(row: number, column: string|number): string|number
    
    /**
     * Retrieves a Float value from the Table's specified row and column.
     */
    getNum(row: number, column: string|number): number
    
    /**
     * Retrieves a String value from the Table's specified row and column.
     */
    getString(row: number, column: string|number): string
    
    /**
     * Retrieves all table data and returns as an object.
     */
    getObject(headerColumn: string): any
    
    /**
     * Retrieves all table data and returns it as a multidimensional array.
     */
    getArray(): any[]
  }
  
  // src/io/p5.TableRow.js
  
  class TableRow {
    /**
     * A TableRow object represents a single row of data values,
     * stored in columns, from a table.
     */
    constructor(str?: string, separator?: string)
    
    /**
     * Stores a value in the TableRow's specified column.
     */
    set(column: string|number, value: string|number): void
    
    /**
     * Stores a Float value in the TableRow's specified column.
     */
    setNum(column: string|number, value: number): void
    
    /**
     * Stores a String value in the TableRow's specified column.
     */
    setString(column: string|number, value: string): void
    
    /**
     * Retrieves a value from the TableRow's specified column.
     */
    get(column: string|number): string|number
    
    /**
     * Retrieves a Float value from the TableRow's specified
     * column.
     */
    getNum(column: string|number): number
    
    /**
     * Retrieves an String value from the TableRow's specified
     * column.
     */
    getString(column: string|number): string
  }
  
  // src/math/p5.Vector.js
  
  class Vector {
    /**
     * A class to describe a two or three dimensional vector, specifically
     * a Euclidean (also known as geometric) vector.
     */
    constructor(x?: number, y?: number, z?: number)
    
    /**
     * The x component of the vector
     */
    x: any
    
    /**
     * The y component of the vector
     */
    y: any
    
    /**
     * The z component of the vector
     */
    z: any
    
    /**
     * Returns a string representation of a vector v by calling String(v)
     * or v.toString().
     */
    toString(): void
    
    /**
     * Sets the x, y, and z component of the vector using two or three separate
     * variables, the data from a p5.Vector, or the values from a float array.
     */
    set(x?: number|p5.Vector|any[], y?: number, z?: number): void
    
    /**
     * Gets a copy of the vector, returns a p5.Vector object.
     */
    copy(): p5.Vector
    
    /**
     * Adds x, y, and z components to a vector, adds one vector to another, or
     * adds two independent vectors together.
     */
    add(x: number|p5.Vector|any[], y?: number, z?: number): p5.Vector
    
    /**
     * Subtracts x, y, and z components from a vector, subtracts one vector from
     * another, or subtracts two independent vectors.
     */
    sub(x: number|p5.Vector|any[], y?: number, z?: number): p5.Vector
    
    /**
     * Multiply the vector by a scalar.
     */
    mult(n: number): p5.Vector
    
    /**
     * Divide the vector by a scalar.
     */
    div(n: number): p5.Vector
    
    /**
     * Calculates the magnitude (length) of the vector and returns the result as
     * a float (this is simply the equation sqrt(x*x + y*y + z*z).)
     */
    mag(): number
    
    /**
     * Calculates the squared magnitude of the vector and returns the result
     * as a float (this is simply the equation <em>(x*x + y*y + z*z)</em>.)
     * Faster if the real length is not required in the
     * case of comparing vectors, etc.
     */
    magSq(): number
    
    /**
     * Calculates the dot product of two vectors.
     */
    dot(x: number|p5.Vector, y?: number, z?: number): number
    
    /**
     * Calculates and returns a vector composed of the cross product between
     * two vectors.
     */
    cross(v: p5.Vector): p5.Vector
    
    /**
     * Calculates the Euclidean distance between two points (considering a
     * point as a vector object).
     */
    dist(v: p5.Vector): number
    
    /**
     * Normalize the vector to length 1 (make it a unit vector).
     */
    normalize(): p5.Vector
    
    /**
     * Limit the magnitude of this vector to the value used for the <b>max</b>
     * parameter.
     */
    limit(max: number): p5.Vector
    
    /**
     * Set the magnitude of this vector to the value used for the <b>len</b>
     * parameter.
     */
    setMag(len: number): p5.Vector
    
    /**
     * Calculate the angle of rotation for this vector (only 2D vectors)
     */
    heading(): number
    
    /**
     * Rotate the vector by an angle (only 2D vectors), magnitude remains the
     * same
     */
    rotate(angle: number): p5.Vector
    
    // TODO: Fix lerp() errors in src/math/p5.Vector.js:
    //
    //   required param "amt" follows an optional param
    //
    // lerp(x: p5.Vector, y?: p5.Vector, z?: p5.Vector, amt: number): p5.Vector
    
    /**
     * Return a representation of this vector as a float array.
     */
    array(): any[]
    
    /**
     * Equality check against a p5.Vector
     */
    equals(x?: number|p5.Vector|any[], y?: number, z?: number): boolean
    
    /**
     * Make a new 2D unit vector from an angle
     */
    static fromAngle(angle: number): p5.Vector
    
    /**
     * Make a new 2D unit vector from a random angle
     */
    static random2D(): p5.Vector
    
    /**
     * Make a new random 3D unit vector.
     */
    static random3D(): p5.Vector
    
    /**
     * Calculates and returns the angle (in radians) between two vectors.
     */
    static angleBetween(v1: p5.Vector, v2: p5.Vector): number
  }
  
  // src/typography/p5.Font.js
  
  class Font {
    /**
     * Base class for font handling
     */
    constructor(pInst?: any)
    
    /**
     * Underlying opentype font implementation
     */
    font: any
    
    /**
     * Returns a tight bounding box for the given text string using this
     * font (currently only supports single lines)
     */
    textBounds(line: string, x: number, y: number, fontSize: number, options: any): any
  }
  
  // lib/addons/p5.dom.js
  
  class MediaElement {
    /**
     * Extends p5.Element to handle audio and video.
     */
    constructor(elt: string, pInst?: any)
    
    /**
     * Path to the media element source.
     */
    src: any
    
    // TODO: Fix play() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.Element
    //
    // play(): Object/p5.Element
    
    // TODO: Fix stop() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.Element
    //
    // stop(): Object/p5.Element
    
    // TODO: Fix pause() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.Element
    //
    // pause(): Object/p5.Element
    
    // TODO: Fix loop() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.Element
    //
    // loop(): Object/p5.Element
    
    // TODO: Fix noLoop() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.Element
    //
    // noLoop(): Object/p5.Element
    
    // TODO: Fix autoplay() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.Element
    //
    // autoplay(autoplay: boolean): Object/p5.Element
    
    /**
     * Sets volume for this HTML5 media element.
     */
    volume(val?: number): number|p5.MediaElement
    
    // TODO: Fix speed() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Number|Object/p5.MediaElement
    //
    // speed(speed?: number): number|Object/p5.MediaElement
    
    // TODO: Fix time() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Number|Object/p5.MediaElement
    //
    // time(time?: number): number|Object/p5.MediaElement
    
    /**
     * Returns the duration of the HTML5 media element.
     */
    duration(): number
    
    // TODO: Fix onended() errors in lib/addons/p5.dom.js:
    //
    //   return has invalid type: Object/p5.MediaElement
    //
    // onended(callback: () => any): Object/p5.MediaElement
    
    // TODO: Fix connect() errors in lib/addons/p5.dom.js:
    //
    //   param "audioNode" has invalid type: AudioNode|p5.sound object
    //
    // connect(audioNode: AudioNode|p5.sound object): void
    
    /**
     * Disconnect all Web Audio routing, including to master output.
     */
    disconnect(): void
    
    /**
     * Show the default MediaElement controls, as determined by the web browser.
     */
    showControls(): void
    
    /**
     * Hide the default mediaElement controls.
     */
    hideControls(): void
    
    /**
     * Schedule events to trigger every time a MediaElement
     * (audio/video) reaches a playback cue point.
     */
    addCue(time: number, callback: () => any, value?: any): number
    
    /**
     * Remove a callback based on its ID.
     */
    removeCue(id: number): void
    
    /**
     * Remove all of the callbacks that had originally been scheduled
     * via the addCue method.
     */
    clearCues(): void
  }
  class File {
    // TODO: Fix p5.File() errors in lib/addons/p5.dom.js:
    //
    //   param "file" has invalid type: File
    //
    // constructor(file: File, pInst?: any)
    
    /**
     * Underlying File object.
     */
    file: any
    
    /**
     * File type (image, text, etc.)
     */
    type: any
    
    /**
     * File subtype (usually the file extension jpg, png, xml, etc.)
     */
    subtype: any
    
    /**
     * File name
     */
    name: any
    
    /**
     * File size
     */
    size: any
    
    /**
     * URL string containing image data.
     */
    data: any
  }
  
  // lib/addons/p5.sound.js
  
  class SoundFile {
    // TODO: Fix p5.SoundFile() errors in lib/addons/p5.sound.js:
    //
    //   param "path" has invalid type: String/Array
    //
    // constructor(path: String/Array, successCallback?: () => any, errorCallback?: () => any, whileLoadingCallback?: () => any)
    
    // TODO: Fix loadSound() errors in lib/addons/p5.sound.js:
    //
    //   param "path" has invalid type: String/Array
    //   return has invalid type: SoundFile
    //
    // loadSound(path: String/Array, successCallback?: () => any, errorCallback?: () => any, whileLoading?: () => any): SoundFile
    
    /**
     * Returns true if the sound file finished loading successfully.
     */
    isLoaded(): boolean
    
    /**
     * Play the p5.SoundFile
     */
    play(startTime?: number, rate?: number, amp?: number, cueStart?: number, duration?: number): void
    
    /**
     * p5.SoundFile has two play modes: <code>restart</code> and
     * <code>sustain</code>.
     */
    playMode(str: string): void
    
    /**
     * Pauses a file that is currently playing.
     */
    pause(startTime?: number): void
    
    /**
     * Loop the p5.SoundFile.
     */
    loop(startTime?: number, rate?: number, amp?: number, cueLoopStart?: number, duration?: number): void
    
    /**
     * Returns true if a p5.SoundFile is playing, false if not (i.e.
     */
    isPlaying(): boolean
    
    /**
     * Returns true if a p5.SoundFile is paused, false if not (i.e.
     */
    isPaused(): boolean
    
    /**
     * Stop soundfile playback.
     */
    stop(startTime?: number): void
    
    /**
     * Multiply the output volume (amplitude) of a sound file
     * between 0.0 (silence) and 1.0 (full volume).
     */
    setVolume(volume: number|any, rampTime?: number, timeFromNow?: number): void
    
    // TODO: Fix pan() errors in lib/addons/p5.sound.js:
    //
    //   required param "timeFromNow" follows an optional param
    //
    // pan(panValue?: number, timeFromNow: number): void
    
    /**
     * Set the playback rate of a sound file.
     */
    rate(playbackRate?: number): void
    
    /**
     * Returns the duration of a sound file in seconds.
     */
    duration(): number
    
    /**
     * Return the current position of the p5.SoundFile playhead, in seconds.
     */
    currentTime(): number
    
    /**
     * Move the playhead of the song to a position, in seconds.
     */
    jump(cueTime: number, uuration: number): void
    
    /**
     * Return the number of channels in a sound file.
     */
    channels(): number
    
    /**
     * Return the sample rate of the sound file.
     */
    sampleRate(): number
    
    /**
     * Return the number of samples in a sound file.
     */
    frames(): number
    
    // TODO: Fix getPeaks() errors in lib/addons/p5.sound.js:
    //
    //   return has invalid type: Float32Array
    //
    // getPeaks(length?: number): Float32Array
    
    /**
     * Reverses the p5.SoundFile's buffer source.
     */
    reverseBuffer(): void
    
    /**
     * Schedule an event to be called when the soundfile
     * reaches the end of a buffer.
     */
    onended(callback: () => any): void
    
    /**
     * Connects the output of a p5sound object to input of another
     * p5.sound object.
     */
    connect(object?: any): void
    
    /**
     * Disconnects the output of this p5sound object.
     */
    disconnect(): void
    
    /**
     * Reset the source for this SoundFile to a
     * new path (URL).
     */
    setPath(path: string, callback: () => any): void
    
    /**
     * processPeaks returns an array of timestamps where it thinks there is a beat.
     */
    processPeaks(callback: () => any, initThreshold?: number, minThreshold?: number, minPeaks?: number): any[]
    
    /**
     * Schedule events to trigger every time a MediaElement
     * (audio/video) reaches a playback cue point.
     */
    addCue(time: number, callback: () => any, value?: any): number
    
    /**
     * Remove a callback based on its ID.
     */
    removeCue(id: number): void
    
    /**
     * Remove all of the callbacks that had originally been scheduled
     * via the addCue method.
     */
    clearCues(): void
  }
  class Amplitude {
    /**
     * Amplitude measures volume between 0.0 and 1.0.
     */
    constructor(smoothing?: number)
    
    // TODO: Fix setInput() errors in lib/addons/p5.sound.js:
    //
    //   param "snd" has invalid type: SoundObject|undefined
    //   param "smoothing" has invalid type: Number|undefined
    //
    // setInput(snd?: SoundObject|undefined, smoothing?: number|undefined): void
    
    /**
     * Returns a single Amplitude reading at the moment it is called.
     */
    getLevel(channel?: number): number
    
    /**
     * Determines whether the results of Amplitude.process() will be
     * Normalized.
     */
    toggleNormalize(boolean?: boolean): void
    
    /**
     * Smooth Amplitude analysis by averaging with the last analysis 
     * frame.
     */
    smooth(set: number): void
  }
  class FFT {
    /**
     * <p>FFT (Fast Fourier Transform) is an analysis algorithm that
     * isolates individual
     * <a href="https://en.wikipedia.org/wiki/Audio_frequency">
     * audio frequencies</a> within a waveform.</p>
     * 
     * <p>Once instantiated, a p5.FFT object can return an array based on
     * two types of analyses: <br> • <code>FFT.waveform()</code> computes
     * amplitude values along the time domain.
     */
    constructor(smoothing?: number, bins?: number)
    
    /**
     * Set the input source for the FFT analysis.
     */
    setInput(source?: any): void
    
    /**
     * Returns an array of amplitude values (between -1.0 and +1.0) that represent
     * a snapshot of amplitude readings in a single buffer.
     */
    waveform(bins?: number, precision?: string): any[]
    
    /**
     * Returns an array of amplitude values (between 0 and 255)
     * across the frequency spectrum.
     */
    analyze(bins?: number, scale?: number): any[]
    
    /**
     * Returns the amount of energy (volume) at a specific
     * <a href="en.wikipedia.org/wiki/Audio_frequency" target="_blank">
     * frequency</a>, or the average amount of energy between two
     * frequencies.
     */
    getEnergy(frequency1: number|string, frequency2?: number): number
    
    /**
     * Returns the 
     * <a href="http://en.wikipedia.org/wiki/Spectral_centroid" target="_blank">
     * spectral centroid</a> of the input signal.
     */
    getCentroid(): number
    
    /**
     * Smooth FFT analysis by averaging with the last analysis frame.
     */
    smooth(smoothing: number): void
  }
  class Signal {
    // TODO: Fix p5.Signal() errors in lib/addons/p5.sound.js:
    //
    //   return has invalid type: Tone.Signal
    //
    // constructor()
    
    // TODO: Fix fade() errors in lib/addons/p5.sound.js:
    //
    //   param "secondsFromNow" has invalid type: [Number]
    //
    // fade(value: number, secondsFromNow: [Number]): void
    
    // TODO: Fix add() errors in lib/addons/p5.sound.js:
    //
    //   return has invalid type: p5.SignalAdd
    //
    // add(number: number): p5.SignalAdd
    
    // TODO: Fix mult() errors in lib/addons/p5.sound.js:
    //
    //   return has invalid type: Tone.Multiply
    //
    // mult(number: number): Tone.Multiply
    
    // TODO: Fix scale() errors in lib/addons/p5.sound.js:
    //
    //   return has invalid type: p5.SignalScale
    //
    // scale(number: number, inMin: number, inMax: number, outMin: number, outMax: number): p5.SignalScale
    
  }
  class Oscillator {
    /**
     * <p>Creates a signal that oscillates between -1.0 and 1.0.
     */
    constructor(freq?: number, type?: string)
    
    /**
     * Start an oscillator.
     */
    start(time?: number, frequency?: number): void
    
    /**
     * Stop an oscillator.
     */
    stop(secondsFromNow: number): void
    
    // TODO: Fix amp() errors in lib/addons/p5.sound.js:
    //
    //   return has invalid type: AudioParam
    //
    // amp(vol: number|any, rampTime?: number, timeFromNow?: number): AudioParam
    
    // TODO: Fix freq() errors in lib/addons/p5.sound.js:
    //
    //   return has invalid type: AudioParam
    //
    // freq(Frequency: number|any, rampTime?: number, timeFromNow?: number): AudioParam
    
    /**
     * Set type to 'sine', 'triangle', 'sawtooth' or 'square'.
     */
    setType(type: string): void
    
    /**
     * Connect to a p5.sound / Web Audio object.
     */
    connect(unit: any): void
    
    /**
     * Disconnect all outputs
     */
    disconnect(): void
    
    /**
     * Pan between Left (-1) and Right (1)
     */
    pan(panning: number, timeFromNow: number): void
    
    /**
     * Set the phase of an oscillator between 0.0 and 1.0.
     */
    phase(phase: number): void
    
    /**
     * Add a value to the p5.Oscillator's output amplitude,
     * and return the oscillator.
     */
    add(number: number): p5.Oscillator
    
    /**
     * Multiply the p5.Oscillator's output amplitude
     * by a fixed value (i.e.
     */
    mult(number: number): p5.Oscillator
    
    /**
     * Scale this oscillator's amplitude values to a given
     * range, and return the oscillator.
     */
    scale(inMin: number, inMax: number, outMin: number, outMax: number): p5.Oscillator
    
    // TODO: Fix p5.SinOsc() errors in lib/addons/p5.sound.js:
    //
    //   "p5.SinOsc" is not a valid JS symbol name
    //   param "freq" has invalid type: [Number]
    //
    // p5.SinOsc(freq: [Number]): void
    
    // TODO: Fix p5.TriOsc() errors in lib/addons/p5.sound.js:
    //
    //   "p5.TriOsc" is not a valid JS symbol name
    //   param "freq" has invalid type: [Number]
    //
    // p5.TriOsc(freq: [Number]): void
    
    // TODO: Fix p5.SawOsc() errors in lib/addons/p5.sound.js:
    //
    //   "p5.SawOsc" is not a valid JS symbol name
    //   param "freq" has invalid type: [Number]
    //
    // p5.SawOsc(freq: [Number]): void
    
    // TODO: Fix p5.SqrOsc() errors in lib/addons/p5.sound.js:
    //
    //   "p5.SqrOsc" is not a valid JS symbol name
    //   param "freq" has invalid type: [Number]
    //
    // p5.SqrOsc(freq: [Number]): void
    
  }
  class Env {
    /**
     * <p>Envelopes are pre-defined amplitude distribution over time.
     */
    constructor()
    
    /**
     * Time until envelope reaches attackLevel
     */
    attackTime: any
    
    /**
     * Level once attack is complete.
     */
    attackLevel: any
    
    /**
     * Time until envelope reaches decayLevel.
     */
    decayTime: any
    
    /**
     * Level after decay.
     */
    decayLevel: any
    
    /**
     * Duration of the release portion of the envelope.
     */
    releaseTime: any
    
    /**
     * Level at the end of the release.
     */
    releaseLevel: any
    
    /**
     * Reset the envelope with a series of time/value pairs.
     */
    set(attackTime: number, attackLevel: number, decayTime: number, decayLevel: number, releaseTime: number, releaseLevel: number): void
    
    /**
     * Set values like a traditional
     * <a href="https://en.wikipedia.org/wiki/Synthesizer#/media/File:ADSR_parameter.svg">
     * ADSR envelope
     * </a>.
     */
    setADSR(attackTime: number, decayTime?: number, susRatio?: number, releaseTime?: number): void
    
    /**
     * Set max (attackLevel) and min (releaseLevel) of envelope.
     */
    setRange(aLevel: number, rLevel: number): void
    
    /**
     * Assign a parameter to be controlled by this envelope.
     */
    setInput(unit: any): void
    
    /**
     * Set whether the envelope ramp is linear (default) or exponential.
     */
    setExp(isExp: boolean): void
    
    /**
     * Play tells the envelope to start acting on a given input.
     */
    play(unit: any, startTime?: number, sustainTime?: number): void
    
    /**
     * Trigger the Attack, and Decay portion of the Envelope.
     */
    triggerAttack(unit: any, secondsFromNow: number): void
    
    /**
     * Trigger the Release of the Envelope.
     */
    triggerRelease(unit: any, secondsFromNow: number): void
    
    /**
     * Exponentially ramp to a value using the first two
     * values from <code><a href="#/p5.Env/setADSR">setADSR(attackTime, decayTime)</a></code>
     * as <a href="https://en.wikipedia.org/wiki/RC_time_constant">
     * time constants</a> for simple exponential ramps.
     */
    ramp(unit: any, secondsFromNow: number, v: number, v2?: number): void
    
    /**
     * Add a value to the p5.Oscillator's output amplitude,
     * and return the oscillator.
     */
    add(number: number): p5.Env
    
    /**
     * Multiply the p5.Env's output amplitude
     * by a fixed value.
     */
    mult(number: number): p5.Env
    
    /**
     * Scale this envelope's amplitude values to a given
     * range, and return the envelope.
     */
    scale(inMin: number, inMax: number, outMin: number, outMax: number): p5.Env
  }
  class Pulse {
    /**
     * Creates a Pulse object, an oscillator that implements
     * Pulse Width Modulation.
     */
    constructor(freq?: number, w?: number)
    
    /**
     * Set the width of a Pulse object (an oscillator that implements
     * Pulse Width Modulation).
     */
    width(width?: number): void
  }
  class Noise {
    /**
     * Noise is a type of oscillator that generates a buffer with random values.
     */
    constructor(type: string)
    
    /**
     * Set type of noise to 'white', 'pink' or 'brown'.
     */
    setType(type?: string): void
    
    /**
     * Start the noise
     */
    start(): void
    
    /**
     * Stop the noise.
     */
    stop(): void
    
    /**
     * Pan the noise.
     */
    pan(panning: number, timeFromNow: number): void
    
    /**
     * Send output to a p5.sound or web audio object
     */
    connect(unit: any): void
    
    /**
     * Disconnect all output.
     */
    disconnect(): void
  }
  class AudioIn {
    /**
     * <p>Get audio from an input, i.e.
     */
    constructor()
    
    /**
     * Client must allow browser to access their microphone / audioin source.
     */
    enabled: any
    
    /**
     * Start processing audio input.
     */
    start(successCallback: () => any, errorCallback: () => any): void
    
    /**
     * Turn the AudioIn off.
     */
    stop(): void
    
    /**
     * Connect to an audio unit.
     */
    connect(unit?: any): void
    
    /**
     * Disconnect the AudioIn from all audio units.
     */
    disconnect(): void
    
    /**
     * Read the Amplitude (volume level) of an AudioIn.
     */
    getLevel(smoothing?: number): number
    
    /**
     * Set amplitude (volume) of a mic input between 0 and 1.0.
     */
    amp(vol: number, time?: number): void
    
    /**
     * Chrome only.
     */
    getSources(callback: () => any): void
    
    /**
     * Set the input source.
     */
    setSource(num: number): void
  }
  class Filter {
    // TODO: Fix p5.Filter() errors in lib/addons/p5.sound.js:
    //
    //   param "type" has invalid type: [String]
    //
    // constructor(type: [String])
    
    /**
     * The p5.Filter is built with a
     * <a href="http://www.w3.org/TR/webaudio/#BiquadFilterNode">
     * Web Audio BiquadFilter Node</a>.
     */
    biquadFilter: any
    
    // TODO: Fix process() errors in lib/addons/p5.sound.js:
    //
    //   param "freq" has invalid type: [Number]
    //   param "res" has invalid type: [Number]
    //
    // process(Signal: any, freq: [Number], res: [Number]): void
    
    /**
     * Set the frequency and the resonance of the filter.
     */
    set(freq: number, res: number, timeFromNow?: number): void
    
    /**
     * Set the filter frequency, in Hz, from 10 to 22050 (the range of
     * human hearing, although in reality most people hear in a narrower
     * range).
     */
    freq(freq: number, timeFromNow?: number): number
    
    /**
     * Controls either width of a bandpass frequency,
     * or the resonance of a low/highpass cutoff frequency.
     */
    res(res: number, timeFromNow?: number): number
    
    /**
     * Set the type of a p5.Filter.
     */
    setType(UNKNOWN: string): void
    
    /**
     * Set the output level of the filter.
     */
    amp(volume: number, rampTime?: number, timeFromNow?: number): void
    
    /**
     * Send output to a p5.sound or web audio object
     */
    connect(unit: any): void
    
    /**
     * Disconnect all output.
     */
    disconnect(): void
    
    // TODO: Fix p5.LowPass() errors in lib/addons/p5.sound.js:
    //
    //   "p5.LowPass" is not a valid JS symbol name
    //
    // p5.LowPass(): void
    
    // TODO: Fix p5.HighPass() errors in lib/addons/p5.sound.js:
    //
    //   "p5.HighPass" is not a valid JS symbol name
    //
    // p5.HighPass(): void
    
    // TODO: Fix p5.BandPass() errors in lib/addons/p5.sound.js:
    //
    //   "p5.BandPass" is not a valid JS symbol name
    //
    // p5.BandPass(): void
    
  }
  class Delay {
    /**
     * Delay is an echo effect.
     */
    constructor()
    
    /**
     * The p5.Delay is built with two
     * <a href="http://www.w3.org/TR/webaudio/#DelayNode">
     * Web Audio Delay Nodes</a>, one for each stereo channel.
     */
    leftDelay: any
    
    /**
     * The p5.Delay is built with two
     * <a href="http://www.w3.org/TR/webaudio/#DelayNode">
     * Web Audio Delay Nodes</a>, one for each stereo channel.
     */
    rightDelay: any
    
    /**
     * Add delay to an audio signal according to a set
     * of delay parameters.
     */
    process(Signal: any, delayTime?: number, feedback?: number, lowPass?: number): void
    
    /**
     * Set the delay (echo) time, in seconds.
     */
    delayTime(delayTime: number): void
    
    /**
     * Feedback occurs when Delay sends its signal back through its input
     * in a loop.
     */
    feedback(feedback: number|any): void
    
    /**
     * Set a lowpass filter frequency for the delay.
     */
    filter(cutoffFreq: number|any, res: number|any): void
    
    /**
     * Choose a preset type of delay.
     */
    setType(type: string|number): void
    
    /**
     * Set the output level of the delay effect.
     */
    amp(volume: number, rampTime?: number, timeFromNow?: number): void
    
    /**
     * Send output to a p5.sound or web audio object
     */
    connect(unit: any): void
    
    /**
     * Disconnect all output.
     */
    disconnect(): void
  }
  class Reverb {
    /**
     * Reverb adds depth to a sound through a large number of decaying
     * echoes.
     */
    constructor()
    
    /**
     * Connect a source to the reverb, and assign reverb parameters.
     */
    process(src: any, seconds?: number, decayRate?: number, reverse?: boolean): void
    
    /**
     * Set the reverb settings.
     */
    set(seconds?: number, decayRate?: number, reverse?: boolean): void
    
    /**
     * Set the output level of the delay effect.
     */
    amp(volume: number, rampTime?: number, timeFromNow?: number): void
    
    /**
     * Send output to a p5.sound or web audio object
     */
    connect(unit: any): void
    
    /**
     * Disconnect all output.
     */
    disconnect(): void
  }
  class Convolver {
    /**
     * <p>p5.Convolver extends p5.Reverb.
     */
    constructor(path: string, callback?: () => any, errorCallback?: () => any)
    
    /**
     * Internally, the p5.Convolver uses the a
     * <a href="http://www.w3.org/TR/webaudio/#ConvolverNode">
     * Web Audio Convolver Node</a>.
     */
    convolverNode: any
    
    /**
     * Create a p5.Convolver.
     */
    createConvolver(path: string, callback?: () => any, errorCallback?: () => any): p5.Convolver
    
    /**
     * Connect a source to the reverb, and assign reverb parameters.
     */
    process(src: any): void
    
    /**
     * If you load multiple impulse files using the .addImpulse method,
     * they will be stored as Objects in this Array.
     */
    impulses: any
    
    /**
     * Load and assign a new Impulse Response to the p5.Convolver.
     */
    addImpulse(path: string, callback: () => any, errorCallback: () => any): void
    
    /**
     * Similar to .addImpulse, except that the <code>.impulses</code>
     * Array is reset to save memory.
     */
    resetImpulse(path: string, callback: () => any, errorCallback: () => any): void
    
    /**
     * If you have used <code>.addImpulse()</code> to add multiple impulses
     * to a p5.Convolver, then you can use this method to toggle between
     * the items in the <code>.impulses</code> Array.
     */
    toggleImpulse(id: string|number): void
  }
  class Phrase {
    /**
     * <p>A phrase is a pattern of musical events over time, i.e.
     */
    constructor(name: string, callback: () => any, sequence: any[])
    
    /**
     * Array of values to pass into the callback
     * at each step of the phrase.
     */
    sequence: any
  }
  class Part {
    /**
     * <p>A p5.Part plays back one or more p5.Phrases.
     */
    constructor(steps?: number, tatums?: number)
    
    /**
     * Set the tempo of this part, in Beats Per Minute.
     */
    setBPM(BPM: number, rampTime?: number): void
    
    /**
     * Returns the Beats Per Minute of this currently part.
     */
    getBPM(): number
    
    /**
     * Start playback of this part.
     */
    start(time?: number): void
    
    /**
     * Loop playback of this part.
     */
    loop(time?: number): void
    
    /**
     * Tell the part to stop looping.
     */
    noLoop(): void
    
    /**
     * Stop the part and cue it to step 0.
     */
    stop(time?: number): void
    
    /**
     * Pause the part.
     */
    pause(time: number): void
    
    /**
     * Add a p5.Phrase to this Part.
     */
    addPhrase(phrase: p5.Phrase): void
    
    /**
     * Remove a phrase from this part, based on the name it was
     * given when it was created.
     */
    removePhrase(phraseName: string): void
    
    /**
     * Get a phrase from this part, based on the name it was
     * given when it was created.
     */
    getPhrase(phraseName: string): void
    
    /**
     * Get a phrase from this part, based on the name it was
     * given when it was created.
     */
    replaceSequence(phraseName: string, sequence: any[]): void
    
    /**
     * Fire a callback function at every step.
     */
    onStep(callback: () => any): void
  }
  class Score {
    // TODO: Fix p5.Score() errors in lib/addons/p5.sound.js:
    //
    //   param "part(s)" is not a valid JS symbol name
    //
    // constructor(part(s): p5.Part)
    
    /**
     * Start playback of the score.
     */
    start(): void
    
    /**
     * Stop playback of the score.
     */
    stop(): void
    
    /**
     * Pause playback of the score.
     */
    pause(): void
    
    /**
     * Loop playback of the score.
     */
    loop(): void
    
    /**
     * Stop looping playback of the score.
     */
    noLoop(): void
  }
  class SoundRecorder {
    /**
     * <p>Record sounds for playback and/or to save as a .wav file.
     */
    constructor()
    
    /**
     * Connect a specific device to the p5.SoundRecorder.
     */
    setInput(unit?: any): void
    
    /**
     * Start recording.
     */
    record(soundFile: p5.SoundFile, duration?: number, callback?: () => any): void
    
    /**
     * Stop the recording.
     */
    stop(): void
    
    /**
     * Save a p5.SoundFile as a .wav audio file.
     */
    saveSound(soundFile: p5.SoundFile, name: string): void
  }
  class PeakDetect {
    /**
     * <p>PeakDetect works in conjunction with p5.FFT to
     * look for onsets in some or all of the frequency spectrum.
     */
    constructor(freq1?: number, freq2?: number, threshold?: number, framesPerPeak?: number)
    // TODO: Annotate attribute "isDetected"
    
    /**
     * The update method is run in the draw loop.
     */
    update(fftObject: p5.FFT): void
    
    /**
     * onPeak accepts two arguments: a function to call when
     * a peak is detected.
     */
    onPeak(callback: () => any, val?: any): void
  }
  class Gain {
    /**
     * A gain node is usefull to set the relative volume of sound.
     */
    constructor()
    
    /**
     * Connect a source to the gain node.
     */
    setInput(src: any): void
    
    /**
     * Send output to a p5.sound or web audio object
     */
    connect(unit: any): void
    
    /**
     * Disconnect all output.
     */
    disconnect(): void
    
    /**
     * Set the output level of the gain node.
     */
    amp(volume: number, rampTime?: number, timeFromNow?: number): void
  }
}
