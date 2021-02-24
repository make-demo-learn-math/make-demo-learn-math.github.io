# Is writing a game a good way to learn math?

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

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

# Game premise

- We need a premise for a game
  to provide some motivation.
- The following is just an example
  of a hypothetical, simulation-type game.
- It is inspired by the Mars missions
  which have been in the news recently.

## Planetary Exploration

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

- Rather than using a detailed image of a real planet,
  we want to generate the planet's terrain procedurally
  based on a **seed** value.
- This is similar to the game of Minecraft
  where each different world
  is generated from a unique seed.
- Our game is multi-player,
  so the experience is shared among players
  and the terrain must be the same in every detail.
- We also want the terrain to look random,
  meaning there should be no visible patterns.
- We call this **pseudorandom**: The terrain is
  random-looking but perfectly reproducible
  based on the initial seed.

# Keeping it simple

- There are many techniques
  for generating realistic terrain in a game.
- In fact that is a whole topic onto itself
  and deserves its own presentation.
- Typically it involves generating terrain information
  like height, slope, and colour for each location
  on the planet that we are interested in.
- Perlin noise is one popular approach for this.
- In order to keep this presentation within scope,
  we are going to make a sweeping assumption...
- We are going to assume that we already know
  how to generate terrain information
  given a set of random points
  on the surface of the planet.
- We won't worry about **how** those points are used.
- We'll just say that a suitable technique exists
  (for example, Voronoi diagrams).
- Now we can focus on just generating
  points distributed evenly over the planet
  at pseudorandom locations.
- The first step is to generate a sequence of
  pseudorandom numbers,
  and the second step is to map those numbers
  to locations on the planet.
- Both of these involve some very interesting math.

# Pseudorandom number generators

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
- The equation often used for this
  is called a linear congruential generator
  or **LCG**.
- The equation itself is very simple
  but involves several constants
  which must be chosen carefully.
- In fact, selecting the constants to ensure sufficient randomness
  is non-trivial and has been a topic of research.
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

| Sequence | Click below for spectral plot                                     |
| -------- | ----------------------------------------------------------------- |
| A        | [27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10](./spectral-a.png) |
| B        | [27, 10, 6, 16, 22, 7, 29, 5, 3, 8, 11, 19](./spectral-b.png)     |

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
- In JavaScript, the built-in number type
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

- Just for good measure, here is the corresponding spectral test.
- ..._insert spectral test for my code compared side-by-side with `Math.random()`_...

# Sphere point picking

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
  we might see "bunching" at the poles
  similar to how the lines of longitude
  on a globe get closer together near the poles.
- It's a bit like
  trying to draw a map of the world
  on a flat piece of paper:
  - We can stretch it, like the
    [Mercator projection](./mercator.html).
  - Or we can tear it, like the
    [Dymaxion map](./fuller.html).
  - But that's a whole other topic!
- In 1972, George Marsaglia wrote an article
  about sphere point picking.
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

- Here are are some typical results.
- ..._plots of N random points on a sphere, various seeds, various N_...
- The reason this trick works
  is due to a rather surprizing result
  for the surface area of a [spherical segment](./spherical-segment.html):
  - If you cut a sphere with two parallel planes,
    the area of the strip between the planes
    depends only on the distance between the planes
    and not on where they cut the sphere.

# Feature #2: Realistic transitions between views

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

- When $t=0$,
  the function returns the first value $f_1$.
  We can see this by writing $0$
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

- When $t=1$,
  the function returns the second value $f_2$.
  We can see this by writing $1$
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
  - A quaternion is like a four dimensional vector,
    and a **unit** quaternion is a quaternion
    whose length is equal to $1$.
  - There are many advantages of this representation
    compared to others like Euler angles
    which have a troublesome singularity.
  - One interesting property of this representation
    is called **double cover**.
  - It means that $+\mathbf{q}$
    and $-\mathbf{q}$
    both represent the same rotation.
  - Sometimes I find it helpful
    to think of unit quaternions
    as the **square roots** of a rotation.
  - For example, the number $9$
    has two square roots: $+3$
    and $-3$
    (since they equal $9$ when squared).
  - The $9$ is like the rotation,
    and the square roots
    are like the quaternions that represent it.
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

- Nlerp is a surprizingly good approximation
  to Slerp: [compare](./nlerp-versus-slerp.gif)
- Quaternions are quite remarkable
  when we use them to represent 3D rotations.

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

# References

1. Blow, Jonathan (January 17, 2004). ["Hacking Quaternions"](http://number-none.com/product/Hacking%20Quaternions/).
1. Blow, Jonathan (February 26, 2004). ["Understanding Slerp, Then Not Using It"](http://number-none.com/product/Understanding%20Slerp,%20Then%20Not%20Using%20It).
1. Evans, Barry (August 7, 2014). ["The Mapmaker's Dilemma."](https://www.northcoastjournal.com/humboldt/the-mapmakers-dilemma/Content?oid=2694622) From the [_North Coast Journal of Politics, People & Art_](https://www.northcoastjournal.com/).
1. Marsaglia, G. "Choosing a Point from the Surface of a Sphere." _Ann. Math. Stat._ **43**, 645-646, 1972.
1. [MDN Web Docs](https://developer.mozilla.org/en-US/)
1. Park, Stephen K.; Miller, Keith W. (October 1988). ["Random Number Generators: Good Ones Are Hard To Find"](http://www.firstpr.com.au/dsp/rand31/p1192-park.pdf) (PDF). _Communications of the ACM_. **31** (10): 1192–1201.
1. Weisstein, Eric W. "Sphere Point Picking." From [_MathWorld_](https://mathworld.wolfram.com/)--A Wolfram Web Resource. https://mathworld.wolfram.com/SpherePointPicking.html
1. Weisstein, Eric W. "Spherical Segment." From [_MathWorld_](https://mathworld.wolfram.com/)--A Wolfram Web Resource. https://mathworld.wolfram.com/SphericalSegment.html
1. Weisstein, Eric W. "Zone." From [_MathWorld_](https://mathworld.wolfram.com/)--A Wolfram Web Resource. https://mathworld.wolfram.com/Zone.html
1. Wikipedia contributors. "Diehard tests." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 5 Feb. 2021.
1. Wikipedia contributors. "George Marsaglia." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 24 Jan. 2021.
1. Wikipedia contributors. "Lehmer random number generator." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 13 Jan. 2021.
1. Wikipedia contributors. "Linear congruential generator." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 22 Jan. 2021.
1. Wikipedia contributors. "Linear interpolation." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 2 Feb. 2021.
1. Wikipedia contributors. "Quaternions and spatial rotation." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 14 Feb. 2021.
1. Wikipedia contributors. "Slerp." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 12 Feb. 2021.
1. Wikipedia contributors. "Spherical segment." _Wikipedia, The Free Encyclopedia_. Wikipedia, The Free Encyclopedia, 28 Apr. 2020.
