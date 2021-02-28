- Thank you very much for the introduction.
- I'd like to start with a **pie chart**.

# Writing a game

- This pie chart shows the results of a scientific,
  in-depth study... _(kidding)_
- Video games can provide many key ingredients
  for effective learning
  such as positive reinforcement
  and intrinsic motivation.
- For someone with a passion for video games,
  writing a game can be a great way
  to learn mathematics and problem solving skills.
- However writing a complete game
  is a huge undertaking,
  even with all of the development tools
  and game engines
  that are available.
- Rather than writing a complete game,
  let's consider writing just a small demo
  or a couple of individual features within the game,
  and we will see some of the interesting things
  that we can learn along the way.

# Learning objectives

- What do we hope to take away from this presentation?
- Our learning objective is
  to gain an appreciation
  for some of the interesting mathematics
  involved in video game development,
  such as:
  - Modular arithmetic
    - for generating random numbers
  - Spherical geometry
    - for mapping those numbers to points on a planet
  - Quaternion algebra
    - for rotating a 3D view of the planet
      from an orbiting satellite
- You don't need to be a programmer or a mathematician.
- The goal here is to keep things fun and interesting
  for everyone.
- If you **are** a programmer,
  then another takeaway
  from this presentation
  is a random number generator
  in JavaScript
  that you are welcome to use
  in your own game.

# Premise

- We need a premise for our game
  to provide some motivation.
- The following is just an example
  of a hypothetical, simulation-type game.
- It is inspired by the Mars missions
  which have been in the news recently.
- _I don't have a name for it yet,
  so please feel free to contribute any ideas you have!_
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
    two small features of the game
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
  - So that will be the two features on our list...

# Feature list

- Feature #1 is about generating
  random-looking terrain on the planet.
- Feature #2 is about simulating realistic transitions
  between views of the planet from the satellite.
- Let's start with feature #1: generating random terrain.
- What do we mean by "random"?
- Well, it turns out that "random" can mean different things
  in different situations.
- In our situation, we want something called "pseudorandom".

# Pseudorandom

- This is probably my favourite comic (_read it_).
- Clearly, here, we need to qualify what we mean by "random".
- Has anyone here played the game Minecraft?
- In Minecraft, each world is generated uniquely
  from a **seed** value
  that you can share with other players.
- If you use the same seed as another player,
  then you both play in the same world.
- For our game, we want something similar.
- We want to generate the planet's terrain procedurally
  based on a seed value.
- Given a seed, the terrain that we generate
  must be the same in every detail.
- We also want the terrain to look random,
  meaning there should be no visible patterns.
- We call this **pseudorandom**: The terrain is
  random-looking but perfectly reproducible
  based on the initial seed.

# Generating random terrain

- There are many techniques
  for generating realistic terrain in a game.
- In fact that is a whole topic onto itself
  and deserves its own presentation.
- Typically it involves generating terrain information
  like height, slope, and colour for each location
  on the planet that we are interested in.
- In order to keep this presentation within scope,
  we are going to make a sweeping assumption:
  - We are going to assume that we already know
    how to generate that information
    given a set of random points
    on the surface of the planet.
  - We won't worry about **how** those points are used.
  - We'll just say that a suitable technique exists.

# Voronoi diagram

- One such technique is called a **Voronoi diagram**
  which assigns the colour of each pixel
  according to the nearest generator point.
- It doesn't need to be colour.
- For example, it could be terrain height
  as a function of the distance
  to the nearest generator point.

# Our first two learning objectives

- With our sweeping assumption,
  we can focus just on generating
  points at pseudorandom locations
  on the planet.
- We will take it step-by-step
  so that everyone can learn something here.
- First, we need a sequence of pseudorandom numbers.
  - To do this, we will use using a very simple equation
    based on modular arithmetic.
  - That's our first learning objective.
- Second, we need to map those numbers
  to locations on the planet.
  - To do this, we will use a clever trick
    in spherical geometry.
  - That's our second learning objective.

# Learning objective #1

- This is just a game that we are writing,
  so we don't need a cryptographically-strong generator.
- The built-in generators
  provided by most programming languages
  should be sufficient.
- In JavaScript, it's called `Math.random()`.
- Unfortunately `Math.random()`
  provides no way to set the seed.
- If we try to use it
  for generating the points on our planet
  we cannot guarantee
  that every player will see the same world.
- So, we need a seedable generator.
- The equation used for this
  is called a linear congruential generator
  or **LCG**.
  - The equation itself is very simple
    and we will see how it works using
    the arithmetic that you learned in elementary school.
  - It involves two constants
    which need to be chosen very carefully
    to ensure that the output is sufficiently random.
  - It our examples, we will use very small values
    for the constants but the arithmetic is the same.
- Let's talk about something that we learned in elementary school.

# Modulo operation

- The modulo operator returns the remainder of a division.
- "31 mod 10" is just the remainder of dividing 10 into 31.
- So, "31 mod 10" is equal to 1.
- If you remember doing long division, at the end
  there is a remainder.
- That's exactly what the modulo operation returns.

# Generator equation: s<sub>n+1</sub> = (7 \* s<sub>n</sub>) mod 10

