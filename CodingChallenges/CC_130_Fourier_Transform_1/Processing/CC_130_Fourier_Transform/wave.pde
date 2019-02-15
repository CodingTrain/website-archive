class Phasor{
  float amplitude, frequency, phase;
  
  Phasor(float A, float f, float p){
   amplitude = A;
   frequency = f;
   phase = p;
  }
  
 
  PVector state(float time, float offset){
    return PVector.fromAngle(frequency * time + phase + offset).mult(amplitude);
  }
}


void Sort(Phasor[] Phasors)
{
  int n = Phasors.length;

  for (int i = 0; i < n-1; i++)
  {
    int mindex = i;

    for (int j = i+1; j < n; j++)
    {
      if (Phasors[j].amplitude > Phasors[mindex].amplitude)
        mindex = j;
    }
    swap(Phasors, mindex, i);
  }
}



void swap(Phasor[] Phasors, int i, int j)
{
  Phasor temp = Phasors[i];
  Phasors[i] = Phasors[j];
  Phasors[j] = temp;
}
