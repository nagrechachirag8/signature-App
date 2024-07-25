const textColor = document.getElementById("text-color")
const canvasColor = document.getElementById("background-color")
const canvas = document.getElementById("mycanvas")
const clearButton = document.getElementById("clear-btn")
const saveButton = document.getElementById("save-btn")
const retrieveButton = document.getElementById("retrieve-btn")
const fontSize = document.getElementById("fontSizePicker")

const ctx = canvas.getContext('2d')

let isDrawing;
let download;

textColor.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value
    ctx.fillStyle = e.target.value
})

canvas.addEventListener('mousedown',(e) => {
    isDrawing = true
    lastX = e.offsetX
    lastY = e.offsetY
})

canvas.addEventListener('mousemove', (e)=> {
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();

        lastX = e.offsetX
        lastY = e.offsetY
        
        download = true;
    }
})

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
})


canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value
    ctx.fillRect(0,0,800,500)
})

fontSize.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value
})

clearButton.addEventListener('click', (e) => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    download = false;
})

saveButton.addEventListener('click', () => {
    if(download){
        localStorage.setItem('canvasContents',canvas.toDataURL());

        let link = document.createElement('a');

        link.download = 'my-signature.png'
        link.href = canvas.toDataURL();

        link.click();
    }
    else{
        alert("Please sign first!");
    }
})

retrieveButton.addEventListener('click', () => {
    let savedSignature = localStorage.getItem('canvasContents');

    if(savedSignature) {
        let img = new Image()
        img.src = savedSignature;
        ctx.drawImage(img,0,0)
    }
})