import React, { Component } from 'react';
import './App.css';

const cellsInRow = 8,
cellsInColumn = 8,
cellRows = [],
cellColumns = [];

/*const defaultCells = {
  background: '#15A56C'
};*/
const aliveCells = {
  background: '#00C441'
};

const deadCells = {
  background: '#BB00C4'
};

var gameStarted;

var allCells = [];


//var allcellsarr = [];

class Initialize extends React.Component {
  constructor() {
    super();

    this.state = {
      start: false,
      stop: false,
      clear: false,
      generation: 0
    };
    // bind functions
    this.start = this.start.bind(this);
    
  }//end constructor

  //functions
  

  start() {
    console.log("starting");
    //checkNeighbors();
    this.setState({
      start: true
    });
  }

  /*increase() {
    console.log("increasedlyyyyy");
  }

  clear() {
    console.log("clearrrlllyyyyy");
  }*/

  render() {
    
    for (var i=0; i < cellsInColumn; i++) {
      cellRows.push(i);
    }
    for (i=0; i < cellsInRow; i++) {
      cellColumns.push(i);
    }
    var rows = cellRows.map(function(data) {
      return (
        <Columns key={data} number={data} />
        );
    });
    return (
      <div className="gameOfLife">
      <h4 className="conway">Conway's</h4>
        <h2 className="title">GoL</h2>
        <Controls generation={this.state.generation} clear={this.state.clear} />
        <div className="grid">
          <div className="flex-grid-row">
            {rows}
          </div>
        </div>
      </div>
    );
  }
}

class Controls extends React.Component {
  constructor() {
    super();

    this.state = {
      start: gameStarted,
      stop: false,
      clear: false,
      generation: 0
    };

    //bind functions
    this.start = this.start.bind(this);
  }
  start() {
    gameStarted = true;
    this.setState({
      start: gameStarted
    });
    //this.props.startGame();
    
  }
  render() {
    return (
      <div>
      <div className="controls">
      <button className="start" onClick={this.start}>Start</button>
      <button className="stop">Stop</button>
      <button className="clear">Clear</button>
      </div>
      <p className="count">Generation: {this.props.generation}</p>
      </div>
    );
  }
}


class Columns extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      
    };

    //bind functions
  }

  //function
  /*check(status, cellid) {
    console.log("check status funct inside Columns component");
    //calling function located in Initialize Component
    //this.props.randomlyPopulate()
  }*/

  render() {
    var number = this.props.number;

    var columns = cellColumns.map(function(data) {
      return (<Cell key={number + ' ' + data} identity={number+'x'+data} />);
    });
    return (
      <div>
        {columns}
      </div>
    );
  }
}

class Cell extends React.Component {

  constructor() {
    super();

    this.state = {
      everyCell : allCells,
      gameStarted : gameStarted
    };
    // bind functions
    
    this.checkStatus = this.checkStatus.bind(this);
  }

  checkStatus() {

  }

  render() {
    var ident = this.props.identity;
      if (Math.floor(Math.random() * 3) === 0) {
        allCells.push({
          id: ident,
          state: 'alive'
        });
        return (
          <div className="cell" style={aliveCells} id={ident} ref="alivecell"></div>
        );
      } else {
        allCells.push({
          id: ident,
          state: 'dead'
        });
        return (
          <div className="cell" style={deadCells} id={ident} ref="deadcell"></div>
        );
      }

  }
}


export default Initialize;

thank you for making me feel special, Periklis. i hope you'll remember for the coming month how good you make me feel and don't be sad. you give me so much. i'll keep it with me and it will give me strength.

