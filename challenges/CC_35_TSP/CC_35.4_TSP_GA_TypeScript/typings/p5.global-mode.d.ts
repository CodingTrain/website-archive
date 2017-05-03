// This file was auto-generated. Please do not edit it.

///<reference path="p5.d.ts" />


// Properties from p5

// src/3d/3d_primitives.js

/**
 * Draw a plane with given a width and height
 */
declare function plane(width: number, height: number): p5;

/**
 * Draw a sphere with given raduis
 */
declare function sphere(radius: number, detail?: number): void;

/**
 * Draw an ellipsoid with given radius
 */
declare function ellipsoid(radiusx: number, radiusy: number, radiusz: number, detail?: number): p5;

/**
 * Draw a cylinder with given radius and height
 */
declare function cylinder(radius: number, height: number, detail?: number): p5;

/**
 * Draw a cone with given radius and height
 */
declare function cone(radius: number, height: number, detail?: number): void;

/**
 * Draw a torus with given radius and tube radius
 */
declare function torus(radius: number, tubeRadius: number, detail?: number): void;

/**
 * Draw a box with given width, height and depth
 */
declare function box(width: number, height: number, depth: number): p5;

// src/3d/camera.js

/**
 * Sets camera position
 */
declare function camera(x: number, y: number, z: number): p5;

/**
 * Sets perspective camera
 */
declare function perspective(fovy: number, aspect: number, near: number, far: number): p5;

/**
 * Setup ortho camera
 */
declare function ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): p5;

// src/3d/light.js

/**
 * Creates an ambient light with a color
 */
declare function ambientLight(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): p5;

// TODO: Fix directionalLight() errors in src/3d/light.js:
//
//   required param "x" follows an optional param
//
// declare function directionalLight(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number, x: number|p5.Vector, y?: number, z?: number): p5;

// TODO: Fix pointLight() errors in src/3d/light.js:
//
//   required param "x" follows an optional param
//
// declare function pointLight(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number, x: number|p5.Vector, y?: number, z?: number): p5;

// src/3d/material.js

/**
 * Normal material for geometry
 */
declare function normalMaterial(): p5;

/**
 * Texture for geometry
 */
declare function texture(): p5;

/**
 * Basic material for geometry with a given color
 */
declare function basicMaterial(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): p5;

/**
 * Ambient material for geometry with a given color
 */
declare function ambientMaterial(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): p5;

/**
 * Specular material for geometry with a given color
 */
declare function specularMaterial(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): p5;

// src/color/creating_reading.js

/**
 * Extracts the alpha value from a color or pixel array.
 */
declare function alpha(obj: any): void;

/**
 * Extracts the blue value from a color or pixel array.
 */
declare function blue(obj: any): void;

/**
 * Extracts the HSB brightness value from a color or pixel array.
 */
declare function brightness(color: any): void;

/**
 * Creates colors for storing in variables of the color datatype.
 */
declare function color(v1: number|string, v2?: number, v3?: number, alpha?: number): any[];

/**
 * Extracts the green value from a color or pixel array.
 */
declare function green(color: any): void;

/**
 * Extracts the hue value from a color or pixel array.
 */
declare function hue(color: any): void;

// TODO: Fix lerpColor() errors in src/color/creating_reading.js:
//
//   param "c1" has invalid type: Array/Number
//   param "c2" has invalid type: Array/Number
//   return has invalid type: Array/Number
//
// declare function lerpColor(c1: Array/Number, c2: Array/Number, amt: number): Array/Number;

/**
 * Extracts the HSL lightness value from a color or pixel array.
 */
declare function lightness(color: any): void;

/**
 * Extracts the red value from a color or pixel array.
 */
declare function red(obj: any): void;

/**
 * Extracts the saturation value from a color or pixel array.
 */
declare function saturation(color: any): void;

// src/color/setting.js

/**
 * The background() function sets the color used for the background of the
 * p5.js canvas.
 */
declare function background(v1: number|string|p5.Color|p5.Image, v2?: number, v3?: number, a?: number): void;

/**
 * Clears the pixels within a buffer.
 */
declare function clear(): void;

// TODO: Fix colorMode() errors in src/color/setting.js:
//
//   param "mode" has invalid type: Number|Constant
//   param "max1" has invalid type: Number|Constant
//   param "max2" has invalid type: Number|Constant
//   param "max3" has invalid type: Number|Constant
//   param "maxA" has invalid type: Number|Constant
//
// declare function colorMode(mode: number|Constant, max1?: number|Constant, max2?: number|Constant, max3?: number|Constant, maxA?: number|Constant): void;

/**
 * Sets the color used to fill shapes.
 */
declare function fill(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): void;

/**
 * Disables filling geometry.
 */
declare function noFill(): void;

/**
 * Disables drawing the stroke (outline).
 */
declare function noStroke(): void;

/**
 * Sets the color used to draw lines and borders around shapes.
 */
declare function stroke(v1: number|any[]|string|p5.Color, v2?: number, v3?: number, a?: number): void;

// src/core/2d_primitives.js

/**
 * Draw an arc to the screen.
 */
declare function arc(a: number, b: number, c: number, d: number, start: number, stop: number, mode?: string): any;

/**
 * Draws an ellipse (oval) to the screen.
 */