- This is the LCG equation using small constants
  to illustrate how it works:
  - The "7" is called the multiplier.
  - The "10" is called the modulus.
  - In a real generator, the modulus is usually a large prime number.
  - Aside from using larger constants, the equation is the same.
- Let's work through this example
  starting with an initial seed of 1 (_go to edit mode_)...
- The sequence repeats after 4 iterations.
- We say that this sequence has a **period** of 4.
- Also, note how the generated values
  are always less than the modulus
  which in this case is 10.

# Starting from a different seed

- If we start with an initial seed of 2,
  we get a different sequence.
- This sequence also has a period of 4.

# An example of a short period

- If we start with an initial seed of 5,
  we repeat forever on that value.
- This sequence has a period of just 1.
- Obviously we want to avoid the value 5.
- We can actually avoid short periods like us
  by choosing the constants carefully.
- In fact, there are well-defined rules
  for choosing the constants
  to ensure a maximal period
  regardless of the initial seed.
- But even if we choose our constants
  according to those rules,
  we can still end up with undesirable patterns
  in the output.
- Furthermore, those undesirable patterns
  might not be obvious at first glance.
- Let's look at an example... which brings us to our poll!

# Now it's time for our POLL!

- Here are two LCG sequences
  starting from the same seed value
  and using the same modulus.
- The only thing different is the multiplier.
- I want to know: Which do you think looks more random,
  sequence A or sequence B?
- (_conduct poll_)
- It turns out that one of the sequences
  contains a hidden pattern
  if you try to use it for plotting points.
- There is a simple test called the **spectral test**
  which simply plots an XY point
  for each consecutive pair of numbers
  in the sequence.
- Here are the spectral plots for sequences A and B.

# Spectral plot for sequence A

- You can start to see how the points
  tend to fall on one of three parallel lines.

# Spectral plot for sequence B

- These points appear to be more scattered.
- Based on these plots,
  we can say that sequence B is more random.
- The pattern revealled by the spectral test
  is something that we would like to avoid in our game
  since we plan to map those numbers to points on our planet.
- So, we need to use carefully-chosen constants
  in our generator.
- Selecting constants to ensure sufficient randomness
  is non-trivial and has been a topic of research.
- Let's see if we can find some that are suitable for our game.

# Number format in JavaScript

- Many of the recommended constants
  require support for 64-bit integers.
- In JavaScript, numbers are represented
  using a floating-point format like this.
- So we really only have about 52 bits of precision
  since the other bits are used for the sign
  and the exponent.
- Fortunately there is something called
  the Park-Miller random number generator.
- The constants suggested by Park and Miller in 1993
  just happen to be suitable for JavaScript,
  and should be sufficient for the purposes of our game.
- The multiplier is a 16-bit number
  and the modulus is a 32-bit number.
- Assuming we start from a valid seed,
  the output will always be less than the modulus.
- Therefore the result of the multiplication
  will always fit within 32 + 16 = 48 bits.
- That gives us a few bits to spare,
  so we should be good.

# Park-Miller generator in JavaScript

- The multiplier is 48,271
  and the modulus is 2,147,483,647.
- It uses the same, simple equation
  that we saw before
  just with these larger constants.
- (_show source code and unit tests_)

# Learning objective #2

- Now that we can generate
  a sequence of pseudorandom numbers,
  the next step is to map them
  to points on the planet.
- Since the planet in our game is just a large sphere,
  we can use something called **sphere point picking**.
- We need to be careful
  to ensure that the points are distributed
  evenly over the sphere.
- If the mapping is incorrect,
  we might see **bunching** at the poles
  similar to how the lines of longitude
  on a globe get closer together near the poles.

# "Bunching" at the North and South poles

- Here is an example of what we get
  if we aren't careful.
- There is a slightly higher density of points
  near the North and South poles.

# Sphere point picking

- There are several ways
  that will produce a uniform distribution
  over the planet.
- The method shown here
  uses just two pseudorandom numbers
  for each point on the sphere.
- For a sphere of radius R:
  - Generate a pair of pseudorandom numbers $s_1,s_2$
    between $0$
    and $1$
  - Let $u=(2s_1-1)R$
  - Let $\theta=2\pi s_2$
  - Calculate the XYZ coordinates of the point
    using these equations:

$$
\begin{aligned}
  x
  &=
  \sqrt{R^2-u^2}\cos\theta \\
  y
  &=
  \sqrt{R^2-u^2}\sin\theta \\
  z
  &=
  u \\
\end{aligned}
$$

- This produces a uniform distribution of points.

# Uniform distribution

- Here is an example of what it looks like.

# Spherical segment

- It seems a bit surprizing
  that this works so well
  when the equation that we used for $z$
  looked so different than the equations for $x$
  and $y$.
- The reason this trick works
  is due to a rather surprizing result
  for the surface area of a **spherical segment**:
  - If you cut a sphere with two parallel planes,
    the area of the strip between the planes
    depends only on the distance between the planes
    and not on where they cut the sphere.
  - You can see here
    that the equation for the surface area $S$
    depends only on the radius of the sphere, capital $R$,
    and the spacing $h$.
  - It does not depend on small $r_1$
    or small $r_2$.

# Learning objective #3

- As we saw, the first feature on our list
  was all about generating
  random points on the planet.
- That gave us our first two learning objectives.
- Our third learning objective
  is about rotating a 3D view of the planet
  to get realistic transitions between views.

