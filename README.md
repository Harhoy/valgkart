# ElectionChart

JS function for creating electoral maps.

![alt text](https://github.com/Harhoy/valgkart/blob/main/static/IMG.png "EXAMPLE")

Demo: <https://harhoy.pythonanywhere.com/valgkart>.

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

3) Create an ElectoralChart object, passing the canvas ID tag ("myCanvas") and parties list

```javascript
let graph = new ElectoralChart("myCanvas", parties);
```

The size of the canvas limits the scope of the drawing.
If you wish to add counts and colors for each party, then add an argument "true"

```javascript
let graph = new ElectoralChart("myCanvas", parties, true);
```

Remark: The values that are used for placement are hard coded based on the Norwegian Parliament, and can be altered in the function "drawNames()".

# Algorithm

## Context

![alt text](https://github.com/Harhoy/valgkart/blob/main/static/rootnode.png "EXAMPLE")

The figure displays an example with the root node in the center.

## Single row construction

Let $R$ be the distance from a node at the center of the chart, $n_k$ the number of dots in row $k$, $r$ the radius of the dots and $g$ the gap between each dot. We then have,

```math
R *\pi = (n-1)*(2 * r + g)
```

Solve for $n_k$ to get the number of dots that fit in each row, rounding it down to the nearest integer:

```math
\bar{n}_k = floor \left( 1+\frac{R * \pi}{2 * r + g} \right)

```

Solve for $\bar{g}_k$ to get the gap that places exactly $\bar{n}_k$ dots on the half dome:

```math
\bar{g}_k = \frac{\bar{n}_k-1}{R * \pi} - 2 * r
```

Now find the angle increment between the centroid of each dot:

```math
\Delta \theta = \frac{2 * r + \bar{g}_k}{R * \pi}
```

Project all points from center point.

## Multiple row optimization

## Coloring

Coloring assumes that parties are ordered from left to right on the political spectrum in the parties array. Each dot, $i$, is put into a (min) priority queue with the following weights:

```math
w_i = \frac{1}{ \pi}  * \bigg( \frac{3 \pi}{2} - \theta_i \bigg)  + d_i * sm
```

This assumes that each party should be ordered from 270 degrees ($3/2 \pi$) to 90 degress ($1/2 \pi$). The distance between the root node and the dot ($d_i$) is added and multiplied by a small number ($sm$). This ensures that the ordering from left to right is kept consistent on straight lines as well as from left to right.

The color of each dot is kept in an array $C$ (sorted from left to right). Each element,$C[i]$ is matched to the $i$-th element in the queue.