declare function ellipse(a: number, b: number, c: number, d: number): p5;

/**
 * Draws a line (a direct path between two points) to the screen.
 */
declare function line(x1: number, y1: number, x2: number, y2: number): p5;

/**
 * Draws a point, a coordinate in space at the dimension of one pixel.
 */
declare function point(x: number, y: number): p5;

/**
 * Draw a quad.
 */
declare function quad(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): p5;

/**
 * Draws a rectangle to the screen.
 */
declare function rect(x: number, y: number, w: number, h: number, tl?: number, tr?: number, br?: number, bl?: number): p5;

/**
 * A triangle is a plane created by connecting three points.
 */
declare function triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): p5;

// src/core/attributes.js

// TODO: Fix ellipseMode() errors in src/core/attributes.js:
//
//   param "mode" has invalid type: Number/Constant
//
// declare function ellipseMode(mode: Number/Constant): p5;

/**
 * Draws all geometry with jagged (aliased) edges.
 */
declare function noSmooth(): p5;

// TODO: Fix rectMode() errors in src/core/attributes.js:
//
//   param "mode" has invalid type: Number/Constant
//
// declare function rectMode(mode: Number/Constant): p5;

/**
 * Draws all geometry with smooth (anti-aliased) edges.
 */
declare function smooth(): p5;

// TODO: Fix strokeCap() errors in src/core/attributes.js:
//
//   param "cap" has invalid type: Number/Constant
//
// declare function strokeCap(cap: Number/Constant): p5;

// TODO: Fix strokeJoin() errors in src/core/attributes.js:
//
//   param "join" has invalid type: Number/Constant
//
// declare function strokeJoin(join: Number/Constant): p5;

/**
 * Sets the width of the stroke used for lines, points, and the border
 * around shapes.
 */
declare function strokeWeight(weight: number): p5;

// src/core/constants.js

/**
 * HALF_PI is a mathematical constant with the value
 * 1.57079632679489661923.
 */
declare var HALF_PI: any;

/**
 * PI is a mathematical constant with the value
 * 3.14159265358979323846.
 */
declare var PI: any;

/**
 * QUARTER_PI is a mathematical constant with the value 0.7853982.
 */
declare var QUARTER_PI: any;

/**
 * TAU is an alias for TWO_PI, a mathematical constant with the
 * value 6.28318530717958647693.
 */
declare var TAU: any;

/**
 * TWO_PI is a mathematical constant with the value
 * 6.28318530717958647693.
 */
declare var TWO_PI: any;

// src/core/core.js

/**
 * Called directly before setup(), the preload() function is used to handle
 * asynchronous loading of external files.
 */
declare function preload(): void;

/**
 * The setup() function is called once when the program starts.
 */
declare function setup(): void;

/**
 * Called directly after setup(), the draw() function continuously executes
 * the lines of code contained inside its block until the program is stopped
 * or noLoop() is called.
 */
declare function draw(): void;

/**
 * Removes the entire p5 sketch.
 */
declare function remove(): void;

// src/core/curves.js

/**
 * Draws a cubic Bezier curve on the screen.
 */
declare function bezier(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): any;

/**
 * Evaluates the Bezier at position t for points a, b, c, d.
 */
declare function bezierPoint(a: number, b: number, c: number, d: number, t: number): number;

/**
 * Evaluates the tangent to the Bezier at position t for points a, b, c, d.
 */
declare function bezierTangent(a: number, b: number, c: number, d: number, t: number): number;

/**
 * Draws a curved line on the screen between two points, given as the
 * middle four parameters.
 */
declare function curve(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): any;

/**
 * Modifies the quality of forms created with curve() and curveVertex().
 */
declare function curveTightness(amount: number): any;

/**
 * Evaluates the curve at position t for points a, b, c, d.
 */
declare function curvePoint(a: number, b: number, c: number, d: number, t: number): number;

/**
 * Evaluates the tangent to the curve at position t for points a, b, c, d.
 */
declare function curveTangent(a: number, b: number, c: number, d: number, t: number): number;

// src/core/environment.js

/**
 * The print() function writes to the console area of your browser.
 */
declare function print(contents: any): void;

/**
 * The system variable frameCount contains the number of frames that have
 * been displayed since the program started.
 */
declare var frameCount: any;

/**
 * Confirms if the window a p5.js program is in is "focused," meaning that
 * the sketch will accept mouse or keyboard input.
 */
declare var focused: any;

// TODO: Fix cursor() errors in src/core/environment.js:
//
//   param "type" has invalid type: Number/Constant
//
// declare function cursor(type: Number/Constant, x?: number, y?: number): void;

/**
 * Specifies the number of frames to be displayed every second.
 */
declare function frameRate(fps?: number): number;

/**
 * Hides the cursor from view.
 */
declare function noCursor(): void;

/**
 * System variable that stores the width of the entire screen display.
 */
declare var displayWidth: any;

/**
 * System variable that stores the height of the entire screen display.
 */
declare var displayHeight: any;

/**
 * System variable that stores the width of the inner window, it maps to
 * window.innerWidth.
 */
declare var windowWidth: any;

/**
 * System variable that stores the height of the inner window, it maps to
 * window.innerHeight.
 */
