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
  this.hardMode = false;
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
    if (this.hardMode) {
      this.takeAITurnHard();
    } else {
      this.takeAITurn();
    }
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

function areSpacesEqual(space1, space2, space3) {
  if (space1.mark === space2.mark && space1.mark === space3.mark) {
    return true;
  } else {
    return false;
  }
}

function arrayContainsPoint(array, row, col) {
  let containsPoint = false;
  for (let i = 0; i < array.length && !containsPoint; i++) {
    containsPoint = array[i][0] === row && array[i][1] === col;
  }
  return containsPoint;
}

Game.prototype.thirdMark = function(testMark) {
  for (let col = 1; col < 4; col++) {
    let markCounter = 0;
    let emptyCounter = 0;
    let emptyIndex = 0;
    for (let row = 1; row < 4; row++) {
      if (this.board.getSpace(row,col).mark === testMark) {
        markCounter++;
      } else if (this.board.getSpace(row,col).mark === ""){ 
        emptyCounter++;
        emptyIndex = row;
      }
    }
    if (markCounter === 2 && emptyCounter === 1) {
      this.board.getSpace(emptyIndex, col).mark = this.player.AIMark;
      return true;
    }
  }
  for (let row = 1; row < 4; row++) {
    let markCounter = 0;
    let emptyCounter = 0;
    let emptyIndex = 0;
    for (let col = 1; col < 4; col++) {
      if (this.board.getSpace(row,col).mark === testMark) {
        markCounter++;
      } else if (this.board.getSpace(row,col).mark === ""){ 
        emptyCounter++;
        emptyIndex = col;
      }
    }
    if (markCounter === 2 && emptyCounter === 1) {
      this.board.getSpace(row, emptyIndex).mark = this.player.AIMark;
      return true;
    }
  }
  const backwardDiagonal = [[1,1],[2,2],[3,3]];
  const forwardDiagonal = [[1,3],[2,2],[3,1]];
  let markCounter = 0;
  let emptyCounter = 0;
  let emptyRow = 0;
  let emptyCol = 0;
  for (let i = 0; i < 3; i++) {
    let currentRow = backwardDiagonal[i][0];
    let currentCol = backwardDiagonal[i][1];
    if (this.board.getSpace(currentRow, currentCol).mark === testMark) {
      markCounter++;
    } else if (this.board.getSpace(currentRow, currentCol).mark === "") {
      emptyCounter++;
      emptyRow = currentRow;
      emptyCol = currentCol;
    }
    if (markCounter === 2 && emptyCounter === 1) {
      this.board.getSpace(emptyRow, emptyCol).mark = this.player.AIMark;
      return true;
    }
  }
  markCounter = 0;
  emptyCounter = 0;
  emptyRow = 0;
  emptyCol = 0;
  for (let i = 0; i < 3; i++) {
    let currentRow = forwardDiagonal[i][0];
    let currentCol = forwardDiagonal[i][1];
    if (this.board.getSpace(currentRow, currentCol).mark === testMark) {
      markCounter++;
    } else if (this.board.getSpace(currentRow, currentCol).mark === "") {
      emptyCounter++;
      emptyRow = currentRow;
      emptyCol = currentCol;
    }
    if (markCounter === 2 && emptyCounter === 1) {
      this.board.getSpace(emptyRow, emptyCol).mark = this.player.AIMark;
      return true;
    }
  }
  return false;
};

Game.prototype.takeFork = function(testMark) {
  let forkArray = [];
  for (let row = 1; row < 4; row++) {
    let markCounter = 0;
    let emptyCounter = 0;
    let emptySpacesArray = [];
    for (let col = 1; col < 4; col++) {
      if (this.board.getSpace(row,col).mark === testMark) {
        markCounter++;
      }
      if (this.board.getSpace(row,col).mark === "") {
        emptyCounter++;
        emptySpacesArray.push([row,col]);
      }
    }
    if (markCounter === 1 && emptyCounter === 2) {
      forkArray.push(emptySpacesArray[0]);
      forkArray.push(emptySpacesArray[1]);
    }
  }
  for (let col = 1; col < 4; col++) {
    let markCounter = 0;
    let emptyCounter = 0;
    let emptySpacesArray = [];
    for (let row = 1; row < 4; row++) {
      if (this.board.getSpace(row,col).mark === testMark) {
        markCounter++;
      }
      if (this.board.getSpace(row,col).mark === "") {
        emptyCounter++;
        emptySpacesArray.push([row,col]);
      }
    }
    if (markCounter === 1 && emptyCounter === 2) {
      forkArray.push(emptySpacesArray[0]);
      forkArray.push(emptySpacesArray[1]);
    }
  }
  const backwardDiagonal = [[1,1],[2,2],[3,3]];
  const forwardDiagonal = [[1,3],[2,2],[3,1]];
  let markCounter = 0;
  let emptyCounter = 0;
  let emptySpacesArray = [];
  for (let i = 0; i < 3; i++) {
    let currentRow = backwardDiagonal[i][0];
    let currentCol = backwardDiagonal[i][1];
    if (this.board.getSpace(currentRow, currentCol).mark === testMark) {
      markCounter++;
    } else if (this.board.getSpace(currentRow, currentCol).mark === "") {
      emptyCounter++;
      emptySpacesArray.push([currentRow, currentCol]);
    }
    if (markCounter === 1 && emptyCounter === 2) {
      forkArray.push(emptySpacesArray[0]);
      forkArray.push(emptySpacesArray[1]);
    }
  }
  markCounter = 0;
  emptyCounter = 0;
  emptySpacesArray = [];
  for (let i = 0; i < 3; i++) {
    let currentRow = forwardDiagonal[i][0];
    let currentCol = forwardDiagonal[i][1];
    if (this.board.getSpace(currentRow, currentCol).mark === testMark) {
      markCounter++;
    } else if (this.board.getSpace(currentRow, currentCol).mark === "") {
      emptyCounter++;
      emptySpacesArray.push([currentRow, currentCol]);
    }
    if (markCounter === 1 && emptyCounter === 2) {
      forkArray.push(emptySpacesArray[0]);
      forkArray.push(emptySpacesArray[1]);
    }
  }
  for (let i = 0; i < forkArray.length; i++) {
    const testElement = forkArray.pop();
    if (arrayContainsPoint(forkArray,testElement[0],testElement[1])) {
      this.board.getSpace(testElement[0], testElement[1]).mark = this.player.AIMark; 
      return true;
    }
  }
  return false;
};

