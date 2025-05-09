'use strict'

//G VARS

let gElCanvas
let gCtx
let gPage = 'editor'


//MEME MODEL

let gMeme = {
    selectedImg: gImgs[3].src,
    selectedLineIdx: 0,

    lines: [
        {
            id: getRandomId(),
            txt: '',
            size: 50,
            strokeStyle: '#ffffff',
            color: '#000000',
            fontFamily: 'Impact',
            textAlign: 'center',
            textPosY: 0,
            borderPos: {}
        },

    ]
}

//CHANGE FUNCTIONS

function changeSelectedLine(idx = undefined) {
    if (gMeme.lines.length === 1) return

    if (idx !== undefined) {
        gMeme.selectedLineIdx = idx
        return
    }

    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function changeTextSizeUp(amount) {
    if (gMeme.lines[gMeme.selectedLineIdx].size === 100) return
    gMeme.lines[gMeme.selectedLineIdx].size += amount
}

function changeTextSizeDown(amount) {
    if (gMeme.lines[gMeme.selectedLineIdx].size === 30) return
    gMeme.lines[gMeme.selectedLineIdx].size -= amount
}

function changeStrokeStyle(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeStyle = color
}

function changeTextColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = font
}

function changeLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function changeToPrevIdx() {
    gMeme.selectedLineIdx--
}

function changeTextAlign(value) {
    gMeme.lines[gMeme.selectedLineIdx].textAlign = value
}

function changeText(text) {
    const selectedLineIdx = gMeme.selectedLineIdx
    gMeme.lines[selectedLineIdx].txt = text
}

//GET FUNCTIONS

function getFontFamily() {
    return gMeme.lines[gMeme.selectedLineIdx].fontFamily
}

function getLineText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function getTextColor() {
    return gMeme.lines[gMeme.selectedLineIdx].color
}

function getStrokeStyle() {
    return gMeme.lines[gMeme.selectedLineIdx].strokeStyle
}

function getSelectedImg() {
    return gMeme.selectedImg
}

function getSelectedIdx() {
    return gMeme.selectedLineIdx
}

function getLineByPos(minY, maxY) {
    const res = gMeme.lines.forEach((line, idx) => {
        if (line.borderPos.y) return idx
    })
}

//REMOVE FUNCTIONS

function removeText() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

//ADD FUNCTIONS

function addLine() {
    const line = {
        id: getRandomInt(),
        txt: '',
        size: 50,
        strokeStyle: '#ffffff',
        color: '#000000',
        fontFamily: 'Impact',
        textAlign: 'center',
        textPosY: gMeme.lines[gMeme.selectedLineIdx].textPosY + 100,
        borderPos: { x: 0, y: gMeme.lines[gMeme.selectedLineIdx].borderPos.y + 100 }
    }
    gMeme.lines.push(line)
}

//SET FUNCTIONS

function resetLineIdx() {
    gMeme.selectedLineIdx = 0
}

function setTextPos() {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].textPosY = gElCanvas.height / 100 * 30 - gMeme.lines[lineIdx].size
    gMeme.lines[lineIdx].borderPos = { x: 0, y: gElCanvas.height / 100 * 30 - gMeme.lines[0].size }
}

function findLineIdxByPos(y) {
    let res = 0
    gMeme.lines.forEach((line, idx) => {
        if (y <= +line.borderPos.y + line.size / 2 && y >= +line.borderPos.y - line.size) {
            res = idx
        }
    })
    return res
}