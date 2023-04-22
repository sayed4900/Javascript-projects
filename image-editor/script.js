
// filters
const saturate = document.getElementById('saturate')
const contrast = document.getElementById('contrast')
const brightness = document.getElementById('brightness')
const sepia = document.getElementById('sepia')
const grayscale = document.getElementById('grayscale') 
const blur = document.getElementById('blur')
const hueRotate = document.getElementById('hue-rotate')

const imgBox = document.querySelector('.img-box')
const img = document.getElementById('img')

const resest = document.querySelector('.reset')
const download = document.getElementById('download')
const upload = document.getElementById('upload');

 


// hidden download and reset when page is open

window.onload = function(){
    download.style.display='none'
    resest.style.display='none'
    imgBox.style.display='none'
}

upload.addEventListener('change',e=>{
    download.style.display='block'
    resest.style.display='block'
    imgBox.style.display='block'

    const file = e.target.files[0];
    console.log(file)
    img.src=file.name;
    console.log("DONE")
})

const filters = document.querySelectorAll('ul li input');

filters.forEach(filter=>{
    filter.addEventListener('input',(event)=>{
    
        img.style.filter =
            `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value})
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `;
    })
})

resest.addEventListener("click", () => {
    saturate.value = 100;
    contrast.value = 100;
    brightness.value = 100;
    sepia.value = 0;
    grayscale.value = 0;
    blur.value = 0;
    hueRotate.value = 0;
    img.style.filter =
            `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value})
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `;
});


download.addEventListener('click',e=>{
    applyFilters();
})
function applyFilters() {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext("2d");
    context.filter = `saturate(${saturate.value}%) contrast(${contrast.value}%) brightness(${brightness.value}%) sepia(${sepia.value}) grayscale(${grayscale.value}) blur(${blur.value}px) hue-rotate(${hueRotate.value}deg)`;
    context.drawImage(img,0,0,canvas.width,canvas.height);
    const dataURL = canvas.toDataURL();
    download.href = dataURL;
}

