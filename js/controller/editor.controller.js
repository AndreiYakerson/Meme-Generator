'use strict'





function onInit(ev) {
    // renderGallerySection()
    renderEditorSection(gSelectedImgSrc)

}


// CANVAS FUNCTIONS

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    renderImageOnCanvas(gSelectedImgSrc)
}


function renderImageOnCanvas(imgSrc) {
    const img = new Image
    img.src = imgSrc

    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(gSelectedText, gElCanvas.width / 2, 100)
    }

}

function drawText(text, x, y) {

    gCtx.font = `${gMeme.lines[0].size}px Arial`
    gCtx.strokeStyle = gMeme.lines[0].strokeStyle
    gCtx.lineWidth = 2
    gCtx.fillStyle = gMeme.lines[0].color
    gCtx.textBaseLine = 'middle'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onChangeText(text) {
    gSelectedText = text
    renderImageOnCanvas(gSelectedImgSrc)
}

function onChangeStrokeStyle(color) {
    changeStrokeStyle(color)
    renderImageOnCanvas(gSelectedImgSrc)
}

function onChangeTextColor(color) {
    changeTextColor(color)
    renderImageOnCanvas(gSelectedImgSrc)
}

// CONTROLLER BUTTONS

function onTextSizeUp() {
    changeTextSizeUp(5)
    renderImageOnCanvas(gSelectedImgSrc)
}

function onTextSizeDown() {
    changeTextSizeDown(5)
    renderImageOnCanvas(gSelectedImgSrc)
}



// NAVIGATION CLICKS

function onGalleryClick() {
    renderGallerySection()
}

function onEditorClick() {
    renderEditorSection()
    renderImageOnCanvas(gSelectedImgSrc)
}

// RENDER SECTIONS

function renderEditorSection(selectedImg) {
    let elEditorSection = document.querySelector('.editor-section')
    let elGallerySection = document.querySelector('.gallery-section')

    elGallerySection.innerHTML = ''

    elEditorSection.innerHTML = `
            <div class="canvas-container">
                <canvas class="canvas" width="400" height="400"></canvas>
            </div>

            <div class="controller-container">
                <input class="text-input" type="text" oninput="onChangeText(this.value)">

                <div class="text-controller btn-column-gap">
                    <button>a</button>
                    <button>b</button>
                    <button>c</button>
                    <button>d</button>
                    <button>e</button>
                </div>
                
                <div class="font-controller btn-column-gap">
                    <button onclick="onTextSizeUp()">A+</button>
                    <button onclick="onTextSizeDown()">A-</button>
                    <button>
                        <label for="text-color">Text color</label>
                        <input id="strokeStyle" type="color" onchange="onChangeTextColor(this.value)">
                    </button>
                    <button>
                        <label for="stroke-style">Stroke color</label>
                        <input id="stroke-style" type="color" onchange="onChangeStrokeStyle(this.value)">
                    </button>
                    <button>e</button>
                    <select class="font-fam-input" name="font-family" id="font-family">
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <button>f</button>
                    <button>g</button>
                </div>

                <div class="sticker-controller btn-column-gap">
                    <button>😁</button>
                    <button>😇</button>
                    <button>😍</button>
                    <button>🥸</button>
                </div>

                <div class="download-controller btn-column-gap">
                    <button>Share</button>
                    <button>Download</button>
                </div>
            </div>
    `
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderImageOnCanvas(selectedImg)
}



