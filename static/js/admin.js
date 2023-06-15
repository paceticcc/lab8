const title = document.getElementById('title');
const subTitle = document.getElementById('description');
const author = document.getElementById('author');
const publishDate = document.getElementById('publishDate');

const uploadAuthorPhoto = document.querySelector(".author-photo-form__input");
const uploadTinyPostIMG = document.querySelector(".input-hero-image-tiny__input");
const uploadPostIMG = document.querySelector(".input-hero-image__input");

const removeAuthorPhoto = document.querySelector(".author-photo-form__remove-button");
const removeTinyPostIMG = document.querySelector(".remove-tiny-hero");
const removePostIMG = document.querySelector(".remove-hero");

let postImgInput;
let authorIMGInput;
let previewIMGInput;

title.addEventListener(
    "input" , 
    () => {
        let title = document.getElementById('title').value;
        let defaultTitle = 'New Post';
        if (title !== '' && title.length < 25) {
            document.getElementById('titleVisual').innerHTML = title;
            document.getElementById('titleVisualTiny').innerHTML = title;
        }
        else {
            document.getElementById('titleVisual').innerHTML = defaultTitle;
            document.getElementById('titleVisualTiny').innerHTML = defaultTitle;
        }
    }
)

subTitle.addEventListener(
    "input",  
    () => {
        let subtitle = document.getElementById('description').value;
        let defaultSubtitle = 'Please, enter any description';
        if (subtitle !== '' && subtitle.length < 60){
            document.getElementById('subtitleVisual').innerHTML = subtitle;
            document.getElementById('subtitleVisualTiny').innerHTML = subtitle;
        } 
        else {
            document.getElementById('subtitleVisual').innerHTML = defaultSubtitle;
            document.getElementById('subtitleVisualTiny').innerHTML = defaultSubtitle;
        }   
    }
)

author.addEventListener(
    "input",   
    () => {
        let name = document.getElementById('author').value;
        let defaultName = 'Enter author name';
        if (name !== '' && name.length < 25){
            document.getElementById('authorNameVisualTiny').innerHTML = name;
        }    
        else {
            document.getElementById('authorNameVisualTiny').innerHTML = defaultName;
        }
    }
)

publishDate.addEventListener(
    "input", 
    () => {
        let date = document.getElementById('publishDate').value;
        let defaultDate = '18.04.2024';
        if (date !== ''){
            document.getElementById('dateVisuality').innerHTML = date;
        }    
        else {
            document.getElementById('dateVisuality').innerHTML = defaultDate;
        }
    }
)

uploadAuthorPhoto.addEventListener(
    "input",  
    () => {
        const previewPostCardAuthorPhoto = document.querySelector(".post-card-info__photo");
        const previewInput = document.querySelector(".preview-author-photo");
        const file = document.querySelector(".author-photo-form__input").files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                previewPostCardAuthorPhoto.src = reader.result;
                previewInput.src = reader.result;
                authorIMGInput = reader.result;
            },
            false
        );
        document.querySelector(".author-photo-form__remove-button").classList.add("remove-button__remove-button-show");
        uploadAuthorPhotoButton = document.getElementById("uploadAuthorPhotoButton");
        uploadAuthorPhotoButton.innerHTML = 'Upload New';
        uploadAuthorPhotoButton.classList.add("author-photo-form__upload-button-view");
        document.querySelector(".upload-button__icon").classList.add("upload-button__icon-view");
        if (file) {
            reader.readAsDataURL(file);
        }
    }
)

removeAuthorPhoto.addEventListener(
    "click",
    () => {
        document.querySelector(".author-photo-form__remove-button").classList.remove("remove-button__remove-button-show");
        uploadAuthorPhotoButton = document.getElementById("uploadAuthorPhotoButton");
        uploadAuthorPhotoButton.innerHTML = 'Upload';
        uploadAuthorPhotoButton.classList.remove("author-photo-form__upload-button-view");
        document.querySelector(".upload-button__icon").classList.remove("upload-button__icon-view");
        const previewPostCardAuthorPhoto = document.querySelector(".post-card-info__photo");
        const previewInput = document.querySelector(".preview-author-photo");
        defaultAuthorPhoto = '../static/images/author_background.png';
        previewPostCardAuthorPhoto.src = defaultAuthorPhoto;
        previewInput.src = defaultAuthorPhoto;
    }
)

uploadTinyPostIMG.addEventListener(
    "input",
    () => {
        const previewPostCardPhoto = document.querySelector(".post-card__photo");
        const previewInput = document.querySelector(".upload-place-tiny__img");
        const file = document.querySelector(".input-hero-image-tiny__input").files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                previewPostCardPhoto.src = reader.result;
                previewInput.src = reader.result;
                previewIMGInput = reader.result;
                document.querySelector(".tiny-img-buttons").classList.add("tiny-img-buttons-show");
                document.querySelector(".input-hero-image-tiny__sign").classList.add("input-hero-image-tiny__sign-remove");
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    }
)

removeTinyPostIMG.addEventListener(
    "click",
    () => {
        const defaultPostTinyIMG = "../static/images/card_background.png";
        const previewPostCardPhoto = document.querySelector(".post-card__photo");
        const previewInput = document.querySelector(".upload-place-tiny__img");
        previewPostCardPhoto.src = defaultPostTinyIMG;
        previewInput.src = defaultPostTinyIMG;
        document.querySelector(".tiny-img-buttons").classList.remove("tiny-img-buttons-show");
        document.querySelector(".input-hero-image-tiny__sign").classList.remove("input-hero-image-tiny__sign-remove");
    }
)

uploadPostIMG.addEventListener(
    "input",
    () => {
        const previewPostCardPhoto = document.querySelector(".article-preview-post-visual__photo");
        const previewInput = document.querySelector(".upload-place__img");
        const file = document.querySelector(".input-hero-image__input").files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                previewPostCardPhoto.src = reader.result;
                previewInput.src = reader.result;
                postImgInput = reader.result;
                document.querySelector(".img-buttons").classList.add("img-buttons-show");
                document.querySelector(".input-hero-image__sign").classList.add("input-hero-image__sign-remove");
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    }
)

removePostIMG.addEventListener(
    "click",
    () => {
        const defaultPostIMG = "../static/images/cover_background.png";
        const previewPostCardPhoto = document.querySelector(".article-preview-post-visual__photo");
        const previewInput = document.querySelector(".upload-place__img");
        document.querySelector(".img-buttons").classList.remove("img-buttons-show");
        document.querySelector(".input-hero-image__sign").classList.remove("input-hero-image__sign-remove");
        previewPostCardPhoto.src = defaultPostIMG;
        previewInput.src = defaultPostIMG;
    }
)

function localPrint()
{
    console.log("Title:", title.value);
    console.log("Short Description:", subTitle.value);
    console.log("Author Name:", author.value);
    console.log("Publish Date:", publishDate.value);
    console.log("Author Photo:", authorIMGInput);
    console.log("Cover Photo:", previewIMGInput);
    console.log("Card Photo:", postImgInput);
}

function Publish()
{
    localPrint();
    const data = {
        title: title.value,
        subtitle: subTitle.value,
        author: author.value, 
        authorIMG: authorIMGInput,
        previewIMG: previewIMGInput,
        postIMG: postImgInput, 
        publishDate: publishDate.value,
    }

    const json = JSON.stringify(data);
    console.log("json:", json);
}