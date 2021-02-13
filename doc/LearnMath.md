# Smooth Transitions Between Views

- want it to be realistic, i.e., representative of a real orbiting spacecraft
- to that end, the transition should take the path of "minimum energy"

## Euler's rotation theorem

> In three-dimensional space, any displacement
> of a rigid body such that a point on the rigid body
> remains fixed, is equivalent to
> a single rotation about some axis
> that runs through the fixed point

- Any 3D rotation can be expressed as a single rotation about a fixed axis

## SLERP

- (S)pherical (L)iner Int(erp)olation
- A smooth interpolation between 2 rotations
- The axis of rotation is Euler's axis
- ~~If we assume a uniform mass distribution,
  this is a "minimum energy" rotation~~

# Random colonies on planet

- we want the locations to appear random,
  but we want every player to see the same world
- not really "random", but "pseudo random" based on a seed value
- a different seed value will generate a completely
  different universe
- every player with the same seed value will see the same
  universe

- Linear Congruential Generator
- simple algorithm but picking suitable values
  is very difficult (and also very difficult to test)
- Marsaglia's famous test suite for randomness
- JavaScript's built-in `Math.random()` does not allow
  you to set the seed
- the other problem is that numbers in JavaScript
  as 64-bit double-precision floating-point numbers
  (no 64-bit integer type built-in)
- after a bit of digging: Park-Miller (show code)

- now, how do we scatter the colonies
  evenly over the planet?

- sphere point picking (Marsaglia)
- but we also want to orient them randomly
- hypersphere point picking, quaternion rotation

Note to self: For the floating-point "seed" needed
to generate the stars using the `mash` function,
just call `Pseudorandom.nextScalar()`
which is included in the demo context.

# About this project

- This presentation and its code samples are in GitHub
  at [make-demo-learn-math](https://make-demo-learn-math.github.io/)
