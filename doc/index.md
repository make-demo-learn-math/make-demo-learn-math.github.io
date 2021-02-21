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
  or an individual feature within the game,
  and we will see some of the interesting things
  that we can learn along the way.

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
  of **planetary exploration**.

## [A multi-player web game](./rover.png)

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
  but for now we are just going to consider
  two small "features" of the game
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
- So, feature #1 is about generating
  random-looking terrain on the planet,
  and feature #2 is about simulating realistic transitions
  between views of the planet from the satellite.

# Feature #1: Generating random terrain

- Rather than using a detailed image of a real planet,
  we want to generate the planet's terrain procedurally
  based on a "seed" value.
- This is similar to the game of Minecraft
  where each different world
  is generated from a unique seed.
- Since our game is multi-player,
  it is important that the terrain among players
  is the same in every detail.
- We also want the terrain to look "random",
  meaning there should be no visible patterns.
- We call this "pseudorandom":
  random-looking but perfectly reproducible
  based on the initial seed.

# Keeping it simple

- There are many techniques
  for generating realistic terrain in a game.
- In fact that is a whole topic onto itself
  and deserves its own presentation.
- Typically the goal is to generate terrain information
  like height, slope, and colour for each location
  on the planet that we are interested in.
- Perlin noise is one popular approach for this.
- In order to keep this presentation within scope,
  we are going to make a sweeping assumption...
- We are going to assume that we already know
  how to generate terrain information
  given a set of random points
  on the surface of the planet.
- We won't worry about how those points are used
  to generate the height or colour of the terrain,
  and it is sufficient to say that a suitable
  technique exists (for example, using Voronoi diagrams).
- Now we can focus on just generating
  points distributed evenly over the planet
  at pseudorandom locations.
- The first step is to generate a sequence of
  pseudorandom numbers,
  and the second step is to map those numbers
  to locations on the planet.
- Since the planet in our game is just a large sphere,
  we can use something called "sphere point picking"
  to map the pseudorandom numbers to points on the planet.

# Pseudorandom number generators

- just a game, not cryptography
- LCG and Lehmer
- simple formulas but with carefully chosen constants
- JavaScript provides no way to set the seed!
- whether we use a third party lib or write our own
  we need a way to test the output for "randomness"
- let's see why that is important

- This is just a game, not cryptography,
  so we don't need a cryptographically-strong generator.
- The built-in generators
  provided by most programming languages
  should be sufficient.
- Unfortunately the generator that JavaScript provides
  (called `Math.random()`)
  has no way to set the seed.
- If we try to use it
  for generating the points on our planet
  we cannot guarantee
  that every player will see the same world.
- We need to a seedable generator.
- The equation often used for this
  is called a linear congruential generator (LCG).
- The equation itself is very simple
  but involves several constants
  which must be chosen very carefully.
- Selecting the constants to ensure sufficient randomness
  is non-trivial and has been a topic of research.
- Let's see how the output of a generator
  with poorly-chosen constants
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

# The spectral test for randomness

- The spectral test is a simple test
  for detecting hidden patterns
  in a sequence of pseudorandom numbers.
- Here are the test plots
  for the two random-looking sequences
  from our poll:
- ...reveal plots for each...
- It's interesting to see how two pseudorandom sequences
  which appear equally random
  can actually have very different properties
  when displayed like this.
- ...Marsaglia's tests, values in use, RANDU...

# Implementation in JavaScript

# Sphere point picking

- problems you might encounter
- possible solutions
- Marsaglia's method and its advantages (speed, no rejection / deterministic ingress requirements)
- show result (positive reinforcement)

# Feature #2: Realistic transitions between views

- In our game, the satellite is revolving around the planet
  according to a prescribed orbit.
- The satellite is equipped with a virtual camera
  which is capable of viewing a portion of the planet's surface.
- The player can view different regions of the planet
  by adjusting the orientation of the satellite,
  thereby rotating the view from the camera.
- As game designers, we want the motion of the camera
  to be realistic
  as it transitions between views.
- Animators call this "tweening".
- Programmers call it "interpolation".
- Let's define the desirable properties
  of a realistic transition:
  - **Smooth**: The rotation should be continuous
    and at a constant rate, more or less.
  - **Shortest arc**: The rotation should follow
    the shorter way around.
- Basically we want a single rotation
  around a single axis
  to simulate what you might expect
  from a physical object like a satellite.

# Interpolation

- One of the simplest examples of interpolation
  is called linear interpolation or **"Lerp"**.
- Lerp is a function that interpolates between two values $f_1$
  and $f_2$
  according to a given number $t$:

$$
\begin{aligned}
  \operatorname{Lerp}(f_1, f_2, t)
  &=
  (1-t)f_1
  +
  tf_2 \\
