'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    
    resizeCanvas()
    renderImageOnCanvas(gImgs[1].src)
    
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    renderImageOnCanvas(gImgs[1].src)
}


function renderImageOnCanvas(imgSrc) {
    const img = new Image
    img.src = imgSrc
    
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img,0,0,gElCanvas.width,gElCanvas.height)
    }

}

