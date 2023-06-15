var Title = {
    name: "Title",
    value: null
}
var SubTitle = {
    name: "SubTitle",
    value: null
}
var AuthorName = {
    name: "AuthorName",
    value: null
}
var PublishDate = {
    name: "PublishDate",
    value: null
}
var CoverImage = {
    name: "CoverImage",
    value: null
}
var CardImage = {
    name: "CardImage",
    value: null
}
var Content = {
    name: "Content",
    value: null
}

function ChangeIcon(butt)
{
    const parent = butt.parentNode;
    const reader = new FileReader();

    let photo = parent.getElementById('image').files[0];
    let description = parent.getElementById('description');
    let uploadButton = parent.getElementById('upload');
    let uploadNewButton = parent.getElementById('upload-new');
    let removeButton = parent.getElementById('remove');

    if ((AuthorPhoto.value !== "") && (removelabel.children[0] === undefined))
    {
        
        let icon = document.createElement('img');
        icon.id = "author-icon";
        icon.classList.add('main-info__photo-icon');

        block.insertBefore(icon, block.children[1]);

        label.children[0].remove();
        
        label.children[0].textContent = "Upload New";

        let remove = document.createElement('p');
        remove.classList.add("main-info__remove");
        remove.textContent = "Remove";

        let trash = document.createElement('img');
        trash.classList.add("main-info__icons");
        trash.src = "../static/svg_files/trash.svg";

        let camera = document.createElement('img');
        camera.classList.add("main-info__icons");
        camera.src = "../static/icons/camera.svg";

        label.insertBefore(camera, label.children[0]);

        removelabel.insertBefore(remove, removelabel.children[0]);
        removelabel.insertBefore(trash, removelabel.children[0]);
    }

    let icon = document.getElementById('author-icon');

    if(photo)
    {
        readerAuthor.readAsDataURL(photo);
    }

    readerAuthor.addEventListener(
        "load",
        ()=>{
            icon.src = readerAuthor.result;
            AuthorPhoto.value = readerAuthor.result;
        },
        false
    );
}

function RemoveIcon()
{
    let block = document.getElementById('author-photo-block');

    block.children[1].remove();

    let label = document.getElementById('author-label');
    label.children[0].remove();
    label.children[0].textContent = "Upload";

    let icon = document.createElement('img');
    icon.src = "../static/icons/photo_icon.svg";
    icon.alt = "Avatar";

    label.insertBefore(icon, label.children[0]);

    let remove = document.getElementById('remove-author');
    remove.children[1].remove();
    remove.children[0].remove();

    AuthorPhoto.value = null;
}