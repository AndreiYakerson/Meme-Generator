'use strict'

let gElCanvas
let gCtx
let gPage = 'editor'

var gImgs = [
    { id: 1, src: 'img/meme-imgs (square)/1.jpg', keywords: ['funny', 'man', 'tramp', 'president'] },
    { id: 2, src: 'img/meme-imgs (square)/2.jpg', keywords: ['funny','animals', 'dogs'] },
    { id: 3, src: 'img/meme-imgs (square)/3.jpg', keywords: ['funny', 'animals', 'dogs', 'baby'] },
    { id: 4, src: 'img/meme-imgs (square)/4.jpg', keywords: ['funny','animals', 'cat'] },
    { id: 5, src: 'img/meme-imgs (square)/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, src: 'img/meme-imgs (square)/6.jpg', keywords: ['funny','man'] },
    { id: 7, src: 'img/meme-imgs (square)/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, src: 'img/meme-imgs (square)/8.jpg', keywords: ['funny','man'] },
    { id: 9, src: 'img/meme-imgs (square)/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, src: 'img/meme-imgs (square)/10.jpg', keywords: ['funny', 'man', 'obama','president'] },
    { id: 11, src: 'img/meme-imgs (square)/12.jpg', keywords: ['funny', 'man'] },
    { id: 12, src: 'img/meme-imgs (square)/13.jpg', keywords: ['funny', 'man','move', 'star'] },
    { id: 13, src: 'img/meme-imgs (square)/14.jpg', keywords: ['funny', 'man', 'move','matrix', 'star'] },
    { id: 14, src: 'img/meme-imgs (square)/15.jpg', keywords: ['funny', 'man', 'move', 'lord'] },
    { id: 15, src: 'img/meme-imgs (square)/16.jpg', keywords: ['funny', 'man', 'move', 'star'] },
    { id: 16, src: 'img/meme-imgs (square)/17.jpg', keywords: ['funny', 'man', 'putin', 'president'] },
    { id: 17, src: 'img/meme-imgs (square)/18.jpg', keywords: ['funny','toys', 'move']},
]



let gMeme = {
    selectedImg: gImgs[3].src,
    selectedLineIdx: 0,

    lines: [
        {
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

// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function changeSelectedLine() {
    if (gMeme.lines.length === 1) return

    if (gMeme.selectedLineIdx === 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx = 1
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

function getFontFamily() {
    return gMeme.lines[gMeme.selectedLineIdx].fontFamily
}

function changeLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
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

function changeTextAlign(value) {
    gMeme.lines[gMeme.selectedLineIdx].textAlign = value
}

function removeText() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function addLine() {
   const line =  {
        txt: '',
        size: 50,
        strokeStyle: '#ffffff',
        color: '#000000',
        fontFamily: 'Impact',
        textAlign: 'center',
        textPosY: gMeme.lines[gMeme.selectedLineIdx - 1].textPosY + 100,
        borderPos: {x: 0, y: gMeme.lines[gMeme.selectedLineIdx - 1] + 100}
    }

    gMeme.lines.push(line)
}