# Realistic transitions

- In our game, the satellite is revolving around the planet
  according to a prescribed orbit.
- The satellite is equipped with a virtual camera
  which is capable of viewing a portion of the planet's surface.
- The player can view different regions of the planet
  by adjusting the orientation of the satellite,
  thereby rotating the camera.
- As game designers, we want the motion of the camera
  to be realistic
  as it transitions between views.
- Animators call this "tweening".
- Programmers call it "interpolation".
- Let's establish our requirements.

# Realistic transitions between views

- We want a rotation which is **continuous**
  and **shortest arc**:
  - "Continuous" here means that the rate of rotation
    should be more or less constant.
    - It doesn't need to be perfectly steady
      but it should not be jerky or discontinuous.
    - It should appear natural, like you would expect
      from a physical object like a satellite.
  - "Shortest arc" here means that the path taken
    should be the short way around.
    - This is kind of like how there are two paths
      around the face of a clock.
    - We always want the shorter path.

# Shortest arc

- In Niagara Falls Ontario, there is this beautiful clock garden.
- Imagine that you enter the clock garden at the 9 o-clock position,
  and you are trying to reach the 12 o'clock position at the top
  without walking all over the flowers.
- If you stay on the perimeter of the circle,
  there are 2 ways to get there.
- You can take the long way around
  which takes you down through 6 o'clock
  and back up through 3 o'clock.
- Or, you can take the short way.
- For our view transitions, we always want the short way
  because its what the player would expect.

# Linear interpolation or "Lerp"

- One of the simplest examples of interpolation
  is called linear interpolation or **Lerp**.
- "Linear" is just a fancy word for "straight line".
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

- We call$f_1$
  and $f_2$
  the **endpoints**.

- What does the function return
  when $t=0$?
  - It returns the first value $f_1$.
  - We can see this by writing $0$
    for $t$ in the equation:

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

- What does the function return
  when $t=1$?
  - It returns the second value $f_2$.
  - We can see this by writing $1$
    for $t$ in the equation:

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

- What does the function return
  when $t=\frac{1}{2}$?

  > - It returns the average of the endpoints.

- Lerp is very easy to implement in code:

  ```javascript
  function lerp(f1, f2, t) {
    return (1 - t) * f1 + t * f2;
  }
  ```

- Lerp also works well with vectors.
- Can anyone tell me what a vector is?

# Vectors

- For our purposes, a vector just holds the coordinates of a point.
- The vector might represent the position of an object
  in relation to some reference location,
  or it might represent its velocity.
- In this diagram, the vector has an x-coordinate of 2
  and a y-coordinate of 3.
- Will will denote a vector with an underline
  as shown here on the right.

# Vector Lerp

- The vector form of Lerp
  resembles the simple form.
- The arithmetic is applies "component-wise".

# Vector Lerp (component-wise)

- As you can see here,
  the components of the result
  are just simple Lerps
  of the endpoint components.
- In our game, we want to interpolate between rotations.
- For this, we use something called **spherical linear interpolation**.

# Spherical linear interpolation or "Slerp"

- Slerp is the spherical equivalent of Lerp,
  but it's considerably more complicated.
- Let's take a brief look at it
  so we can gain an appreciation
  for the underlying mathematics.
- When applied to 3D rotations,
  Slerp produces a smooth transition
  that meets all of our requirements
  including constant rate
  and shortest arc.
- The endpoints $\mathbf{q_1}$
  and $\mathbf{q_2}$
  represent the rotations
  to be interpolated:
  - There are various ways to represent 3D rotations.
  - Here we are using **unit quaternions**
    because they have several advantages
    over another popular representation called **Euler angles**.

# Euler angles

- Euler angles are a sequence of three separate rotations
  which result in a 3D rotation.
- This is relatively intuitive
  especially in aviation where the Euler angles
  correspond to the heading, pitch, and bank angles
  of an aircraft.
- Unfortunately, in certain configurations,
  the mapping is not unique
  and there is a troublesome singularity.
- Another problem with Euler angles
  is that they are difficult to use for interpolation
  when you want a smooth transition like we do.

# Unit quaternions

- A **quaternion** has four components (w, x, y, z)
  like a 4D vector.
- A **unit** quaternion is a quaternion
  whose length equals 1.
- Unlike Euler angles,
  the unit quaternion representation
  has no singularity
  and interpolates well.
- It uses a single rotation
  around a single axis
  rather than a composition of rotations
  around a sequence of axes.
- As programmers,
  we need to be aware of the unit length constraint:

$$
\begin{aligned}
  w^2 + x^2 + y^2 + z^2
  &=
  1 \\
\end{aligned}
$$

# Normalizing a quaternion

- If we are given a quaternion whose length is not equal to 1,
  we can easily normalize it.
- To normalize a quaternion,
  divide each component by the length.
- The result will be a **unit** quaternion.

# Quaternion double cover

- The unit quaternions +q and -q
  represent the same rotation.
- Sometimes it helps to think of them
  as the "square roots" of a rotation...
- The number 9 has two square roots: +3 and -3.
- And a rotation has two quaternions
  that represent it: +q and -q.
- Let's briefly take a closer look at this diagram...

# Half the rotation angle

- Consider a counter-clockwise rotation
  in the XY plane
  of angle $\phi$.
