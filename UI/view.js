class View
{
    constructor(user)
{
    this._user = user;
    this._setUser(user);
}

    _setUser(user)
    {
        if(!!user)
        {
            let signIn = document.getElementById("signIn");
            signIn.innerHTML = "SignOut";
            let authorName = document.getElementById("authorName");
            authorName.innerHTML = user;
            authorName.style.display = 'block';
            let buttonAdd = document.getElementById("addButton");
            buttonAdd.style.display = 'block';
        }
    }

    _createPost (post)
    { let newPost='';
        if(!!(post.author) && post.author === this._user)
        {
         newPost = `<a type="button" href="#deletePost">
                            <i class="fa fa-trash-o"></i></a>
                       <a type="button" href="#changePost">
                            <i class="fa fa-wrench"></i></a>
                       <a type="button" href="#likeProduct">
                            <i class="fa fa-heart"></i>${post.likes.length}</a>`;
        }
         newPost = newPost + `<img class="card" src="${post.photoLink}">`;
        return newPost;
    }

    _createDivPhoto(post)
    {
        let div = document.createElement('div');
        div.className = "photo";
        div.id = post.id;
        div.innerHTML = this._createPost(post);
        return div;
    }

    showPost(post)
    {
        let photos = document.getElementById("photos");
        let divPhoto = this._createDivPhoto(post);
        photos.appendChild(divPhoto);
    }

    removePost(post)
    {
        let allPhotos = document.getElementById("photos");
        let photo = document.getElementById(post.id);
        allPhotos.removeChild(photo);
    }

    editPost(id, post)
    {
        let photo = document.getElementById(id);
        photo.innerHTML = this._createPost(post);
    }

    insertPost(newPost)
    {
        let photos = document.getElementById("photos");
        let photo = this._createDivPhoto(newPost);
        photos.insertBefore(photo,photos.firstChild);

    }

}