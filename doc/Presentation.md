Hmm, maybe I am over-doing it
with the whole Slerp derivation
in 2D with unit vectors
and the bisector trick...

Why not just start with unit quaternions
and discuss how the direction of the vector part
defines the axis of rotation,
so for our purposes and WLOG
we will consider rotations in the XY plane
such that the vector part only has a Z
component!

That will still allow me to:

1. Show the numerical difficulties
   of computing the angle between the vectors
   and dealing with the singularity
   as the angle approaches zero.
2. Discuss how double-cover means
   the angle never exceeds 90 degrees
   and therefore opens the door for Lerp
   as an approximation.

### New Outline (proposed)

- Feature 2: Smooth transitions between views
  - satellite rotation and view transitions
  - simulating physics for suspension of disbelief
  - Quaternion Slerp
  - is there a better way to learn it?
  - is there a better way to implement it?
- Quaternions and 3D rotations
  - we want to avoid learning quaternion algebra
    (that is a graduate level topic)
  - we just need to know that unit quaternions
    can be used for representing 3D rotations
  - in fact, that is often the preferred representation
  - there are other representations that are more intuitive (Euler angles)
  - but these three-parameter representations have a singularity
  - need a fourth parameter (hence the unit quaternion)
  - length constraint
  - double cover (+q and -q represent the same rotation)
  - it's easier to start with 2D rotations
  - consider rotations in the XY plane,
    so we get a "planar" unit quaternion
  - ...oh boy

Argghh

1. Intro
1. The game and the two features (motivation)
1. Feature 1: random terrain from seed
1. Pseudorandom
1. First step: pseudorandom numbers
1. Poll
1. Spectral test
1. JavaScript
1. Second step: sphere point picking
1. Result (pictures)
1. Feature 2: smooth transitions between views
1. Unit quaternions and 3D rotations
1. Slerp
1. Lerp
1. Poll
1. Result (pictures)
1. Conclusions

# Is writing a game a good way to learn math?

- The fact that video games and programming
  can help people learn mathematics
  is not really surprizing when you consider
  the potential for intrinsic motivation
  and positive reinforcement,
  but writing a complete game is a huge undertaking.
- In my own experience, even writing a small demo or feature
  can be a great way to learn mathematical concepts
  which are not normally covered in school.
- To demonstrate this by example, we will consider
  two features in a hypothetical game
  and walk through some of the interesting
  math that a developer might encounter.
- For the first feature, we need to generate a
  random-looking sequence of numbers.
- We will come up with our own definition of "random"
  so that you can vote for which sequence of numbers
  looks more random to you.
- Then we will use a simple test for randomness
  to reveal a hidden pattern in the numbers.
- For the second feature, we need to simulate
  rotations in three dimensions
  using something called "Quaternion Slerp".
- We will find it much simpler to begin
  in just two dimensions
  rather than trying to understand quaternion algebra.
- We will develop a simple approximation of Slerp
  and compare the results side-by-side in a poll
  to find out whether our approximation is any good.
- The polls here are anonymous
  and intended to keep things fun and interactive.
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
  the golden rule is:
  > Given the same initial seed,
        every player should see the exact same world.
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
- Let's break this feature down into two incremental steps:
  - Generate pseudorandom numbers from an initial seed
  - Map those numbers to points on a sphere.
- After a few Google searches
  and reading Stack Overflow,
  we discover that
  for the first step we need a pseudorandom number generator,
  and for the second step we need something
  known as sphere point picking.

# Pseudorandom number generators

- This is just a game, not cryptography.
- We don't need a cryptographically-strong generator.
- The built-in generators
  provided by most programming languages
  should be sufficient.
- Unfortunately the generator that JavaScript provides
  (called `Math.random()`)
  has no way to set the seed,
  and if we try to use it
  for generating the points on our planet
  we cannot guarantee
  that every player will see the same world.
- Since we cannot break the golden rule,
  we need to find a seedable generator.
- We could search for an existing library
  which provides a seedable generator
  and simply use it,
  but we will gain a deeper understanding
  by spending a moment on Wikipedia
  to learn about the "linear congruential generator" (LCG).
- The LCG formula is very simple
  but involves several constants
  which must be chosen carefully.
- ...LCG formula...
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
  we would like some assurance
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
- ...spectral test results for this case...

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
  then the motion appears unrealistic
  and we loose the suspension of disbelief.
- We could try to simulate the actual physics of the satellite
  but that's a lot of work.
- Alternatively we could just interpolate smoothly
  between views using something known as Quaternion Slerp.
