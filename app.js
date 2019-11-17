const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const lineColors = document.getElementsByClassName("jsColor");

let painting = false;

function initCanvasStyle() {
    canvas.width = 700;
    canvas.height = 700;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.0;
}

function startPainting() {
    painting = true;
}
function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const X = event.offsetX;
    const Y = event.offsetY;

    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(X, Y);
    }
    else {
        ctx.lineTo(X, Y);
        ctx.stroke();
    }
    //console.log(X, Y);
}

function changeColor(event) {
    const selectedColor = event.target.style.backgroundColor;
    console.log(selectedColor);
    ctx.strokeStyle = selectedColor;
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(lineColors).forEach(color => color.addEventListener("click", changeColor));
/*
if(lineColors) {
    console.log(lineColors.length);
    let i = 0;
    for(i = 0; i < lineColors.length; i++) {
        lineColors[i].addEventListener("click", changeColor);
    }
}
*/
initCanvasStyle();