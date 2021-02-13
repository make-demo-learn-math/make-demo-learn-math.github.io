# Is Writing a Game a Good Way to Learn Math?

- Writing a demo or a small game can be a great way to learn
  some of the mathematics behind today's video games.
- For serious game development it's likely more practical
  to use one of the existing game engines
  like Unity or Unreal
  which offer very high performance.
- However, using one of those frameworks often means
  that some of the really interesting math
  has been done for you.
- Writing your own small routines can give you
  more insight into the underlying principles
  and how they work.
- I will share some of the topics that I've learned
  just by dabbling.
- These algorithms seem simple and elegant,
  but would have involved remarkable efforts
  by the mathematicians and computer scientists
  who first discovered them.

# Motivation

Suppose that we want to:

- Generate "random" points on a fictitious planet
  based on an initial "seed" such that
  every player will see the exact same pattern
  given the same initial seed.
- Transition smoothly between views of the planet
  from a satellite, giving the illusion of inertia
  without the need to simulate any real physics.

# Takeaways

- A better appreciation for some of the underlying math
  used in many video games.
- A seedable pseudo-random number generator in JavaScript.
- A simple and fast approximation to quaternion SLERP.

# Slides

- Is Writing a Game a Good Way to Learn Math?
  - Writing a demo or a small game can be a great way to learn
    some of the mathematics behind today's video games.
  - I will share some of the topics that I've learned
    just by dabbling.
  - The algorithms themselves look simple and elegant.
  - When you understand the problems that they solve,
    you begin to appreciate the remarkable efforts
    by the mathematicians and computer scientists
    who first discovered them.
- Why JavaScript?
  - For serious game development it's likely more practical
    to use one of the existing game engines
    like Unity or Unreal
    which offer very high performance.
  - However, using one of those frameworks often means
    that some of the really interesting math
    has been done for you.
  - Writing your own small routines can give you
    more insight into the underlying principles
    and how they work.
  - I also believe in removing barriers to education.
  - Unfortunately the development tools for popular
    game engines only run on high-end computers
  - In contrast, web development can be done on
    an inexpensive computer
- Feature 1: Random points on a planet
  - Suppose that we want to generate "random" points
    on a fictitious planet based on an initial "seed"
    such that every player will see the exact same pattern
    given the same initial seed
  - Break this down into:
    1. Generate a sequence of numbers from a given seed
    1. Map those numbers to points on a sphere
- What is "random"?
  - We want to generate a repeatable sequence that
    looks random, but will be exactly the same for each player
    based on an initial seed value
  - not really "random", but "pseudo random" based on a seed value
  - a different seed value will generate a completely
    different universe
  - every player with the same seed value will see the same
    universe
  - We want "pseudorandom": looks random but is deterministic
  - What does it mean to "look random"?
  - Some degree of "randomness"
- Poll: Which of these sequences has the most randomness?
  - A few sequences to choose from, all with the same uniform distribution
    but in a different order (one is just in ascending order, the others
    look more random, but only one passes the spectral test)
- Measuring randomness
  - Marsaglia's suite of tests
- Pseudorandom number generators
  - LCG (Knuth et al)
  - Values in use but many require long ints to compute
  - JavaScript: no long ints, and `Math.random()` cannot be seeded
  - Linear Congruential Generator
  - simple algorithm but picking suitable values
    is very difficult (and also very difficult to test)
  - Marsaglia's famous test suite for randomness
  - JavaScript's built-in `Math.random()` does not allow
    you to set the seed
  - the other problem is that numbers in JavaScript
    as 64-bit double-precision floating-point numbers
    (no 64-bit integer type built-in)
  - after a bit of digging: Park-Miller (show code)
- A seedable generator in JavaScript
  - Park-Miller
  - code
- Point picking
  - Marsaglia (again)
  - homework: suppose we want to generate random colonies
    on the plant (not just lat and long, but also heading);
    hint: hypersphere point picking
  - CUE share link to live demo
- Feature 2: Smooth 3D camera transitions
  - Suppose that we want to transition smoothly
    between views of the planet from a satellite,
    giving the illusion of inertia
    without the need to simulate any real physics.
  - Break this down into:
    1. Find a suitable way to represent rotations
    1. Find a way to smoothly transition between rotations
  - It's actually easier to start by looking at the problem
    in 2D first.
  - Then the leap from 2D to 3D is small enough to manage.
- Poll: Rotation angle
  - Figure 1 is original shape
  - Figure 2 is the same shape rotated 135 degrees counter-clockwise
  - What is the rotation angle in degrees: 135, -225, 495?
  - Those are all correct
  - For our purposes will will consider [-180,180) only
    so 135 in this example
  - just the principal angle but in [-180,180)]
  - i.e., we are not keeping track
    of how many times the object has turned
- 2D rotations
  - There are many ways to represent rotations
    but the two methods that we will look at are:
    1. Principal angle (in degrees or radians for example)
    1. Point on the unit circle (x, y) = (cos(theta), sin(theta))
- Comparing the two methods
  - Double the rotation
  - Composition
  - Halve the rotation (note the trick for method 2)
  - Average the rotation (note the trick for method 2)
  - Integration
- Interpolation between two rotations
  - scalar LERP ((L)iner Int(erp)olation)
  - 2D SLERP ((S)pherical (L)iner Int(erp)olation)
    and the difficulty implementing it
  - is there a simpler, fast approximation?
  - NLERP is simple but poor (and numerically unstable near 180 deg)
- Double cover
  - cos(theta/2), sin(theta/2)
  - now we have greatly improved NLERP as a fast approximation to SLERP
  - recover via double-angle formula, etc.
- 3D rotations
  - Euler rotation theorem (any 3D rotation can be expressed
    as a single rotation about a fixed axis)
  - history: the quest for a 3D version of complex numbers
  - Hamilton and his inscription on the bridge in Scotland
  - unit quaternion => point on the surface of the 3-sphere
  - representations with 3 parameters and the unavoidable singularity
  - using a unit quaternion is equivalent to something called Euler
    parameters, and avoids the singularity (but also has other advantages)
  - to represent a 3D rotation, we use cos(theta/2) as the first parameter
    and sin(theta/2)\*a where a is the unit vector of the axis of rotation
    as the last 3 parameters
- Quaternion SLERP
  - as with our 2D method, LERP is a good approximation
  - both SLERP and LERP take the path of "minimum energy"
    which is exactly what we want for a spacecraft simulation!
  - used in character animation for body joints (Shoemake), robotics
    for mechanical joints, aerospace for attitude control,
    bioinformatics for measuring RMSD, etc.
  - further reading: unit dual quaternion for representing
    rotation AND translation (a.k.a. rigid motion)
    also used in character animation (Kavan et al)
    and robotics
  - CUE (re-)share link to live demo

# About this project

- This presentation and its code samples are in GitHub
  at [make-demo-learn-math](https://make-demo-learn-math.github.io/)

# Summary (Description)

Writing even a small game can be a great way
to learn math.
I will share topics that I've learned myself
just by dabbling.
Starting with two features in a hypothetical game,
I will show how math can be interesting and interactive.
By the end of the presentation
developers and non-developers alike
will have an appreciation for some of the math
used in video games.
Takeaways include a seedable pseudorandom
number generator in JavaScript
and a fast approximation to quaternion SLERP.
