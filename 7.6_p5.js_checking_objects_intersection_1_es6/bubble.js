class Bubble {
    constructor( x, y ) {
        this.x = x;
        this.y = y;
        this.r = 48;
        this.col = color( 233 );
    }
    changeColor( ) {
        this.col = color(random( 233 ), random( 144 ), random( 89 ));
    }
    connected( other ) {
        let d = dist( this.x, this.y, other.x, other.y );
        if ( d < this.r + other.r ) {
            return true;
        } else {
            return false;
        }
    }
    display( ) {
        stroke( 233 );
        strokeWeight( 3 );
        fill( this.col );
        ellipse( this.x, this.y, this.r * 2, this.r * 2 );
    }
    move( ) {
        this.x = this.x + random( -5, 5 );
        this.y = this.y + random( -5, 5 );
    }
}