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
  between views of the planet from the satellite.

# Feature #1: Generating random terrain

- Rather than using a detailed image of a real planet,
  we want to generate the planet's terrain procedurally
  based on a "seed" value.
- This is similar to the game of Minecraft
  where each different world
  is generated from a unique seed.
- Since our game is multi-player,
  it is important that every player
  is viewing the exact same world.
- We also want the terrain to look "random",
  which means that there should be no visible patterns
  and the distribution should be more or less uniform.
- We call this "pseudorandom":
  random-looking but perfectly reproducible
  based on the initial seed.

# Keeping it simple

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
- Now we can focus on simply generating
  points at random-looking locations.
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

# Poll: Which sequence looks more random?

# The spectral test for randomness

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
  we actaully get an approximation of Slerp
  without the need to calculate $\theta$
  and without the division-by-zero problem.
- We just need to normalize the Lerp
  because the output needs to be a unit quaternion.
- We also need to negate one of the endpoints
  if their dot product is negative
  to ensure we get the shorter arc.
- Let's call it **Nlerp**
  (for normalized linear interpolation):

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

- The fact that this is a surpringly good
  approximation of Slerp
  is due to the remarkable mathematics
  of unit quaternions
  and how we use them to represent of 3D rotations.

# Implementation in JavaScript

- ...Nlerp in JavaScript and comparison to Slerp...

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
- normalized linear interpolation, or "Nlerp",
  is a good approximation of Slerp
  and is easier to implement
