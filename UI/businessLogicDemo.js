const NEXT_PORTION_OF_POSTS = 10;
const START_PORTION_OF_POSTS = 0;
let page = (function(){

    return {
        setUser: function (user, allUsers)
        {
            let findUser = allUsers.find( userInCollection => userInCollection.login === user.login)
                    if (!!findUser && findUser.password === user.password) {
                        view = new View(user.login);
                        this._updatePosts(allPosts, user.login);
                        return user;
                    } else{
                        console.log(view);
                        View.wrongUserMessage();
                    }
        },
        signOut: function ()
        {
                this._updatePosts(allPosts, '');
        },
        showPosts: function(posts)
        {
            countForLoad = START_PORTION_OF_POSTS;
            allPosts = new PostCollection(posts);
            if(typeof view == "undefined"){
                view = new View();
            }
            allPosts.getPage().forEach(element => {
                view.showPost(element);
            });
        },
        _updatePosts: function(posts, user){
            posts.getPage(START_PORTION_OF_POSTS,countForLoad+NEXT_PORTION_OF_POSTS, {author: user}).forEach(element => {
                view.editPost(element.id, element);
            });
            posts._posts.filter(function (element) {
                return !!(element.likes.filter(function (author) {
                    return author.includes(user);
                }))
            }).forEach(element => {
                view.editPost(element.id, element);
            });

        },
        addPost: function(post)
        {
            if(postCollecton.add(post))
            {
               view.insertPost(post);
                return true;
            }
            return false;
        },
        removePost: function(id)
        {
            let post = allPosts.get(id);
            if(!!post)
            {
                post.isDeleted = true;
                PostCollection._save(post);
                allPosts.remove(id);
                view.removePost(post);
                return true;
            }
            return false;
        },
        editPost: function (id, post)
        {
            let photo = allPosts.edit(id, post);
            if(!!photo)
            {
                view.editPost(id, photo);
                PostCollection._save(photo);
                return true;
            }
            return false;
        },
        loadPosts(filterConfig)
        {
            countForLoad += NEXT_PORTION_OF_POSTS;
            allStoragePosts.getPage(countForLoad,NEXT_PORTION_OF_POSTS, filterConfig).forEach(element=>{
                view.showPost(element);
            });

        },
        clear: function () {
            View.clear();
        },
        indexUserInLikes: function (post, user) {
            let likeFromUser = -1;
            if(!!user){
                likeFromUser = post.likes.findIndex(function (item) {
                    return item.includes(user)
                });
            }
            return likeFromUser;
        }
    }

}());