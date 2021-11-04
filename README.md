# Tic Tac Toe

#### By Frank Proulx & Hannah Young

#### A tic tac toe game

## Technologies Used

* HTML
* CSS
* Bootstrap
* Javascript
* JQuery

## Description

A simple website that allows you to play tic tac toe. It provides the player with the choice of X or O, and allows a choice between easy mode (random AI moves) and hard mode (as described [here](https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy)), then displays the result of the game.

## Setup/Installation Requirements

* Create and/or navigate to the directory you would like to contain this project on your computer.
* Initialize a git repository by typing **git init** in the terminal.
* Type **git clone https://github.com/Frank-Proulx/tic-tac-toe** to clone the repository to your local machine.
* Open the file "index.html" in the newly created "portfolio-landing" folder using either the GUI in your finder window, or typing **cd tic-tac-toe** and pressing return to navigate into the project folder, and then typing **open index.html** in the terminal from within the **tic-tac-toe** folder.  

## Link to [GitHub Pages](https://frank-proulx.github.io/tic-tac-toe/)

## Known Bugs

* No known bugs

## License

[MIT](https://opensource.org/licenses/MIT)

If you have any issues, questions, ideas or concerns, please reach out to me at my email and/or make a contribution to the code via GitHub.

Copyright (c) 2021 Frank Proulx & Hannah Young

### Tests

#### Describe Player(mark) 
Creates a new Player object with the given mark.

**Code:**
    let testPlayer = new Player("X");
    testPlayer;

**Result:**
    Player {mark: "X"}

### Describe Space(coords)
Creates a new Space object with the given coords and no mark.

**Code:*
    let testSpace = new Space(1,1);
    testSpace;

**Result:**
    Space {mark: "",xcoord:1, ycoord:1}

### Describe Space.prototype.mark(Player)

**Code:*
    const testPlayer = new Player("X");
    let testSpace = new Space(1,1);
    testSpace.mark(testPlayer);
    testSpace;

**Result:**
    Space {mark: "X",xcoord:1, ycoord:1}

### Describe Board()
Creates a new Board with all blank spaces.

**Code:*
    let testBoard = new Board();
    testBoard;

**Result:**
    Board {TODO}

### Describe Board.prototype.getSpace(coords)

**Code:*
    let testBoard = new Board();
    let testSpace = testBoard.getSpace(1,1);
    testSpace;

**Result:**
    Space {mark: "",xcoord:1, ycoord:1}

### Game(player)
Creates a new game with the specified player and a fresh board.

**Code:*
    const testPlayer = new Player("X");
    let testGame = new Game(testPlayer);
    testGame;

**Result:**
    Game {player: testPlayer, board: TODO}

### Describe Game.prototype.isOver()

**Code:*
    const testPlayer = new Player("X");
    let testGame = new Game(testPlayer);
    testGame.isOver();

**Result:**
    false

**Test:** Will return true if there's a row complete
**Code:*
    let testGame = new Game(new Player("X"));
    testGame.takeTurn(1,1);
    testGame.takeTurn(1,2);
    testGame.takeTurn(1,3);

**Result:**
    true

**Test:** Will return true if there's a col complete
**Code:*
    let testGame = new Game(new Player("X"));
    testGame.takeTurn(1,2);
    testGame.takeTurn(2,2);
    testGame.takeTurn(3,2);

**Result:**
    true

**Test:** Will return if there's a diagonal complete
**Code:*
    let testGame = new Game(new Player("X"));
    testGame.takeTurn(1,1);
    testGame.takeTurn(2,2);
    testGame.takeTurn(3,3);

**Result:**
    true

### Describe Game.prototype.takeTurn(coords)

**Code:**
    const testPlayer = new Player("X");
    let testGame = new Game(testPlayer);
    testGame.takeTurn(1,1);

**Result:**
    TODO

**Code:**
    currentGame.board.getSpace(1,2).mark = "O";
    currentGame.board.getSpace(2,3).mark = "O";
    currentGame.takeAITurnHard();
    updateSquares(currentGame);
