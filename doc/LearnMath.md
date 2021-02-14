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
  so let's look at random number generators

# Poll #1: Vote for the most random sequence

- Which sequence do **you** think is the most random-looking?
  1. Sequence "A": [...`(3 * x) % 31`...]
  1. Sequence "B": [...`(13 * x) % 31`...]
  1. They seem equally random
- [Insert output from `(3 * x) % 31` and `(13 * x) % 31`
  starting from a common seed chosen to make both sequences
  appear equally random]

# The spectral test for randomness

- Reveal the formulae used to generate the two sequences
- Show their respective spectral tests
- These plots help us realize that "B" is more random than "A"
- Takeaway: testing for randomness is hard
- Marsaglia's tests for randomness

# Pseudorandom number generators

- Both sequences used the same expression (called LCG)
  but with different multiplier values
- The key is in picking a suitable multiplier
  and modulus to produce sufficient randomness in the output
- There's a table of the values in common use, but
  many of them require 64-bit (long) integer types
  which JavaScript does not natively support
- it so happens that the values recommended by Park-Miller
  ("MINSTD" with revised multipler value)
  fit nicely within the limitations of JavaScript's number representation
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

- [Insert one "Before" diagram with a camera pointing right,
  and one "After" diagram with a camera pointing up]
- There are many possible angles which can rotate the "Before"
  view to the "After" view
- Which one do you think in the most natural (assuming
  that these represent camera views in a game)?
  1. 90 degrees counter-clockwise
  1. 270 degrees clockwise
  1. I'm getting dizzy now

# Shortest arc rotations

- For camera transitions in games and simulations,
  we are generally interested in the shortest arc
  (a.k.a. shortest path)
- So 90 degrees counter-clockwise in this example
- Given two arbitrary camera orientations,
  the angle of shortest arc between them
  will always be between -180 and +180 degrees
- We can represent these rotations using either:
  1. The angle itself $\theta$
  1. The sine and cosine of the angle $q$

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
  even special relativity (WAIT: QUATERNIONS VS. SLERP careful!)
- As we might expect, LERP is a very good approximation
- [include link to interactive demo]