- The unit quaternions $+q$
  and $-q$
  that represent it
  form a bisector.
- As you can see here,
  the components are in terms
  of **half** of the rotation angle.
- In this diagram,
  you can see how +q bisects the short path
  from the x-axis to the point on the circle,
  and -q bisects the long path.

# Implementing Slerp

- Implementing Slerp is not easy.
- We need to:
  - Negate one endpoint if needed to guarantee a "shortest arc" rotation.
  - Calculate the angle $\theta$
    between $q_1$
    and $q_2$.
  - Be careful to avoid a domain error
    in the inverse cosine function.
- Also, when $\theta=0$ or is very small,
  we need to switch to an alternative equation
  to prevent a division-by-zero.
- Is there an easier (and faster) way
  that still meets our requirements?
- Well, YES, of course there is!

# An approximation

- If we simply Lerp the quaternions
  we actually get a descent
  approximation of Slerp
  without the need to calculate $\theta$
  and without the division-by-zero problem.
- Just two things here:
  1. As with Slerp,
     we need to negate one of the endpoints
     if their dot product is negative
     to ensure a "shortest arc" rotation.
  1. We must normalize the result of the Lerp
     to ensure that we return a **unit** quaternion.
- Let's call it
  "normalized linear interpolation":

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

- How good is the approximation?

# Rotation comparison

- Well, the approximation is surprizingly good.
- The green line here is the Slerp result
  and the red line is the Lerp result.
- This is a testament to how unit quaternions
  are remarkably well-suited for representing 3D rotations.

# What have we learned?

- We have achieved our 3 learning objectives
  by walking through the mathematics
  that we might encounter
  while trying to implement 2 features in a game.

# Conclusion

- Maybe not everyone can say that math is fun,
  but for me it's one of the more enjoyable aspects
  of programming.
- Video games can provide the motivation needed
  to learn new things,
  but developing a complete game is a huge effort.
- Focusing on just a small feature
  is more attainable.
- Hopefully we've seen some examples
  of the very interesting things
  that we might learn along the way:
  - The output of a pseudorandom number generator
    with poorly-chosen constants
    can contain undesirable patterns
    that are not obvious at first glance.
  - Tests exist to detect these patterns.
  - Normalized linear interpolation
    is a good approximation to Slerp
    and is easier to implement.

---

# Is writing a game a good way to learn math?

> [Intro](./intro.html)

- Video games can provide many key ingredients
  for effective learning
  such as positive reinforcement
  and intrinsic motivation.
- For someone with a passion for video games,
  writing a game can be a great way
  to learn mathematics and problem solving skills.
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

# Learning objectives

> [Learning objectives](./takeaway-all.html)

- What do we hope to learn from this presentation?
- Our learning objective is
  to gain an appreciation
  for some of the interesting mathematics
  involved in video game development,
  such as:
  - Modular arithmetic
    - for generating random numbers
  - Spherical geometry
    - for mapping those numbers to points on a planet
  - Quaternion algebra
    - for rotating a 3D view of the planet
      from an orbiting satellite
- Also, one of the takeaways
  from this presentation
  is a random number generator
  in JavaScript
  that you are welcome to use freely
  in your own work.

# Game premise

> [Premise](./premise.html)

- We need a premise for a game
  to provide some motivation.
- The following is just an example
  of a hypothetical, simulation-type game.
- It is inspired by the Mars missions
  which have been in the news recently.
- _I don't have a name for it yet,
  so please feel free to contribute your ideas!_
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
    two small features of the game
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

> [Random number](./random-number.html)

- This comic is from XKCD.
- It makes me think about
  how the defintion of "random"
  can be different in different situations.
- Has anyone here played the game Minecraft?
- In Minecraft, each world is generated uniquely
  from a **seed** value
  that you can share with other players.
- If you use the same seed as another player,
  then you both play in the same world.
- For our game, we want something similar.
- We want to generate the planet's terrain procedurally
  based on a seed value.
- Given a seed, the terrain that we generate
  must be the same in every detail.
- We also want the terrain to look random,
  meaning there should be no visible patterns.
- We call this **pseudorandom**: The terrain is
  random-looking but perfectly reproducible
  based on the initial seed.

# Keeping it simple

> [Terrain height](./perlin.html)

- There are many techniques
  for generating realistic terrain in a game.
- In fact that is a whole topic onto itself
  and deserves its own presentation.
- Typically it involves generating terrain information
  like height, slope, and colour for each location
  on the planet that we are interested in.
- In order to keep this presentation within scope,
  we are going to make a sweeping assumption:
  - We are going to assume that we already know
    how to generate that information
    given a set of random points
    on the surface of the planet.
  - We won't worry about **how** those points are used.
  - We'll just say that a suitable technique exists.
  - One such technique is called the
    [Voronoi diagram](./voronoi.html)
    which assigns the colour of each pixel
    according to the nearest generator point.
- With this assumption,
  we can focus on just generating
  points at pseudorandom locations
  distributed evenly over the planet.
- First, we need a sequence of pseudorandom numbers.
  - To do this, we will use using a very simple equation
    based on modular arithmetic.
- Second, we need to map those numbers
  to locations on the planet.
  - To do this, we will use a clever trick
    in spherical geometry.

# Pseudorandom number generators