declare var windowHeight: any;

/**
 * The windowResized() function is called once every time the browser window
 * is resized.
 */
declare function windowResized(): void;

/**
 * System variable that stores the width of the drawing canvas.
 */
declare var width: any;

/**
 * System variable that stores the height of the drawing canvas.
 */
declare var height: any;

/**
 * If argument is given, sets the sketch to fullscreen or not based on the
 * value of the argument.
 */
declare function fullscreen(val?: boolean): boolean;

/**
 * Sets the pixel scaling for high pixel density displays.
 */
declare function pixelDensity(val?: number): number;

/**
 * Returns the pixel density of the current display the sketch is running on.
 */
declare function displayDensity(): number;

/**
 * Gets the current URL.
 */
declare function getURL(): string;

/**
 * Gets the current URL path as an array.
 */
declare function getURLPath(): any[];

/**
 * Gets the current URL params as an Object.
 */
declare function getURLParams(): any;

// src/core/rendering.js

/**
 * Creates a canvas element in the document, and sets the dimensions of it
 * in pixels.
 */
declare function createCanvas(w: number, h: number, renderer?: string): any;

/**
 * Resizes the canvas to given width and height.
 */
declare function resizeCanvas(): void;

/**
 * Removes the default canvas for a p5 sketch that doesn't
 * require a canvas
 */
declare function noCanvas(): void;

/**
 * Creates and returns a new p5.Renderer object.
 */
declare function createGraphics(w: number, h: number, renderer: string): any;

// TODO: Fix blendMode() errors in src/core/rendering.js:
//
//   param "mode" has invalid type: String/Constant
//
// declare function blendMode(mode: String/Constant): void;

// src/core/structure.js

/**
 * Stops p5.js from continuously executing the code within draw().
 */
declare function noLoop(): void;

/**
 * By default, p5.js loops through draw() continuously, executing the code
 * within it.
 */
declare function loop(): void;

/**
 * The push() function saves the current drawing style settings and
 * transformations, while pop() restores these settings.
 */
declare function push(): void;

/**
 * The push() function saves the current drawing style settings and
 * transformations, while pop() restores these settings.
 */
declare function pop(): void;

/**
 * Executes the code within draw() one time.
 */
declare function redraw(): void;

// src/core/transform.js

/**
 * Multiplies the current matrix by the one specified through the parameters.
 */
declare function applyMatrix(n00: number, n01: number, n02: number, n10: number, n11: number, n12: number): p5;

/**
 * Replaces the current matrix with the identity matrix.
 */
declare function resetMatrix(): p5;

/**
 * Rotates a shape the amount specified by the angle parameter.
 */
declare function rotate(angle: number): p5;

// TODO: Fix scale() errors in src/core/transform.js:
//
//   param "s" has invalid type: Number | p5.Vector | Array
//
// declare function scale(s: Number | p5.Vector | Array, y?: number, z?: number): p5;

/**
 * Shears a shape around the x-axis the amount specified by the angle
 * parameter.
 */
declare function shearX(angle: number): p5;

/**
 * Shears a shape around the y-axis the amount specified by the angle
 * parameter.
 */
declare function shearY(angle: number): p5;

/**
 * Specifies an amount to displace objects within the display window.
 */
declare function translate(x: number, y: number): p5;

// src/core/vertex.js

/**
 * Use the beginContour() and endContour() functions to create negative
 * shapes within shapes such as the center of the letter 'O'.
 */
declare function beginContour(): any;

// TODO: Fix beginShape() errors in src/core/vertex.js:
//
//   param "kind" has invalid type: Number/Constant
//
declare function beginShape(kind: Number): any;
declare function beginShape(): any;

/**
 * Specifies vertex coordinates for Bezier curves.
 */
declare function bezierVertex(x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): any;

/**
 * Specifies vertex coordinates for curves.
 */
declare function curveVertex(x: number, y: number): any;

/**
 * Use the beginContour() and endContour() functions to create negative
 * shapes within shapes such as the center of the letter 'O'.
 */
declare function endContour(): any;

// TODO: Fix endShape() errors in src/core/vertex.js:
//
//   param "mode" has invalid type: Number/Constant
//
declare function endShape(mode: Number): any;
declare function endShape(): any;

/**
 * Specifies vertex coordinates for quadratic Bezier curves.
 */
declare function quadraticVertex(cx: number, cy: number, x3: number, y3: number): any;

/**
 * All shapes are constructed by connecting a series of vertices.
 */
declare function vertex(x: number, y: number): any;

// src/events/acceleration.js

/**
 * The system variable deviceOrientation always contains the orientation of
 * the device.
 */
declare var deviceOrientation: any;

/**
 * The system variable accelerationX always contains the acceleration of the
 * device along the x axis.
 */
declare var accelerationX: any;

/**
 * The system variable accelerationY always contains the acceleration of the
 * device along the y axis.
 */
declare var accelerationY: any;

/**
 * The system variable accelerationZ always contains the acceleration of the
 * device along the z axis.
 */
declare var accelerationZ: any;

/**
 * The system variable pAccelerationX always contains the acceleration of the
 * device along the x axis in the frame previous to the current frame.
 */
declare var pAccelerationX: any;

