const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = "1000";
canvas.height = "650";



let parties = [{'Name': 'Arbeiderpartiet', 'Mandater': 50, 'HEX': '#eb4034'},
              {'Name': 'Høyre', 'Mandater': 50, 'HEX': '#eb4034'},
              {'Name': 'FrP', 'Mandater': 69, 'HEX': '#5f34eb'}];

let graph = new ElectoralChart(ctx, canvas, parties);

//console.log(graph.setup());
graph.adapt();
graph.drawRows();
//console.log(graph.gapList);

console.log(parties)