\end{aligned}
$$

- When $t=0$, the function returns the first value $f_1$:

$$
\begin{aligned}
  \operatorname{Lerp}(f_1, f_2, 0)
  &=
  (1-0)f_1
  +
  0f_2 \\
  &=
  f_1
  +
  0 \\
  &=
  f_1 \\
\end{aligned}
$$

- When $t=1$, the function returns the second value $f_2$:

$$
\begin{aligned}
  \operatorname{Lerp}(f_1, f_2, 1)
  &=
  (1-1)f_1
  +
  1f_2 \\
  &=
  0
  +
  f_2 \\
  &=
  f_2 \\
\end{aligned}
$$

- Lerp is very easy to implement in code:

  ```javascript
  function lerp(f1, f2, t) {
    return (1 - t) * f1 + t * f2;
  }
  ```

- Lerp also works nicely with vectors:

$$
\begin{aligned}
  \operatorname{Lerp}(\mathbf{v_1}, \mathbf{v_2}, t)
  &=
  (1-t)\mathbf{v_1}
  +
  t\mathbf{v_2} \\
\end{aligned}
$$

- In our game, we would like
  to interpolate between rotations.
- For that we need something called
  spherical linear interpolation,
  or **"Slerp"**.

# Slerp

- The spherical equivalent of Lerp
  is a function called Slerp:

$$
\begin{aligned}
  \operatorname{Slerp}(\mathbf{q_1}, \mathbf{q_2}, t)
  &=
  \frac{\sin\left[(1-t)\theta\right]}{\sin\theta}
  \mathbf{q_1}
  +
  \frac{\sin\left[t\theta\right]}{\sin\theta}
  \mathbf{q_2} \\
\end{aligned}
$$

- When applied to 3D rotations,
  Slerp meets all of our requirements
  for realistic transitions:

  - Smooth
  - Shortest arc

- The endpoints $\mathbf{q_1}$
  and $\mathbf{q_2}$
  represent rotations
  and are "unit quaternions".
- There are various ways to represent 3D rotations
  but using unit quaternions has many advantages
  (including being able to use Slerp).
- A quaternion is like a four dimensional vector.
- A **unit** quaternion is a quaternion
  whose length is equal to $1$.
- Both $+\mathbf{q}$
  and $-\mathbf{q}$
  represent the same rotation.
- The angle $\theta$
  between $\mathbf{q_1}$
  and $\mathbf{q_2}$
  can be calculated
  similar to how we would calculate it
  for a pair of vectors.
- If $\theta$
  is greater than $+90\degree$
  or less then $-90\degree$,
  we need to negate one of the endpoints
  to prevent Slerp
  from taking the long way around.
- If $\theta$ is equal to $0$,
  we need to avoid the division-by-zero
  that would result
  in the Slerp equation above.
- We also need to be careful
  about floating-point errors
  when calculating $\theta$
  using the inverse cosine
  of the dot product of $\mathbf{q_1}$
  and $\mathbf{q_2}$.
- As you can see,
  a proper implementation of Slerp
  is actually very involved.
- Is there an easier way
  that still meets our requirements?

# An approximation

- If we simply Lerp the quaternions
  we actaully get a descent
  approximation of Slerp
  without the need to calculate $\theta$
  and without the division-by-zero problem.
- We just need to normalize the Lerp
  because the output needs to be a unit quaternion.
- We also need to negate one of the endpoints
  if their dot product is negative
  to ensure we get the shorter arc.
- To avoid confusion, let's call this **Nlerp**
  for normalized linear interpolation:

$$
\begin{aligned}
  \operatorname{Nlerp}(\mathbf{q_1}, \mathbf{q_2}, t)
  &=
  \operatorname{normalize}
  \left\{
  (1-t)\mathbf{q_1}
  +
  t\mathbf{q_2}
  \right\} \\
\end{aligned}
$$

- This is a surprizingly good approximation of Slerp
  and a testament to the remarkable mathematics of quaternions
  and how we use them to represent 3D rotations.

# Implementation in JavaScript

- ...Nlerp in JavaScript and comparison to Slerp...

# Did we learn anything?

- Video games can provide the motivation needed
  to learn new things,
  but developing a complete game is a huge effort.
- Focusing on just a small feature
  is more attainable
  and still provides motivation.
- In any case we've seen some examples
  of very interesting things
  that we might learn along the way:
  - The output of a pseudorandom number generator
    with poorly-chosen constants
    can contain undesirable patterns
    that are not obvious at first glance.
  - Tests exist to detect these patterns.
  - Normalized linear interpolation
    is a good approximation to Slerp
    and is easier to implement.
