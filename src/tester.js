const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = "1000";
canvas.height = "650";


let graph = new ElectoralChart(ctx, canvas, 100, 300);

graph.setup();
