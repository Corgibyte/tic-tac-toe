function Player(mark) {
  this.mark = mark;
  if (this.mark === "X") {
    this.AIMark = "O";
  } else {
    this.AIMark = "X";
  }
}

function Space(x, y) {
  this.mark = "";
  this.x = x;
  this.y = y;
}

Space.prototype.markSpace = function(player) {
  this.mark = player.mark;
};

function Board() {
  this.spaces = [];
  this.spaces.push(new Space(1,1));
  this.spaces.push(new Space(1,2));
  this.spaces.push(new Space(1,3));
  this.spaces.push(new Space(2,1));
  this.spaces.push(new Space(2,2));
  this.spaces.push(new Space(2,3));
  this.spaces.push(new Space(3,1));
  this.spaces.push(new Space(3,2));
  this.spaces.push(new Space(3,3));
}

Board.prototype.getSpace = function(x, y) {
  for (i = 0; i < this.spaces.length; i++) {
    if (this.spaces[i].x === x && this.spaces[i].y === y) {
      return this.spaces[i];
    }
  }
};

function Game(player) {
  this.player = player;
  this.board = new Board();
}

Game.prototype.whoWon = function() {
  //Check rows
  for (let row = 1; row < 4; row++) {
    if (this.board.getSpace(row,1).mark !== "" && this.board.getSpace(row, 1).mark === this.board.getSpace(row, 2).mark && this.board.getSpace(row, 1).mark === this.board.getSpace(row, 3).mark) {
      return this.board.getSpace(row,1).mark;
    }
  }
  //Check columns
  for (let col = 1; col < 4; col++) {
    if (this.board.getSpace(1, col).mark !== "" && this.board.getSpace(1, col).mark === this.board.getSpace(2, col).mark && this.board.getSpace(1, col).mark === this.board.getSpace(3, col).mark) {
      return this.board.getSpace(1,col).mark;
    }
  }

  //Check diagonals {(1,1),(2,2),(3,3) or (1,3),(2,2),(3,1)}
  const diag1 = this.board.getSpace(1,1).mark !== "" && this.board.getSpace(1,1).mark === this.board.getSpace(2,2).mark && this.board.getSpace(1,1).mark === this.board.getSpace(3,3).mark;
  const diag2 = this.board.getSpace(1,3).mark !== "" && this.board.getSpace(1,3).mark === this.board.getSpace(2,2).mark && this.board.getSpace(1,3).mark === this.board.getSpace(3,1).mark;
  if (diag1 || diag2) {
    return this.board.getSpace(2,2).mark;
  }
  return "";
}

Game.prototype.isFull = function() {
  let isFull = true;
  for (let row = 1; row < 4 && isFull; row++) {
    for (let col = 1; col < 4 && isFull; col++) {
      if (this.board.getSpace(row,col).mark == "") {
        isFull = false;
      }
    }
  }
  return isFull;
};

Game.prototype.takeTurn = function(x, y) {
  if (this.board.getSpace(x,y).mark !== "") {
    return false;
  }
  this.board.getSpace(x,y).markSpace(this.player);
  if (this.whoWon() === "" && !this.isFull()) {
    this.takeAITurn();
  }
  return true;
};

function getRandomCoord() {
  return Math.floor(Math.random() * (4 - 1) + 1); //The maximum is exclusive and the minimum is inclusive
}

Game.prototype.takeAITurn = function() {
  let turnTaken = false;
  while (!turnTaken) {
    let x = getRandomCoord();
    let y = getRandomCoord();
    if (this.board.getSpace(x, y).mark === "") {
      this.board.getSpace(x, y).mark = this.player.AIMark;
      turnTaken = true;
    }
  } 
};

//UI Logic
function updateSquares(game) {
  // Updates every square
  $("#square11").html(game.board.getSpace(1,1).mark);
  $("#square12").html(game.board.getSpace(1,2).mark);
  $("#square13").html(game.board.getSpace(1,3).mark);
  $("#square21").html(game.board.getSpace(2,1).mark);
  $("#square22").html(game.board.getSpace(2,2).mark);
  $("#square23").html(game.board.getSpace(2,3).mark);
  $("#square31").html(game.board.getSpace(3,1).mark);
  $("#square32").html(game.board.getSpace(3,2).mark);
  $("#square33").html(game.board.getSpace(3,3).mark);
}

function updateEndSquares(game) {
  // Updates every square
  $("#endSquare11").html(game.board.getSpace(1,1).mark);
  $("#endSquare12").html(game.board.getSpace(1,2).mark);
  $("#endSquare13").html(game.board.getSpace(1,3).mark);
  $("#endSquare21").html(game.board.getSpace(2,1).mark);
  $("#endSquare22").html(game.board.getSpace(2,2).mark);
  $("#endSquare23").html(game.board.getSpace(2,3).mark);
  $("#endSquare31").html(game.board.getSpace(3,1).mark);
  $("#endSquare32").html(game.board.getSpace(3,2).mark);
  $("#endSquare33").html(game.board.getSpace(3,3).mark);
}

$(document).ready(function() {
  let currentGame = new Game(new Player("X"));

  $(".game-square").click(function(event) {
    const squareVal = $(this).attr("id").slice(6);
    const xcoord = parseInt(squareVal.charAt(0));
    const ycoord = parseInt(squareVal.charAt(1));
    currentGame.takeTurn(xcoord, ycoord);
    updateSquares(currentGame);
    if (currentGame.whoWon() !== "" || currentGame.isFull()) {
      $(".game-board").hide();
      updateEndSquares(currentGame);
      $(".game-output").show();
      $("#winner").text(currentGame.whoWon() + " Won!");
    }
  })
});