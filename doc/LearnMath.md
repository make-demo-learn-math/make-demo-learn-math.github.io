# Introduction

- Writing a demo or a small game can be a great way to learn
  some of the mathematics behind today's video games
- I will share a few topics that I've learned
  just by dabbling
- The algorithms themselves look simple and elegant
  but the problems that they solve are formidable
  and the efforts by the mathematicians and
  computer scientists who first discovered them
  are remarkable
- For motivation, I will describe two features in
  a hypothetical game:
  1. Random points on a fictitious planet
  1. Smooth camera transitions between views

# Why web?

- For serious game development the practical choice
  is to use one of the popular game engines
  like Unity or Unreal
  which offer very high performance
  and a rich set of APIs
- However that tends to shield you from the underlying math
  which, I think, is the really interesting stuff
- That also requires an expensive computer
  with a high-end graphics card
- In contrast, writing your own small routines
  in JavaScript can give you
  more insight into the underlying math
  and can be done on an inexpensive computer
- Just don't expect high performance :-)

# Feature #1: Random points on a planet

- Suppose that we want to generate "random" points
  on a fictitious planet based on an initial "seed"
  such that every player will see the exact same pattern
  given the same initial seed
- Break this down into two steps:
  - Generating random numbers from a seed
  - Mapping random numbers to points on a planet
- JavaScript's `Math.random()` has no way to set the seed
  so let's look at how random number generators work
- What is "random"?

# Poll #1: Vote for the most random sequence

- Which sequence do **you** think is the most random-looking?
  1. Sequence "A": [...`(3 * x) % 31`...]
  1. Sequence "B": [...`(13 * x) % 31`...]
  1. They seem equally random
- [Insert output from `(3 * x) % 31` and `(13 * x) % 31`
  starting from a common seed chosen to make both sequences
  appear equally random]

# The spectral test for randomness

- Reveal the formulae used to generate the two sequences
- Show their respective spectral tests
- These plots help us visualize how "B" is more random than "A"
- Takeaway: testing for randomness is hard
- Marsaglia's tests for randomness

# Pseudorandom number generators

- Both sequences used the same expression (called LCG)
  but with different multiplier values
- The key is in picking a suitable multiplier
  and modulus to produce sufficient randomness in the output
- In our example, note that a seed of zero is catastrophic
  but since the modulus is a prime number
  we will never get an output of zero for a non-zero input
- There's a table of the values in common use, but
  many of them require 64-bit (long) integer types
  which JavaScript does not natively support
- it so happens that the values recommended by Park-Miller
  ("MINSTD" with revised multipler value)
  fit nicely within the limitations of JavaScript's number representation
- [JavaScript code for my Pseudorandom class]

# Mapping numbers to points on a sphere

- Given a source of random numbers,
  there are several ways to map them onto the surface
  of a planet (or sphere):
  1. Take each triplet as a 3D vector and
     normalize it [not uniform unless you reject
     points outside the sphere]
  1. Spherical coordinates
  1. Marsaglia's mapping from the unit disk
     [advantages]
- [include image and/or link to interactive demo]

# Feature #2: Smooth transitions between views

- Suppose that we want to transition smoothly
  between views of the planet from a satellite,
  giving the illusion of inertia
  without the need to simulate any real physics
- Start with 2D
- Learn how to transition between views in 2D
- Then, the leap to 3D is relatively easy

# What is a view?

- For this feature, the camera is fixed
  to a satellite which is orbiting the planet
- Assume the orbit is stable
- We can rotate the satellite
  to view some distant point
  called $p$,
  the point of interest
- [Insert diagram with 2D camera at the origin
  and a point of interest on a surrounding circle]

# Poll #2: Which path would you choose?

- [Insert a diagram with two points on a circle,
  $p_1$ and $p_2$,
  where $p_2$ is 90 degrees counter-clockwise
  from $p_1$]
- Suppose we have two points of interest, $p_1$
  and $p_2$
