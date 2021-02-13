# Simple Orbit

- Pick a circular orbit centered around a Mars-like planet
- Kepler's Third Law for a circular orbit:

$$
\begin{aligned}
  T
  &=
  2\pi\sqrt{\frac{R^3}{GM}} \\
\end{aligned}
$$

- where:

  - $T$ is the orbital period
  - $R$ is the radius of the circular orbit
  - $G$ is the gravitational constant
  - $M$ is the mass of the planet

- For relatively low altitude (160km):

$$
\begin{aligned}
  T
  &=
  2\pi\sqrt{\frac{R^3}{GM}} \\
  &\doteq
  2\pi\sqrt{\frac{(3.39\times10^6+1.6\times10^5)^3}
  {6.67\times10^{-11}\times6.39\times10^{23}}} \\
  &\doteq
  107\text{ minutes} \\
\end{aligned}
$$

- The equations for circular motion of radius $R$
  and period $T$:

$$
\begin{aligned}
  x(t)
  &=
  R\cos(\tfrac{2\pi}{T}t) \\
  y(t)
  &=
  R\sin(\tfrac{2\pi}{T}t) \\
\end{aligned}
$$

![Image](Polar.png)
