- Thank you very much for the introduction.
- This is my first time using Google Slides
  for a presentation so please bear with me.
- It seems to have a lot of nice features
  for graphs and charts,
  so I'd like to start things off
  with a **pie chart**.

# Writing a game

- This pie chart shows the results of a scientific,
  in-depth study that I made... _(just kidding - it's a Pacman)_
- Let's face it, video games are just plain **fun**.
- They can also provide many key ingredients
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
    - for generating random-looking numbers
  - Spherical geometry
    - for mapping those numbers to points on a planet
  - Quaternion algebra
    - for rotating a 3D view of the planet
      from an orbiting satellite
- You don't need to be a programmer or a mathematician.
- In fact, we will see
  how to generate random-looking numbers
  using nothing more than the arithmetic
  that you learned in elementary school -
  (just with bigger numbers).
- The goal here is to keep things fun and interesting
  for everyone.
- If you **are** a programmer,
  then another takeaway
  from this presentation
  is a random number generator
  in JavaScript
  which you are welcome to use
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
- To be fair, the code is well-commented...
- But clearly we need to qualify what we mean by "random".
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
- But we also want the terrain to look random,
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
  to the nearest generator location.
- In any case, the point here is
  that given a set of random points,
  there are ways to generate the terrain.

# Our first two learning objectives

- With our sweeping assumption,
  we can focus just on generating
  points at pseudorandom locations
  on the planet.
- We will take it step-by-step
  so that everyone can appreciate
  the math behind it.
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
  or **LCG**:
  - The LCG that we use is the **Lehmer** type.
  - The equation for it is very simple
    and we will see how it works using
    the same arithmetic that you learned
    in elementary school.
  - It involves two constants
    which need to be chosen very carefully
    to ensure that the output is sufficiently random.
  - For demonstration purposes, we will use very small values
    for the constants but the arithmetic is the same.

# Modulo operation

- The modulo operator returns the remainder of a division.
- "31 mod 10" is just the remainder of dividing 31 by 10.
- 31 divided by 10 is equal to 3 with a remainder of 1.
- So, "31 mod 10" is equal to 1.
- If you remember doing long division, at the end
  we are left with a remainder.
- That's exactly what the modulo operation returns.

# Generator equation: s<sub>n+1</sub> = (7 \* s<sub>n</sub>) mod 10

- This is the LCG equation using small constants
  to illustrate how it works:
  - The new value is equal to 7 times the old value, modulo 10.
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
- Selecting constants to ensure sufficient randomness
  is non-trivial and has been a topic of research.
- Let's do a poll to see whether anyone can spot
  the hidden pattern.

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
  which plots a point for each number in the sequence
  after the initial seed.
- The x-coordinate of the point
  is the current output $s_n$
  and the y-coordinate
  is the previous output $s_{n-1}$.
- Here are the spectral plots for the sequences A and B.

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
- So, we need to seach for some suitable constants
  to use in our generator.

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
  will always fit within 16 + 32 = 48 bits.
- That gives us a few bits to spare,
  so we should be good.

# Park-Miller generator in JavaScript

- The multiplier is 48,271
  and the modulus is 2,147,483,647
  (_or, in binary, 31 ones_).
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

- There are several techniques
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
- Let's define what we mean by "realistic".

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
- For the view transitions in our game,
  we always want the short way
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
- We will denote a vector with an underline
  as shown here on the right.

# Vector Lerp

- The vector form of Lerp
  resembles the simple form
  but has vector endpoints instead.
- The arithmetic is applied "component-wise"
  as you might expect.

# Vector Lerp (component-wise)

- As you can see,
  the components of the result
  are just simple Lerps
  of the endpoint components.
- But in our case, the endpoints will be
  some sort of representation of 3D rotations.
- Does anyone know what kind of interpolation to use
  when the endpoints are 3D rotations?
- To start with, let's look
  at something called **spherical linear interpolation**.

# Spherical linear interpolation or "Slerp"

- Slerp is the spherical equivalent of Lerp,
  but it's considerably more complicated.
- Let's take a brief look at it...
- Hopefully we can gain an appreciation
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
  which produce the desired rotation
  when applied in succession.
- Euler angles are fairly intuitive
  especially in aviation where they correspond
  to the heading, pitch, and bank angles
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
  around multiple axes.
- As programmers,
  we need to be aware of the unit length constraint
  because many downstream operations rely on this:

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

- Maybe not everyone would agree that math is fun,
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