- We call $p_1$ the "from" point
- We call $p_2$ the "to" point
- We want a smooth transition from $p_1$ to $p_2$
- There are many possible rotations from $p_1$ to $p_2$
- Which of the following would you take?
  1. 90 degrees counter-clockwise (because it's shorter)
  1. 270 degrees clockwise (because I need the exercise)
  1. Other (because it's late and I'm getting dizzy)

# Shortest arc rotations

- For camera transitions in games and simulations,
  we are generally interested in the shortest arc
  (90 degrees counter-clockwise in our example)
- Given any two endpoints
  the shortest arc rotation from $p_1$ to $p_2$
  will always be between -180 and +180 degrees
- Let's look at two possible representations:
  1. Using angles $\theta_1$ and $\theta_2$
  1. Using unit vectors $\hat{p}_1$ and $\hat{p}_2$

# Using angles

- [Insert a diagram with points $p_1$ and $p_2$
  as before,
  but also now their angles $\theta_1$ and $\theta_2$]
- At first glance, it seems like we can just interpolate
  from $\theta_1$
  to $\theta_2$:

$$
\begin{aligned}
  \theta
  &=
  \theta_1 + t(\theta_2-\theta_1) \\
  &=
  (1-t)\theta_1 + t\theta_2 \\
\end{aligned}
$$

- where $t$ goes from $0$ to $1$
- At $t=0$ we get $\theta=\theta_1$
  which represents the first endpoint ("from")
- At $t=1$ we get $\theta=\theta_2$
  which represents the second endpoint ("to")
- The problem is that we won't always get the shortest arc
  with this approach

# Using unit vectors

- [Insert a diagram with points $\hat{p}_1$ and $\hat{p}_2$
  as before but on the **unit** circle]
- As we did on the previous page, let's try to interpolate
  from $\hat{p}_1$
  to $\hat{p}_2$

$$
\begin{aligned}
  \hat{p}
  &=
  \operatorname{normalize}\{
    \hat{p}_1+t(\hat{p}_2-\hat{p}_1)
    \} \\
  &=
  \operatorname{normalize}\{
    (1-t)\hat{p}_1+t\hat{p}_2
    \} \\
\end{aligned}
$$

- Now we get the shortest arc
  but still have problems:
  1. $\hat{p}$ passes through zero if $\hat{p}_1=-\hat{p}_2$
  1. The angular velocity is not constant
- We can solve the first problem
  using spherical linear interpolation
  or "Slerp" (Shoemake):

$$
\begin{aligned}
  \hat{p}
  &=
  \frac{\sin[(1-t)\phi]}{\sin\phi}\hat{p}_1
  +\frac{\sin(t\phi)}{\sin\phi}\hat{p}_2 \\
\end{aligned}
$$

- where $\cos\phi=\hat{p}_1\cdot\hat{p}_2$
- ...unit length output for unit length inputs,
  constant velocity,
  but tricky to implement due to inverse trig
  and the singularity at $\phi=0$

# Double cover

- ...still unit vectors but now **half** the angle...
- ...use the double angle formula to recover the original...
- ...negate one endpoint if $\cos\phi<0$...
- ...solves first problem since the endpoints
  are never more than 90 deg apart...
- ...also gives us a very good approximation to Slerp
  without the inverse trig or the singularity...
- This is are essentially unit quaternion in 2D...
  and it's now just a small leap to 3D

# Unit quaternions and 3D rotations

- [Quaternion brief history, Hamilton, special relativity]
- [unit quaternion as a point on the unit hypersphere,
  Euler rotations, Euler parameters, advantages
  over three-parameter representations,
  used for character animation Shoemake,
  spacecraft attitude control,
  robotics, and RMSD in bioinformatics]
- One parameter is cosine of half the angle as before,
  the other three come from scaling the axis vector
  by sine of half the angle
- Quaternion Slerp (endpoints are unit length, result is
  unit length)
- [include link to interactive demo]

# TO DO

- consider renaming angles: the Wikipedia page
  for Slerp now uses $\Omega$
- consider renaming unit vectors
- add a slide (slide #3) for education,
  i.e., address your assertion that writing a game
  is a good way to learn math
- also: say that I will show how breakdown the first feature
  into 2 problems, and show how to test a sequence of random-looking numbers
  for randomness
- also: I will show a common technique for learning something difficult like
  quaternions and 3D rotations, which is to start with 2D first
- make it clear that the 2 features are meant to be mock requirements
  for us as a game developer; i.e., that we dig into the math because
  we are passionate about game design (e.g., we don't want any discernable
  patterns in our "random" points!)
- add a conclusions slide at the end, perhaps
  entitled "Did we learn anything?"
  - yes, we learned how random numbers can be generated
    and tested, we learned how to map those numbers
    to points on a planet, we learned how to get
    smooth transitions between views in 2D
    and that we can apply a similar technique in 3D
