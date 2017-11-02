class Bubble {
	constructor( x, y ) {
		this.x = x;
		this.y = y;
		this.r = 48;
		this.col = color( 255 );
	}

	changeColor( ) {
		this.col = color(random( 255 ), random( 255 ), random( 255 ))
	}
	display( ) {
		stroke( 255 );
		fill( this.col );
		ellipse( this.x, this.y, this.r * 2, this.r * 2 );
	}

	intersects( other ) {
		var d = dist( this.x, this.y, other.x, other.y );
		if ( d < this.r + other.r ) {
			return true;
		} else {
			return false;
		}
	}

	update( ) {
		this.x = this.x + random( -1, 1 );
		this.y = this.y + random( -1, 1 );
	}
}
