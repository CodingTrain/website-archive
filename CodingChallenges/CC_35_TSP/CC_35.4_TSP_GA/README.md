# Coding Challenge 35.4: Travelling Salesperson - Genetic Algorithm
* Edited Videos for this challenge: TBD
* Live Stream: [Live Stream #90: Session 2 of “Intelligence and Learning” Continued](https://www.youtube.com/watch?v=NCvdjnN9UfI)

## Community Variations

#### By: [James Williams](https://github.com/strangecyan)
[Repository](https://github.com/strangecyan/TravellingSalesperson/) | [Demo](https://strangecyan.github.io/TravellingSalesperson/)
Refactored to be object oriented; there is now a `Salesperson` object that stores order and fitness and there is a `Company` object that contains all of the bestEver, currentBest, etc properties.

This means that you can have multiple versions with different values (populaton, mutation rate, etc) side by side and even different code (swap, distance, crossover functions) by extending the `Company` prototype, as in the `SuperCompany` example. No more eyeballing if it's faster or better!