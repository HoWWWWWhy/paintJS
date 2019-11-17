const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');

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
        //ctx.beginPath();
        ctx.moveTo(X, Y);
    }
    else {
        ctx.lineTo(X, Y);
        ctx.stroke();
    }
    //console.log(X, Y);
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

initCanvasStyle();