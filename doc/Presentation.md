# Introduction

- The fact that games and programming can help people learn math
  is not really surprizing when you consider
  the potential for motivation and positive feedback,
  but writing a complete game is a huge undertaking
- In my experience, even writing a demo or a small feature
  can be a great way to learn math
- To demonstrate this, we will consider two features
  in a hypothetical game
  and go through some of the math that a developer might encounter
- The goal is to keep things interesting and interactive
- Please feel free to ask questions
- Interruptions are welcome
- There are no pop quizes or surprize tests
  so don't worry about the details
- _It's less about the math itself and more about the way we learn it_

# A hypothetical game

- Suppose that we want to write a multi-player web game
  about exploring a Mars-like planet
- Players can remotely control satellites, deploy rovers
  to the surface of the plant to collect samples,
  run tests on those samples to look for signs of life,
  and then share their results with the community
- Players get credit when they contribute to discoveries
- It sounds like fun, but for now we are just going to focus
  on two very small pieces
- We will focus on two features which relate to viewing the planet
  from an orbiting satellite:
  1. Generating random-looking terrain on the planet
  1. Transitions between views of the planet from space

# Feature: Generating points at random locations

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
- We call this **pseudorandom**: it's looks random
  but it is also consistent and repeatable

# Breaking-down the problem

- A useful skill in software development
  is being able to break-down a problem into smaller pieces
- For this feature we will assume that we already know
  how to generate the actual terrain from a given set of points,
  which lets us focus on generating just the points
- We can also assume that the planet is just a large sphere
- Then we can break it down into two steps:
  - Generate pseudorandom numbers from an initial seed
  - Map those numbers to points on a sphere

# Pseudorandom number generators

- Pseudorandom number generators are non-trivial
  and have been a topic of research in the past,
  but today they are readily available
- JavaScript has one called `Math.random()`
- However, unlike most generators, JavaScript
  provides no way to set the seed
- This means that if we try to use `Math.random()`
  for generating our points,
  then we have no way to guarantee
  that every player will see the same thing
- So we could look for an existing library
  which provides a seedable generator,
  but if we dig a little deeper
  we might gain more insight
  into the underlying math
  as well as an appreciation
  for the remarkable efforts
  of the computer scientists who first discovered it

# Poll: Which sequence looks more random?

- ...
- It's interesting to see how two pseudorandom sequences
  that appear equally random
  can have very different properties
- Fortunately there is a simple test
  for detecting hidden patterns
  in a sequence of pseudorandom numbers

# The spectral test for randomness

# A seedable pseudorandom number generator

# Mapping numbers to points on a sphere

# Feature: Smooth transitions between views

# Poll: Which rotation would you expect?

- ...
- There are many possible rotations
  from view "A" to view "B"
- As a player, which one would you expect?
  1. 90 degrees counter-clockwise (the shorter arc)
  1. 270 degrees clockwise (the longer arc)
  1. Other (it's late and I'm getting dizzy)

# Did we learn anything?

- We learned that:
  - A poor pseudorandom number generator
    can produce sequences that contain undesirable patterns,
    but that the spectral test can help identify this problem
  - If we ever need a seedable generator in HTML5,
    we can use one based on the constants recommended
    by Park and Miller
  - To understand vector and quaternion math
    it sometimes helps to start in 2D
    before trying to generalize it to 3D
  - Lerp is a fast approximation to Slerp
    and is easier to implement correctly
