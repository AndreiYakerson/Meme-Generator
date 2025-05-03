'use strict'


function onInit(ev) {
    // renderGallerySection()
    renderEditorSection(gMeme.selectedImg)
}


// CANVAS FUNCTIONS

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    renderImageOnCanvas(gMeme.selectedImg)
}


function renderImageOnCanvas(imgSrc, isDownload = false) {
    const img = new Image
    img.src = imgSrc

    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        gMeme.lines[0].textPosY = gElCanvas.height / 100 * 20
        gMeme.lines[1].textPosY = gElCanvas.height - (gElCanvas.height / 100 * 10)

        gMeme.lines[0].borderPos = { x: 0, y: gElCanvas.height / 100 * 20 - gMeme.lines[0].size }
        gMeme.lines[1].borderPos = { x: 0, y: gElCanvas.height - (gElCanvas.height / 100 * 10) - gMeme.lines[1].size }

        if (isDownload === false) {
        drawRect(gMeme.lines[gMeme.selectedLineIdx].borderPos.x, gMeme.lines[gMeme.selectedLineIdx].borderPos.y, gMeme.selectedLineIdx)
        }
        drawText1(gMeme.lines[0].txt, gElCanvas.width / 2, gMeme.lines[0].textPosY)
        drawText2(gMeme.lines[1].txt, gElCanvas.width / 2, gMeme.lines[1].textPosY)
    }

}

function drawText1(text, x, y) {
    gCtx.font = `${gMeme.lines[0].size}px ${gMeme.lines[0].fontFamily}`
    gCtx.strokeStyle = gMeme.lines[0].strokeStyle
    gCtx.lineWidth = 2
    gCtx.fillStyle = gMeme.lines[0].color
    gCtx.textBaseLine = 'middle'
    gCtx.textAlign = gMeme.lines[0].textAlign
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawText2(text, x, y) {
    gCtx.font = `${gMeme.lines[1].size}px ${gMeme.lines[1].fontFamily}`
    gCtx.strokeStyle = gMeme.lines[1].strokeStyle
    gCtx.lineWidth = 2
    gCtx.fillStyle = gMeme.lines[1].color
    gCtx.textBaseLine = 'middle'
    gCtx.textAlign = gMeme.lines[1].textAlign
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawRect(x, y, lineIdx) {
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x, y, gElCanvas.width, 15 + gMeme.lines[lineIdx].size)
    gCtx.fillStyle = 'rgba(255, 217, 0, 0.46)';
    gCtx.fillRect(x, y, gElCanvas.width, 15 + gMeme.lines[lineIdx].size)
}


// CONTROLLER BUTTONS

function onChangeText(text) {
    changeLineText(text)
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    renderImageOnCanvas(gMeme.selectedImg)

}

function onChangeStrokeStyle(color) {
    changeStrokeStyle(color)
    renderImageOnCanvas(gMeme.selectedImg)
}

function onChangeTextColor(color) {
    changeTextColor(color)
    renderImageOnCanvas(gMeme.selectedImg)
}


function onTextSizeUp() {
    changeTextSizeUp(5)
    renderImageOnCanvas(gMeme.selectedImg)
}

function onTextSizeDown() {
    changeTextSizeDown(5)
    renderImageOnCanvas(gMeme.selectedImg)
}

function onChangeFontFamily(font) {
    changeFontFamily(font)
    renderImageOnCanvas(gMeme.selectedImg)
}

function onChangeLine() {
    changeSelectedLine()
    renderInputText()
    renderInputTextColor()
    renderInputTextStrokeStyle()
    renderSelectedFontFamily()
    renderImageOnCanvas(gMeme.selectedImg)
}

function onAlignTextLeft() {
    changeTextAlign('end')
    renderImageOnCanvas(gMeme.selectedImg)
}

function onAlignTextCenter() {
    changeTextAlign('center')
    renderImageOnCanvas(gMeme.selectedImg)
}

function onAlignTextRight() {
    changeTextAlign('start')
    renderImageOnCanvas(gMeme.selectedImg)
}

function onClearLine() {
    removeText()
    renderImageOnCanvas(gMeme.selectedImg)
    renderInputText()
}



// NAVIGATION CLICKS

function onEditorClick() {
    if (gPage === 'editor') return

    gPage = 'editor'

    toggleUnderLineClass()
    renderEditorSection()
    renderImageOnCanvas(gMeme.selectedImg)
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
                <input class="text-input" type="text" oninput="onChangeText(this.value)" placeholder="Add text">

                <div class="text-controller btn-column-gap">
                    <button onclick="onChangeLine()">↑↓</button>
                    <button onclick="onClearLine()">🗑️</button>
                    <button>c</button>
                    <button>f</button>
                    <button>g</button>
                </div>
                
                <div class="font-controller btn-column-gap">
                    <button onclick="onTextSizeUp()">A+</button>
                    <button onclick="onTextSizeDown()">A-</button>
                    <button onclick="onAlignTextLeft()">←</button>
                    <button onclick="onAlignTextCenter()">↑</button>
                    <button onclick="onAlignTextRight()">→</button>
                    <select class="font-fam-input text-input" onchange="onChangeFontFamily(this.value)" name="font-family" id="font-family">
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times</option>
                    <option value="Impact" selected>Impact</option>
                    </select>
                    <button>
                        <label for="text-color">🎨</label>
                        <input class="text-color" id="text-color" type="color" onchange="onChangeTextColor(this.value)" hidden>
                    </button>
                    <button>
                        <label for="stroke-style">🖍️</label>
                        <input class="stroke-style" id="stroke-style" type="color" onchange="onChangeStrokeStyle(this.value)" hidden>
                    </button>
                </div>

                <div class="sticker-controller btn-column-gap">
                    <button>😁</button>
                    <button>😇</button>
                    <button>😍</button>
                    <button>🥸</button>
                </div>

                <div class="download-controller btn-column-gap">
                    <button>Share</button>
                    <button onmouseover="onDownloadIn()" onmouseout="onDownloadOut()">
                    <a href="#" onclick="onDownloadClick(this)" download="meme">Download</a>
                    </button>
                </div>
            </div>
    `
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    
    resizeCanvas()
    renderImageOnCanvas(selectedImg)

    renderInputText()
    renderInputTextStrokeStyle()
    renderInputTextColor()
    renderSelectedFontFamily()
}


function toggleUnderLineClass() {
    const elGalleryLink = document.querySelector('.gallery-nav')
    const elEditorLink = document.querySelector('.editor-nav')
    elGalleryLink.classList.toggle('underLine')
    elEditorLink.classList.toggle('underLine')
}



function renderInputText() {
    const elTextInput = document.querySelector('.text-input')
    elTextInput.value = getLineText()
}

function renderInputTextColor() {
    const elColorInput = document.querySelector('.text-color')
    elColorInput.value = getTextColor()
}

function renderInputTextStrokeStyle() {
    const elStrokeInput = document.querySelector('.stroke-style')
    elStrokeInput.value = getStrokeStyle()
}

function renderSelectedFontFamily() {
    const elSelectFont = document.querySelector('.font-fam-input')
    elSelectFont.value = getFontFamily()
}

function onDownloadClick(elLink) {
    const dataUrl = gElCanvas.toDataURL('image/jpeg')
    elLink.href = dataUrl
}

function onDownloadIn() {
    renderImageOnCanvas(gMeme.selectedImg, true)
}

function onDownloadOut() {
    renderImageOnCanvas(gMeme.selectedImg)
}