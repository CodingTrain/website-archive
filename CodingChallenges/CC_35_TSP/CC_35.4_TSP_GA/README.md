# Coding Challenge 35.4: Travelling Salesperson - Genetic Algorithm
* Edited Videos for this challenge: TBD
* Live Stream: [Live Stream #90: Session 2 of “Intelligence and Learning” Continued](https://www.youtube.com/watch?v=NCvdjnN9UfI)

## Ports

#### [Gareth Williams](https://github.com/gaweph) | [Repository](https://github.com/Gaweph/CodingTrain-RainbowCode-Challenges/tree/master/CC_35.4_TSP_GA_TypeScript)

Typescript Implementation of TSP GA

_(No functional difference from Daniels original challenge implementation)_

## Community Variations

#### By: [James Williams](https://github.com/strangecyan)
[Repository](https://github.com/strangecyan/TravellingSalesperson/) | [Demo](https://strangecyan.github.io/TravellingSalesperson/)
Refactored to be object oriented; there is now a `Salesperson` object that stores order and fitness and there is a `Company` object that contains all of the bestEver, currentBest, etc properties.

This means that you can have multiple versions with different values (populaton, mutation rate, etc) side by side and even different code (swap, distance, crossover functions) by extending the `Company` prototype, as in the `SuperCompany` example. No more eyeballing if it's faster or better!

#### By: Allan Seidel
[Repository](https://github.com/akseidel/03_TSP_GA_CROSSOVER_AKS) &mdash;
This variation is designed for someone to observe how the simple GA evolution proceeds in context with the TSP complexity, mutation rate and genetic population size. The observer can then recognize basic evolution concepts.

**Features**

* Controls
  * Button &ndash; **Restart(New Routes etc.)**
  * Input &ndash; **Number Of Cities**
  * Input &ndash; **Population Pool Size**
  * Checkbox &ndash; **Inject Wild DNA**
  * Slider &ndash; **Random One Position Mutation Rate**
* Evolution History
  * Display prior best route solutions in context with when they occurred.
  * Display evolution performance history curve.
