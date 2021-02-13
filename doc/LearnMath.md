# Introduction

# Why JavaScript?

# Feature #1: Random points on a planet

- Suppose that we want to ...
- Break this down into two steps:
  - Generating random numbers
  - Mapping random numbers to points on a planet
- JavaScript's `Math.random()` has no way to set the seed
  so let's take a brief look at random number generators

# Poll #1: Vote for the most random-looking

- Which sequence below do **you** think is the most random-looking?
- [Insert output from `(3 * x) % 31` and `(13 * x) % 31`
  starting from a common seed chosen to make both sequences
  appear equally random]

# The spectral test for randomness

- Reveal the formulae used to generate the two sequences
- Show their respective spectral tests
- Now the choice is more obvious
- Testing for randomness is hard
- Marsaglia's tests for randomness

# Pseudorandom number generators

- Both sequences used the same expression
  but with different multiplier values
- The key is in picking suitable values to
  produce sufficient randomness in the output
- There's a table of the values in common use, but
  many of them require 64-bit (long) integer types
  which JavaScript does not natively support
- Park-Miller selected values which fit within
  the limitations of JavaScript's number representation
- [JavaScript code for my Pseudorandom class]

# Mapping numbers to points on a sphere

- Given a source of random numbers,
  there are many ways to map them onto the surface
  of a planet (or sphere):
  1. Take each triplet as a 3D vector and
     normalize it [not uniform unless you reject
     points outside the sphere]
  1. Spherical coordinates
  1. Marsaglia's mapping from the unit disk
     [advantages]
- [include image and/or link to interactive demo]

# Feature #2: Smooth transitions between views

- Suppose that we want to ...
- Break this down into two steps:
  - Smooth transitions in 2D
  - Smooth transitions in 3D

# Poll #2: Vote for the most natural rotation

- One "before" diagram with a camera pointing right,
  and one "after" diagram with a camera pointing up
- There are many possibilities for the rotation
  which explains this result
- Which rotation below do **you** think in the most natural?
- [Show choices of 270 degrees clockwise, 90 degrees counter-clockwise,
  450 degrees counter-clockwise]

# Shortest Arc Rotations in 2D

- For our game, we are interested in the shortest arc
  (or shortest path)
- I.e., 90 degrees counter-clockwise in this case
- Given two arbitrary camera orientations,
  the angle of shortest arc between them
  will be between -180 and +180 degrees
- Let's compare two methods to represent this:
  1. Using the angle itself
  1. Using the sine and cosine of the angle

# Method 1: Using the angle itself

- A single parameter which is the angle itself,
  always kept in the valid range -180 to 180 degrees

#
