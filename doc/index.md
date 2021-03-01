# Writing a game

> - _Do you know how hard it is
>   to make a pie chart
>   that looks like Pacman?_

- What are the ingredients that we need for effective learning?
  - Well, we need positive reinforcement
  - And, we need intrinsic motivation
  - Video games can provide both of these.
- On the other side,
  we have things that we can learn from writing software:
  - We learn to solve problems
  - And, often we learn about logic and mathematics
- So it makes sense to combine all of these together by writing a game.
- The problem is that writing a game is a huge effort,
  even with all of the development tools and game engines that are available.
  - What if we tackle something more attainable
    like writing just a single feature within a game?
  - Do we still get all of these benefits?
  - _I_ think so.
- Today, I would like to share my own experience
  and show you some pretty amazing things that I've learned
  and which I think you will find interesting too,
  whether or not you are a programmer.

# Learning objectives

- Let's talk briefly about some of the things that we are going to learn today.
  - I've made a checklist with 3 things on it
    so that we can check them off as we go.
  - The takeaways will be a little different
    depending on if you are a technical person
    or a non-technical person,
    but regardless, there will be something for everyone.
- First, we're going to start by using a certain type of arithmetic
  called "modular arithmetic".
  - We will use it to generate a random-looking sequence of numbers for our game.
  - Don't worry about the name "modular arithmetic".
  - It's actually something that you've already learned
    way back in elementary school.
  - We are going to walk through a simple example
    and I will show you just how easy it is.
  - If you are a programmer then you already know how this works,
    so I've got another takeaway for you.
  - I've got a JavaScript implementation of a seedable pseudorandom number generator
    that you can use in your own game or simulation.
  - The thing that I find really amazing here
    is that such a simple equation
    can produce such chaotic results.
  - I mean, it literally just uses a multiplication and the modulo operator
    to generate the next random number.
  - The real secret is in how to select the right set of constants
    to use.
- The second learning objective is about taking the random numbers
  that we generated
  and mapping them to points on a planet.
  - To do this, we are going to use a little trick.
  - It's based on a very surprizing result in "spherical geometry".
  - By taking advantage of this, we will see how to map our random numbers
    to different locations on the planet
    such that they are distributed uniformly.
- The third learning objective is probably my favourite.
  - It uses something called quaternion algebra.
  - We are going to use it for rotating the 3D view in our game.
  - But I've got an interesting way of visualizing quaternions
    in terms of how they represent 3D rotations.
  - If you are not familiar with quaternions,
    this will help you to understand
    or at least appreciate how fascinating the math really is.
  - Even if you are a programmer who has used quaternions before,
    hopefully this will give you new insight into how remarkably well-suited they are
    for things like this.
  - If you've used the Slerp function before
    then you already know how useful it is.
  - But it's also a tricky function to implement.
  - In fact, many years ago I spent a lot of time
    trying to optimize it to make it run faster.
  - It turns out that there is an alternative
    which is much faster and easier to implement.
  - What's remarkable about that is how well it works
    considering how simple it is
    compared to Slerp.

# Premise

- Ok, this is the fun part...
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
  - Players can:
    - Remotely control satellites
    - Deploy rovers to the surface of the planet
      for collecting samples
    - Run tests on those samples
      to look for signs of life
    - And, then, share their results
      with the community.
  - Players get credit when they contribute to discoveries.
  - _Ah, ok, I know what some of you are thinking:_
    - "Where's the fire button?"
    - "How do I shoot?"
    - Well, maybe that's a different game altogether..
  - Regardless, for now we are just going to consider
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
    - As a game developer:
      - We need to generate the terrain itself
      - And we need to simulate the view from the satellite.
    - That brings us to our feature list...

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

> - This is probably my favourite comic:
>   - To be fair, the code is well-commented...
>   - But I'd like to see at least one unit test for it...

- Clearly we need to qualify what we mean by "random".
- Has anyone here played the game Minecraft?
- In Minecraft, each world is generated uniquely
  from a **seed** value
  that you can share with other players.
- If you use the same seed as another player,
  then you both play in the same world.
- For our game, we want something similar:
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
  on the planet that we're interested in.
- In order to keep this presentation within scope,
  we are going to make a sweeping assumption:
  - We are going to assume that we already know
    how to generate that information
    given a set of random points
    on the planet.
  - We won't worry about **how** those points are used.
  - We'll just say that "a suitable technique exists".
  - Here is an example of what I mean...

