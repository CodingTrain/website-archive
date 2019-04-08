
ArrayList<bird> population, saved;
ArrayList<pipe> pipes;
float TOTAL;
int Gens;
float counter;
void setup()
{
  size(640, 480);

  TOTAL = 500;
  pipes = new ArrayList<pipe>();
  population = new ArrayList<bird>();
  saved = new ArrayList<bird>();
  for (int i = 0; i < TOTAL; i++)
  {
    population.add(new bird());
  }
  counter = 0;
}

void draw()
{
  background(51);
  if (counter % 75 == 0)
  {
    pipes.add(new pipe());
  }

  for (int i = pipes.size()-1; i >= 0; i--)
  {
    pipe p = pipes.get(i);
    p.update();
    if (p.offscreen())
    {
      pipes.remove(i);
    }

    for (int j = population.size()-1; j >= 0; j--)
    {
      bird b = population.get(j);
      if (p.hit(b) || b.dead())
      {
        saved.add(b);
        population.remove(j);
      }
    }
  }

  if (population.size() == 0)
  {
    counter = 0;
    nextGeneration();
    pipes.clear();
    pipes.add(new pipe());
  }

  for (bird b : population)
  {
    b.show();
    b.update();
    b.think(pipes);
  }

  for (int i = pipes.size()-1; i >= 0; i--)
  {
    pipe p = pipes.get(i);
    p.show();
  }

  counter++;
}
