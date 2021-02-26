Long division:

$$
\begin{aligned}
  3&\text{ R }1 \\
  10\ \overline{\smash{)}\ 31}& \\
  \underline{30}& \\
  1& \\
\end{aligned}
$$

Modulo operation:

$$
\begin{aligned}
  31\mod 10
  &=
  1 \\
\end{aligned}
$$

_TO DO: move the following to an LCG slide_

The LCG formula uses the modulo operator
to calculate the next random number $x_{n+1}$
using the previous one $x_n$:

$$
\begin{aligned}
  x_{n+1}
  &=
  7x_n \mod 10 \\
\end{aligned}
$$

The value $7$
is called the multiplier,
and the value $10$
is called the modulus.
(These values are just examples).

Let's look at the output
for various seed values $x_0$.

## Seed $x_0=0$

| $x_n$ | $7x_n$ | $\mod 10$ |
| :---: | -----: | :-------: |
|  $0$  |    $0$ |    $0$    |
|  $0$  |    $0$ |    $0$    |
|  ...  |

Obviously $0$
is a poor choice
and something we must avoid.

## Seed $x_0=1$

| $x_n$ | $7x_n$ | $\mod 10$ |
| :---: | -----: | :-------: |
|  $1$  |    $7$ |    $7$    |
|  $7$  |   $49$ |    $9$    |
|  $9$  |   $63$ |    $3$    |
|  $3$  |   $21$ |    $1$    |
|  $1$  |    $7$ |    $7$    |
|  ...  |

The sequence repeats after $4$
iterations.
We say that the **period** is $4$.

## Seed $x_0=2$

| $x_n$ | $7x_n$ | $\mod 10$ |
| :---: | -----: | :-------: |
|  $2$  |   $14$ |    $4$    |
|  $4$  |   $28$ |    $8$    |
|  $8$  |   $56$ |    $6$    |
|  $6$  |   $42$ |    $2$    |
|  $2$  |   $14$ |    $4$    |
|  ...  |

The period is 4.

Note that the output
is always less than the modulus,
or this case less than $10$.

Also note that
the only number we haven't seen yet is $5$,
so let's try $5$
as the initial seed...

## Seed $x_0=5$

| $x_n$ | $7x_n$ | $\mod 10$ |
| :---: | -----: | :-------: |
|  $5$  |   $35$ |    $5$    |
|  $5$  |   $35$ |    $5$    |
|  ...  |

The period is $1$
so obviously $5$
is a poor choise as well.

> Are there rules
> for choosing the multipler and modulus
> to avoid these short periods?
