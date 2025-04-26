



function onGalleryClick() {
    renderGallerySection()
}

function renderGallerySection() {
    
    let elEditorSection = document.querySelector('.editor-section')
    let elGallerySection = document.querySelector('.gallery-section')

    elEditorSection.innerHTML = ''

    
    gImgs.forEach((img,idx) => {
        console.log(img.src);
        
        elGallerySection.innerHTML += `<img id="${idx+1}" onclick="onGalleryImgClick(this)" class="img-gallery" src="${img.src}">`
    })

}

function onGalleryImgClick(el) {
    gSelectedImgSrc = el.src
    renderEditorSection(gSelectedImgSrc)
}