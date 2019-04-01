let page = (function(){

    return {
        setUser: function (user)
        {
            view = new View(user);
            this._updatePosts(allPosts, user);
        },
        showPosts: function(posts)
        {
            allPosts = new PostCollection(posts);
            if(typeof view == "undefined"){
                view = new View();
            }
            allPosts.getPage(0,10).forEach(element => {
                view.showPost(element);
            });
        },
        _updatePosts: function(posts, user){
            allPosts.getPage(0,10, {author: user}).forEach(element => {
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
                view.removePost(post);
                allPosts.remove(id)
                return true;
            }
            return false;
        },
        editPost: function (id, post)
        {
            if(allPosts.edit(id, post))
            {
                view.editPost(id, post);
                return true;
            }
            return false;
        }
    }

}());