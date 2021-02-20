# (Presenter Notes)

- open the same presentation in two tabs
  and share one of the tabs
- in the shared tab, you will follow each link
  to the image/diagram/plot
  and use the back button to return
- the other tab just provides a script for you to follow

# Is writing a game a good way to learn math?

- Video games by design
  provide many key ingredients for effective learning
  such as positive reinforcement
  and intrinsic motivation.
- For someone with a passion for video games,
  writing a game can be a great way
  to learn problem solving skills
  and mathematics.
- The problem is that writing a complete game
  is a huge undertaking
  even with all of the development tools
  and game engines
  that are available.
- Rather than writing a complete game,
  let's consider writing a small demo
  or a single feature within a game.
- If we break the task down into smaller pieces like this,
  we can focus more on the interesting things
  that we might learn along the way.

# A hypothetical game

- We need a premise for a game
  to provide some motivation.
- This is just an example
  of a hypothetical game.
- Feel free to come up with a better one!
- The important thing is that is captures your imagination.
- With all of the recent news
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
  on two small features of the game
  which relate to viewing the planet from space.
- To plan their expeditions on the surface,
  players will need some way to view
  the details of the planet
  from an orbiting satellite.
- They will be able to point the satellite
  at a particular region and zoom in
  to see the terrain details.
- As a game developer,
  we need to generate the terrain in the game
  and we need to simulate the view from the satellite.
- Those are the two "features" of the game
  that we will use as the example.
- Feature #1 is about generating
  random-looking terrain on the planet.
- Feature #2 is about realistic transitions
  between views of the planet from
  an orbiting satellite.

# Feature #1: Generating random terrain

- (defining the problem)
- what we want is "pseudorandom"
- definition of "random-looking"

# Generating pseudorandom points on a sphere

- (finding a solution and showing how it solves the problem)
- LCG and Lehmer, and seeds
- sphere point picking

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

# Feature #2: Realistic view transitions

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
