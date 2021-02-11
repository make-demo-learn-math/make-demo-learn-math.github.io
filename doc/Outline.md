# Is Writing a Game a Good Way to Learn Math?

- Writing a demo or a small game can be a great way to learn
  some of the mathematics behind today's video games.
- For any serious game development it's probably best to use
  one of the existing game engines like Unity or Unreal
  which offer very high performance.
- Using an engine or a framework often means
  that some of the really interesting math
  has been done for you
  and while that may be practical,
  it's still worthwhile to take a close look
  at some of the underlying principles and their history.
- I will share some of the topics that I've learned
  just by dabbling.
- These algorithms look simple and yield impressive results,
  but they are also easy to get wrong
  which helps us to appreciate the remarkable efforts
  of the mathematicians and computer scientists
  who first discovered them.

# Some Motivation

Suppose we want to:

- Generate "random" points on a fictitious planet
  based on an initial "seed" such that
  every player will see the same pattern
  given the same initial seed.
- Transition smoothly between views of the planet
  from a satellite, giving the illusion of inertia
  without the need to simulate any real physics.

# Takeaways

- A better appreciation for some of the underlying math
  used in many video games.
- A seedable pseudo-random number generator in JavaScript.
- A simple and fast approximation to quaternion SLERP.
