# Introduction

- Writing a demo or a small game can be a great way to learn
  some of the mathematics behind today's video games
- I will share a few topics that I've learned
  just by dabbling
- The algorithms themselves look simple and elegant
  but the problems that they solve are formidable
  and the efforts by the mathematicians and
  computer scientists who first discovered them
  are remarkable
- For motivation, I will describe two features in
  a hypothetical game:
  1. Random points on a fictitious planet
  1. Smooth camera transitions between views

# Why web?

- For serious game development the practical choice
  is to use one of the popular game engines
  like Unity or Unreal
  which offer very high performance
  and a rich set of APIs
- However that tends to shield you from the underlying math
  which, I think, is the really interesting stuff
- That also requires an expensive computer
  with a high-end graphics card
- In contrast, writing your own small routines
  in something like JavaScript can give you
  more insight into the underlying math
  and can be done on an inexpensive computer

# Feature #1: Random points on a planet

- Suppose that we want to generate "random" points
  on a fictitious planet based on an initial "seed"
  such that every player will see the exact same pattern
  given the same initial seed
- Break this down into two steps:
  - Generating random numbers
  - Mapping random numbers to points on a planet
- JavaScript's `Math.random()` has no way to set the seed
  so let's take a brief look at random number generators

# Poll #1: Vote for the most random-looking

- Which sequence below do **you** think is the most random-looking?
  = [call them sequence "A" and sequence "B"]
- [Insert output from `(3 * x) % 31` and `(13 * x) % 31`
  starting from a common seed chosen to make both sequences
  appear equally random]

# The spectral test for randomness

- Reveal the formulae used to generate the two sequences
- Show their respective spectral tests
- Now the choice is more obvious: "B" is more random
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

- Suppose that we want to transition smoothly
  between views of the planet from a satellite,
  giving the illusion of inertia
  without the need to simulate any real physics
- Start with 2D
- Each view is represented by a rotation angle
- Find a way to smoothly transition between views
- The leap from 2D to 3D is then an easy one

# Poll #2: Vote for the most natural rotation

- One "before" diagram with a camera pointing right,
  and one "after" diagram with a camera pointing up
- There are many possibilities for the rotation
  which explains this result
- Which rotation below do **you** think in the most natural?
- [Show choices of 270 degrees clockwise, 90 degrees counter-clockwise,
  450 degrees counter-clockwise]

# Shortest arc rotations

- In our case we are interested in the shortest arc
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
- [Insert JavaScript class with sum, double, halve, etc.]
- Interpolation

# Method 2(a): Using sine and cosine of the angle

- Two parameters representing a point on the unit circle
- Cosine and sine of the angle
- Constraint of unit length
- [Insert JavaScript class with sum, double, halve, etc.]
- Interpolation (SLERP) (Shoemake)
- LERP is a poor approximation above 90 degrees
- Is there some way to improve that?

# Method 2(b): Sine and cosine of half the angle

- Still a point on the unit circle,
  but now **half** the angle
- I.e., cosine and sine of half of the angle
- A "double cover"
- Use the double angle formula to recover the original pair
- LERP is now a very good approximation
- This is a essentially 2D unit quaternion
- It's now just a small leap from 2D to 3D

# Quaternion SLERP

- [Quaternion brief history, Hamilton, unit quaternion
  as a point on the unit hypersphere and
  for Euler rotations, Euler parameters, advantages
  over three-parameter representations]
- One parameter is cosine of half the angle as before,
  the other three come from scaling the axis vector
  by sine of half the angle
- Quaternion SLERP (endpoints are unit length, result is
  unit length)
- Used for character animation (Shoemake), robotics,
  spacecraft attitude control, RMSD bioinformatics, etc.
- As we might expect, LERP is a very good approximation
