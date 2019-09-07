//This is the class for complex numbers, it has many function that aren't used in this program but they this class could be copied and used in another program
class Complex
{
  float re;
  float im;
  float freq;
  float amp;
  float phase;


  Complex(float r, float i)
  {
    re = r;
    im = i;
  }

  Complex()
  {
    re = 0;
    im = 0;
  }

  Complex(float r, float i, float f, float a, float p)
  {
    re = r;
    im = i;
    freq = f;
    amp = a;
    phase = p;
  }

  Complex mult(Complex other)
  {
    float rea = re * other.re - im * other.im;
    float ima = re * other.im + im * other.re;
    return new Complex(rea, ima);
  }

  Complex add(Complex other) 
  {
    return new Complex(re + other.re, im + other.im);
  }

  Complex sub(Complex other) 
  {
    return new Complex(re - other.re, im - other.im);
  }

  Complex pow(int n)
  {
    Complex result = this; 
    for (int i = 0; i < n; i++)
    {
      result = result.mult(this);
    }
    return result;
  }

  Complex copy()
  {
    float r = re;
    float i = im;
    return new Complex(r, i);
  }

  Complex mult(float mult)
  {
    re *= sqrt(mult);
    im *= sqrt(mult);
    return new Complex(re, im);
  }

  Complex div(float divisor)
  {
    float r = re / divisor;
    float i = im / divisor;
    return new Complex(r, i);
  }

  void normalize()
  {
    re /= mag();
    im /= mag();
  }

  float heading()
  {
    return atan2(im, re);
  }

  void setMag(float r)
  {
    this.normalize();
    this.mult(r);
  }

  float mag()
  {
    return sqrt(re * re + im * im);
  }

  float magSq()
  {
    return re * re + im * im;
  }

  void rotate(float theta)
  {
    re += cos(theta);
    im += sin(theta);
  }
}


class RandomComplex extends Complex
{
  RandomComplex()
  {
    re = random(-1, 1);
    im = random(-1, 1);
    normalize();
  }
}

class ComplexFromAngle extends Complex
{
  ComplexFromAngle(float theta)
  {
    re = sin(theta);
    im = cos(theta);
    normalize();
  }
}