# Voronoi diagram

- A **Voronoi diagram** assigns the colour of each pixel
  according to the nearest generator point.
- But it doesn't need to be colour.
  - It could be terrain height,
    for example,
    as a function of the distance
    to the nearest point.
  - We could clamp that or put a lower limit on it,
    and then we get a basic-looking landscape.
- Regardless, the idea here is
  that given a set of random points,
  techniques do exist to generate terrain.

# Our first two learning objectives

- With our big assumption,
  we can focus just on generating
  points on the planet.
- We will take it step-by-step
  so that it lines up with
  our first 2 learning objectives.
- First, we need a sequence of pseudorandom numbers.
  - This is where I'll show you just how simple
    the equation is.
  - But we will also gain an appreciation
    for how difficult it would be
    to select the constants in that equation
    such that the output is sufficiently random-looking.
- Second, we need to map those numbers
  to locations on the planet.
  - This is where I will show you
    that little trick from spherical geometry.

# Learning objective #1

- In our game, we don't need
  a cryptographically-strong generator.
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
  - The LCG that we will use is the **Lehmer** type.
  - It looks even simpler than other types,
    but still produces amazing results.
  - The arithmetic it uses is actually
    something that you learned
    in elementary school,
    just with bigger numbers.
  - It involves two constants
    which need to be chosen very carefully
    to ensure that the output is sufficiently random.
  - We will use very small constants
    for the demonstration
    but the arithmetic is essentially the same.

# Modulo operation

- The modulo operator returns the remainder of a division.
- _(This is true for positive numbers which is all we care about here)._
- "31 mod 10" is just the remainder of dividing 31 by 10.
- So, "31 mod 10" is equal to 1.
- If you remember doing long division, at the end
  we are left with a remainder.
- Using the long division,
  31 divided by 10 is equal to 3 with a remainder of 1.
- That remainder part exactly what the modulo operation returns.

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

> - The sequence repeats after 4 iterations.
> - We say that this sequence has a **period** of 4.

> - Also, note how the generated values
>   are always less than the modulus
>   (which in this case is 10).

# Starting from a different seed

- What happens if we start
  from a different value?
  - Let's try an initial seed of 2.
  - As you can see, we get a different sequence.
- This sequence also has a period of 4.

> - You might notice that there is one number
>   we haven't seen yet.
> - It's the number 5.

# An example of a short period

- If we start with an initial seed of 5,
  we repeat forever on that value.
- This is a period of just 1.
- _Obviously, we want to avoid this
  otherwise we aren't really any better
  than that comic which I showed you_.
- We can actually avoid short periods like us
  by choosing the constants carefully.
- In fact, there are well-defined rules
  for choosing the constants
  to ensure a maximal period
  regardless of the initial seed.
- Unfortunately, even if we choose our constants
  according to those rules,
  we can still end up with undesirable patterns
  in the output.
- And to make matters worse, those patterns
  might not be obvious at first glance.
- In fact, selecting constants to ensure sufficient randomness
  is non-trivial and has been a topic of research.
- Let's do a poll to show an example.

# Now it's time for our POLL!

- _The poll is anonymous and just for fun_.
- Here are two LCG sequences
  starting from the same seed value
  and using the same modulus.
- The only thing different is the multiplier.
- I want to know: Which do you think looks more random,
  sequence A or sequence B?
- (_conduct poll_)
- It turns out that one of the sequences
  contains an obvious pattern
  if you try to use it for plotting points.
- There is a simple test called the **spectral test**
  which helps us to see these patterns.
- Each time you generate a new number,
  you plot it on the x-axis
  against the previous number on the y-axis.

# Spectral plot for sequence A

- You can start to see how the points
  tend to fall on one of three parallel lines.

# Spectral plot for sequence B

- These points seem more scattered.
- Based on these plots,
  we can say that sequence B is more random.
- The spectral test is not exhaustive
  and there are existing tests
  which are more sophisticated.
- In our game, since we are using the numbers
  for generating terrain,
  we want to avoid any patterns.
- So we need to find suitable constants
  that are well-known
  to produce good results.

# Number format in JavaScript

- Many of the recommended constants
  require support for 64-bit integers.
- In JavaScript, numbers are represented
  using a floating-point format like this.
