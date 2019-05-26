var allStorage;
var filterConfig = new FilterHelper();
var currentUser;

(async function start() {
    try {
        currentUser = await AjaxRequest.getUser();
        await AjaxRequest.fromStart();
        allStorage = await AjaxRequest.getPosts();
        new Controller();
    } catch (e) {
        View.errorPage();
        console.log(e.message);
    }
}());

class Controller {
    static lastId;

    constructor() {
        this._createLoadButton();
        this._createSearchButton();
        this._createSignInButton();
        this._createSignOutButton();
        this._createAddButton();
        page.showPosts(allStorage);
        if (!!currentUser) {
            page.setUser(allStorage, currentUser);
            this._createUserButtons();
        }
        this._createPhotoButtons();
    }

    _createSearchButton() {
        this.searchButton = document.getElementById("filterButton");
        this.searchButton.addEventListener('click', this._findPosts);
    }

    _createLoadButton() {
        this.loadButton = document.getElementById("loadButton");
        this.loadButton.addEventListener('click', this._loadPosts);
    }

    _createSignInButton() {
        this.signInButton = document.getElementById("signInButton");
        this.signInButton.addEventListener('click', this._signIn);
    }

    _createSignOutButton() {
        this.signOutButton = document.getElementById("signOutButton");
        this.signOutButton.addEventListener('click', this._signOut);
    }

    _createAddButton() {
        this.addButton = document.getElementById("addButton");
        this.addButton.addEventListener('click', this._addPost);
    }

    _createPhotoButtons() {
        document.querySelector('.container').addEventListener('click', this._transferInfoForView);
    }

    _createUserButtons() {
        document.querySelector('.container').addEventListener('click', this._transferInfoForView);
        this.delete = document.getElementById("delete");
        this.change = document.getElementById("change");
        this.delete.addEventListener('click', this._deletePost);
        this.change.addEventListener('click', this._changePost);
    }

    async _findPosts(event) {
        event.preventDefault();
        let filteredPosts;
        try {
            await AjaxRequest.fromStart();
            filteredPosts = await AjaxRequest.findPosts();
            page.clear();
            page.showPosts(filteredPosts);
            Controller.prototype._createUserButtons();
            Controller.prototype._createPhotoButtons();
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    _loadPosts(event) {
        event.preventDefault();
        page.loadPosts(filterConfig);
        Controller.prototype._createUserButtons();
        Controller.prototype._createPhotoButtons();
    }

    async _signIn(event) {
        event.preventDefault();
        let login = document.getElementById('login').value;
        let password = document.getElementById('password').value;
        let user, posts;
        try {
            user = await AjaxRequest.setUser(login, password);
            posts = await AjaxRequest.getPosts();
            currentUser = page.setUser(posts, user);
            if (!!currentUser) {
                Controller.prototype._createUserButtons();
            }
            Controller.prototype._createPhotoButtons();
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    async _signOut(event) {
        event.preventDefault();
        let posts;
        try {
            posts = await AjaxRequest.getPosts();
            await AjaxRequest.signOut();
            view._signOut();
            Controller.currentUser = null;
            page.signOut(posts);
            Controller.prototype._createPhotoButtons();
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    async _addPost(event) {
        event.preventDefault();
        let res;
        try {
            res = await AjaxRequest.addPost();
            page.addPost(res);
            Controller.prototype._createUserButtons();
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    async _transferInfoForView(event) {
        let button = event.target.parentElement.className;
        let postId, post;
        try {
            switch (button) {
                case "photoImage":
                    postId = event.target.parentElement.getAttribute('id');
                    post = await AjaxRequest.get(postId);
                    if (!!post) {
                        let mdPost = document.getElementById('postName');
                        mdPost.innerHTML = post.author;
                        mdPost = document.getElementById('image');
                        mdPost.src = post.photoLink;
                        mdPost = document.getElementById('postCreateDate');
                        mdPost.innerHTML = post.createdAt;
                        mdPost = document.getElementById('postDescription');
                        mdPost.innerHTML = post.description;
                        mdPost = document.getElementById('postHashTags');
                        mdPost.innerHTML = post.hashTags.toString().replace(new RegExp(',', 'g'), '');
                    }
                    location.href = '#post';
                    break;
                case "likeButton":
                    postId = event.target.parentElement.getAttribute('id');
                    post = await AjaxRequest.get(postId);
                    if (page.indexUserInLikes(post, currentUser.login) !== (-1)) {
                        event.target.parentElement.style.color = '#e0b8a6';
                        post = await AjaxRequest.removeLike(postId);
                    } else {
                        event.target.parentElement.style.color = '#8d6e63';
                        post = await AjaxRequest.setLike(postId);
                    }
                    view.editPost(postId, post);
                    Controller.prototype._createUserButtons();
                    break;
                case "deleteButton":
                    postId = event.target.parentElement.getAttribute('id');
                    let mdDelete = document.getElementById('delete');
                    mdDelete.name = postId;
                    location.href = '#deletePost';
                    break;
                case "changeButton":
                    postId = event.target.parentElement.getAttribute('id');
                    post = await AjaxRequest.get(postId);
                    if (!!post) {
                        let mdButton = document.getElementById('change');
                        mdButton.name = postId;
                        let mdDelete = document.getElementById('changeDescription');
                        mdDelete.value = post.description;
                        mdDelete = document.getElementById('changeHashTags');
                        mdDelete.value = post.hashTags.toString().replace(new RegExp(',', 'g'), '');
                    }
                    location.href = '#changePost';
            }
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }

    }

    async _deletePost() {
        event.preventDefault();
        let postId = this.name;
        try {
            await AjaxRequest.deletePost(postId);
            page.removePost(postId);
            Controller.prototype._createUserButtons();
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    async _changePost() {
        event.preventDefault();
        let postId = this.name;
        try {
            let res = await AjaxRequest.editPost(postId);
            page.editPost(postId, res);
            Controller.prototype._createUserButtons();
            Controller.prototype._createPhotoButtons();
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }
};