- Both alternatives are valid,
  and indeed APIs for them already exist
  in popular 3D frameworks such as `three.js`
  as well as game engines like Unity and Unreal.
- With a bit of reading on Wikipedia,
  we gain more insight
  and discover that maybe there is a better way.

# Quaternions: The fourth parameter

- If you start to read about quaternions,
  it almost feels like you need a graduate degree.
- That's because quaternion algebra shows up
  in advanced topics like quantum mechanics
  and special relativity.
- Unit quaternions (quaternions with a length of one)
  are used to represent 3D rotations, but why are they so popular?
- They solve several problems of three-parameter methods
  like Euler angles.
- ...talk about the shortcoming of 3-parameter methods
  like Euler angles for representing rotations in 3D
- ...no 3-parameter representation exists which is both global
  and singularity-free
- ...we need a fourth parameter; hence the unit quaternion representation
- ...singularity-free, multiplication is fast,
  and interpolation is possible via Slerp...

# Why Slerp?

- ...nice properties: fixed axis (minimum energy), constant velocity...
- ...Let's see if we can learn about Slerp
  without all of the complexity of quaternions...
- Quite often, Slerp is only presented
  in the context of 3D rotations and unit quaternions.
- I believe that a much easier way to learn Slerp
  is to start with 2D.
- Our first step is to look at 2D rotations and unit vectors
  which are much more familiar to us
  than 3D rotations and unit quaternions.
- After we have a good understanding in 2D,
  then we can easily extend everything to 3D.

# 2D rotations

- ...2D camera which rotates to look at the point of interest...
- ...view A is to the right, view B is up...
- There are many possible rotations
  from view A to view B, for example:
  - 90 degrees counter-clockwise (the shorter arc)
  - 270 degrees clockwise (the longer arc)
- in most video games and simulations, we use the shorter arc
- possible representations
- we choose the unit vector representation
  because it's an easier way to learn Slerp
  before extending everything to 3D rotations and quaternions
  AND (I GUESS) IT NATURALLY GIVES US THE SHORTER ARC!

# Interpolating between views with Slerp

- ...talk about "in-betweening" or just "tweening"
  in the context of tradional cel animation, key frames, etc.
- ...show the formula for slerp
- in this form, slerp has a removable singularity
  when the angle is zero
- one way to deal with this is to reformulate it
  using the `sinc` function instead
  which can be implemented using a little trick
- as the angle approaches 180 degrees, we have a bigger problem...

# Double cover (OR MAYBE THE BISECTOR TRICK!)

- ...double cover OR MAYBE JUST INSERT A MIDPOINT AND SLERP TO IT?
- ...solves the problem at 180 degrees

# Lerp as an approximation

- Now that we don't need to worry about anything
  beyond 90 degrees,
  can we just interpolate in a straight line
  and normalize the result
  to project it onto the unit circle?
- This is "Lerp" and it's much simpler than Slerp
  because we don't need to calculate
  the angle between the two vectors
  and there is no singularity at zero.
- Lerp velocity is nearly constant...
- ...oh and remember to mention path equivalence!!!
- Is Lerp a good approximation of Slerp?
- Let's take a poll to find out...

# Poll: Lerp or Slerp?

- ...two time histories,
  one is slerp and the other is lerp...
- Can you tell which one is Slerp?
- Possible responses:
  1. Diagram "A" is Slerp
  1. Diagram "B" is Slerp
  1. I can't tell a difference
- Regardless of whether or not you can tell,
  they are pretty similar
  and probably close enough for our purposes.
- Also remember that Lerp is easier to implement than Slerp.

# Extension to 3D

- All of the same issues and tradeoffs
  that we've seen here in 2D
  also apply to Quaternion Slerp in 3D.
- (We don't need the bisector trick because quaternions
  already provide a "double cover" over the set of 3D rotations)
- ...show 3D versions of Lerp and Slerp...
- Now you have some appreciation for quaternions and 3D rotation.
- Well done!

# Did we learn anything?

- Using game programming as our motivation,
  we learned that:
  - The output of a pseudorandom number generator
    with poorly-chosen constants
    can contain undesirable patterns
    which are difficult to see just by inspection.
  - The spectral test helps us to identify those problems.
  - JavaScript's built-in generator has no way to set the seed
    but we can implement a seedable generator in JavaScript
    based on the constants recommended by Park and Miller.
  - When working with 3D vectors and rotations,
    it helps to start with a solution in 2D
    before trying to generalize it to 3D.
  - Lerp is a good approximation to Slerp
    and much easier to implement.
- Even though this video game is hypothetical
  and writing it would involve much more than just math,
  we've seen some examples of very interesting things
  that we can learn along the way.
