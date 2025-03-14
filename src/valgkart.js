


class ElectoralChart {

  constructor(ctx, canvas, rootX, rootY) {

    //Context to in which the illustrations are drawn
    this.ctx = ctx;


    //canvas
    this.canvas = canvas;
    this.radialDistance = 10;
    this.innerNodesCount = 5;
    this.totalNodes = 5;
    this.nodeRadius = 10;
    this.gapFactor = 0.1;
    this.nodes = [];
    this.rows = [];

    this.rootNode = new Node(this, rootX, rootY);

    if (this.innerNodesCount > 0) {
      this.distance = 3.14 * this.radialDistance / (2 * this.nodeRadius * this.innerNodesCount * (1 + this.gapFactor));
    } else {
      throw "Inner nodes count = 0"
    }

  }

  setup() {

    let radialDistance = this.radialDistance;

    //draw initial row
    for (let i = 0; i < this.innerNodesCount; i++) {

      //Setting up a new row
      let newRow = new Row(this, radialDistance);

      //Filling it with nodes
      newRow.setup();

      //Updating distance to next row
      radialDistance += 2 * this.nodeRadius * (1 + this.gapFactor);

      //Adding to rows
      this.rows.push(newRow);

    }
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

    //finding angle increment
    this.angleIncrement = 3.14 / 180 * (180 / (3.14 * this.radialDistance / (2 * this.graph.nodeRadius * (1 + this.graph.gapFactor))));

    this.angle = 0;

    this.addNode();

  }


  addNode() {


    //parent x, y
    let xP = this.graph.rootNode.x - this.graph.canvas.width / 2; //need to remove the "centering" in the canvas from the coordinates
    let yP = this.graph.rootNode.y;
    let el = length([xP, yP]);

    //Normalize
    xP = xP / el;
    yP = yP / el;

    //Get angle of parent
    let angle = angleBaseNorth([0, 1],[xP, yP]);

    //calculate new angle to (relative to parent)
    let newAngle = this.angle + this.angleIncrement;

    //New point
    let newX = this.graph.rootNode.x + 2 * this.graph.nodeRadius * (1 + this.graph.gapFactor) * Math.sin(newAngle);
    let newY = this.graph.rootNode.y + 2 * this.graph.nodeRadius * (1 + this.graph.gapFactor) * Math.cos(newAngle);

    console.log(this.graph.rootNode.x, this.graph.nodeRadius,  (1 + this.graph.gapFactor),this.angle,this.angleIncrement);

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
    drawNode(this.chart.ctx, this, this.chart.nodeRadius, color);
  }
}
