### Presenter Notes

- open the same presentation in two tabs
  and share one of the tabs
- in the shared tab, you will follow each link
  to the image/diagram/plot
  and use the back button to return
- the other tab just provides a script for you to follow

# Is writing a game a good way to learn math?

# Is there life on planet X?

- overall premise (intrinsic motivation) (just an example - you can come up with a better one)
- player needs a view of the planet from orbit
- more description around the game/simulation scenario
  of the orbiting satellite and its view of the planet
  (e.g., so the player can plan out their expedition to the surface of the planet, etc.)
- the two features

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
