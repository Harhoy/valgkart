
var PI = 3.14;

class ElectoralChart {

  constructor(ctx, canvas, rootX, rootY) {

    //Context to in which the illustrations are drawn
    this.ctx = ctx;


    //canvas
    this.canvas = canvas;
    this.radialDistance = 110;
    this.innerNodesCount = 15;
    this.totalNodes = 12;
    this.nodeRadius = 5;
    this.gap = 5;

    this.nodes = [];
    this.rows = [];

    this.rootNode = new Node(this, this.canvas.width / 2, rootY);
    this.rootNode.color = "red";

    if (this.innerNodesCount > 0) {
      //this.distance = PI * this.radialDistance / (2 * this.nodeRadius * this.innerNodesCount * (1 + this.gapFactor));
    } else {
      throw "Inner nodes count = 0"
    }

  }

  setup() {

    let radialDistance = this.radialDistance;

    this.rootNode.draw();
    //draw initial row

      //Setting up a new row
      let newRow = new Row(this, radialDistance);

      //Filling it with nodes
      newRow.setup();

      //Updating distance to next row
      radialDistance += 2 * this.nodeRadius + this.gap;

      //Adding to rows
      this.rows.push(newRow);




  }

  draw() {

    //draw other rows

    /*
    for (let i = 0; i < this.twigs.length; i++){
      this.twigs[i].draw();
    }
    */

  }

}

class Row {

  constructor(graph, radialDistance) {

    this.graph = graph;

    this.radialDistance = radialDistance;


  }

  setup() {

    //Intial guess of nodes that will fit within layer
    let nodesLocal = Math.floor(1 + (this.radialDistance * PI) / (2 * this.graph.nodeRadius + this.graph.gap));

    //Adjust gapFactor to get a whole number given the number of nodes to place
    let gUpdate = (this.radialDistance * PI) / (nodesLocal - 1)  -  2 * this.graph.nodeRadius;

    //Updating angle of increment (keeping PIs for reference)
    this.angleIncrement = PI * (2 * this.graph.nodeRadius + gUpdate) / (this.radialDistance * PI) ;

    //starting angle (270*)
    this.angle = PI * 3/2;

    //Looping through the number of nodes
    for (let i = 0; i < nodesLocal; i++) {
      this.addNode();
      this.angle -= this.angleIncrement;
    }

  }


  addNode() {

    //calculate new angle to (relative to parent)
    let newAngle = this.angle;

    //New point
    let newX = this.graph.rootNode.x + this.radialDistance * Math.sin(newAngle);
    let newY = this.graph.rootNode.y + this.radialDistance * Math.cos(newAngle);


    //Create new leaf
    let newNode = new Node(this.graph, newX, newY);

    newNode.draw();

    console.log("test", newX, newX);



  }


}


class Node {

  constructor(chart, x, y) {

    this.chart = chart;

    this.color = "blue";

    this.x = x;

    this.y = y;

  }

  draw() {
    drawNode(this.chart.ctx, this, this.chart.nodeRadius, this.color);
  }
}
