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

function setTextPos() {
    gMeme.lines[gMeme.selectedLineIdx].textPosY = gElCanvas.height / 100 * 30 - gMeme.lines[gMeme.selectedLineIdx].size
    // gMeme.lines[1].textPosY = gElCanvas.height - (gElCanvas.height / 100) - (gMeme.lines[gMeme.selectedLineIdx].size / 2)


    gMeme.lines[gMeme.selectedLineIdx].borderPos = { x: 0, y: gElCanvas.height / 100 * 30 - gMeme.lines[0].size }
}

function renderImageOnCanvas(imgSrc, isDownload = false) {
    const img = new Image
    img.src = imgSrc


    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        if (isDownload === false) {
            drawRect(gMeme.lines[gMeme.selectedLineIdx].borderPos.x, gMeme.lines[gMeme.selectedLineIdx].borderPos.y - gMeme.lines[gMeme.selectedLineIdx].size, gMeme.selectedLineIdx)
        }

        for (let i = 0; i < gMeme.lines.length; i++) {
            drawText(gMeme.lines[i].txt, i, gElCanvas.width / 2, gMeme.lines[i].textPosY)

        }
    }

}

function drawText(text, i, x, y) {
    gCtx.font = `${gMeme.lines[i].size}px ${gMeme.lines[i].fontFamily}`
    gCtx.strokeStyle = gMeme.lines[i].strokeStyle
    gCtx.lineWidth = 2
    gCtx.fillStyle = gMeme.lines[i].color
    gCtx.textBaseLine = 'middle'
    gCtx.textAlign = gMeme.lines[i].textAlign
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

function onRemoveLine() {
    if (gMeme.lines.length === 1 || gMeme.selectedLineIdx === 0) return

    removeText()
    removeLine()
    changeToPrevIdx()
    renderImageOnCanvas(gMeme.selectedImg)
    renderInputText()
}

function onMoveUp() {
    gMeme.lines[gMeme.selectedLineIdx].textPosY -= 10
    gMeme.lines[gMeme.selectedLineIdx].borderPos.y -= 10
    renderImageOnCanvas(gMeme.selectedImg)
}

function onMoveDown() {
    gMeme.lines[gMeme.selectedLineIdx].textPosY += 10
    gMeme.lines[gMeme.selectedLineIdx].borderPos.y += 10
    renderImageOnCanvas(gMeme.selectedImg)
}

function onAddLine() {
    addLine()
    changeSelectedLine()
    renderInputText()
    renderInputTextColor()
    renderInputTextStrokeStyle()
    renderSelectedFontFamily()
    renderImageOnCanvas(gMeme.selectedImg)
}



// NAVIGATION CLICKS

function onEditorClick() {
    if (gPage === 'editor') return

    gPage = 'editor'

    let elEditorSection = document.querySelector('.editor-section')
    elEditorSection.style.opacity = 1

    toggleUnderLineClass()
    renderEditorSection()
    renderImageOnCanvas(gMeme.selectedImg)
}

// RENDER SECTIONS

function renderEditorSection(selectedImg) {

    let elEditorSection = document.querySelector('.editor-section')
    let elGallerySection = document.querySelector('.gallery-section')

    elGallerySection.innerHTML = ''
    elEditorSection.style.opacity = 1


    elEditorSection.innerHTML = `
            <div class="canvas-container">
                <canvas class="canvas" width="400" height="400"></canvas>
            </div>

            <div class="controller-container">
                <input class="text-input" type="text" oninput="onChangeText(this.value)" placeholder="Add text">

                <div class="text-controller btn-column-gap">
                    <button class="fa arrow-up-down" onclick="onChangeLine()"></button>
                    <button class="fa plus" onclick="onAddLine()"></button>
                    <button class="fa arrUp" onclick="onMoveUp()"></button>
                    <button class="fa arrDown" onclick="onMoveDown()"></button>
                    <button class="fa trash" onclick="onRemoveLine()"></button>
                </div>
                
                <div class="font-controller btn-column-gap">
                    <button class="fa sizeUp" onclick="onTextSizeUp()"></button>
                    <button class="fa sizeDown" onclick="onTextSizeDown()"></button>
                    <button class="fa alignLeft" onclick="onAlignTextLeft()"></button>
                    <button class="fa alignCenter" onclick="onAlignTextCenter()"></button>
                    <button class="fa alignRight" onclick="onAlignTextRight()"></button>
                    <select class="font-fam-input text-input" onchange="onChangeFontFamily(this.value)" name="font-family" id="font-family">
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times</option>
                    <option value="Impact" selected>Impact</option>
                    </select>
                    <button>
                        <label class="fa txtColor" for="text-color"></label>
                        <input class="text-color" id="text-color" type="color" onchange="onChangeTextColor(this.value)" hidden>
                    </button>
                    <button>
                        <label class="fa txtStroke" for="stroke-style"></label>
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
    setTextPos()
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