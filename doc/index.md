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
  is a huge undertaking,
  even with all of the development tools
  and game engines
  that are available.
- Rather than writing a complete game,
  let's consider writing just a small demo
  or individual features within a game.
- If we break the task down into smaller pieces like this,
  we can focus more on the interesting things
  that we might learn along the way.

# Game premise

- We need a premise for a game
  to provide some motivation.
- This is just an example
  of a hypothetical, simulation-type game.
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
- Feature #1 is about generating
  random-looking terrain on the planet.
- Feature #2 is about simulating realistic transitions
  between views of the planet from an orbiting satellite.

# Feature #1: Generating random terrain

- Rather than using a detailed image of a real planet,
  we want to generate the planet's terrain procedurally
  based on a "seed" value.
- This is similar to the game of Minecraft
  where each different world
  is generated from a unique seed.
- Since our game is multi-player,
  it is important that every player
  sees the exact same world.
- We also want the terrain to look "random",
  which means that there should be no visible patterns
  and the distribution should be more or less uniform.
- We call this "pseudorandom":
  random-looking but perfectly reproducible
  based on the initial seed.

# A big assumption

- There are many techniques
  for generating realistic terrain in a game.
- Indeed that is a whole topic onto itself
  and deserves its own presentation.
- Typically the goal is to generate terrain information
  like height, slope, and colour for each location
  on the planet that we are interested in.
- Perlin noise is one popular approach for this.
- In order to keep this presentation well-focused,
  we are going to make a sweeping assumption.
- We are going to assume that we already know
  how to generate terrain information
  given a set of points located randomly
  over the surface of the planet.
- We won't worry about how those points are used
  to generate the height and colour of the terrain,
  and it is sufficient to say that a suitable
  technique exists (for example, using Voronoi diagrams).
- With this assumption, we can focus on simply generating
  points at random (or pseudorandom) locations.
- The first step is to generate a sequence of
  pseudorandom numbers,
  and the second step is to map those numbers
  to locations on the planet.
- Roughly speaking, the planet is just a large sphere.
- We will look at how to generate pseudorandom numbers,
  and how to map them to points on a sphere.

# Pseudorandom number generators

- just a game, not cryptography
- LCG and Lehmer
- simple formulas but with carefully chosen constants
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
  - minimum energy/torque: a single rotation
    about a single axis
  - shortest arc
  - roughly constant velocity (only as far
    as player can perceive)

# Smooth interpolation of 3D rotations

- (finding a solution and showing how it solves the problem)
- properties of quaternion Slerp, and how that matches our requirements

# Quaternion Slerp

- (implementation)
- difficulties of finding the angle (inverse cosine)
  - clamp to avoid NaN (e.g., `Math.min()` but still
    want sign to we can negate one endpoint...)
- singularity when the angle vanishes (division by zero)
  - use Lerp below a certain threshold but how do we know
    what value to use? Not just continuity but also we
    must ensure the result is unit length!
- so yes there are ways to deal with that, but our solution is starting to get cumbersome
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
