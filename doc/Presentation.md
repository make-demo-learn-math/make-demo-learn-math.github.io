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
- We will conduct a couple of fun polls
  to give you an opportunity to cast your votes

# A Hypothetical Game

- Suppose that we want to write a multi-player web game
  about exploring a Mars-like planet
- Players can remotely control satellites, deploy rovers
  to the surface of the plant to collect samples,
  run tests on those sample to look for signs of life,
  and then share their results with the community
- It sounds like fun but for now we are just going to focus
  on two very small pieces
- The two features that we want to implement will give us a simple
  view of the planet from an orbiting satellite
- The first feature relates to generating random-looking terrain
  and the second feature relates to how we view it from space

# Feature 1: Generating Points at Random Locations on the Planet

- Rather than using a detailed image of a real planet,
  suppose that we want to generate the planet's terrain procedurally
  based on a "seed" value,
  similar to how different Minecraft worlds are generated from seeds
- The golden rule is that, given the same initial value,
  every player will see the exact same world
- In our case we are just trying to generate random points that
  cover the planet
- We want their locations to appear random but to be the same for every player
- From a game design viewpoint, something is sufficiently random when it has
  no discernable pattern
- (This is not cryptography!)
- When we view the planet from a satellite, we don't want any visible pattern
  in the locations of the points
