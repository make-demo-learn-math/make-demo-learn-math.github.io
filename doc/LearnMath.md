# Introduction

# Why JavaScript?

# Feature #1: Random points on a planet

- Suppose that we want to ...
- Break this down into two steps:
  - Generating random numbers
  - Mapping random numbers to points on a planet
- JavaScript's `Math.random()` has no way to set the seed
  so we will take a brief look at random number generators

# Poll #1: The most random-looking sequence

- Vote for which sequence below is the most random-looking
- [Insert output from `(3 * x) % 31` and `(13 * x) % 31`
  starting from a common seed chosen to make both sequences
  appear equally random]

# The spectral test for randomness

- Reveal the formulae used to generate the two sequences
- Show their respective spectral tests
- Now the choice is more obvious
- Testing for randomness is actually very difficult
- Marsaglia

# Pseudorandom number generators

- Both sequences used the same expression
  but with different multiplier values
- The key is in picking suitable values to
  produce sufficient randomness in the output
- There's a table of the values in common use, but
  many of them require 64-bit (long) integer types
  which JavaScript does not natively support
- Park-Miller selected values that fit within
  the limitations of JavaScript's number representation
- [JavaScript code for my Pseudorandom class]

# Feature #2: Smooth transitions between views

- Suppose that we want to ...
- Break this down into two steps:
  - Smooth transitions in 2D
  - Smooth transitions in 3D

# Poll #2: The most natural rotation between views
