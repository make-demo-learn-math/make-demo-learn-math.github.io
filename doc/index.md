# Is writing a game a good way to learn math?

- Video games can provide many key ingredients
  for effective learning
  such as positive reinforcement
  and intrinsic motivation.
- For someone with a passion for video games,
  writing a game can be a great way
  to learn problem solving skills
  and mathematics.
- However writing a complete game
  is a huge undertaking
  even with all of the development tools
  and game engines
  that are available.
- Rather than writing a complete game,
  let's consider writing a small demo
  or just a single feature within a game.
- If we break the task down into smaller pieces like this,
  we can focus more on the interesting things
  that we might learn along the way.

# Game premise

- We need a premise for a game
  to provide some motivation.
- This is just an example
  of a hypothetical game.
- Feel free to come up with a better one!
- The important thing is that it captures your imagination.
- With all of the exciting news recently
  about the successful landing on Mars,
  I have chosen a theme
  of planetary exploration.

### [A multi-player web game](./rover.png)

- Suppose that we want to write a multi-player web game
  about exploring a Mars-like planet.
- Players can remotely control satellites,
  deploy rovers to the surface of the planet
  for collecting samples,
  run tests on those samples
  to look for signs of life,
  and then share their results
  with the community.
- Players get credit when they contribute to discoveries.
- It all sounds like fun,
  but for now we are just going to focus
  on two small "features" of the game
  which relate to how players
  can view the surface of the planet from space.
- To plan their simulated expeditions,
  players will use an orbiting satellite
  equipped with a camera.
- Players will be able to point the camera
  at a particular region and zoom in
  to see the terrain in detail.
- Maybe the player is looking for a particular
  outcropping of rocks
  or evidence of an ancient lake bed.
- As a game developer,
  we need to generate the terrain itself
  and we need to simulate the view from the satellite.
- Feature #1 is all about generating
  random-looking terrain on the planet.
- Feature #2 is for realistic transitions
  between views of the planet from the orbiting satellite.

# Feature #1: Generating random terrain

- (defining the problem and the requirements)
- what we want is "pseudorandom" based on a seed
- our own definition of "random-looking"
- also require it to be distributed over the planet uniformly

# A big assumption

- Generating realistic terrain in a game
  is a whole separate topic
  and best left for another presentation
  (and for someone else to present)!
- For this presentation
  let's assume that we know how to generate terrain
  from a given set of points located randomly
  on the surface of the planet.
- eg include ...
- assume we know how to generate terrain from random points
- (e.g., Voronoi cells with truncation for height map,
  Perlin noise over an irregular grid, etc.)
- that's a big assumption but necessary to manage the
  scope of this presentation
- with this assumption, we can divide this feature
  into two incremental steps: generating the numbers
  and mapping the numbers to points (locations) on the planet
- LCG and Lehmer, and seeds
- sphere point picking
- (finding a solution and showing how it solves the problem)

# Pseudorandom number generators

- (implementation)
- JavaScript provides no way to set the seed!
- whether we use a third party lib or write our own
  we need a way to test the output for "randomness"
- let's see why that is important

# Poll: Can you see the pattern?

# The spectral test for randomness

# Implementation in JavaScript

# Mapping to points on a sphere

- problems you might encounter
- possible solutions
- Marsaglia's method and its advantages (speed, no rejection / deterministic ingress requirements)
- show result (positive reinforcement)

# Feature #2: Realistic transitions between views

- (defing the problem and the acceptance criteria)
- desirable properties of a "realistic rotation"

# Smooth interpolation of 3D rotations

- (finding a solution and showing how it solves the problem)
- properties of quaternion Slerp, and how that matches our requirements

# Quaternion Slerp

- (implementation)
- difficulties of finding the angle (inverse cosine)
- singularity when the angle vanishes (division by zero)
- yes there are ways to deal with that, but our solution is starting to get cumbersome
- (show a reference implementation as an example)
- is there a better way?

# Lerp

- (simplify)
- no need to find the angle, and no singularity
- takes the same path, but not constant velocity
- how close is it?

# Poll: Can you tell Lerp from Slerp?

# Did we learn anything?

- developing a game is a huge undertaking
  but provides the intrinsic motivation and positive reinforcement
  that drive us to learn new things
- breaking that down and focusing just on a couple of small features
  still provides a similar motivation
  but is much more manageable and attainable
- whether we are using an existing generator or writing or own,
  there is a simple test for randomness
- a generator in JS with Park Miller constants
- Lerp is a good approximation of Slerp
  and is easier to implement
