



function onGalleryClick() {

    if (gPage === 'gallery') return
    
    gPage = 'gallery'

    let elEditorSection = document.querySelector('.editor-section')
    elEditorSection.style.opacity = 0

    toggleUnderLineClass()
    renderGallerySection()
}

function renderGallerySection() {
    
    let elEditorSection = document.querySelector('.editor-section')
    let elGallerySection = document.querySelector('.gallery-section')

    elEditorSection.innerHTML = ''
    elGallerySection.innerHTML = ''

    
    gImgs.forEach((img,idx) => {
        console.log(img.src);
        
        elGallerySection.innerHTML += `<img id="${idx+1}" onclick="onGalleryImgClick(this)" class="img-gallery" src="${img.src}">`
    })

}

function onGalleryImgClick(el) {
    gPage = 'editor'
    toggleUnderLineClass()
    gMeme.selectedImg = el.src
    renderEditorSection(gMeme.selectedImg)
}