> [Learning objective 1](./takeaway-1.html)

- The problem of generating a random number
  appears in many different contexts.
- This is not cryptography,
  so we don't need a cryptographically-strong generator.
- The built-in generators
  provided by most programming languages
  should be sufficient.
- In JavaScript, it's called `Math.random()`.
- Unfortunately `Math.random()`
  provides no way to set the seed.
- If we try to use it
  for generating the points on our planet
  we cannot guarantee
  that every player will see the same world.
- We need a seedable generator.
- The equation used for this
  is called a linear congruential generator
  or **LCG**.
- It uses [modular arithmetic](./modulo.html):
  - Is anyone here
    familiar with the modulo operation?
  - The modulo operation returns the remainder
    of a division:
    - Remember back when you first learned division,
      before you knew anything about fractions or decimals?
    - You would write the answer
      as a whole number plus a remainder.
    - That's how the modulo operation works.
    - It calculates the remainder part.
    - For example:
      - Using long division, $31$
        divided by $10$
        is $3$
        with a remainder of $1$.
      - The expression "$31\mod 10$"
        just returns the remainder part,
        which is $1$
        in this case.
- Now that we understand the modulo operation,
  it is easy to see
  how a [simple generator (or "LCG")](./lcg.html) works:
  - The equation itself is very simple.
  - It uses the modulo operator
    to calculate the next random number $x_{n+1}$
    using the previous one $x_n$.
  - It involves two constants:
    - The first constant ($7$)
      is called the multiplier.
    - The second constant ($10$)
      is called the modulus.
    - Selecting constants to ensure sufficient randomness
      is non-trivial and has been a topic of research.
    - The constants here were chosen
      just to help illustrate how an LCG works.
    - To make things easy here,
      the modulus of $10$
      means we can just extract
      the last digit.
  - Let's see what happens
    if we start with a seed value of $1$.
  - Seven times one is seven,
    and seven mod ten is seven,
    so the first call returns a value of $7$.
    - We feed that back in.
  - Seven times seven is forty-nine,
    forty-nine mod ten is nine,
    so the second call returns a value of $9$.
    - And we feed that back in.
  - The thrid call returns a value of $3$.
    - And we feed that back in.
  - The fourth call returns a value of $1$.
    - We are back where we started.
  - The sequence repeats after $4$
    iterations.
  - We say that it has a **period** of $4$.
  - Let's see what happens
    if we start with a seed value of $2$.
  - This sequence also repeats after $4$
    iterations.
  - Can anyone tell me what happens
    if we start with a value of $5$?
  - Notice how the output is always
    less than the modulus ($10$).
  - Also, we should avoid $0$
    because it just loops forever.
- The LCG constants that we use in our game
  will be much larger than the ones shown here.
- We want to generate a sequence
  that looks random
  so we want the longest period possible.
- There are actually a set of guidelines
  for choosing the multipler and modulus
  to ensure that the period is maximal.
- But those rules alone
  do not guarantee that there won't be any patterns
  in the sequence.
- Let's see how the output of a generator
  with poorly-chosen constants
  can contain undesirable patterns
  which are difficult to see at first glance.

# Poll: Which sequence looks more random?

- Below are two LCG sequences
  starting from the same seed value
  and using the same modulus.
- The only thing different is the multiplier.
- Which do you think looks more random?

| Sequence | First 12 values                                      |
| -------- | ---------------------------------------------------- |
| A        | `27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, ...` |
| B        | `27, 10, 6, 16, 22, 7, 29, 5, 3, 8, 11, 19, ...`     |

- The possible responses are:
  1. Sequence A looks more random
  1. Sequence B looks more random
  1. Both sequences look equally random
- As we will see next, one of the sequences
  actually contains a very noticeable pattern
  if you try to plot points with it.

# The spectral test for randomness

- The spectral test is a simple test
  for detecting hidden patterns
  in a sequence of pseudorandom numbers.
- Here are the results of the spectral test
  for the sequences A and B:

| Sequence | Click below for spectral plot                                    |
| -------- | ---------------------------------------------------------------- |
| A        | [27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10](./spectral.html) |
| B        | [27, 10, 6, 16, 22, 7, 29, 5, 3, 8, 11, 19](./spectral.html)     |

- It's interesting to see how two sequences
  which appear equally random
  can actually have very different properties
  when displayed like this.
- That being said, the spectral test
  is just one of many known tests for randomness.
- It is neither comprehensive
  nor suitable in all cases.
- In 1995, George Marsaglia published a CD ROM
  which included an entire suite of tests
  called "The Diehard Battery of Tests of Randomness".

# Implementation in JavaScript

- Many of the LCG constants in common use
  require support for 64-bit integers.
- In JavaScript, the [built-in number type](./floating-point.html)
  only gives us 53 bits of precision:

  > `Number.MAX_SAFE_INTEGER` = $2^{53}-1$

- Fortunately there is something called
  the Park-Miller random number generator.
