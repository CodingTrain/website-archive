// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/AaGK-fj-BAM

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.flag = false;
  
  this.lvl;
  this.lvl_limit = 10 ;
  
  this.currentlvl;
  this.turboflag;
  
  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
	  this.flag = true;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.Reset = function() {
		// reset score 
        this.total = 0;
		this.lvl = num_lvl;
		this.currentlvl= num_lvl;
		// reser snake
        this.tail = [];
		this.flag = false;
		// reset position
		this.x = 0;
		this.y = 0;
		this.xspeed = 1;
		this.yspeed = 0;
		pickLocation();			
		//reset turbo
		turboflag = true;
  }
  
  this.ResetSnake = function() {
		alert("Game over");
		this.Reset();	
	}

  this.EatTail = function(){
	for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
		 this.ResetSnake();
		 return true;
      } 
    }
	return false ;
  }
  
  this.HitWalls = function(walls){
	for (var i = 0; i < walls.length; i++) {
      var d = dist(this.x, this.y, walls[i].x, walls[i].y);
      if (d < 1) {
		 this.ResetSnake();
		 return true;
      } 
    }
	return false ;
  }
  
  this.death = function(walls) {
	var dead1 = false;
	var dead2 = false;
	
	dead1 = this.EatTail();
	dead2 = this.HitWalls(walls);
	
	return (dead2 | dead1) ;
  }

  this.update = function() {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

	// cross the wall
	if ( this.x > width- scl) {
		this.x = 0;	
		
	}
	else if ( this.x < 0) {
		this.x =  width- scl;	
	}
	
	if ( this.y > lower_edge- scl) {
		this.y = 0;	
	}
	else if ( this.y < 0) {
		this.y =  lower_edge- scl;	
	}

  }
  
  this.turbo = function() {
	  if(turboflag)this.currentlvl = this.lvl;
	  turboflag = false;
	  this.lvl = ceil(this.lvl/2);
  }
  
  this.normal = function() {
	  this.lvl = this.currentlvl;
	  turboflag = true;
  }
  
  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);

  }
}