/**
 * The system variable pAccelerationY always contains the acceleration of the
 * device along the y axis in the frame previous to the current frame.
 */
declare var pAccelerationY: any;

/**
 * The system variable pAccelerationZ always contains the acceleration of the
 * device along the z axis in the frame previous to the current frame.
 */
declare var pAccelerationZ: any;

/**
 * The system variable rotationX always contains the rotation of the
 * device along the x axis.
 */
declare var rotationX: any;

/**
 * The system variable rotationY always contains the rotation of the
 * device along the y axis.
 */
declare var rotationY: any;

/**
 * The system variable rotationZ always contains the rotation of the
 * device along the z axis.
 */
declare var rotationZ: any;

/**
 * The system variable pRotationX always contains the rotation of the
 * device along the x axis in the frame previous to the current frame.
 */
declare var pRotationX: any;

/**
 * The system variable pRotationY always contains the rotation of the
 * device along the y axis in the frame previous to the current frame.
 */
declare var pRotationY: any;

/**
 * The system variable pRotationZ always contains the rotation of the
 * device along the z axis in the frame previous to the current frame.
 */
declare var pRotationZ: any;

/**
 * The setMoveThreshold() function is used to set the movement threshold for
 * the deviceMoved() function.
 */
declare function setMoveThreshold(value: number): void;

/**
 * The setShakeThreshold() function is used to set the movement threshold for
 * the deviceShaken() function.
 */
declare function setShakeThreshold(value: number): void;

/**
 * The deviceMoved() function is called when the device is moved by more than
 * the threshold value along X, Y or Z axis.
 */
declare function deviceMoved(): void;

/**
 * The deviceTurned() function is called when the device rotates by
 * more than 90 degrees continuously.
 */
declare function deviceTurned(): void;

/**
 * The deviceShaken() function is called when the device total acceleration
 * changes of accelerationX and accelerationY values is more than
 * the threshold value.
 */
declare function deviceShaken(): void;

// src/events/keyboard.js

/**
 * The boolean system variable keyIsPressed is true if any key is pressed
 * and false if no keys are pressed.
 */
declare var keyIsPressed: any;

/**
 * The system variable key always contains the value of the most recent
 * key on the keyboard that was typed.
 */
declare var key: any;

/**
 * The variable keyCode is used to detect special keys such as BACKSPACE,
 * DELETE, ENTER, RETURN, TAB, ESCAPE, SHIFT, CONTROL, OPTION, ALT, UP_ARROW,
 * DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW.
 */
declare var keyCode: any;

/**
 * The keyPressed() function is called once every time a key is pressed.
 */
declare function keyPressed(): void;

/**
 * The keyReleased() function is called once every time a key is released.
 */
declare function keyReleased(): void;

/**
 * The keyTyped() function is called once every time a key is pressed, but
 * action keys such as Ctrl, Shift, and Alt are ignored.
 */
declare function keyTyped(): void;

/**
 * The keyIsDown() function checks if the key is currently down, i.e.
 */
declare function keyIsDown(code: number): boolean;

// src/events/mouse.js

/**
 * The system variable mouseX always contains the current horizontal
 * position of the mouse, relative to (0, 0) of the canvas.
 */
declare var mouseX: any;

/**
 * The system variable mouseY always contains the current vertical position
 * of the mouse, relative to (0, 0) of the canvas.
 */
declare var mouseY: any;

/**
 * The system variable pmouseX always contains the horizontal position of
 * the mouse in the frame previous to the current frame, relative to (0, 0)
 * of the canvas.
 */
declare var pmouseX: any;

/**
 * The system variable pmouseY always contains the vertical position of the
 * mouse in the frame previous to the current frame, relative to (0, 0) of
 * the canvas.
 */
declare var pmouseY: any;

/**
 * The system variable winMouseX always contains the current horizontal
 * position of the mouse, relative to (0, 0) of the window.
 */
declare var winMouseX: any;

/**
 * The system variable winMouseY always contains the current vertical
 * position of the mouse, relative to (0, 0) of the window.
 */
declare var winMouseY: any;

/**
 * The system variable pwinMouseX always contains the horizontal position
 * of the mouse in the frame previous to the current frame, relative to
 * (0, 0) of the window.
 */
declare var pwinMouseX: any;

/**
 * The system variable pwinMouseY always contains the vertical position of
 * the mouse in the frame previous to the current frame, relative to (0, 0)
 * of the window.
 */
declare var pwinMouseY: any;

/**
 * Processing automatically tracks if the mouse button is pressed and which
 * button is pressed.
 */
declare var mouseButton: any;

/**
 * The boolean system variable mouseIsPressed is true if the mouse is pressed
 * and false if not.
 */
declare var mouseIsPressed: any;

/**
 * The mouseMoved() function is called every time the mouse moves and a mouse
 * button is not pressed.<br><br>
 * Browsers may have different default
 * behaviors attached to various mouse events.
 */
declare function mouseMoved(): void;

/**
 * The mouseDragged() function is called once every time the mouse moves and
 * a mouse button is pressed.
 */
declare function mouseDragged(): void;

/**
 * The mousePressed() function is called once after every time a mouse button
 * is pressed.
 */
declare function mousePressed(): void;

/**
 * The mouseReleased() function is called every time a mouse button is
 * released.
 */
