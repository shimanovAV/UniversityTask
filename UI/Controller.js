(function start() {
    if (!(localStorage.getItem("users") && localStorage.getItem("lastId"))) {
        let pC = postCollecton.getPosts();
        Object.keys(pC).forEach(function (index) {
            let postString = JSON.stringify(pC[index]);
            localStorage.setItem("post " + index, postString);
        });
        localStorage.setItem("lastId", "20");
        let users = [
            {
                login: 'shim',
                password: 'shim'
            },
            {
                login: 'John Snow',
                password: 'John Snow'
            },
            {
                login: 'Ivan Ivanov',
                password: 'Ivan Ivanov'
            },
            {
                login: 'Ivan',
                password: 'Ivan'
            }
        ]
        localStorage.setItem("users", JSON.stringify(users));
    }
}());
var allStoragePosts;
var filterConfig = new FilterHelper();
var allUsers;
class Controller {
    static lastId;
    static currentUser;
    constructor() {
        let allStorage = PostCollection._restore();
        allStoragePosts = allStorage.post;
        allUsers = allStorage.users;
        Controller.currentUser = allStorage.currentUser;
        this._createLoadButton();
        this._createSearchButton();
        this._createSignInButton();
        this._createSignOutButton();
        this._createAddButton();
        page.showPosts(allStoragePosts.getPosts());
        if(!!Controller.currentUser){
            page.setUser(Controller.currentUser, allUsers);
            this._createUserButtons();
        }
        this._createPhotoButtons();
    }
    _createSearchButton()
    {
        this.searchButton = document.getElementById("filterButton");
        this.searchButton.addEventListener('click',this._findPosts);
    }
    _createLoadButton()
    {
        this.loadButton = document.getElementById("loadButton");
        this.loadButton.addEventListener('click',this._loadPosts);
    }
    _createSignInButton()
    {
        this.signInButton = document.getElementById("signInButton");
        this.signInButton.addEventListener('click',this._signIn);
    }
    _createSignOutButton()
    {
        this.signOutButton = document.getElementById("signOutButton");
        this.signOutButton.addEventListener('click',this._signOut);
    }
    _createAddButton()
    {
        this.addButton = document.getElementById("addButton");
        this.addButton.addEventListener('click',this._addPost);
    }
    _createPhotoButtons()
    {
        document.querySelector('.container').addEventListener('click', this._transferInfoForView);
    }
    _createUserButtons(){
        document.querySelector('.container').addEventListener('click', this._transferInfoForView);
        this.delete = document.getElementById("delete");
        this.change = document.getElementById("change");
        this.delete.addEventListener('click', this._deletePost);
        this.change.addEventListener('click', this._changePost);
    }
    _findPosts(event){
        event.preventDefault();
        let info = {};
        let author =  document.getElementById('filterAuthorName').value;
        let  dateFrom = document.getElementById('filterDateFrom').value;
        let  dateTo = document.getElementById('filterDateTo').value;
        let hashTags= document.getElementById('filterHashTags').value.split('#').filter(Boolean);
        (!!author) ? info['author'] = author : author;
        (!!dateFrom) ? info['dateFrom'] = dateFrom : dateFrom;
        (!!dateTo) ? info['dateTo'] = new Date(dateTo) : dateTo;
        (!!hashTags[0]) ? info['hashTags'] = hashTags : hashTags;
        filterConfig = info;
        let filteredPosts = allStoragePosts.getPage(0,10,info);
        page.clear();
        page.showPosts(filteredPosts);
        Controller.prototype._createUserButtons();
        Controller.prototype._createPhotoButtons();
    }
    _loadPosts(event){
        event.preventDefault();
        page.loadPosts(filterConfig);
        Controller.prototype._createUserButtons();
        Controller.prototype._createPhotoButtons();
    }
    _signIn(event){
        event.preventDefault();
        let login =  document.getElementById('login').value;
        let  password = document.getElementById('password').value;
        let user = {login: login,
        password: password};
        Controller.currentUser = page.setUser(user, allUsers);
        if(!!Controller.currentUser){
            localStorage.setItem("currentUser", JSON.stringify(Controller.currentUser));
            Controller.prototype._createUserButtons();
        }
        Controller.prototype._createPhotoButtons();
    }
    _signOut(event){
        event.preventDefault();
        localStorage.removeItem("currentUser");
        view._signOut();
        Controller.currentUser = null;
        page.signOut();
        Controller.prototype._createPhotoButtons();
    }
    _addPost(event){
        event.preventDefault();
        let description =  document.getElementById('description').value;
        let  hashTags = document.getElementById('hashTags').value.split('#').filter(Boolean);
        let photoPath= document.getElementById('filePath').value;
        Object.keys(hashTags).forEach(function (i) {
            hashTags[i] = ('#' + hashTags[i]);
        });
        photoPath = photoPath.split('\\');
        photoPath = "pictures/" + photoPath[photoPath.length - 1];
        let temp = localStorage.getItem("lastId");
        Controller.lastId = parseInt(temp,10);
        let post = {
            createdAt: new Date(),
            id: String(Controller.lastId),
            description: description,
            hashTags: hashTags,
            photoLink: photoPath,
            author: Controller.currentUser.login,
            likes: []
        };
        Controller.lastId = page.addPost(post) ? Controller.lastId + 1 : Controller.lastId;
        PostCollection._save(post);
        Controller.prototype._createUserButtons();
    }
    _transferInfoForView(event){
        let button = event.target.parentElement.className;
        let postId, post;
        switch (button) {
            case "photoImage":
                postId = event.target.parentElement.getAttribute('id');
                post = allStoragePosts.get(postId);
                if(!!post){
                    let mdPost = document.getElementById('postName');
                    mdPost.innerHTML = post.author;
                    mdPost = document.getElementById('image');
                    mdPost.src = post.photoLink;
                    mdPost = document.getElementById('postCreateDate');
                    mdPost.innerHTML = new Date(post.createdAt).toDateString();
                    mdPost = document.getElementById('postDescription');
                    mdPost.innerHTML = post.description;
                    mdPost = document.getElementById('postHashTags');
                    mdPost.innerHTML = post.hashTags.toString().replace(new RegExp(',', 'g'), '');
                }
                location.href='#post';
                break;
            case "likeButton":
                postId = event.target.parentElement.getAttribute('id');
                post = allStoragePosts.get(postId);
                let indexOfUserInLikes = page.indexUserInLikes(post, Controller.currentUser.login);
                if(indexOfUserInLikes !== (-1)){
                    event.target.parentElement.style.color = '#e0b8a6';
                    post.likes.splice(indexOfUserInLikes, 1);
                } else{
                    event.target.parentElement.style.color = '#8d6e63';
                    post.likes.unshift(Controller.currentUser.login);
                }
                PostCollection._save(post);
                view.editPost(postId, post);
                Controller.prototype._createUserButtons();
                break;
            case "deleteButton":
                postId = event.target.parentElement.getAttribute('id');
                let mdDelete = document.getElementById('delete');
                mdDelete.name = postId;
                location.href='#deletePost';
                break;
            case "changeButton":
                postId = event.target.parentElement.getAttribute('id');
                post = allStoragePosts.get(postId);
                if(!!post){
                    let mdButton = document.getElementById('change');
                    mdButton.name = postId;
                    let mdDelete = document.getElementById('changeDescription');
                    mdDelete.value = post.description;
                    mdDelete = document.getElementById('changeHashTags');
                    mdDelete.value = post.hashTags.toString().replace(new RegExp(',', 'g'), '');
                }
                location.href='#changePost';
        }

    }
    _deletePost(){
        event.preventDefault();
        let postId =  this.name;
        page.removePost(postId);
        Controller.prototype._createUserButtons();
    }
    _changePost(){
        event.preventDefault();
        let postId =  this.name;
        let description =  document.getElementById('changeDescription').value;
        let  hashTags = document.getElementById('changeHashTags').value.split('#').filter(Boolean);
        Object.keys(hashTags).forEach(function (i) {
            hashTags[i] = ('#' + hashTags[i]);
        });
        let post = {
            description: description,
            hashTags: hashTags
        };
        page.editPost(postId, post);
        Controller.prototype._createUserButtons();
        Controller.prototype._createPhotoButtons();
    }
}
new Controller();
