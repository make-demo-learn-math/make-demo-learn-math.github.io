# Introduction

- To demonstrate this, we will start with a description of 2 small features
  in a hypothetical game
  and talk about some of the math that a developer might encounter
  while trying to implement them
- The goal is to keep things interesting and interactive
- Please feel free to ask questions
- Interruptions are welcome
- There are no pop quizes or hidden tests so don't worry about the details
- It's less about the math itself and more about how we learn the math
- We will also conduct a couple of fun polls
  to give you an opportunity to cast your votes

# A Hypothetical Game

- Suppose that we want to write a multi-player web game
  about exploring a Mars-like planet
- Players can remotely control satellites, deploy rovers
  to the surface of the plant to collect samples,
  run tests on those sample to look for signs of life,
  and then share their results with the community
- Players get credit when they contribute to discoveries
- It sounds like fun but for now we are just going to focus
  on two very small pieces
- The two features that we want to implement will give us a simple
  view of the planet from an orbiting satellite
- The first feature relates to generating random-looking terrain
  and the second feature relates to how we view it from space

# Feature 1: Generating Points at Random Locations

- Rather than using a detailed image of a real planet,
  suppose that we want to generate the planet's terrain procedurally
  based on a "seed" value,
  similar to how different Minecraft worlds are generated from seeds
- The golden rule is that, given the same initial value,
  every player will see the exact same world
- So we want the terrain to look the same for every player
  but we also want it to "appear random"
- That is, we don't want any visible patterns
- We call that **pseudorandom**: its consistent and repeatable,
  but it looks random

# Breaking-down the problem

- For this feature we will just focus on generating points
  at random locations
- We won't worry about how to generate the actual terrain from those points
- Also, we can assume that the planet is just a large sphere
- So we break this down into two steps:
  1. Generate pseudorandom numbers from an initial seed
  1. Map those numbers to points on a sphere
- Pseudorandom numbers generators are readily available
  to any programmer
- JavaScript has one called `Math.random()`
- However `Math.random()` has no way to set the seed
  which means that we cannot guarantee
  that every player will see the same thing
- Libraries might be available to give us this functionality
  and to save us time
  but in this case we might gain more insight by implementing our own
- Pseudorandom number generators are non-trivial
  and have been a topic of research
- As a programmer, we need some way to test our implementation
  to ensure that the points we generate contain no visible patterns
- Let's take a look at how two pseudorandom sequences that appear equally random
  can have very different properties
- We will see how a simple test can be effective for detecting hidden patterns
