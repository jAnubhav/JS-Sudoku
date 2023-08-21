let math = Math;
let cur = ' ';
let black = "#000000";
let blue = "#1313cf";
let red = "#ff0000";
let erase = false;
let start = math.floor(new Date().getTime() / 1000);

let grid = document.getElementById("grid");
let input_grp = document.getElementById("input-grp");

const newGame = () => {
    start = math.floor(new Date().getTime() / 1000);

    [board, sol] = createGrid(createList(), createList());
    sessionStorage.setItem("sudoku", JSON.stringify([board, sol]));

    grid.querySelectorAll("div").forEach(element => { element.remove() });

    input_grp.querySelectorAll("button").forEach(element => { element.remove() });

    createGame();
};

const eraser = () => {
    cur = ' ';
    erase = true;

    grid.querySelectorAll("button").forEach(button => {

        button.style.background = black;
    });

    input_grp.querySelectorAll("button").forEach(button => {

        button.style.background = blue;
    });
};

const check = () => {
    let i = 0;
    eraser();

    grid.querySelectorAll("button").forEach(button => {

        if (button.textContent != sol[math.floor(i/9)][i%9] && button.textContent != ' ') {

            button.style.background = "#ff0000"
        };

        i++;
    });
};

const finishGame = () => {
    let i = 0;
    let flag = true;

    grid.querySelectorAll("button").forEach(button => {

        if (button.textContent != sol[math.floor(i/9)][i%9]  && flag) {

            alert("The game is not over yet");
            flag = false;
        };

        i++
    });

    if (flag) {

        let end = math.floor(new Date().getTime() / 1000);

        alert(`You Won! You have completed the game in ${end - start} seconds.`);
        sessionStorage.clear()
    };
};

const sample = (upper, limit) => {
    let arr = [];

    while (arr.length != limit) {
        let val = math.round(math.random() * 10);

        if (arr.includes(val) == false && val < upper) {
            arr.push(val);
        };
    };

    return arr;
};

const createList = () => {
    let arr = [];

    sample(3, 3).forEach(i => {

        sample(3, 3).forEach(j => {

            arr.push(i * 3 + j);
        });
    });

    return arr;
};

const createGrid = (row, col) => {
    let sol = [], grid = [];
    let num = createList();

    row.forEach(r => {

        let temp1 = [], temp2 = [];
        let spaces = sample(9, 5);

        col.forEach(c => {

            let val = num[(3 * (r % 3) + math.floor(r / 3) + c) % 9] + 1;
            temp1.push(val);

            if (spaces.includes(c)) {

                temp2.push(' ');
            } else {

                temp2.push(val);
            };
        });

        sol.push(temp1), grid.push(temp2);
    });

    return [grid, sol];
};

const createRow = (id) => {
    let div = document.createElement("div");
    div.className = "row";
    div.id = id;
    return div;
};

const createSpace = (className, frame) => {
    let div = document.createElement("div");
    div.className = className;
    document.getElementById(frame).appendChild(div);
};

const createBtn = (className, text) => {
    let btn = document.createElement("button");
    btn.className = className;
    btn.textContent = text;
    return btn;
};

const createGame = () => {
    
    for (let i = 0; i != 9; i++) {

        if (i == 3 || i == 6) {

            createSpace("space", "grid");
        };

        let row = createRow(`row-${i}`);
        grid.appendChild(row);

        for (let j = 0; j != 9; j++) {

            if (j == 3 || j == 6) {

                createSpace("space", `row-${i}`);
            };

            let btn = createBtn("btn", board[i][j]);

            btn.addEventListener("click", () => {

                if (board[i][j] == ' ' && (cur != ' ' || erase == true)) {

                    btn.textContent = cur;
                    btn.style.background = blue;
                } else {

                    btn.style.background = red;
                    setTimeout(() => { btn.style.background = black }, 700);
                };
            });

            row.appendChild(btn);
        };

        let btn = createBtn("btn", i + 1);
        btn.id = `input-${i}`;

        btn.addEventListener("click", () => {

            if (cur != " ") {

                document.getElementById(`input-${cur - 1}`).style.background = blue;
            };

            btn.style.background = black;
            cur = i + 1;

            grid.querySelectorAll("button").forEach(button => {

                if (button.textContent == cur) {

                    button.style.background = blue;
                } else {

                    button.style.background = black;
                };
            });
        });

        input_grp.appendChild(btn);
    };
};

let sudoku = sessionStorage.getItem("sudoku");
let [board, sol] = [[], []];

if (sudoku != null) {

    [board, sol] = JSON.parse(sudoku);
} else {

    [board, sol] = createGrid(createList(), createList());
    sessionStorage.setItem("sudoku", JSON.stringify([board, sol]));
};

createGame()
