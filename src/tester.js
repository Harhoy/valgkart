const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = "600";
canvas.height = "350";

let parties = [{'Name': 'Rødt', 'Mandater': 9, 'HEX': '#6b1f28'},
              {'Name': 'SV', 'Mandater': 12, 'HEX': '#ba4c59'},
              {'Name': 'MDG', 'Mandater': 2, 'HEX': '#4cba55'},
              {'Name': 'Arbeiderpartiet', 'Mandater': 45, 'HEX': '#eb4034'},
              {'Name': 'KrF', 'Mandater': 4, 'HEX': '#f5f107'},
              {'Name': 'Venstre', 'Mandater': 8, 'HEX': '#4cbaa6'},
                {'Name': 'Høyre', 'Mandater': 60, 'HEX': '#325aa8'},
              {'Name': 'FrP', 'Mandater': 5, 'HEX': '#9b34eb'}];

let graph = new ElectoralChart("myCanvas", parties);

//console.log(graph.setup());
//graph.adapt();
//graph.drawRows();
//console.log(graph.gapList);

//console.log(parties)

  /*
  pq = new PQ();
  pq.insertMin('a',1);
  pq.insertMin('b',2);
  pq.insertMin('0',0);
  pq.insertMin('10',10);
  pq.insertMin('-10',-10);

  console.log(pq.pop());
  console.log(pq.pop());
  console.log(pq.pop());
  console.log(pq.pop());
  console.log(pq.pop());
  */