declare function mouseReleased(): void;

/**
 * The mouseClicked() function is called once after a mouse button has been
 * pressed and then released.<br><br>
 * Browsers may have different default
 * behaviors attached to various mouse events.
 */
declare function mouseClicked(): void;

/**
 * The function mouseWheel() is executed every time a vertical mouse wheel
 * event is detected either triggered by an actual mouse wheel or by a
 * touchpad.<br><br>
 * The event.delta property returns the amount the mouse wheel
 * have scrolled.
 */
declare function mouseWheel(): void;

// src/events/touch.js

/**
 * The system variable touchX always contains the horizontal position of
 * one finger, relative to (0, 0) of the canvas.
 */
declare var touchX: any;

/**
 * The system variable touchY always contains the vertical position of
 * one finger, relative to (0, 0) of the canvas.
 */
declare var touchY: any;

/**
 * The system variable ptouchX always contains the horizontal position of
 * one finger, relative to (0, 0) of the canvas, in the frame previous to the
 * current frame.
 */
declare var ptouchX: any;

/**
 * The system variable ptouchY always contains the vertical position of
 * one finger, relative to (0, 0) of the canvas, in the frame previous to the
 * current frame.
 */
declare var ptouchY: any;

// TODO: Property "touches[]", defined in src/events/touch.js, is not a valid JS symbol name

/**
 * The boolean system variable touchIsDown is true if the screen is
 * touched and false if not.
 */
declare var touchIsDown: any;

/**
 * The touchStarted() function is called once after every time a touch is
 * registered.
 */
declare function touchStarted(): void;

/**
 * The touchMoved() function is called every time a touch move is registered.
 */
declare function touchMoved(): void;

/**
 * The touchEnded() function is called every time a touch ends.
 */
declare function touchEnded(): void;

// src/image/image.js

/**
 * Creates a new p5.Image (the datatype for storing images).
 */
declare function createImage(width: number, height: number): p5.Image;

// TODO: Fix saveCanvas() errors in src/image/image.js:
//
//   param "canvas" has invalid type: [selectedCanvas]
//   param "filename" has invalid type: [String]
//   param "extension" has invalid type: [String]
//
// declare function saveCanvas(canvas: [selectedCanvas], filename: [String], extension: [String]): void;

/**
 * Capture a sequence of frames that can be used to create a movie.
 */
declare function saveFrames(filename: string, extension: string, duration: number, framerate: number, callback?: () => any): void;

// src/image/loading_displaying.js

// TODO: Fix loadImage() errors in src/image/loading_displaying.js:
//
//   param "successCallback" has invalid type: Function(p5.Image)
//   param "failureCallback" has invalid type: Function(Event)
//
// declare function loadImage(path: string, successCallback?: Function(p5.Image), failureCallback?: Function(Event)): p5.Image;

/**
 * Draw an image to the main canvas of the p5js sketch
 */
declare function image(img: p5.Image, sx?: number, sy?: number, sWidth?: number, sHeight?: number, dx?: number, dy?: number, dWidth?: number, dHeight?: number): void;

/**
 * Sets the fill value for displaying images.
 */
declare function tint(v1: number|any[], v2?: number|any[], v3?: number|any[], a?: number|any[]): void;

/**
 * Removes the current fill value for displaying images and reverts to
 * displaying images with their original hues.
 */
declare function noTint(): void;

/**
 * Set image mode.
 */
declare function imageMode(m: string): void;

// src/image/pixels.js

// TODO: Property "pixels[]", defined in src/image/pixels.js, is not a valid JS symbol name

// TODO: Fix blend() errors in src/image/pixels.js:
//
//   param "srcImage" has invalid type: p5.Image|undefined
//
// declare function blend(srcImage: p5.Image|undefined, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number, blendMode: number): void;

// TODO: Fix copy() errors in src/image/pixels.js:
//
//   param "srcImage" has invalid type: p5.Image|undefined
//
// declare function copy(srcImage: p5.Image|undefined, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;

/**
 * Applies a filter to the canvas.
 */
declare function filter(filterType: string, filterParam: number): void;

/**
 * Returns an array of [R,G,B,A] values for any pixel or grabs a section of
 * an image.
 */
declare function get(x?: number, y?: number, w?: number, h?: number): any[]|p5.Image;

/**
 * Loads the pixel data for the display window into the pixels[] array.
 */
declare function loadPixels(): void;

/**
 * <p>Changes the color of any pixel, or writes an image directly to the
 * display window.</p>
 * <p>The x and y parameters specify the pixel to change and the c parameter
 * specifies the color value.
 */
declare function set(x: number, y: number, c: number|any[]|any): void;

// TODO: Fix updatePixels() errors in src/image/pixels.js:
//
//   param "w" is defined multiple times
//
// declare function updatePixels(x?: number, y?: number, w?: number, w?: number): void;

// src/io/files.js

/**
 * Loads an opentype font file (.otf, .ttf) from a file or a URL,
 * and returns a PFont Object.
 */
declare function loadFont(path: string, callback?: () => any): any;

/**
 * Loads a JSON file from a file or a URL, and returns an Object or Array.
 */
declare function loadJSON(path: string, callback?: () => any, errorCallback?: () => any, datatype?: string): any|any[];