Game.prototype.takeAITurnHard = function() {
  // 1. Win: If the player has two in a row, they can place a third to get three in a row.
  if (this.thirdMark(this.player.AIMark)) {
    return true;
  } 
  //2. Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
  if (this.thirdMark(this.player.mark)) {
    return true;
  }
  //3. Fork: Cause a scenario where the player has two ways to win (two non-blocked lines of 2).
  if (this.takeFork(this.player.AIMark)) {
    return true;
  }
  //4. Blocking an opponent's fork: If there is only one possible fork for the opponent, the player should block it. Otherwise, the player should block all forks in any way that simultaneously allows them to make two in a row. Otherwise, the player should make a two in a row to force the opponent into defending, as long as it does not result in them producing a fork. For example, if "X" has two opposite corners and "O" has the center, "O" must not play a corner move to win. (Playing a corner move in this scenario produces a fork for "X" to win.)
  if (this.takeFork(this.player.mark)) {
    return true;
  }  
  //5. Center: A player marks the center. (If it is the first move of the game, playing a corner move gives the second player more opportunities to make a mistake and may therefore be the better choice; however, it makes no difference between perfect players.)
  if (this.board.getSpace(2,2).mark === "") {
    this.board.getSpace(2,2).mark = this.player.AIMark;
    return true;
  }  
  //6. Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
  if (this.board.getSpace(1,1).mark === this.player.mark && this.board.getSpace(3,3).mark === "") {
    this.board.getSpace(3,3).mark = this.player.AIMark;
    return true;
  }
  if (this.board.getSpace(1,3).mark === this.player.mark && this.board.getSpace(3,1).mark === "") {
    this.board.getSpace(3,1).mark = this.player.AIMark;
    return true;
  }
  if (this.board.getSpace(3,3).mark === this.player.mark && this.board.getSpace(1,1).mark === "") {
    this.board.getSpace(1,1).mark = this.player.AIMark;
    return true;
  }
  if (this.board.getSpace(3,1).mark === this.player.mark && this.board.getSpace(1,3).mark === "") {
    this.board.getSpace(1,3).mark = this.player.AIMark;
    return true;
  }
  //7. Empty corner: The player plays in a corner square.
  if (this.board.getSpace(1,1).mark === "") {
    this.board.getSpace(1,1).mark = this.player.AIMark;
    return true;
  }
  if (this.board.getSpace(3,1).mark === "") {
    this.board.getSpace(1,1).mark = this.player.AIMark;
    return true;
  }
  if (this.board.getSpace(3,3).mark === "") {
    this.board.getSpace(1,1).mark = this.player.AIMark;
    return true;
  }
  if (this.board.getSpace(1,3).mark === "") {
    this.board.getSpace(1,1).mark = this.player.AIMark;
    return true;
  }
  //8. Empty side: The player plays in a middle square on any of the four sides.
  return this.takeAITurn();
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

let currentGame = new Game(new Player("X"));
$(document).ready(function() {

  $(".game-square").click(function(event) {
    const squareVal = $(this).attr("id").slice(6);
    const xcoord = parseInt(squareVal.charAt(0));
    const ycoord = parseInt(squareVal.charAt(1));
    currentGame.takeTurn(xcoord, ycoord);
    updateSquares(currentGame);
    if (currentGame.whoWon() !== "") {
      $("#winner").show();
      $(".game-board").hide();
      updateEndSquares(currentGame);
      $(".game-output").show();
      $("#winner").text(currentGame.whoWon() + " Won!");
    } else if (currentGame.isFull()) {
      $("#winner").show();
      $(".game-board").hide();
      updateEndSquares(currentGame);
      $(".game-output").show();
      $("#winner").text("It's a tie!");
    }
  });

  $("#x-button").click(function() {
    const currentHardMode = currentGame.hardMode;
    currentGame = new Game(new Player("X"));
    currentGame.hardMode = currentHardMode;
    updateSquares(currentGame);
    $(".game-board").show();
    $(".game-output").hide();
    $("#winner").hide();
  });

  $("#o-button").click(function() {
    const currentHardMode = currentGame.hardMode;
    currentGame = new Game(new Player("O"));
    currentGame.takeAITurn();
    currentGame.hardMode = currentHardMode;
    updateSquares(currentGame);
    $(".game-board").show();
    $(".game-output").hide();
    $("#winner").hide();
  });

  $("#difficulty").click(function() {
    currentGame.hardMode = !currentGame.hardMode;
    if (currentGame.hardMode) {
      $("#mode-status").text("Hard mode");
    } else {
      $("#mode-status").text("Easy mode");
    }
  });
});