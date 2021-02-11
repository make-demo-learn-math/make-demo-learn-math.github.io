# Is Writing a Game a Good Way to Learn Math?

- Writing a demo or a small game can be a great way to learn
  some of the mathematics behind today's video games.
- For serious game development it's likely more practical
  to use one of the existing game engines
  like Unity or Unreal
  which offer very high performance.
- However, using one of those frameworks often means
  that some of the really interesting math
  has been done for you.
- Writing your own small routines can give you
  more insight into the underlying principles
  and how they work.
- I will share some of the topics that I've learned
  just by dabbling.
- These algorithms seem simple and elegant,
  but would have involved remarkable efforts
  by the mathematicians and computer scientists
  who first discovered them.

# Motivation

Suppose that we want to:

- Generate "random" points on a fictitious planet
  based on an initial "seed" such that
  every player will see the exact same pattern
  given the same initial seed.
- Transition smoothly between views of the planet
  from a satellite, giving the illusion of inertia
  without the need to simulate any real physics.

# Takeaways

- A better appreciation for some of the underlying math
  used in many video games.
- A seedable pseudo-random number generator in JavaScript.
- A simple and fast approximation to quaternion SLERP.