- The constants suggested by Park and Miller
  most recently in 1993
  just happen to be suitable for JavaScript,
  and should be sufficient for the purposes of our game:

  ```javascript
  const MODULUS = 2147483647; // 0x7FFFFFFF
  const MULTIPLIER = 48271;

  /**
   * Park-Miller PRNG with the multiplier value that was suggested more recently.
   */
  export default class Pseudorandom {
    constructor() {
      this.seed = 1;
    }

    /**
     * Sets the seed for the PRNG. Throws an error for invalid input.
     *
     * @param {Number} seed an integer greater than 0 and less than 2147483647
     */
    setSeed(seed) {
      const isValidSeed = Number.isInteger(seed) && seed > 0 && seed < MODULUS;
      if (!isValidSeed) {
        throw new Error(
          `Seed must be an integer greater than 0 and less than ${MODULUS}.`
        );
      }

      this.seed = seed;
    }

    /**
     * Returns the next pseudorandom integer greater than 0 and less than 2147483647
     * assuming a valid seed to begin with.
     */
    next() {
      this.seed = (MULTIPLIER * this.seed) % MODULUS;
      return this.seed;
    }

    /**
     * Returns a scalar value greater than or equal to 0 and less than 1
     * assuming a valid seed to begin with.
     */
    nextScalar() {
      return (this.next() - 1) / (MODULUS - 1);
    }
  }
  ```

- Here are some unit tests to go with it:

  ```javascript
  describe("Pseudorandom", () => {
    let pseudorandom1;
    let pseudorandom2;

    beforeEach(() => {
      pseudorandom1 = new Pseudorandom();
      pseudorandom2 = new Pseudorandom();
    });

    describe("constructor", () => {
      it("should set a valid initial seed", () => {
        expect(() =>
          pseudorandom1.setSeed(pseudorandom1.seed)
        ).not.toThrowSomething();
      });

      it("should set the same initial seed every time", () => {
        expect(pseudorandom1.seed).toBe(pseudorandom2.seed);
      });
    });

    describe("setSeed", () => {
      it("should throw for a non-integer input", () => {
        expect(() => pseudorandom1.setSeed(3.14)).toThrowSomething();
      });

      it("should throw for an integer input less than 1", () => {
        expect(() => pseudorandom1.setSeed(0)).toThrowSomething();
      });

      it("should not throw for an input of 1", () => {
        expect(() => pseudorandom1.setSeed(1)).not.toThrowSomething();
      });

      it("should throw for an integer input greater than 2147483646", () => {
        expect(() => pseudorandom1.setSeed(2147483647)).toThrowSomething();
      });

      it("should not throw for an input of 2147483646", () => {
        expect(() => pseudorandom1.setSeed(2147483646)).not.toThrowSomething();
      });
    });

    describe("next", () => {
      it("should always return an integer greater than 0 and less than 2147483647", () => {
        const NUM_ITERATIONS = 1000; // chosen small to be fast rather than rigorous
        for (let i = 0; i < NUM_ITERATIONS; i++) {
          const underTest = pseudorandom1.next();
          expect(() => pseudorandom1.setSeed(underTest)).not.toThrowSomething();
        }
      });

      it("should return the same sequence given the same initial seed", () => {
        const initialSeed = 1234;
        pseudorandom1.setSeed(initialSeed);
        pseudorandom2.setSeed(initialSeed);

        const NUM_ITERATIONS = 1000; // chosen small to be fast rather than rigorous
        for (let i = 0; i < NUM_ITERATIONS; i++) {
          expect(pseudorandom1.next()).toBe(pseudorandom2.next());
        }
      });
    });

    describe("nextScalar", () => {
      it("should always return a scalar value greater than or equal to 0 and less than 1", () => {
        const NUM_ITERATIONS = 1000; // chosen small to be fast rather than rigorous
        for (let i = 0; i < NUM_ITERATIONS; i++) {
          const underTest = pseudorandom1.nextScalar();
          expect(Number.isFinite(underTest)).toBe(true);
          expect(underTest >= 0).toBe(true);
          expect(underTest < 1).toBe(true);
        }
      });

      it("should return the same sequence given the same initial seed", () => {
        const initialSeed = 4321;
        pseudorandom1.setSeed(initialSeed);
        pseudorandom2.setSeed(initialSeed);

        const NUM_ITERATIONS = 1000; // chosen small to be fast rather than rigorous
        for (let i = 0; i < NUM_ITERATIONS; i++) {
          expect(pseudorandom1.nextScalar()).toBe(pseudorandom2.nextScalar());
        }
      });
    });
  });
  ```

- Then, for good measure, the next thing
  would be to run the various tests for randomness
  that we mentioned earlier.

# Sphere point picking

> [Learning objective 2](./takeaway-2.html)

- Now that we can generate
  a sequence of pseudorandom numbers,
  the next step is to map them
  to locations on the planet.
- Since the planet in our game is just a large sphere,
  we can use something called **sphere point picking**.
- We need to be careful
  to ensure that the points are distributed
  evenly over the sphere.
- If the mapping is incorrect,
  we might see "[bunching](./sphere-bunched.html)" at the poles
  similar to how the lines of longitude
  on a globe get closer together near the poles.
- In 1972, George Marsaglia wrote an article
  about sphere point picking
  with uniform distribution.
- The method shown here
  uses just two pseudorandom numbers
  for each point on the sphere:
  - Generate a pair of pseudorandom numbers $s_1,s_2$
    between $0$
    and $1$
  - Let $R$
    be the radius of the sphere
  - Let $u=(2s_1-1)R$
  - Let $\theta=2\pi s_2$
  - Calculate the point in XYZ coordinates using:

