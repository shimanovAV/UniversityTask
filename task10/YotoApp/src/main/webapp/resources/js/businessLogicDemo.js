const START_PORTION_OF_POSTS = 0;
let page = (function () {

    return {
        setUser: function (posts, user) {
            if (!!user) {
                view = new View(user.login);
                this._updatePosts(posts, user.login);
                return user;
            } else {
                console.log(view);
                View.wrongUserMessage();
                console.log(e.message);
            }
        },
        signOut: function (posts) {
            this._updatePosts(posts, '');
        },
        showPosts: function (posts) {
            countForLoad = START_PORTION_OF_POSTS;
            allPosts = new PostCollection(posts);
            if (typeof view == "undefined") {
                view = new View();
            }
            let temp = allPosts.getPage();
            temp.forEach((element) => {
                view.showPost(element);
                console.log(element);
            });
        },
        _updatePosts: function (posts, user) {
            posts = new PostCollection(posts);
            posts.getPage(START_PORTION_OF_POSTS, posts._posts.size, {author: user}).forEach((element) => {
                view.editPost(element.id, element);
            });
            posts._posts.filter(function (element) {
                return !!(element.likes.filter(function (author) {
                    return author.includes(user);
                }))
            }).forEach((element) => {
                view.editPost(element.id, element);
            });

        },
        addPost: function (post) {
            view.insertPost(post);
            return true;
        },
        removePost: function (id) {
            view.removePost(id);
            return true;
        },
        editPost: function (id, post) {
            view.editPost(id, post);
            return true;
        },
        async loadPosts(filterConfig) {
            try {
                let nextPosts = await AjaxRequest.loadMore();
                nextPosts = new PostCollection(nextPosts);
                nextPosts.getPage(START_PORTION_OF_POSTS, nextPosts.getPosts().size, filterConfig).forEach((element) => {
                    view.showPost(element);
                });
            } catch (e) {
                View.errorPage();
                console.log(e.message);
            }

        },
        clear: function () {
            View.clear();
        },
        indexUserInLikes: function (post, user) {
            let likeFromUser = -1;
            if (!!user) {
                console.log(post.likes);
                likeFromUser = post.likes.findIndex(function (item) {
                    return item.includes(user)
                });
            }
            return likeFromUser;
        }
    }

}());