// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/40Me1-yAtTc

function Snake() {
  // Snake position
  this.x = 0;
  this.y = 0;
  // Snake speed
  this.xspeed = 1;
  this.yspeed = 0;
  // Snake length
  this.total = 0;
  // Tail locations
  this.tail = [];

  // Check to see if it is eating food
  this.eat = function(pos) {
   var d = dist(this.x, this.y, pos.x, pos.y);
   if (d < 1) {
     this.total++;
     return true;
   } else {
     return false;
   }
  }

  // Set its direction
  this.dir = function(x, y) {
   this.xspeed = x;
   this.yspeed = y;
  }

  // Check to see if it hits itself
  this.death = function() {
   for (var i = 0; i < this.tail.length; i++) {
     var pos = this.tail[i];
     var d = dist(this.x, this.y, pos.x, pos.y);
     if (d < 1) {
       console.log('starting over');
       startOverSound.play();
       music.rate(1);
       fr = 1;
       this.x = 0;
       this.y = 0;
       this.xspeed = 1;
       this.yspeed = 0;
       this.total = 0;
       this.tail = [];
     }
   }
  }

  // Update location
  this.update = function() {
   // Expand snake
   if (this.total === this.tail.length) {
     for (var i = 0; i < this.tail.length - 1; i++) {
       this.tail[i] = this.tail[i + 1];
     }
   }
   // Newest position
   this.tail[this.total - 1] = createVector(this.x, this.y);

   // Move snake
   this.x = this.x + this.xspeed * scl;
   this.y = this.y + this.yspeed * scl;

   // Keep on screen
   if (this.x > width - scl) {
     this.x = 0;
   } else if (this.x < 0) {
     this.x = width - scl;
   }
   if (this.y > height - scl) {
     this.y = 0;
   } else if (this.y < 0) {
     this.y = height - scl;
   }
  }

  // Draw snake
  this.show = function() {
   for (var i = 0; i < this.tail.length; i++) {
     var hu = map(i - 1, -1, this.tail.length, 0, 255);
     fill(hu, 255, 255);
     rect(this.tail[i].x, this.tail[i].y, scl, scl);
   }
   fill(255, 255, 255);
   rect(this.x, this.y, scl, scl);

  }
}
