const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const lineColors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const CANVAS_SIZE = 700;
const DEFAULT_COLOR = "black";

let painting = false;
let filling = false;

function initCanvasStyle() {
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    ctx.lineWidth = 1.0;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = DEFAULT_COLOR;
    ctx.strokeStyle = DEFAULT_COLOR;    
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

function handleChangeColor(event) {
    const selectedColor = event.target.style.backgroundColor;
    //console.log(selectedColor);
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
}

function handleChangeRange(event) {
    const selectedLineWidth = event.target.value;
    //console.log(selectedLineWidth);
    ctx.lineWidth = selectedLineWidth;
}

function handleChangeMode() {
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

function handleCanvasCtxMenu(event) {
    event.preventDefault();
    //console.log(event);
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click();
    //console.log(link);
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCanvasCtxMenu);
}

Array.from(lineColors).forEach(color => color.addEventListener("click", handleChangeColor));
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
    range.addEventListener("input", handleChangeRange);
}

if(mode) {
    mode.addEventListener("click", handleChangeMode);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

initCanvasStyle();