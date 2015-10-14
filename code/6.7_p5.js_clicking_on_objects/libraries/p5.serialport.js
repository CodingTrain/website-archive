/*! p5.serialport.js v0.0.1 2015-07-23 */
/**
 * @module p5.serialport
 * @submodule p5.serialport
 * @for p5.serialport
 * @main
 */
/**
 *  p5.serialport
 *  Shawn Van Every (Shawn.Van.Every@nyu.edu)
 *  ITP/NYU
 *  LGPL
 *  
 *  https://github.com/vanevery/p5.serialport
 *
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd)
    define('p5.serialport', ['p5'], function(p5) {
      (factory(p5));
    });
  else if (typeof exports === 'object')
    factory(require('../p5'));
  else
    factory(root['p5']);
}(this, function(p5) {

  // =============================================================================
  //                         p5.SerialPort
  // =============================================================================


  /*
  var serialPort = new SerialPort();
  serialPort.open("/dev/tty-usbserial1", {
    baudrate: 57600
  });
  */

  /**
   * Base class for a Serial Port
   *
   * @class p5.SerialPort
   * @constructor
   */
  p5.SerialPort = function(_hostname, _serverport) {

    var self = this;

    this.bufferSize = 1; // How much to buffer before sending data event
    this.serialBuffer = [];
    //this.maxBufferSize = 1024;

    this.serialConnected = false; // Is serial connected?

    this.serialport = null;
    this.serialoptions = null;
    
    this.emitQueue = [];

    if (typeof _hostname === 'string') {
      this.hostname = _hostname;
    } else {
      //console.log("typeof _hostname " + typeof _hostname + " setting to locahost");
      this.hostname = "localhost";
    }

    if (typeof _serverport === 'number') {
      this.serverport = _serverport;
    } else {
      //console.log("typeof _serverport " + typeof _serverport + " setting to 8081");
      this.serverport = 8081;
    }

    try {
      this.socket = new WebSocket("ws://" + this.hostname + ":" + this.serverport);
    } catch (err) {
      //console.log(err + "\n" + "Is the p5.serialserver running?");
      if (typeof self.errorCallback !== "undefined") {
        self.errorCallback("Couldn't connect to the server, is it running?");
      }
    }

    this.socket.onopen = function(event) {
      serialConnected = true;

      if (typeof self.connectedCallback !== "undefined") {
        self.connectedCallback();
      }
      
      if (self.emitQueue.length > 0) {
        for (var i = 0; i < self.emitQueue.length; i ++){
          self.emit(self.emitQueue[i]);
        }
        self.emitQueue = [];
      }
      
      /* Now handled by the queue
      if (self.serialport && self.serialoptions) {
        // If they have asked for a connect, these won't be null and we should try the connect now
        // Trying to hide the async nature of the server connection and just deal with the async nature of serial for the end user
        self.emit({
          method: 'openserial',
          data: {
            serialport: self.serialport,
            serialoptions: self.serialoptions
          }
        });
      }
      */
    };

    this.socket.onmessage = function(event) {
      //console.log("socketOnMessage");
      //console.log(event);

      var messageObject = JSON.parse(event.data);

      // MESSAGE ROUTING
      if (typeof messageObject.method !== "undefined") {
        if (messageObject.method == 'echo') {
          //console.log("echo: " + messageObject.data);
        } else if (messageObject.method === "openserial") {
          if (typeof self.openCallback !== "undefined") {
            self.openCallback();
          }
        } else if (messageObject.method === "data") {
          // Add to buffer, assuming this comes in byte by byte
          //console.log("data: " +  JSON.stringify(messageObject.data));
          self.serialBuffer.push(messageObject.data);
          
          //console.log(self.serialBuffer.length);

          if (typeof self.dataCallback !== "undefined") {
            // Hand it to sketch
            if (self.serialBuffer.length >= self.bufferSize) {
              self.dataCallback();
            }
            //console.log(self.serialBuffer.length);
          }

          if (typeof self.rawDataCallback !== "undefined") {
            self.rawDataCallback(messageObject.data);
          }
        } else if (messageObject.method === 'list') {
          if (typeof self.listCallback !== "undefined") {
            self.listCallback(messageObject.data);
          }
        } else if (messageObject.method === "write") {
          // Success Callback?
        } else if (messageObject.method === "error") {
          //console.log(messageObject.data);

          if (typeof self.errorCallback !== "undefined") {
            // Hand it to sketch
            self.errorCallback(messageObject.data);
          }
        } else {
          // Got message from server without known method
          console.log("Unknown Method: " + messageObject);
        }
      } else {
        console.log("Method Undefined: " + messageObject);
      }
    };

    this.socket.onclose = function(event) {
      //console.log("socketOnClose");
      //console.log(event);

      if (typeof self.closeCallback !== "undefined") {
        self.closeCallback();
      }
    };

    this.socket.onerror = function(event) {
      //console.log("socketOnError");
      //console.log(event);

      if (typeof self.errorCallback !== "undefined") {
        self.errorCallback();
      }
    };

  };

  p5.SerialPort.prototype.emit = function(data) {
    if (this.socket.readyState == WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      this.emitQueue.push(data);
    }
  };

  p5.SerialPort.prototype.isConnected = function() {
    if (self.serialConnected) { return true; }
    else { return false; }
  };

  // list() - list serial ports available to the server
  p5.SerialPort.prototype.list = function(cb) {
    if (typeof cb === 'function') {
      this.listCallback = cb;
    }
    this.emit({
      method: 'list',
      data: {}
    });
  };

  p5.SerialPort.prototype.open = function(_serialport, _serialoptions, cb) {

    if (typeof cb === 'function') {
      this.openCallback = cb;
    }

    this.serialport = _serialport;

    if (typeof _serialoptions === 'object') {
      this.serialoptions = _serialoptions;
    } else {
      //console.log("typeof _serialoptions " + typeof _serialoptions + " setting to {}");
      this.serialoptions = {};
    }

    // If our socket is connected, we'll do this now, 
    // otherwise it will happen in the socket.onopen callback
    this.emit({
      method: 'openserial',
      data: {
        serialport: this.serialport,
        serialoptions: this.serialoptions
      }
    });
  };

  p5.SerialPort.prototype.write = function(data) {
    //Writes bytes, chars, ints, bytes[], Strings to the serial port

    this.emit({
      method: 'write',
      data: data
    });
    //this.socket.send({method:'writeByte',data:data});  ? 
    //this.socket.send({method:'writeString',data:data})  ?
  };

  p5.SerialPort.prototype.read = function() {
    //Returns a number between 0 and 255 for the next byte that's waiting in the buffer. Returns -1 if there is no byte, although this should be avoided by first cheacking available() to see if data is available.
    if (this.serialBuffer.length > 0) {
      return this.serialBuffer.shift();
    } else {
      return -1;
    }
  };

  p5.SerialPort.prototype.readChar = function() {
    //Returns the next byte in the buffer as a char. Returns -1 or 0xffff if nothing is there.
    if (this.serialBuffer.length > 0) {
      /*var currentByte = this.serialBuffer.shift();
      console.log("p5.serialport.js: " + currentByte);
      var currentChar = String.fromCharCode(currentByte);
      console.log("p5.serialport.js: " + currentChar);
      return currentChar;
      */
      return String.fromCharCode(this.serialBuffer.shift());
    } else {
      return -1;
    }
  };

  p5.SerialPort.prototype.readBytes = function() {
    if (this.serialBuffer.length > 0) {
      var returnBuffer = this.serialBuffer.slice();

      // Clear the array
      this.serialBuffer.length = 0;

      return returnBuffer;
    } else {
      return -1;
    }
  };

  p5.SerialPort.prototype.readBytesUntil = function(charToFind) {
    //Reads from the port into a buffer of bytes up to and including a particular character. If the character isn't in the buffer, 'null' is returned. The version with without the byteBuffer parameter returns a byte array of all data up to and including the interesting byte. This is not efficient, but is easy to use. The version with the byteBuffer parameter is more memory and time efficient. It grabs the data in the buffer and puts it into the byte array passed in and returns an int value for the number of bytes read. If the byte buffer is not large enough, -1 is returned and an error is printed to the message area. If nothing is in the buffer, 0 is returned.
    var index = this.serialBuffer.indexOf(charToFind.charCodeAt(0));
    if (index !== -1) {
      // What to return
      var returnBuffer = this.serialBuffer.slice(0, index + 1);
      // Clear out what was returned
      this.serialBuffer = this.serialBuffer.slice(index, this.serialBuffer.length + index);
      return returnBuffer;
    } else {
      return -1;
    }
  };

  p5.SerialPort.prototype.readString = function() {
    //Returns all the data from the buffer as a String. This method assumes the incoming characters are ASCII. If you want to transfer Unicode data, first convert the String to a byte stream in the representation of your choice (i.e. UTF8 or two-byte Unicode data), and send it as a byte array.
    //var returnBuffer = this.serialBuffer;
    var stringBuffer = [];
    //console.log("serialBuffer Length: " + this.serialBuffer.length);
    for (var i = 0; i < this.serialBuffer.length; i++) {
      //console.log("push: " + String.fromCharCode(this.serialBuffer[i]));
      stringBuffer.push(String.fromCharCode(this.serialBuffer[i]));
    }
    // Clear the buffer
    this.serialBuffer.length = 0;
    return stringBuffer.join("");
  };

  p5.SerialPort.prototype.readStringUntil = function(stringToFind) {

    var stringBuffer = [];
    //console.log("serialBuffer Length: " + this.serialBuffer.length);
    for (var i = 0; i < this.serialBuffer.length; i++) {
      //console.log("push: " + String.fromCharCode(this.serialBuffer[i]));
      stringBuffer.push(String.fromCharCode(this.serialBuffer[i]));
    }
    stringBuffer = stringBuffer.join("");
    //console.log("stringBuffer: " + stringBuffer);

    var returnString = "";
    var foundIndex = stringBuffer.indexOf(stringToFind);
    //console.log("found index: " + foundIndex);
    if (foundIndex > -1) {
      returnString = stringBuffer.substr(0, foundIndex);
      this.serialBuffer = this.serialBuffer.slice(foundIndex + stringToFind.length);
    }
    //console.log("Sending: " + returnString);
    return returnString;
  };

  // TODO
  //p5.SerialPort.prototype.bufferUntil
  //p5.SerialPort.prototype.buffer

  p5.SerialPort.prototype.available = function() {
    //return size of buffer
    return this.serialBuffer.length;
  };

  // TODO: This doesn't seem to be shortening the array
  p5.SerialPort.prototype.last = function() {
    //Returns last byte received
    var last = this.serialBuffer.pop();
    this.serialBuffer.length = 0;
    return last;
  };

  // TODO: This doesn't seem to be shortening the array
  p5.SerialPort.prototype.lastChar = function() {
    //Returns the last byte received as a char.
    return String.fromCharCode(this.last());
  };

  // TODO: This isn't working
  p5.SerialPort.prototype.clear = function() {
    //Empty the buffer, removes all the data stored there.
    this.serialBuffer.length = 0;
  };

  p5.SerialPort.prototype.stop = function() {
    //Stops data communication on this port. Use to shut the connection when you're finished with the Serial.
    // TODO
  };

  p5.SerialPort.prototype.close = function(cb) {
    // Tell server to close port
    if (typeof cb === 'function') {
      this.closeCallback = cb;
    }
    this.emit({
      method: 'close',
      data: {}
    });
  };

  // Register callback methods from sketch
  p5.SerialPort.prototype.on = function(_event, _callback) {
    if (_event == 'open') {
      this.openCallback = _callback;
    } else if (_event == 'data') {
      this.dataCallback = _callback;
    } else if (_event == 'close') {
      this.closeCallback = _callback;
    } else if (_event == 'error') {
      this.errorCallback = _callback;
    } else if (_event == 'list') {
      this.listCallback = _callback;
    } else if (_event == 'connected') {
      this.connectedCallback = _callback;
    } else if (_event == 'rawdata') {
      this.rawDataCallback = _callback;
    }
  };
}));

// EOF
