const cnEl = document.getElementById("canvas")
console.log(cnEl)
let cnTable = [];

function canvasData(rows, columns){
    let g
    let r
    let b
    for (y=0; y < columns; y++) {
        cnTable[y] = [];
        for (x=0; x < rows; x++) {
            r = Math.sin(x*y/25) * 255
            g = 0;
            b = 0;

            cnTable[y][x] = `rgb(${r}, ${g}, ${b})`;
        }
     
    }
    canvasInitialise(cnTable)
}
function canvasInitialise(cnTable) {
    for (column in cnTable) {
        cnEl.innerHTML += `<div class='columns' id='col${column}'></div>`;
        const columns = document.getElementById(`col${column}`);
        for (row in cnTable[column]) {
            let rowEl = document.createElement("div");
            rowEl.id = `${column};${row}`;
            rowEl.style.height = "20px";
            rowEl.style.width = "20px";
            rowEl.style.backgroundColor = `${cnTable[column][row]}`;
            columns.appendChild(rowEl);
        }
    }
}

document.querySelector('div').addEventListener("click", (e) => {
    let target = String(e.target.id);
    id = target.split(';');
    cnTable[id[0]][id[1]] = "white";
    console.log(`column: ${id[0]} row: ${id[1]}`);
    cnEl.innerHTML = '';

    canvasInitialise(cnTable)
});


canvasData(150, 150);