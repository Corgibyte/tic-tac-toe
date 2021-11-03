# _{Application Name}_

#### By _**{List of contributors}**_

#### _{Brief description of application}_

## Technologies Used

* _List all_
* _the major technologies_
* _you used in your project_
* _here_

## Description

_{This is a detailed description of your application. Give as much detail as needed to explain what the application does as well as any other information you want users or other developers to have.}_

## Setup/Installation Requirements

* Create and/or navigate to the directory you would like to contain this project on your computer.
* Initialize a git repository by typing **git init** in the terminal.
* Type **git clone https://github.com/Frank-Proulx/insert_name_here** to clone the repository to your local machine.
* Open the file "index.html" in the newly created "portfolio-landing" folder using either the GUI in your finder window, or typing **cd insert_name_here** and pressing return to navigate into the project folder, and then typing **open index.html** in the terminal from within the **insert_name_here** folder.  

## Link to [GitHub Pages](https://frank-proulx.github.io//)

## Known Bugs

* _Any known issues_
* _should go here_

## License

[MIT](https://opensource.org/licenses/MIT)

If you have any issues, questions, ideas or concerns, please reach out to me at my email and/or make a contribution to the code via GitHub.

Copyright (c) 2021 Frank Proulx

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

**Code:*
    const testPlayer = new Player("X");
    let testGame = new Game(testPlayer);
    testGame.takeTurn(1,1);

**Result:**
    TODO