# Introduction

- ...
- To demonstrate this, we will consider two small features
  in a hypothetical game
  and go through some of the math that a developer might encounter
  while trying to implement them
- The goal is to keep things interesting and interactive
- Please feel free to ask questions
- Interruptions are welcome
- There are no pop quizes or hidden tests so don't worry about the details
- It's less about the math itself and more about learning it
- We will also conduct polls
  to give you an opportunity to cast your votes
  and have a little fun

# A hypothetical game

- Suppose that we want to write a multi-player web game
  about exploring a Mars-like planet
- Players can remotely control satellites, deploy rovers
  to the surface of the plant to collect samples,
  run tests on those samples to look for signs of life,
  and then share their results with the community
- Players get credit when they contribute to discoveries
- It sounds like fun, but for now we are just going to focus
  on two very small pieces...
- Players will need to view the planet from an orbiting satellite,
  so the two features relate to:
  1. Generating random-looking terrain on the planet
  1. How we view the planet from space

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
- We call this **pseudorandom**: it's looks random
  but it is also consistent and repeatable

# Breaking-down the problem

- A useful skill in software development
  is being able to break-down a problem into smaller pieces
- For this feature we will just focus on generating points
  at random locations
- We won't worry about how to generate the actual terrain from those points
- We can also assume that the planet is just a large sphere
- This lets us break the problem down into small steps:
  - Generate pseudorandom numbers from an initial seed
  - Map those numbers to points on a sphere

# Pseudorandom number generators

- Pseudorandom number generators are non-trivial
  and have been a topic of research in the past,
  but today they are readily available
- JavaScript has one called `Math.random()`
- Oddly however `Math.random()` has no way to set the seed
- If we try to use `Math.random()` for generating our points,
  we have no way to guarantee
  that every player will see the same thing
- We could look for an existing library
  which provides a seedable generator
  and just use that
- But digging a bit deeper gives us some insight into the
  underlying math
- We will also gain an appreciation for the remarkable efforts
  of the computer scientists who first discovered it

# Poll: Which sequence looks more random?

- ...
- It's interesting to see how two pseudorandom sequences
  that appear equally random
  can have very different properties
- Fortunately there is a simple test
  for detecting hidden patterns
  in a sequence of pseudorandom numbers

# Spectral test for randomness

# A seedable pseudorandom number generator in JavaScript

# Feature 2: Smooth transitions between views
