document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    // console.log(squares);
    const scoreDisplay = document.querySelector("#score");
    const startBtn = document.querySelector("#start-button");
    const width = 10;

    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2],
    ];
    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
    ];

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1],
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
    ];
    const theTetrominoes = [
        lTetromino,
        zTetromino,
        tTetromino,
        oTetromino,
        iTetromino,
    ];

    let currentPosition = 4;
    let currentRotation = 0;
    // randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random() * theTetrominoes.length); // random number from (0-4)
    let current = theTetrominoes[random][currentRotation];
    let nextRandom = 0;
    //draw the Tetromino
    function draw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.add("tetromino");
            // squares[currentPosition + index].style.backgroundColor =
            //     colors[random];
        });
    }

    // undraw the Tetromino
    function undraw() {
        current.forEach((index) => {
            squares[currentPosition + index].classList.remove("tetromino");
        });
    }

    // make the tetromino move down every second
    timerId = setInterval(moveDown, 1000);

    // move down function
    function moveDown() {
        undraw();
        currentPosition += width;

        draw();
        freeze();
    }

    function freeze() {
        if (
            current.some((index) =>
                squares[currentPosition + index + width].classList.contains(
                    "taken"
                )
            )
        ) {
            current.forEach((index) =>
                squares[currentPosition + index].classList.add("taken")
            );
            // start new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
        }
    }
    // assign functions to keyCodes
    function control(e) {
        if (e.keyCode === 37) {
            moveleft();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }
    document.addEventListener("keyup", control);
    //move the tetromino left
    function moveleft() {
        undraw();
        const isAtLeftEdge = current.some(
            (index) => (currentPosition + index) % width === 0
        );
        if (!isAtLeftEdge) currentPosition -= 1;
    }
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(
            (index) => (currentPosition + index) % width === width - 1
        );
        if (!isAtRightEdge) currentPosition += 1;
    }
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) currentRotation = 0;

        current = theTetrominoes[random][currentRotation];
    }

    // show next tetromino in mini-grid

    const displaySquares = document.querySelectorAll(".mini-grid div");
    const displayWidth = 4;
    let displayIndex = 0;

    //the tetrominos without rotations
    const nextTetrominos = [
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2 + 2],
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTetromino
        [0, 1, displayWidth, displayWidth + 1], //oTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
    ];

    function displayShape() {
        displaySquares.forEach((square) => {
            square.classList.remove("tetromino");
        });
    }
    nextTetrominos[nextRandom].forEach((index) => {
        displaySquares[displayIndex + index].classList.add("tetromino");
    });
});