$$
\begin{aligned}
  x
  &=
  \sqrt{R^2-u^2}\cos\theta \\
  y
  &=
  \sqrt{R^2-u^2}\sin\theta \\
  z
  &=
  u \\
\end{aligned}
$$

- The result looks something like [this](./sphere-uniform.html).
- The reason this trick works
  is due to a rather surprizing result
  for the surface area of a [spherical segment](./spherical-segment.html):
  - If you cut a sphere with two parallel planes,
    the area of the strip between the planes
    depends only on the distance between the planes
    and not on where they cut the sphere.

# Feature #2: Realistic transitions between views

> [Learning objective 3](./takeaway-3.html)

> [Orbiting satellite](./orbiting-satellite.html)

- In our game, the satellite is revolving around the planet
  according to a prescribed orbit.
- The satellite is equipped with a virtual camera
  which is capable of viewing a portion of the planet's surface.
- The player can view different regions of the planet
  by adjusting the orientation of the satellite,
  thereby rotating the camera.
- As game designers, we want the motion of the camera
  to be realistic
  as it transitions between views.
- Animators call this "tweening".
- Programmers call it "interpolation".
- We want a rotation which is **continuous**
  and **shortest arc**:
  - "Continuous" here means with a steady rotation rate
  - "Shortest arc" means the short way around,
    like how there are two paths
    around [the face of a clock](./clock-face.html)

# Interpolation

- One of the simplest examples of interpolation
  is called linear interpolation or **Lerp**.
- (Linear is just a fancy word for "straight line").
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

- What does the function return
  when $t=0$?
  - It returns the first value $f_1$.
  - We can see this by writing $0$
    for $t$ in the equation:

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

- What does the function return
  when $t=1$?
  - It returns the second value $f_2$.
  - We can see this by writing $1$
    for $t$ in the equation:

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

- What does the function return
  when $t=\frac{1}{2}$?
- It returns the average of the endpoints.

- Lerp is very easy to implement in code:

  ```javascript
  function lerp(f1, f2, t) {
    return (1 - t) * f1 + t * f2;
  }
  ```

- Lerp also works nicely with [vectors](./vector.html):
  - Vectors can represent the coordinates
    of a position or a velocity.
  - A vector has a length and a direction.
  - To negate a vector, you just negate its coordinates.
  - To add two vectors, you just add the components.
  - Multiplication by a number
    also is applied component-wise,
    so it simply scales the vector.
  - In the vector form of Lerp,
    the product $t\mathbf{v}$
    simply scales the vector $\mathbf{v}$
    by a factor of $t$:

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
  spherical linear interpolation
  or **Slerp**.

# Slerp

- Slerp is like the spherical equivalent
  of Lerp:

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
  Slerp produces a smooth transition
  that meets all of our requirements
  including constant rate
  and shortest arc.
- The endpoints $\mathbf{q_1}$
  and $\mathbf{q_2}$
  represent the rotations
  to be interpolated:
  - There are various ways to represent 3D rotations.
  - Here we are using **unit quaternions**.
  - A quaternion is like a 4D vector,
    and a **unit** quaternion is a quaternion
    whose length is equal to $1$.
  - There are many advantages of this representation
    compared to others like [Euler angles](./euler.html)
    which have a troublesome singularity.
  - One interesting property of this representation
    is called **double cover**.
  - It means that $+\mathbf{q}$
    and $-\mathbf{q}$
    both represent the same rotation.
  - Sometimes I find it helpful
    to think of unit quaternions
    as the [**square roots** of a rotation](./double-cover.html).
  - For example, the number $9$
    has two square roots: $+3$
    and $-3$
    (since they both equal $9$ when squared).
  - The $9$ is like the rotation,
    and the square roots
    are like the unit quaternions
    that represent it.
- We need to be aware of some things
  before we can implement Slerp:
  1. To ensure a "shortest arc" rotation,
     we need to negate one of the endpoints
     if their dot product is negative.
  1. The angle $\theta$
     between $\mathbf{q_1}$
     and $\mathbf{q_2}$
     can be calculated
     similar to how we would calculate it
     for a pair of unit vectors,
     typically via the inverse cosine
     of their dot product.
  1. We need to protect against
     a possible domain error
     that might occur
     in the inverse cosine function
     if the endpoints are not perfectly normalized.
  1. The Slerp equation has $\sin\theta$
     in the denominator,
     and to avoid division-by-zero
     we need an alternative form
     when $\theta$
     is zero
     or very small.
- As you can imagine,
  a proper implementation of Slerp
  is actually quite involved.
- **Is there an easier way
  that still meets our requirements?**

# An approximation

> [Easy button!](./easy.html)

- If we simply Lerp the quaternions
  we actually get a descent
  approximation of Slerp
  without the need to calculate $\theta$
  and without the division-by-zero problem.
- Just two things here:
  1. As with Slerp,
     we need to negate one of the endpoints
     if their dot product is negative
     to ensure a "shortest arc" rotation.
  1. We must normalize the result of the Lerp
     to ensure that we return a **unit** quaternion.
- Let's call it
  "normalized linear interpolation":

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

- The approximation is surprizingly good
  ([compare](./nlerp-versus-slerp.html))
  which is a testament to
  how quaternions are remarkably well-suited
  for representing 3D rotations.

