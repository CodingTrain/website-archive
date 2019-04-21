
// Cube sides/faces color mapping
// Don't forget that in canvas coordinates
// X is horizontal from left to right
// Y is verticalfrom top to bottom (upside down) 
// Z is horizontal ortogonal to the screen plane from back to front

// UP - Red - Y == -1
// DOWN - Orange - Y == 1
// LEFT - Blue -  X == -1
// RIGHT - Green X == 1
// BACK - YELLOW Z == -1
// FRONT - Whyte Z == 1

class Cubie
{

  PMatrix3D matrix;

  int x = 0;
  int y = 0;
  int z = 0;
  color c;
  boolean visible;

  Face[] faces = new Face[6];
  // Not all faces are initialized - only the visible ones


  Cubie(PMatrix3D m, int x, int y, int z)
  {
    this.matrix = m;
    this.x = x;
    this.y = y;
    this.z = z;
    //    c = color(255);

    // --- External (colored) faces ---
    // For all the cubies, the colored faces have a non zero coordinate
    // in the axix/direction associated with its given color
    if (this.z == -1)
    {
      // back / yellow
      faces[0] = new Face(new PVector(0, 0, -1), color(255, 255, 0));
    }
    if (this.z == 1)
    {
      // front - white
      faces[1] = new Face(new PVector(0, 0, 1), color(255, 255, 255));
    }
    if (this.y == 1)
    {
      // down - orange
      faces[2] = new Face(new PVector(0, 1, 0), color(255, 150, 0));
    }
    if (this.y == -1)
    {
      // up - Red
      faces[3] = new Face(new PVector(0, -1, 0), color(255, 0, 0));
    }
    if (this.x == 1)
    {
      // right green
      faces[4] = new Face(new PVector(1, 0, 0), color(0, 255, 0));
    }
    if (this.x == -1)
    {
      //
      faces[5] = new Face(new PVector(-1, 0, 0), color(0, 0, 255)); // blue
    }

    // Internal black faces - partially visible during rotations

    // Check number of non-zero coordinates
    if (abs(this.x) + abs(this.y) + abs(this.z) != 3)
    {
      // 1 non zero coordinate: center face cubies
      //   -> 4 internal black faces perpendicular to the 2 axis with coordinate 0
      // 2 non zero coordinates: face middle edge cubies
      //   -> 2 internal black faces  perpendicular to the axis with coordinate 0
      if (this.z == 0)
      {
        faces[0] = new Face(new PVector(0, 0, -1), color(0));
        faces[1] = new Face(new PVector(0, 0, 1), color(0));
      }
      if (this.y == 0)
      {
        faces[2] = new Face(new PVector(0, 1, 0), color(0));
        faces[3] = new Face(new PVector(0, -1, 0), color(0));
      }
      if (this.x == 0)
      {
        faces[4] = new Face(new PVector(1, 0, 0), color(0));
        faces[5] = new Face(new PVector(-1, 0, 0), color(0));
      }
    } else
    {
      // Three non zero coordinates: corner cubies
      //   3 internal black faces oposite to the colored (already created) faces
      //   fill each null face with a black with a normal that is simetric to the one of the oposing face.
      for (int i=0; i<faces.length; i++)
      {
        if (faces[i] == null)
        {
          if (i % 2 == 0)
          {
            // Even face the oposite one is i+1
            //  faces[i]= new Face(new PVector(faces[i+1].normal.x * -1, faces[i+1].normal.y * -1, faces[i+1].normal.z * -1), color(0));
            faces[i]= new Face(PVector.mult(faces[i+1].normal, -1), color(0));
          } else
          {
            // Odd face the oposite one is i-1
            //faces[i]= new Face(new PVector(faces[i-1].normal.x * -1, faces[i-1].normal.y * -1, faces[i-1].normal.z * -1), color(0));
            faces[i]= new Face(PVector.mult(faces[i-1].normal, -1), color(0));
          }
        }
      }
    }
  }

  void update(int x, int y, int z)
  {
    this.matrix.reset();
    this.matrix.translate(x, y, z);
    this.x = x;
    this.y = y;
    this.z = z;
  }

  void turnFacesZ(int dir)
  {
    for (Face f : this.faces)
    {
      if (f != null)
      {
        f.turnZ(dir * HALF_PI);
      }
    }
  }

  void turnFacesY(int dir)
  {
    for (Face f : this.faces)
    {
      if (f != null)
      {
        f.turnY(dir * HALF_PI);
      }
    }
  }

  void turnFacesX(int dir)
  {
    for (Face f : this.faces)
      if (f != null)
      {
        f.turnX(dir * HALF_PI);
      }
  }

  void show()
  {

    if (abs(this.x) + abs(this.y) + abs(this.z) == 0)
    {
      // virtual center cubie (never visible)
      return;
    }

    // debug utility - display only selected froup of cubies (1-center/2-edge/3-corner)
    //if (abs(this.x) + abs(this.y) + abs(this.z) != 1)
    //{
    //  return;
    //}



    pushMatrix();
    noFill();
    stroke(0);
    strokeWeight(0.1);
    applyMatrix(this.matrix);
    box(1);
    for (Face f : this.faces)
    {
      // skip invisible faces (not initialized)
      if (f != null)
      {
        f.show();
      }
    }
    popMatrix();
  }
}
