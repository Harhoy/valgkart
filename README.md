# ElectionChart

JS function for creating electoral maps.

# Setup

 1) Setup a canvas in HTML, for example:

```javascript
 <canvas id="myCanvas"></canvas>
```

 2) Create a list of parties, starting from left to right on the political spectrum:

```javascript
 let parties = [{'Name': 'Rødt', 'Mandater': 90, 'HEX': '#6b1f28'},
               {'Name': 'SV', 'Mandater': 102, 'HEX': '#ba4c59'},
               {'Name': 'MDG', 'Mandater': 30, 'HEX': '#4cba55'},
               {'Name': 'Arbeiderpartiet', 'Mandater': 45, 'HEX': '#eb4034'},
               {'Name': 'KrF', 'Mandater': 10, 'HEX': '#f5f107'},
               {'Name': 'Venstre', 'Mandater': 90, 'HEX': '#4cbaa6'},
               {'Name': 'Høyre', 'Mandater': 35, 'HEX': '#325aa8'},
               {'Name': 'FrP', 'Mandater': 20, 'HEX': '#9b34eb'}];

```

3) Create an ElectoralChart object, passing canvas ID tag ("myCanvas") and parties list

```javascript
let graph = new ElectoralChart("myCanvas", parties);
```

The size of the canvas limits the scope of the drawing.


# Algorithm
Let $R$ be the distance from a node at the center of the chart, $n_k$ the number of dots in row $k$, $r$ the radius of the dots and $g$ the gap between each dot. We then have,

```math
R *\pi = (n-1)*(2 * r + g)
```

Solve for $n_k$ to get the number of dots that fit in each row, rounding it down to the nearest integer:

```math
\bar{n}_k = floor \left( 1+\frac{R * \pi}{2 * r + g} \right)
```

```math
\bar{g}_k = \frac{\bar{n}_k-1}{R * \pi} - 2 * r
```

```math
\Delta \theta = \frac{2 * r + \bar{g}_k}{R * \pi}
```




```math
lr (\theta_i) = \frac{1}{ \pi}  * \bigg( (\frac{3 \pi}{2} - \theta_i) \bigg()  + d(r, o_i) * sm
```