# Did we learn anything?

- Video games can provide the motivation needed
  to learn new things,
  but developing a complete game is a huge effort.
- Focusing on just a small feature
  is more attainable.
- Hopefully we've seen some examples
  of the very interesting things
  that we might learn along the way:
  - The output of a pseudorandom number generator
    with poorly-chosen constants
    can contain undesirable patterns
    that are not obvious at first glance.
  - Tests exist to detect these patterns.
  - Normalized linear interpolation
    is a good approximation to Slerp
    and is easier to implement.

# Image credits (still needs to be cleaned-up)

> [Intro](./intro.html)

> [Learning objectives](./takeaway-all.html)

> [Premise](./premise.html)

> [Random number](./random-number.html)

> [Terrain height](./perlin.html)

> [Voronoi diagram](./voronoi.html)

> [Learning objective 1](./takeaway-1.html)

> [modular arithmetic](./modulo.html)

> [simple generator (or "LCG")](./lcg.html)

> [built-in number type](./floating-point.html)

> [Learning objective 2](./takeaway-2.html)

> [bunching](./sphere-bunched.html)

> [this](./sphere-uniform.html)

> [spherical segment](./spherical-segment.html)

> [Learning objective 3](./takeaway-3.html)

> [Orbiting satellite](./orbiting-satellite.html)

> [the face of a clock](./clock-face.html)

> [vectors](./vector.html)

> [Euler angles](./euler.html)

> [**square roots** of a rotation](./double-cover.html)

> [Easy button!](./easy.html)

> [compare](./nlerp-versus-slerp.html)

# References

1. Blow, Jonathan (January 17, 2004). ["Hacking Quaternions"](http://number-none.com/product/Hacking%20Quaternions/).
1. Blow, Jonathan (February 26, 2004). ["Understanding Slerp, Then Not Using It"](http://number-none.com/product/Understanding%20Slerp,%20Then%20Not%20Using%20It).
1. Evans, Barry (August 7, 2014). ["The Mapmaker's Dilemma."](https://www.northcoastjournal.com/humboldt/the-mapmakers-dilemma/Content?oid=2694622) From the [_North Coast Journal of Politics, People & Art_](https://www.northcoastjournal.com/).
1. Marsaglia, G. "Choosing a Point from the Surface of a Sphere." _Ann. Math. Stat._ **43**, 645-646, 1972.
1. [MDN Web Docs](https://developer.mozilla.org/en-US/)
1. Park, Stephen K.; Miller, Keith W. (October 1988). ["Random Number Generators: Good Ones Are Hard To Find"](http://www.firstpr.com.au/dsp/rand31/p1192-park.pdf) (PDF). _Communications of the ACM_. **31** (10): 1192–1201.
1. Ronja (September 29, 2018). ["Voronoi Noise"](https://www.ronja-tutorials.com/post/028-voronoi-noise/).
1. Shoemake, Ken. ["Animating Rotation with Quaternion Curves"](https://www.cs.cmu.edu/~kiranb/animation/p245-shoemake.pdf) (PDF). [SIGGRAPH](https://en.wikipedia.org/wiki/SIGGRAPH) 1985.
1. Simon, Cory (February 27, 2015). ["Generating uniformly distributed numbers on a sphere"](http://corysimon.github.io/articles/uniformdistn-on-sphere/).
1. Weisstein, Eric W. "Sphere Point Picking." From [_MathWorld_](https://mathworld.wolfram.com/)--A Wolfram Web Resource. https://mathworld.wolfram.com/SpherePointPicking.html
1. Weisstein, Eric W. "Spherical Segment." From [_MathWorld_](https://mathworld.wolfram.com/)--A Wolfram Web Resource. https://mathworld.wolfram.com/SphericalSegment.html
1. Weisstein, Eric W. "Zone." From [_MathWorld_](https://mathworld.wolfram.com/)--A Wolfram Web Resource. https://mathworld.wolfram.com/Zone.html
1. Wikipedia contributors. "Diehard tests." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 5 Feb. 2021.
1. Wikipedia contributors. "Double-precision floating-point format." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 9 Feb. 2021.
1. Wikipedia contributors. "Euclidean vector." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 9 Feb. 2021.
1. Wikipedia contributors. "Euler angles." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 18 Feb. 2021.
1. Wikipedia contributors. "George Marsaglia." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 24 Jan. 2021.
1. Wikipedia contributors. "IEEE 754." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 15 Feb. 2021.
1. Wikipedia contributors. "Lehmer random number generator." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 13 Jan. 2021.
1. Wikipedia contributors. "Linear congruential generator." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 22 Jan. 2021.
1. Wikipedia contributors. "Linear interpolation." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 2 Feb. 2021.
1. Wikipedia contributors. "Modulo operation." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 25 Feb. 2021.
1. Wikipedia contributors. "Perlin noise." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 7 Feb. 2021.
1. Wikipedia contributors. "Quaternions and spatial rotation." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 14 Feb. 2021.
1. Wikipedia contributors. "Slerp." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 12 Feb. 2021.
1. Wikipedia contributors. "Spherical segment." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 28 Apr. 2020.
1. Wikipedia contributors. "Voronoi diagram." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 23 Feb. 2021.