/**
 * Reads the contents of a file and creates a String array of its individual
 * lines.
 */
declare function loadStrings(filename: string, callback?: () => any, errorCallback?: () => any): any[];

// TODO: Fix loadTable() errors in src/io/files.js:
//
//   param "options" has invalid type: String|Strings
//
// declare function loadTable(filename: string, options?: string|Strings, callback?: () => any): any;

/**
 * Reads the contents of a file and creates an XML object with its values.
 */
declare function loadXML(filename: string, callback?: () => any, errorCallback?: () => any): any;

/**
 * Method for executing an HTTP GET request.
 */
declare function httpGet(path: string, data?: any, datatype?: string, callback?: () => any, errorCallback?: () => any): void;

/**
 * Method for executing an HTTP POST request.
 */
declare function httpPost(path: string, data?: any, datatype?: string, callback?: () => any, errorCallback?: () => any): void;

/**
 * Method for executing an HTTP request.
 */
declare function httpDo(path: string, method?: string, data?: any, datatype?: string, callback?: () => any, errorCallback?: () => any): void;

// TODO: Fix save() errors in src/io/files.js:
//
//   param "objectOrFilename" has invalid type: [Object|String]
//   param "filename" has invalid type: [String]
//   param "options" has invalid type: [Boolean/String]
//
// declare function save(objectOrFilename: [Object|String], filename: [String], options: [Boolean/String]): void;

/**
 * Writes the contents of an Array or a JSON object to a .json file.
 */
declare function saveJSON(json: any[]|any, filename: string, optimize?: boolean): void;

/**
 * Writes an array of Strings to a text file, one line per String.
 */
declare function saveStrings(list: any[], filename: string): void;

/**
 * Writes the contents of a Table object to a file.
 */
declare function saveTable(Table: p5.Table, filename: string, options?: string): void;

// src/math/calculation.js

/**
 * Calculates the absolute value (magnitude) of a number.
 */
declare function abs(n: number): number;

/**
 * Calculates the closest int value that is greater than or equal to the
 * value of the parameter.
 */
declare function ceil(n: number): number;

/**
 * Constrains a value between a minimum and maximum value.
 */
declare function constrain(n: number, low: number, high: number): number;

// TODO: Fix dist() errors in src/math/calculation.js:
//
//   required param "x2" follows an optional param
//   required param "y2" follows an optional param
//
declare function dist(x1: number, y1: number, x2: number, y2: number): number;

/**
 * Returns Euler's number e (2.71828...) raised to the power of the n
 * parameter.
 */
declare function exp(n: number): number;

/**
 * Calculates the closest int value that is less than or equal to the
 * value of the parameter.
 */
declare function floor(n: number): number;

/**
 * Calculates a number between two numbers at a specific increment.
 */
declare function lerp(start: number, stop: number, amt: number): number;

/**
 * Calculates the natural logarithm (the base-e logarithm) of a number.
 */
declare function log(n: number): number;

/**
 * Calculates the magnitude (or length) of a vector.
 */
declare function mag(a: number, b: number): number;

/**
 * Re-maps a number from one range to another.
 */
declare function map(value: number, start1: number, stop1: number, start2: number, stop: number): number;

/**
 * Determines the largest value in a sequence of numbers, and then returns
 * that value.
 */
declare function max(n0: number|any[]): number;

/**
 * Determines the smallest value in a sequence of numbers, and then returns
 * that value.
 */
declare function min(n0: number|any[]): number;

/**
 * Normalizes a number from another range into a value between 0 and 1.
 */
declare function norm(value: number, start: number, stop: number): number;

/**
 * Facilitates exponential expressions.
 */
declare function pow(n: number, e: number): number;

/**
 * Calculates the integer closest to the n parameter.
 */
declare function round(n: number): number;

/**
 * Squares a number (multiplies a number by itself).
 */
declare function sq(n: number): number;

/**
 * Calculates the square root of a number.
 */
declare function sqrt(n: number): number;

// src/math/math.js

/**
 * Creates a new p5.Vector (the datatype for storing vectors).
 */
declare function createVector(x?: number, y?: number, z?: number): p5.Vector;

// src/math/noise.js

/**
 * Returns the Perlin noise value at specified coordinates.
 */
declare function noise(x: number, y: number, z: number): number;

/**
 * Adjusts the character and level of detail produced by the Perlin noise
 *  function.
 */
declare function noiseDetail(lod: number, falloff: number): void;

/**
 * Sets the seed value for <b>noise()</b>.
 */
declare function noiseSeed(seed: number): void;

// src/math/random.js

/**
 * Sets the seed value for random().
 */
declare function randomSeed(seed: number): void;

/**
 * Return a random number.
 */
declare function random(max: number): number;

/**
 * Return a random number.
 */
declare function random(min: number, max: number): number;

/**
 * Returns a random number fitting a Gaussian, or
 *  normal, distribution.
 */
declare function randomGaussian(mean: number, sd: number): number;

// src/math/trigonometry.js

/**
 * The inverse of cos(), returns the arc cosine of a value.
 */
declare function acos(value: number): number;

/**
 * The inverse of sin(), returns the arc sine of a value.
 */
declare function asin(value: number): number;

