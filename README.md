# ElectionChart

JS function for creating electoral maps.

# Setup

 1) Setup a canvas in HTML, for example:

```
 <canvas id="myCanvas"></canvas>
```

 2) Create a list of parties, starting from left to right on the political spectrum:

```

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

```
let graph = new ElectoralChart("myCanvas", parties);
```

The size of the canvas limits the scope of the drawing.


# Algorithm
This sentence uses $\` and \`$ delimiters to show math inline: $`\sqrt{3x-1}+(1+x)^2`$

$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
