const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const lineColors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const CANVAS_SIZE = 700;
const DEFAULT_COLOR = "black";

let painting = false;
let filling = false;

function initCanvasStyle() {
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    ctx.fillStyle = DEFAULT_COLOR;
    ctx.strokeStyle = DEFAULT_COLOR;
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
        if(!filling) {
            ctx.lineTo(X, Y);
            ctx.stroke();
        }

    }
    //console.log(X, Y);
}

function changeColor(event) {
    const selectedColor = event.target.style.backgroundColor;
    console.log(selectedColor);
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
}

function changeRange(event) {
    const selectedLineWidth = event.target.value;
    console.log(selectedLineWidth);
    ctx.lineWidth = selectedLineWidth;
}

function changeMode() {
    filling = !filling;
    
    if(filling) {
        mode.innerText = "Paint";
    }
    else {
        mode.innerText = "Fill";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
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

if(range) {
    range.addEventListener("input", changeRange);
}

if(mode) {
    mode.addEventListener("click", changeMode);
}

initCanvasStyle();