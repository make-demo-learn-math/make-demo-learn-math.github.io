# Is Writing a Game a Good Way to Learn Mathematics?

- The fact that games and programming
  can help people learn mathematics
  is not really surprizing when you consider
  the potential for intrinsic motivation
  and positive reinforcement,
  but writing a complete game is a huge undertaking.
- In my experience, even writing a small demo or feature
  can be a great way to learn mathematical concepts
  which are not normally covered in school.
- To demonstrate this, we will consider
  two features in a hypothetical game
  and walk through some of the math
  that a developer might encounter.
- The goal is to keep things interesting and interactive.
- Please feel free to ask questions.
- Interruptions are welcome!

# A hypothetical game

- Suppose that we want to write a multi-player web game
  about exploring a Mars-like planet.
- Players can remotely control satellites, deploy rovers
  to the surface of the planet to collect samples,
  run tests on those samples to look for signs of life,
  and then share their results with the community.
- Players get credit when they contribute to discoveries.
- It sounds like fun, but for now we are just going to focus
  on two features of the game
  which relate to viewing the planet from space:
  1. Generating random-looking terrain on the planet
  1. Transitions between views of the planet
     from an orbiting satellite.

# Feature 1: Generating random terrain

- Rather than using a detailed image of a real planet,
  suppose that we want to generate the planet's terrain procedurally
  based on a "seed" value,
  similar to how each different Minecraft world
  is generated from a unique seed.
- For a proper shared experience,
  the golden rule is that:
  > Given the same initial seed,
        every player sees the exact same virtual world.
- For our game we want the terrain to look the same
  for every player
  but we also want it to look random,
  which means that we don't want any visible patterns.
- This is called "pseudorandom";
  it's random-looking but perfectly reproducible
  based on the initial seed.

# Breaking-down the problem

- A useful skill in software development
  is being able to break-down a problem into smaller pieces.
- For the purposes of this presentation
  we will assume that we already have a way
  to generate the actual terrain from a given set of points,
  and therefore we will just focus
  on generating the points themselves.
- We can also assume that the planet is a perfect sphere.
- We can break this feature down into two incremental steps:
  - Generate pseudorandom numbers from an initial seed
  - Map those numbers to points on a sphere.
- After a few Google searches
  and reading several posts on Stack Overflow,
  we discover that
  for the first step we need a pseudorandom number generator,
  and for the second step we need something
  known as sphere point picking.

# Pseudorandom number generators

- For our game,
  we don't need a cryptographically-strong generator
  so the built-in generators
  provided by most programming languages
  should be sufficient.
- Unfortunately, the generator that JavaScript provides
  (called `Math.random()`)
  has no way to set the seed.
- If we try to use `Math.random()`
  for generating the points on our planet,
  we have no way to guarantee
  that every player will see the same thing.
- Since we cannot break the golden rule,
  we need to find a seedable generator.
- We could search for an existing library
  which provides a seedable generator
  and simply use it,
  but we gain a deeper understanding
  by spending a few minutes on Wikipedia
  where we learn about the "linear congruential generator" (LCG).
- The LCG formula is very simple
  but involves several constants
  which must be chosen carefully.
- Selecting the constants to ensure sufficient randomness
  is non-trivial and has been a topic of research.
- On the next slide we will see
  how the output of a generator with poorly-chosen constants
  can contain undesirable patterns
  which are difficult to see at first glance.

# Poll: Which sequence looks more random?

- Below are two sets of output
  from a very simple LCG formula.
- A different multiplier constant was used
  to generate each sequence.
- ...show number sequences A and B...
- Which do you think looks more "random"?
- Possible responses:
  1. Sequence A looks more random
  1. Sequence B looks more random
  1. Both sequences look equally random
- It turns out that one of the sequences
  actually contains a very noticeable pattern
  if you try to plot points with it.

# A test for randomness

- For the random terrain in our game,
  we need some assurance
  that the player won't see any patterns.
- Fortunately there is a simple test
  for detecting hidden patterns
  in a sequence of pseudorandom numbers.
- Here are the spectral plots
  for the two random-looking sequences
  from our poll:
- ...reveal spectral test plots for each...
- It's interesting to see how two pseudorandom sequences
  which appear equally random
  can actually have very different properties
  when displayed like this.
- ...spectral method, RANDU, Marsaglia's tests, values in use...

# A seedable generator in JavaScript

- ...values suitable for JavaScript, my code for Park-Miller...

# Mapping numbers to points on a sphere

- ...sphere point picking, Marsaglia's method...

# Feature 2: Smooth transitions between views

- Suppose we have a satellite circling the planet
  according to a prescribed orbit.
- You can imagine the view from a camera
  fastened to the satellite.
- If we rotate the satellite,
  we transition to a different view.
- The view transitions
  represent rotations of the satellite,
  and we want them to be smooth
  in order to create the illusion
  of physical inertia.
- This is sort of like the game designer's
  equivalent of "suspension of disbelief".
- If the transitions are not smooth
  then the physics appears unrealistic
  and we loose that suspension of disbelief.
- We could try to simulate the actual physics of the satellite
  but that's a lot of work.
- Alternatively we could just interpolate smoothly
  between views using something known as quaternion Slerp.
- Both alternatives are valid,
  and indeed APIs for them already exist
  in popular 3D frameworks such as `three.js`
  as well as game engines like Unity and Unreal.
- If you start to read about quaternion Slerp,
  it almost feels like you need a graduate degree.
- That's because quaternions show up
  in advanced topics like quantum mechanics
  and special relativity.
- Quaternions with a length of one
  are called unit quaternions
  and are used to represent 3D rotations.
- There are very lengthy Wikipedia articles
  on quaternions, spatial rotation, and Slerp.
- I actually find it very surprizing that Slerp
  is only ever presented in the context of 3D
  and quaternion algebra.
- I actually believe that a better way
  to learn Slerp
  is to start with 2D.
- Therefore we will first look at Slerp
  in the context of 2D rotations and unit vectors
  which are much more familiar to us
  than 3D rotations and unit quaternions.
- Then, after we have an understanding in 2D,
  we can easily extend that to 3D.

# Poll: Which rotation would you expect?

- ...2D camera which rotates to look at the point of interest...
- ...view A is to the right, view B is up...
- There are many possible rotations
  from view A to view B
- In a game or simulation, which one would you expect?
  1. 90 degrees counter-clockwise (the shorter arc)
  1. 270 degrees clockwise (the longer arc)
  1. "Other" (it's late and I'm getting dizzy)

# Shortest arc rotations

- possible representations
- we choose the unit vector representation
  because it generalizes to 3D rotations with unit quaternions

# Interpolating between views

- slerp and lerp
- lerp singularity at midpoint between +v and -v,
  and is not constant velocity

# Double cover

- lerp is now singularity free, and velocity is nearly constant

# Extension to 3D

- the same issues and tradeoffs apply to quaternion Slerp in 3D

# Did we learn anything?

- Using game programming as our motivation,
  we've learned that:
  - The output of a generator with poorly-chosen constants
    can contain undesirable patterns
    which are difficult to see just by inspection.
  - The spectral test helps us to identify those problems.
  - JavaScript's built-in generator has no way to set the seed
    but we can implement a seedable generator in JavaScript
    based on the constants recommended by Park and Miller.
  - When working with 3D vectors and rotations,
    it helps to start with a solution in 2D
    before trying to generalize it to 3D.
  - Quaternion (N)lerp is a good approximation to Slerp
    and easier to implement.
- Even though the game is hypothetical
  and writing it would involve much more than just math,
  we've seen some examples of very interesting things
  we can learn along the way.
