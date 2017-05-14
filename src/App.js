import React, { Component } from 'react';
import './App.css';

var createCellBoard = function() {
  var rows = 25,
  columns = 25,
  allCells = [];
  for (var p = 0; p < rows; p++) {
    var cellRow = [];
    for (var t = 0; t < columns; t++) {
      cellRow.push({alive : false});
    }
    allCells.push(cellRow);
  }
  return allCells;
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      game: createCellBoard(),
      generation: 0,
      start: false,
      stop: false,
      clear: false
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.clear = this.clear.bind(this);
    this.initRandom = this.initRandom.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.isInGrid = this.isInGrid.bind(this);
  }

  start() {
    if (!this.state.start) {
      this.setState({
        game: this.initRandom(),
        start: true
      });
    }

    if (!this.state.stop) {
      console.log(this.state.game);
      this.checkStatus();
      this.setState({
        game: this.checkStatus(),
        generation: this.state.generation + 1
      });

      setTimeout(this.start, 500);
    }
    if (this.state.stop || this.state.clear) {
      clearTimeout(this.start, 500);
    }
  }

  clear() {

    this.setState({
      game: clearBoard(),
      generation: 0,
      start: false,
      stop: false,
      clear: true
    });

    function clearBoard() {
      var newCells = [...this.state.game];
      newCells.forEach(function(row) {
        row.forEach(function(cell) {
            cell.alive = false;
        });
      });
      return newCells;
    }

  }

  stop() {
    this.setState({
      stop: true
    });
  }

  initRandom() {
    var newCells = [...this.state.game];
    newCells.forEach(function(row) {
      row.forEach(function(cell) {
        if (Math.floor(Math.random() * 4) === 0) {
          cell.alive = true;
        }
      });
    });
    return newCells;   
  }

  checkStatus() {
      var check = [...this.state.game];
      var neighbors = [ [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1] ];

      for (var r = 0; r < 25; r++) {
        for (var c = 0; c < 25; c++) {
          var cell = check[r][c];
          cell.neighbors = 0;
          for (var i = 0; i < neighbors.length; i++) {
            var posit = neighbors[i];
            var row = posit[0];
            var col = posit[1];
            if (this.isInGrid(r + row, col + c)) {
              //console.log("in grid");
              var neighbor = check[r + row][c + col];
              if (neighbor.alive) {
                cell.neighbors++;
              } 
            }
          }
          //console.log(cell.neighbors);
          
          //cell is alive
          if (check[r][c].alive) {
            if (cell.neighbors < 2 || cell.neighbors > 3) {
              check[r][c].alive = false;
            }
          //cell is dead
          } else if (check[r][c].alive === false) {
            if (cell.neighbors === 3) {
              check[r][c].alive = true;
            }
          }
        }
      }
      console.log(check);
    return check;
  }

  isInGrid(r, c) {
    return r >= 0 && r < 25 && c >= 0 && c < 25;
  }

  render() {
    //console.log(this.state.game);
    return (
      <div className="gameOfLife">
      <h4 className="conway">Conway's</h4>
        <h2 className="title">GoL</h2>
        <div className="controls">
        <button className="start" onClick={this.start}>Start</button>
        <button className="stop" onClick={this.stop}>Stop</button>
        <button className="clear" onClick={this.clear}>Clear</button>
        </div>
        <p className="count">Generation: {this.state.generation}</p>
        <div className="grid">
          <div className="flex-grid-row">
            {this.state.game.map((row, i) => <CellRow key={i} index={i} gameRow={row} start={this.state.start} stop={this.state.stop} clear={this.state.clear} />)}
          </div>
        </div>
      </div>
    );
  }
}

class CellRow extends React.Component {

  render() {
      
    return (
      <div className="fadeInEach">
      {this.props.gameRow.map((cell, i) => <Cell key={cell + 'x' + i} cell={cell} row={this.props.row} col={i} start={this.props.start} stop={this.props.stop} clear={this.props.clear} />)}
      </div>
    );
  }

}

class Cell extends React.Component {

  render() {
    var thiscell = this.props.cell;
    if (!this.props.start || this.props.clear) {
      return ( <div className='cell'></div> );
    } else if (this.props.start) {
      if (thiscell.alive) {
        return ( <div className='cell true'></div> );
      } else {
        return ( <div className='cell false'></div> );
      }
    }
    
    //);
  }

}

export default App;