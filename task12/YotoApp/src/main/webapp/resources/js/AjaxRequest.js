class AjaxRequest {

    static async parse(res) {
        try {
            res = await res.text();
            res = JSON.parse(res);
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
        return res;
    }

    static async setUser(login, password) {
        let info = new FormData();
        info.append("login", login);
        info.append("password", password);
        try {
            let res = await fetch("/user", {method: "POST", body: info});
            return AjaxRequest.parse(res);
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async getUser() {
        try {
            let res = await fetch("/user", {method: "GET"});
            return AjaxRequest.parse(res);
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async signOut() {
        try {
            await fetch("/user", {method: "DELETE"});
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async getPosts() {
        try {
            let res = await fetch("/photoposts", {method: "GET"});
            res = await AjaxRequest.parse(res);
            for (let i = 0; i < res.length; i++) {
                res[i].createdAt = new Date(res[i].createdAt);
            }
            return res;
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async addPost() {
        let info = new FormData(document.getElementById("FormIdForAdd"));
        try {
            let res = await fetch("/photo-post", {method: "POST", body: info});
            return AjaxRequest.parse(res);
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async deletePost(postId) {
        let data = new FormData();
        data.append("id", postId);
        try {
            await fetch("/photo-post", {method: "DELETE", body: data});
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async editPost(postId) {
        let info = new FormData(document.getElementById("formIdForChange"));
        info.append("id", postId);
        try {
            let res = await fetch("/photo-post", {method: "PUT", body: info});
            return AjaxRequest.parse(res);
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async get(id) {
        try {
            let res = await fetch("/photo-post?id=" + id, {method: "GET"});
            return AjaxRequest.parse(res);
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async setLike(postId) {
        let data = new FormData();
        data.append("id", postId);
        try {
            let res = await fetch("/like", {method: "POST", body: data});
            return AjaxRequest.parse(res);
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async removeLike(postId) {
        let data = new FormData();
        data.append("id", postId);
        try {
            let res = await fetch("/like", {method: "DELETE", body: data});
            return AjaxRequest.parse(res);
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async loadMore() {
        try {
            let res = await fetch("/photoposts", {method: "PUT"});
            return AjaxRequest.parse(res);
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async fromStart() {
        let data = new FormData();
        data.append("top", 0);
        try {
            let res = await fetch("/photoposts", {method: "PUT", body: data});
            return AjaxRequest.parse(res);
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }

    static async findPosts() {
        let info = new FormData(document.getElementById("formIdForFilter"));
        try {
            let res = await fetch("/photoposts", {method: "POST", body: info});
            return AjaxRequest.parse(res);
        } catch (e) {
            View.errorPage();
            console.log(e.message);
        }
    }
}