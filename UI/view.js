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
            let signIn = document.getElementById("sign");
            signIn.style.display = 'none';
            let signOut = document.getElementById("signOutButton");
            signOut.style.display = 'block';
            let authorName = document.getElementById("authorName");
            authorName.innerHTML = user;
            authorName.style.display = 'block';
            let buttonAdd = document.getElementById("add");
            buttonAdd.style.display = 'block';
        }
    }
    _signOut()
    {
        if(!!this._user)
        {
            let signOut = document.getElementById("signOutButton");
            signOut.style.display = "none";
            let signIn = document.getElementById("sign");
            signIn.style.display = "block";
            this._user = null;
            let authorName = document.getElementById("authorName");
            authorName.innerHTML = '';
            authorName.style.display = 'none';
            let buttonAdd = document.getElementById("add");
            buttonAdd.style.display = 'none';
        }
    }
    static wrongUserMessage()
    {
        let label = document.getElementById('wrongMessage');
        label.innerHTML = "Wrong login or password";
        return;
    }

    _createPost (post)
    { let newPost='';
    if(!!!post.isDeleted) {
        if (!!(post.author) && post.author === this._user) {
            newPost = `<button class="deleteButton" id="${post.id}" type="button" href="#deletePost">
                            <i class="fa fa-trash-o"></i></button>
                       <button class="changeButton" id="${post.id}" type="button" href="#changePost">
                            <i class="fa fa-wrench"></i></button>`;
        }
        newPost = newPost + `<button class="likeButton" id="${post.id}" type="button">
                            <i class="fa fa-heart"`;
        if(page.indexUserInLikes(post, this._user)!== (-1)){
           newPost = newPost + `style="color:#8d6e63">`;
        } else{
            newPost = newPost + `style="color:#e0b8a6">`;
        }
        newPost = newPost + `</i>${post.likes.length}</button>
                            <div class="photoImage" id="${post.id}">
                                <a href="#post"><img class="card" src="${post.photoLink}"></a>
                             </div>`;
    }
        return newPost;
    }

    _createDivPhoto(post)
    {
        if(!!!post.isDeleted) {
            let div = document.createElement('div');
            div.className = "photo";
            div.id = post.id;
            div.innerHTML = this._createPost(post);
            return div;
        }
    }

    showPost(post)
    {
        if(!!!post.isDeleted) {
            let photos = document.getElementById("photos");
            let divPhoto = this._createDivPhoto(post);
            photos.appendChild(divPhoto);
        }
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
        if(!!photo){
            photo.innerHTML = this._createPost(post);
        }
    }

    insertPost(newPost)
    {
        let photos = document.getElementById("photos");
        let photo = this._createDivPhoto(newPost);
        photos.insertBefore(photo,photos.firstChild);

    }
    static clear(){
        document.getElementById("photos").innerHTML = ' ';
    }

}