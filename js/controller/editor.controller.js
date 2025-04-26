'use strict'





function onInit(ev) {

    // renderEditorSection()

    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()

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
}

// RENDER SECTIONS

// function renderEditorSection() {
//     const elMainContent = document.querySelector('.main-content')

//     elMainContent.innerHTML = `
//     <section class="editor-section main-layout">
//             <div class="canvas-container">
//                 <canvas class="canvas" width="400" height="400"></canvas>
//             </div>

//             <div class="controller-container">

//             </div>
//         </section>
//     `
// }

function renderGallerySection() {

}

