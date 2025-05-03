



function onGalleryClick() {

    if (gPage === 'gallery') return
    
    gPage = 'gallery'

    let elEditorSection = document.querySelector('.editor-section')
    elEditorSection.style.opacity = 0

    toggleUnderLineClass()
    renderSearchInput()
    renderGallery(gImgs)
}

function renderSearchInput() {
    let elGallerySection = document.querySelector('.gallery-section')


    elGallerySection.innerHTML = `
    <input class="input-search-gallery"
     type="text" placeholder="Search" 
     oninput="onChangeSearchInput(this.value)">
     <section class="gallery"></section>
    `
}

function renderGallery(imgs) {

    let elEditorSection = document.querySelector('.editor-section')
    let elGallerySection = document.querySelector('.gallery')

    elEditorSection.innerHTML = ''
    elGallerySection.innerHTML = ''

    imgs.forEach((img, idx) => {
        elGallerySection.innerHTML += `
        <img id="${idx + 1}"
        onclick="onGalleryImgClick(this)"
        class="img-gallery" src="${img.src}">`
    })

}

function onGalleryImgClick(el) {
    gPage = 'editor'
    toggleUnderLineClass()
    gMeme.selectedImg = el.src
    renderEditorSection(gMeme.selectedImg)
}

function onChangeSearchInput(txt) {
    // if (!txt) renderGallerySection(gImgs)
    renderGallery(getFilteredImgs(gImgs, txt))
}

function getFilteredImgs(imgs, word) {
    let result = imgs.filter((img) => {
        return img.keywords.some((keyword) => {
            return keyword.includes(word)
        })
    })

    return result
}





