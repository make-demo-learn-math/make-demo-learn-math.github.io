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
  - LCG
  - Values in use but many require long ints to compute
  - JavaScript: no long ints, and `Math.random()` cannot be seeded
- A seedable generator in JavaScript
  - Park-Miller
  - code
- Point picking
  - Marsaglia (again)
  - homework: suppose we want to generate random colonies
    on the plant (not just lat and long, but also heading);
    hint: hypersphere point picking
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
- 2D rotations
  - just the principal angle (i.e., we are not keeping track
    of how many times the object has turned)
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
  - scalar LERP
  - 2D SLERP and the difficulty implementing it
  - is there a simpler, fast approximation?
  - NLERP is simple but poor (and numerically unstable near 180 deg)
- Double cover
  - cos(theta/2), sin(theta/2)
  - now we have greatly improved NLERP as a fast approximation to SLERP
  - recover via double-angle formula, etc.
- 3D rotations
  - Euler rotation theorem
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
  - used in character animation for body joints, robotics
    for mechanical joints, aerospace for attitude control,
    bioinformatics for measuring RMSD, etc.
  - further reading: unit dual quaternion for representing
    rotation AND translation (a.k.a. rigid motion)

# Summary (Description)

Writing a even a small game can be a great way to learn some very interesting math.
I will share some of the topics that I've learned myself
just by dabbling.
To provide motivation, we start with a description of
two features in a hypothetical game.
By the end of the presentation
we will have an appreciation for some of the math
used in video games.
Takeaways include a seedable pseudorandom number generator
in JavaScript
and a fast approximation to quaternion SLERP.
