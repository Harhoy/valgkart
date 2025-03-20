# valgkart
 JS function for creating electoral maps


 1) Setup a canvas in HTML, for example:

 canvas id="myCanvas"></canvas

 2) Create a list of parties, starting from left to right on the political spectrum:

 let parties = [{'Name': 'Rødt', 'Mandater': 90, 'HEX': '#6b1f28'},
               {'Name': 'SV', 'Mandater': 102, 'HEX': '#ba4c59'},
               {'Name': 'MDG', 'Mandater': 30, 'HEX': '#4cba55'},
               {'Name': 'Arbeiderpartiet', 'Mandater': 45, 'HEX': '#eb4034'},
               {'Name': 'KrF', 'Mandater': 10, 'HEX': '#f5f107'},
               {'Name': 'Venstre', 'Mandater': 90, 'HEX': '#4cbaa6'},
               {'Name': 'Høyre', 'Mandater': 35, 'HEX': '#325aa8'},
               {'Name': 'FrP', 'Mandater': 20, 'HEX': '#9b34eb'}];

3) Create an ElectoralChart object, passing canvas ID tag ("myCanvas") and parties list

let graph = new ElectoralChart("myCanvas", parties);


This sentence uses $\` and \`$ delimiters to show math inline: $`\sqrt{3x-1}+(1+x)^2`$
