
let searchParam = location.search.split('=').pop();

const random_foto_url = `https://api.unsplash.com/photos/random?client_id=QOiWblLV-5iqWuz0Rpa1L6jsuO6GIBZ0Z0zTE8xJv2I&count=30`;
const search_photo_url= `https://api.unsplash.com/search/photos?client_id=QOiWblLV-5iqWuz0Rpa1L6jsuO6GIBZ0Z0zTE8xJv2I&query=${searchParam}&per_page=50`;
const gallery = document.querySelector(".galeria")

let currentImage= 0;
let allImages;

const searchImages = async ()=> {
    try {
        const respuesta = await fetch(search_photo_url);
        const data= await respuesta.json();
        allImages = data.results
        makeImages(allImages)
    } catch {
        console.log("error search")
    }
}

const getImages = async ()=> {
    try {
        const respuesta = await fetch(random_foto_url)
        const data = await respuesta.json();
        allImages = data

        /* const makeImages = ()=> {
            datos.forEach((item, index) => {
                let img= document.createElement("img");
                img.src= item.urls.regular;
                img.className = "gallery-img";

                gallery.appendChild(img)

                img.addEventListener("click", ()=> {
                    currentImage = index;
                    showPopup(item);
                })
            })
        }*/
        makeImages(allImages);

    } catch {
        console.log("error get")
    }
}

const makeImages = (data) => {
    data.forEach((item, index) => {

        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = 'gallery-img';

        gallery.appendChild(img);

        // popup image

        img.addEventListener('click', () => {
            currentImage = index;
            showPopup(item);
        })

    })
}

if(searchParam == ''){
    getImages();
} else{
    searchImages();
}
const showPopup = (item) => {
    let popup = document.querySelector(".image-popup");
    const downloadBtn = document.querySelector(".download-btn");
    const closeBtn = document.querySelector(".close-btn");
    const image = document.querySelector(".img-modal");

    popup.classList.remove("hide");
    downloadBtn.href = item.links.html;
    image.src = item.urls.regular;
    closeBtn.addEventListener ("click", ()=> {
        popup.classList.add("hide");
    })
}





const preBtns = document.querySelector(".pre-btn")
const nxtBtns = document.querySelector(".nxt-btn")

preBtns.addEventListener("click", ()=> {
   if(currentImage > 0){
    currentImage--;
    showPopup(allImages[currentImage]);
   } 
})

nxtBtns.addEventListener("click", ()=> {
    if(currentImage < allImages.length - 1){
     currentImage++;
     showPopup(allImages[currentImage]);
    } 
 }
 )