/**
 * The inverse of tan(), returns the arc tangent of a value.
 */
declare function atan(value: number): number;

/**
 * Calculates the angle (in radians) from a specified point to the coordinate
 * origin as measured from the positive x-axis.
 */
declare function atan2(y: number, x: number): number;

/**
 * Calculates the cosine of an angle.
 */
declare function cos(angle: number): number;

/**
 * Calculates the sine of an angle.
 */
declare function sin(angle: number): number;

/**
 * Calculates the tangent of an angle.
 */
declare function tan(angle: number): number;

/**
 * Converts a radian measurement to its corresponding value in degrees.
 */
declare function degrees(radians: number): number;

/**
 * Converts a degree measurement to its corresponding value in radians.
 */
declare function radians(degrees: number): number;

// TODO: Fix angleMode() errors in src/math/trigonometry.js:
//
//   param "mode" has invalid type: Number/Constant
//
// declare function angleMode(mode: Number/Constant): void;

// src/typography/attributes.js

// TODO: Fix textAlign() errors in src/typography/attributes.js:
//
//   param "horizAlign" has invalid type: Number/Constant
//   param "vertAlign" has invalid type: Number/Constant
//
// declare function textAlign(horizAlign: Number/Constant, vertAlign: Number/Constant): number;

/**
 * Sets/gets the spacing, in pixels, between lines of text.
 */
declare function textLeading(leading: number): any|number;

/**
 * Sets/gets the current font size.
 */
declare function textSize(theSize: number): any|number;

// TODO: Fix textStyle() errors in src/typography/attributes.js:
//
//   param "theStyle" has invalid type: Number/Constant
//
// declare function textStyle(theStyle: Number/Constant): any|string;

/**
 * Calculates and returns the width of any character or text string.
 */
declare function textWidth(theText: string): number;

// src/typography/loading_displaying.js

/**
 * Draws text to the screen.
 */
declare function text(str: string, x: number, y: number, x2: number, y2: number): any;

/**
 * Sets the current font that will be drawn with the text() function.
 */
declare function textFont(f: any|string): any;

// src/utilities/array_functions.js

/**
 * Adds a value to the end of an array.
 */
declare function append(array: any[], value: any): void;

// TODO: Fix arrayCopy() errors in src/utilities/array_functions.js:
//
//   required param "dst" follows an optional param
//
// declare function arrayCopy(src: any[], srcPosition?: number, dst: any[], dstPosition?: number, length?: number): void;

/**
 * Concatenates two arrays, maps to Array.concat().
 */
declare function concat(a: any[], b: any[]): any[];

/**
 * Reverses the order of an array, maps to Array.reverse()
 */
declare function reverse(list: any[]): void;

/**
 * Decreases an array by one element and returns the shortened array,
 * maps to Array.pop().
 */
declare function shorten(list: any[]): any[];

/**
 * Randomizes the order of the elements of an array.
 */
declare function shuffle(array: any[], bool?: boolean): any[];

/**
 * Sorts an array of numbers from smallest to largest, or puts an array of
 * words in alphabetical order.
 */
declare function sort(list: any[], count?: number): void;

/**
 * Inserts a value or an array of values into an existing array.
 */
declare function splice(list: any[], value: any, position: number): void;

/**
 * Extracts an array of elements from an existing array.
 */
declare function subset(list: any[], start: number, count?: number): any[];

// src/utilities/conversion.js

/**
 * Converts a string to its floating point representation.
 */
declare function float(str: string): number;

/**
 * Converts a boolean, string, or float to its integer representation.
 */
declare function int(n: string|boolean|number|any[]): number;

/**
 * Converts a boolean, string or number to its string representation.
 */
declare function str(n: string|boolean|number|any[]): string;

/**
 * Converts a number or string to its boolean representation.
 */
declare function boolean(n: string|boolean|number|any[]): boolean;

/**
 * Converts a number, string or boolean to its byte representation.
 */
declare function byte(n: string|boolean|number|any[]): number;

/**
 * Converts a number or string to its corresponding single-character
 * string representation.
 */
declare function char(n: string|number|any[]): string;

/**
 * Converts a single-character string to its corresponding integer
 * representation.
 */
declare function unchar(n: string|any[]): number;

/**
 * Converts a number to a string in its equivalent hexadecimal notation.
 */
declare function hex(n: number|any[]): string;

/**
 * Converts a string representation of a hexadecimal number to its equivalent
 * integer value.
 */
declare function unhex(n: string|any[]): number;

// src/utilities/string_functions.js

/**
 * Combines an array of Strings into one String, each separated by the
 * character(s) used for the separator parameter.
 */
declare function join(list: any[], separator: string): string;

/**
 * This function is used to apply a regular expression to a piece of text,
 * and return matching groups (elements found inside parentheses) as a
 * String array.
 */
declare function match(str: string, regexp: string): any[];

/**
 * This function is used to apply a regular expression to a piece of text,
 * and return a list of matching groups (elements found inside parentheses)
 * as a two-dimensional String array.
 */
declare function matchAll(str: string, regexp: string): any[];

/**
 * Utility function for formatting numbers into strings.
 */
declare function nf(num: number|any[], left?: number, right?: number): string|any[];