- (It's called the IEEE double-precision format).
- It only has about 52 bits of precision
  since the other bits are used for the sign
  and exponent.
- Fortunately there is something called
  the Park-Miller random number generator.
  - The constants suggested by Park and Miller in 1993
    just happen to be suitable for JavaScript,
    and should be sufficient for the purposes of our game.
  - The multiplier is a 16-bit number
    and the modulus is a 32-bit number.
  - We already saw how the output
    is always less than the modulus.
  - When we multiply the 16-bit multiplier constant
    by the the largest possible output of 32 bits,
    the result requires at most 48 bits
    (since 16 + 32 = 48).
  - So we are ok, in fact we actually have
    a few bits to spare.

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
  around the North and South poles.

# Sphere point picking

- There are several techniques
  that will produce a uniform distribution
  over the planet.
- The method shown here
  uses just two pseudorandom numbers
  for each point on the sphere.
- For a sphere of radius R
  (_i.e., the radius of our planet_):
  - Generate a pair of pseudorandom numbers $s_1,s_2$
    between $0$
    and $1$
  - (Our JavaScript class has a function for that)
  - (Also, $s_1$
    and $s_2$
    will have uniform distributions)
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

- Why does that third equation
  look so different
  than the first two?
- I remember being very puzzled by this.

# Uniform distribution

- As you can see,
  we have a uniform distribution
  over the sphere.
- When you consider the third equation,
  this would suggest that the $z$
  coordinates of the points
  are uniformly distributed.
- (In fact this is true for the projection
  onto **any** line passing through the centre).
- The reason for this
  is due to a rather surprizing result
  for the surface area of a **spherical segment**:
  - If you cut a sphere with two parallel planes,
    the area of the strip between the planes
    depends only on the distance between the planes
    and not on where they cut the sphere.
  - It might help to imagine the two planes
    being perpendicular to the $z$
    axis.
  - Then imagine that you can move those planes
    anywhere along the $z$
    axis and get the same result.

# Spherical segment

- Here on the right is the equation
  for the surface area $S$
  of a spherical segment.
- Note how it depends only
  on the radius of the sphere, capital $R$,
  and the spacing $h$
  between the planes.
- It does not depend on small $r_1$
  or small $r_2$
  which vary according to
  where they cut the sphere.

# Learning objective #3

- _Finally, we get to talk about quaternions..._
- Our third learning objective
  is about rotating the camera in 3D
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
  to be realistic.
- We know the starting position
  and we know the ending position.
- We need to determine the motion _in between_.
- Animators call this "tweening".
- Programmers call it "interpolation".
- Let's define exactly what we mean.

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
- I used to go there all the time when I was a kid.
- Let's imagine that you enter the clock garden
  at the 3 o-clock position
  over on the right.
- This is sort of like the positive x-axis on a graph.
- Now suppose that you want to walk to the 12 o'clock position
  which is at the top,
  sort of like the positive y-axis.
- There are 2 ways to get there
  (assuming of course
  that you remain on the perimeter of the garden
  to avoid disturbing the lovely flowers).
- You can take the long way around
  which takes you down through 6 o'clock
  and back up through 9 o'clock.
- That's 270 degrees of arc.
- Or, you can take the short way
  which is just 90 degrees of arc.
- In our game,
  we always want the short way
  because that's what the player would expect.

# Linear interpolation or "Lerp"

- One of the simplest examples of interpolation
  is called linear interpolation or **Lerp**.
- "Linear" is just a fancy word for "straight line".
- Lerp is a function that interpolates between two values $f_1$
  and $f_2$
  according to a given number $t$
  between 0 and 1:

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

  - It returns the sum of the endpoints
    divided by 2,
    which is their average value.

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
- We will denote a vector
  as shown here on the right.
- We use an underline to indicate
  that the variable represents a vector,
  and we write its components in a vertical column like this.

# Vector Lerp

- The vector form of Lerp
  resembles the simple form,
  but instead of just numbers
  for the endpoints
  it has vectors.
- It involves the same operations
  as simple Lerp,
  applied "component-wise".

# Vector Lerp (component-wise)

- As you can see,
  the components of the result
  are just simple Lerps
  of the corresponding endpoint components.
- This might be fine for interpolating vectors,
  but for the view transitions in our game
  we need to interpolate **3D rotations**.
- So we need an equation that works
  when the endpoints are some sort of representation
  of 3D rotations.
- Does anyone know what we can use for this?
- We need something called **spherical linear interpolation**.

# Spherical linear interpolation or "Slerp"

- Slerp is the spherical equivalent of Lerp,
  but it's considerably more complicated.
- We've now got this angle $\theta$
  that we need to worry about,
  and when it is zero
  we are going to run into
  a possible division by zero
  due to the $\sin\theta$
  in the denominator.
- Let's take a brief look at it though,
  and maybe we can appreciate
  some of the underlying mathematics.
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

- Euler angles are a sequence of three separate rotations.
- When you put them all together,
  you get the desired rotation.
- They are fairly intuitive
  especially in aviation
  where they correspond directly to the heading,
  pitch, and bank angles of an aircraft.
- Unfortunately there is a singularity in the equations
  when 2 of the 3 axes become parallel.
- The other problem with Euler angles
  is that they are difficult to interpolate
  when you need a smooth transition.
- So they are not a good choice for us.

# Unit quaternions

- A **quaternion** has four components (w, x, y, z)
  like a 4D vector.
- A **unit** quaternion is a quaternion
  whose length equals 1.
- Unlike Euler angles,
  the unit quaternion representation
  has no singularity
  and interpolates very well.
- It uses a single rotation
  around a single axis
  rather than a composition of mutliple rotations.
- As programmers,
  we need to be aware of the unit length constraint:

$$
\begin{aligned}
  w^2 + x^2 + y^2 + z^2
  &=
  1 \\
\end{aligned}
$$

- It's not really a big deal though,
  because if we have a quaternion
  whose length might not be equal to 1
  then we just normalize it.

# Normalizing a quaternion

- To normalize a quaternion,
  we just divide each component by the length.
- The result will be a **unit** quaternion.

# Quaternion double cover

- This is where is starts to get really interesting.
- The unit quaternions +q and -q
  represent the same rotation.
- So, any given 3D rotation
  corresponds to exactly 2 unit quaternions.
- Sometimes it helps to think of them
  as the "square roots" of a rotation...
  - The number 9 has two square roots: +3 and -3.
  - And a rotation has two quaternions
    that represent it: +q and -q.

# Half the rotation angle

- Consider a counter-clockwise rotation
  in the XY plane
  of angle $\phi$
  sort of like our little walk
  around the clock garden
  in Niagara Falls.
  - In this diagram, the dot represents
    where you are.
  - You started at the positive x-axis
    (3 o'clock)
    and now you are moving counter-clockwise
    toward the 12 o'clock position.
  - So far, you have travelled an angle $\phi$.
  - The unit quaternions $+q$
    and $-q$
    that represent your rotation
    form a bisector.
  - You can see how +q bisects the short arc,
    and -q bisects the long arc.
  - Both +q and -q represent the same rotation
    and we can choose the one
    that leads us to the target
    via the shorter path.
- I had been using quaternions for a long time
  before I realized this.
- Hopefully this helps you understand them too.
- This also helped me to understand
  why the components of a unit quaternion
  are in terms of **half** the rotation angle.
  - You can see the example here
    where the w-component is equal to $\cos\frac{\phi}{2}$
    and the z-component is equal to $\sin\frac{\phi}{2}$.

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
- These are both straightforward
  and relatively simple
  compared to Slerp.
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
- Well, when I first saw how good it was
  it really blew my mind.
- I mean, we are basically drawing a straight line
  between the two endpoints in 4-dimensional space,
  and this somehow gives us a result
  that is nearly as good as Slerp!
- I think that this is a real testament
  to how unit quaternions
  are remarkably well-suited for representing 3D rotations.

# Rotation comparison

- Here we go.
- The green line is the Slerp result
  and the red line is the Lerp result.
- How crazy is that.
- As far as I'm concerned,
  unless there is a really good reason NOT to use it,
  I would strongly recommend Nlerp over Slerp any day.

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
- Focusing on just a small feature is more attainable
  and you can still learn some very interesting things
  along the way.
  - Even if you use an existing pseudorandom number generator,
    be aware that poorly-chosen constants
    can cause undesirable patterns
    which are not obvious at first glance.
  - Tests exist for detecting this.
  - Since the generator in JavaScript does not let you set the seed,
    you may want to use the source code shown here
    if you need a seedable generator.
  - Unit quaternions are easier to understand
    when you can visualize how +q and -q form a bisector
    in the plane of rotation.
  - (_remember the clock garden_)
  - Normalized linear interpolation
    is a good approximation to Slerp and is remarkably simple.
  - This also makes Nlerp faster and easier to maintain.

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
