
// ---- CONSTANTS -----
//PI
var PI = 3.14;
// --------------------


class ElectoralChart {

  constructor(ctx, canvas, parties = null) {

    //Context to in which the illustrations are drawn
    this.ctx = ctx;

    //canvas
    this.canvas = canvas;

    //Dict with party data
    this.parties = parties;

    //Initial distance from center in graph to first row
    this.radialDistance = 50;

    //Total number of nodes to allocate
    if (parties != null) {
      this.organizeSeats()
    //Graphical debug purposes
    } else {
      this.totalNodes = 100;
    }

    //Radius of each node
    this.nodeRadius = 10;

    //Counter for how many nodes are left to place
    this.leftToPlace = this.totalNodes;

    //Inital, wanted gap between each node
    this.gap = 5;

    //List of gaps in each layer
    this.gapList = [];

    //All rows that have been placed
    this.rows = [];

    this.rootNode = new Node(this, this.canvas.width / 2, this.canvas.width * 0.5);
    this.rootNode.color = "red";

  }

  organizeSeats() {

    //Resetting
    this.totalNodes = 0;

    for (let i = 0; i < this.parties.length; i++){
      this.totalNodes += this.parties[i]['Mandater'];
    }

  }

  computeGapVariance() {
    let sum = 0;
    let mean = 0;
    for (let i = 0; i < this.gapList.length; i++){
      mean += this.gapList[i];
    }
    mean = mean / this.gapList.length;
    for (let i = 0; i < this.gapList.length; i++){
      sum += (mean -  this.gapList[i]) ** 2;
    }
    return (sum / this.gapList.length ** 2) ** 0.5;
  }

  adapt() {

    //Setup

    //Gap in current iteration
    let gap = 0.0;

    //Smallest gap found
    let minGap = 10 ** 9;

    //Distance associated with smallest gap
    let minDistance = this.radialDistance;

    //Hard coded max value (based on tests)
    let radialDistanceMax = 400;

    //Checking for each value (line search)
    while (this.radialDistance < radialDistanceMax) {

      //Getting the gap
      gap = this.setup();

      //Skipping those that are not computable
      if (!isNaN(gap)) {
        if (gap < minGap) {
          minGap = gap;
          minDistance = this.radialDistance;
        }
      }

      //Incremtenting distance and resetting
      this.radialDistance += 1;
      this.reset();
    }

    //Implementing minimum distance and setting up with those values
    this.radialDistance = minDistance;
    this.setup();

  }

  //Resetting the relevant data
  reset() {
    this.leftToPlace = this.totalNodes;
    this.gap = 5;
    this.rows = [];
    this.gapList = [];
  }

  //Drawing all rows and nodes
  setup() {

    let radialDistance = this.radialDistance;

    //draw initial root node (debug)
    this.rootNode.draw();

    //Create rows
    while (this.leftToPlace > 0) {

      //Setting up a new row
      let newRow = new Row(this, radialDistance);

      //Filling it with nodes
      newRow.setup();

      //Updating distance to next row
      radialDistance += 2 * this.nodeRadius + this.gap;

      //Adding to rows
      this.rows.push(newRow);

    }

    return this.computeGapVariance();

  }

  //Drawing all rows
  drawRows() {
    for (let i = 0; i < this.rows.length; i++){
      this.rows[i].drawNodes();
    }
  }

}

class Row {

  constructor(graph, radialDistance) {

    //Electoral graph
    this.graph = graph;

    //Distance from centerpoint to row
    this.radialDistance = radialDistance;

    this.nodes = [];

  }

  setup() {

    //Intial guess of nodes that will fit within layer
    let nodesLocal = Math.floor(1 + (this.radialDistance * PI) / (2 * this.graph.nodeRadius + this.graph.gap));

    //Checking if there are more nodes left to place
    nodesLocal = Math.min(this.graph.leftToPlace, nodesLocal);

    //Updating the number of nodes left to place
    this.graph.leftToPlace -= nodesLocal;

    //If there are no nodes left, no nodes will be placed
    if (nodesLocal > 0) {

      //Adjust gapFactor to get a whole number given the number of nodes to place
      let gUpdate = (this.radialDistance * PI) / (nodesLocal - 1)  -  2 * this.graph.nodeRadius;

      //Adding to list of gaps - taking the high number to avoid numerical errors
      this.graph.gapList.push(Math.min(10**9, gUpdate));

      //Updating angle of increment (keeping PIs for reference)
      this.angleIncrement = PI * (2 * this.graph.nodeRadius + gUpdate) / (this.radialDistance * PI) ;

      //starting angle (270*)
      this.angle = PI * 3/2;

      //Looping through the number of nodes
      for (let i = 0; i < nodesLocal; i++) {
        this.addNode();
        this.angle -= this.angleIncrement; //moving counter clockwise
      }
    }
  }


  drawNodes() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].draw();
    }
  }

  addNode() {

    //calculate new angle to (relative to parent)
    let newAngle = this.angle;

    //New point
    let newX = this.graph.rootNode.x + this.radialDistance * Math.sin(newAngle);
    let newY = this.graph.rootNode.y + this.radialDistance * Math.cos(newAngle);

    //Create new node
    let newNode = new Node(this.graph, newX, newY);

    //Adding to list of nodes
    this.nodes.push(newNode);

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