/**
 * Utility function for formatting numbers into strings and placing
 * appropriate commas to mark units of 1000.
 */
declare function nfc(num: number|any[], right?: number): string|any[];

/**
 * Utility function for formatting numbers into strings.
 */
declare function nfp(num: number|any[], left?: number, right?: number): string|any[];

/**
 * Utility function for formatting numbers into strings.
 */
declare function nfs(num: number|any[], left?: number, right?: number): string|any[];

/**
 * The split() function maps to String.split(), it breaks a String into
 * pieces using a character or string as the delimiter.
 */
declare function split(value: string, delim: string): any[];

/**
 * The splitTokens() function splits a String at one or many character
 * delimiters or "tokens." The delim parameter specifies the character or
 * characters to be used as a boundary.
 */
declare function splitTokens(value: string, delim?: string): any[];

/**
 * Removes whitespace characters from the beginning and end of a String.
 */
declare function trim(str?: string|any[]): string|any[];

// src/utilities/time_date.js

/**
 * p5.js communicates with the clock on your computer.
 */
declare function day(): number;

/**
 * p5.js communicates with the clock on your computer.
 */
declare function hour(): number;

/**
 * p5.js communicates with the clock on your computer.
 */
declare function minute(): number;

/**
 * Returns the number of milliseconds (thousandths of a second) since
 * starting the program.
 */
declare function millis(): number;

/**
 * p5.js communicates with the clock on your computer.
 */
declare function month(): number;

/**
 * p5.js communicates with the clock on your computer.
 */
declare function second(): number;

/**
 * p5.js communicates with the clock on your computer.
 */
declare function year(): number;

// Properties from p5.dom

// lib/addons/p5.dom.js

// TODO: Fix select() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element|Null
//
// declare function select(name: string, container?: string): Object/p5.Element|Null;

/**
 * Searches the page for elements with the given class or tag name (using the '.' prefix
 * to specify a class and no prefix for a tag) and returns them as p5.Elements
 * in an array.
 */
declare function selectAll(name: string, container?: string): any[];

/**
 * Removes all elements created by p5, except any canvas / graphics
 * elements created by createCanvas or createGraphics.
 */
declare function removeElements(): void;

// TODO: Fix createDiv() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createDiv(html: string): Object/p5.Element;

// TODO: Fix createP() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
declare function createP(html: string): p5.Element;

// TODO: Fix createSpan() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createSpan(html: string): Object/p5.Element;

// TODO: Fix createImg() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createImg(src: string, alt?: string, successCallback?: () => any): Object/p5.Element;

// TODO: Fix createA() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createA(href: string, html: string, target?: string): Object/p5.Element;

// TODO: Fix createSlider() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createSlider(min: number, max: number, value?: number): Object/p5.Element;

// TODO: Fix createButton() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createButton(label: string, value?: string): Object/p5.Element;

// TODO: Fix createCheckbox() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createCheckbox(label?: string, value?: boolean): Object/p5.Element;

// TODO: Fix createSelect() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createSelect(multiple?: boolean): Object/p5.Element;

// TODO: Fix createRadio() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createRadio(divId?: string): Object/p5.Element;

// TODO: Fix createInput() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createInput(value?: number): Object/p5.Element;

// TODO: Fix createFileInput() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createFileInput(callback?: () => any, multiple?: string): Object/p5.Element;

// TODO: Fix createVideo() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createVideo(src: string|any[], callback?: any): Object/p5.Element;

// TODO: Fix createAudio() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createAudio(src: string|any[], callback?: any): Object/p5.Element;

// TODO: Fix createCapture() errors in lib/addons/p5.dom.js:
//
//   param "type" has invalid type: String|Constant|Object
//   return has invalid type: Object/p5.Element
//
// declare function createCapture(type: string|Constant|any, callback: () => any): Object/p5.Element;

// TODO: Fix createElement() errors in lib/addons/p5.dom.js:
//
//   return has invalid type: Object/p5.Element
//
// declare function createElement(tag: string, content?: string): Object/p5.Element;

// Properties from p5.sound

// lib/addons/p5.sound.js

/**
 * <p>Returns the Audio Context for this sketch.
 */
declare function getAudioContext(): any;

/**
 * Returns a number representing the master amplitude (volume) for sound 
 * in this sketch.
 */
declare function getMasterVolume(): number;

/**
 * <p>Scale the output of all sound in this sketch</p>
 * Scaled between 0.0 (silence) and 1.0 (full volume).
 */
declare function masterVolume(volume: number|any, rampTime?: number, timeFromNow?: number): void;

// TODO: Property "p5.soundOut", defined in lib/addons/p5.sound.js, is not a valid JS symbol name

/**
 * Returns a number representing the sample rate, in samples per second,
 * of all sound objects in this audio context.
 */
declare function sampleRate(): number;

/**
 * Returns the frequency value of a MIDI note value.
 */
declare function midiToFreq(midiNote: number): number;

// TODO: Fix soundFormats() errors in lib/addons/p5.sound.js:
//
//   param "formats" has invalid type: String|Strings
//
// declare function soundFormats(formats: string|Strings): void;

// TODO: Property "{String} failedPath path to the file that failed to load", defined in lib/addons/p5.sound.js, is not a valid JS symbol name
