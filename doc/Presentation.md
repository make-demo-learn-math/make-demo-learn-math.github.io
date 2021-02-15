# Introduction

- The fact that games and programming can help people learn math
  is not really surprizing when you consider
  the potential for motivation and positive reinforcement,
  but writing a complete game is a huge undertaking
- In my experience, even writing a small demo or feature
  can be a great way to learn math
- To demonstrate this, we will consider two features
  in a hypothetical game
  and go through some of the math that a developer might encounter
- The goal is to keep things interesting and interactive
- Please feel free to ask questions
- Interruptions are welcome

# A hypothetical game

- Suppose that we want to write a multi-player web game
  about exploring a Mars-like planet
- Players can remotely control satellites, deploy rovers
  to the surface of the plant to collect samples,
  run tests on those samples to look for signs of life,
  and then share their results with the community
- Players get credit when they contribute to discoveries
- It sounds like fun, but for now we are just going to focus
  on two very small features of the game
  which relate to viewing the planet from space:
  1. Generating random-looking terrain on the planet
  1. Transitions between views of the planet
     from an orbiting satellite

# Feature 1: Generating points at random locations

- Rather than using a detailed image of a real planet,
  suppose that we want to generate the planet's terrain procedurally
  based on a "seed" value,
  similar to how each different Minecraft world
  is generated from a unique seed
- The golden rule is:
  > Given the same initial seed,
      every player will see the exact same world
- So we want the terrain to look the same for every player
  but we also want it to "appear random"
- That is, we don't want any visible patterns
- We want it to be **pseudorandom**: random in appearance
  but also consistent and reproducible for each player

# Breaking-down the problem

- A useful skill in software development
  is being able to break-down a problem into smaller pieces
- For this feature we will assume that we already know
  how to generate the actual terrain from a given set of points,
  which lets us focus just on generating the points themselves
- We can also assume that the planet is a perfect sphere
- We can break it down into two steps:
  - Generate pseudorandom numbers from an initial seed
  - Map those numbers to points on a sphere

# Pseudorandom number generators

- Pseudorandom number generators are non-trivial
  and have been a topic of research in the past,
  but nowadays they are readily available
- In JavaScript the function is called `Math.random()`
  however, unlike most generators, JavaScript
  provides no way to set the seed
- This means that if we try to use `Math.random()`
  for generating our points,
  we have no way to guarantee
  that every player will see the same thing
- We could look for an existing library
  which provides a seedable generator,
  but if we dig a little deeper
  we might gain more insight
  into the underlying math
- We might also gain an appreciation
  for the remarkable efforts
  of the computer scientists who first discovered it

# Poll: Which sequence looks more random?

- By "random" we mean "no visible pattern"
- ...show number sequences A and B...
  1. Sequence A looks more random
  1. Sequence B looks more random
  1. Both sequences look equally random
- Fortunately there is a simple test
  for detecting hidden patterns
  in a sequence of pseudorandom numbers
- ...reveal spectral test plots for each...
- It's interesting to see how two pseudorandom sequences
  which appear equally random
  can have very different properties
  when displayed like this

# The spectral test for randomness

- spectral test, RANDU, Marsaglia's tests, values in use

# A seedable pseudorandom number generator

- my code for Park-Miller

# Mapping numbers to points on a sphere

- sphere point picking, Marsaglia (again)

# Feature 2: Smooth transitions between views

- We start with a satellite which circles the planet
  according to a prescribed orbit
- You can imagine the view from a camera
  which is fixed to the satellite
- If we rotate the satellite,
  we will transition to a different view
- We want those transitions (i.e., rotations)
  to be smooth
- We could try to simulate the real physics of the satellite
  or we could just interpolate smoothly between the start
  and end
- Game engines such as Unity and Unreal provide a rich API
  for interpolating rotations and simulating physics
- But here again we will gain unique insight by digging
  a little deeper into the underlying math

# Poll: Which rotation would you expect?

- ...2D camera which rotates to look at the point of interest...
- ...view A is to the right, view B is up...
- There are many possible rotations
  from view A to view B
- For the camera in a game or a simulation, which one would you expect?
  1. 90 degrees counter-clockwise (the shorter arc)
  1. 270 degrees clockwise (the longer arc)
  1. Other (it's late and I'm getting dizzy)

# Shortest arc rotations

# Interpolating between views

# Did we learn anything?

- We learned that:
  - The output of a poorly-chosen pseudorandom number generator
    can contain undesirable patterns
    which are difficult to see just by inspection
  - The spectral test helps to identify this problem
  - JavaScript's generator has no way to set the seed,
    but we can implement a seedable generator in JavaScript
    based on the constants recommended by Park and Miller
  - When working with 3D vectors and rotations,
    sometimes it helps to start in 2D
    before trying to generalize to 3D
  - Quaternion Nlerp is a fast approximation to Slerp
    which is easy to implement
