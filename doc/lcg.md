Simple LCG:

$$
\begin{aligned}
  x_{n+1}
  &=
  7x_n \mod 10 \\
\end{aligned}
$$

Starting from $1$:

| $x_n$ | $7x_n$ | $\mod 10$ |
| :---: | -----: | :-------: |
|  $1$  |    $7$ |    $7$    |
|  $7$  |   $49$ |    $9$    |
|  $9$  |   $63$ |    $3$    |
|  $3$  |   $21$ |    $1$    |

Starting from $2$:

| $x_n$ | $7x_n$ | $\mod 10$ |
| :---: | -----: | :-------: |
|  $2$  |   $14$ |    $4$    |
|  $4$  |   $28$ |    $8$    |
|  $8$  |   $56$ |    $6$    |
|  $6$  |   $42$ |    $2$    |

Starting from $0$

| $x_n$ | $7x_n$ | $\mod 10$ |
| :---: | -----: | :-------: |
|  $0$  |    $0$ |    $0$    |
