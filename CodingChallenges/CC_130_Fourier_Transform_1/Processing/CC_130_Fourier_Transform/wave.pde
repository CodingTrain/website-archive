class Wave{
  float amplitude, frequency, phase;
  
  Wave(float A, float f, float p){
   amplitude = A;
   frequency = f;
   phase = p;
  }
 
  PVector state(float time, float offset){
    return PVector.fromAngle(frequency * time + phase + offset).mult(amplitude);
  }
}
