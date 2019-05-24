const MAX_SIZE_OF_DESCRIPTION = 200;
const START_POSITION_DEFAULT = 0;
const END_POSITION_DEFAULT = 10;
const LAST_ID_AND_USERS_AND_CURRENT_USER = 3;
const LAST_ID_AND_USERS = 2;


class FilterHelper {
        author (list, author) {
            return list.filter(function (element) {
                return element.author.toLowerCase().includes(author.toLowerCase());
            });
        }
        dateFrom(list, dateFrom) {
            let date = new Date(dateFrom);
            return list.filter(function (a) {
                return new Date(a.createdAt) >= date;
            });
        }
        dateTo(list, dateTo) {
            let date = new Date(dateTo);
            return list.filter(function (a) {
                return new Date(a.createdAt) <= date;
            });
        }
        hashTags(list, hashTags) {
            Object.keys(hashTags).forEach(function (i) {
                list = list.filter(function (a) {
                    return a.hashTags.includes(hashTags[i])
                });
            });
            return list;
        }
}

class Validator {
    static _checkId (a) {
        return (!!a);
    }
    static _checkDescription (a) {
        return (!!a) && a.length < MAX_SIZE_OF_DESCRIPTION;
    }
    static _checkPhotoLink(a) {
        return (!!a);
    }

    static _validate (photoPost) {
        let empty = photoPost.id && photoPost.description &&
            photoPost.createdAt && photoPost.author &&
            photoPost.photoLink;
        if (empty) {
            return this._checkId(photoPost.id) &&
                this._checkDescription(photoPost.description) &&
                this._checkPhotoLink(photoPost.photoLink);
        }
        return false;
    }
}

class PostCollection {

    constructor(posts) {
        this._posts = posts || [];
    }

    getPage(skip, top, filterConfig = {}) {
        let filterHelper = new FilterHelper();
        skip = skip || START_POSITION_DEFAULT;
        top = top || END_POSITION_DEFAULT;
        let filteredPosts = this._posts;
        //.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        Object.keys(filterConfig).forEach(function (field) {
            filteredPosts = filterHelper[field](filteredPosts, filterConfig[field])
        });
        return filteredPosts.slice(skip, skip+top);
    }

    get(id) {
                return  this._posts.find( (post)=> {
                        if (post.id === id) {
                            return true;
                        }
                        return false;
                    }
                );
    }

    add(photoPost) {
        if (Validator._checkDescription(photoPost.description) && Validator._checkPhotoLink(photoPost.photoLink)) {
            this._posts.unshift(photoPost);
            allStoragePosts._posts.unshift(photoPost);
            return true;
        }
        return false;
    }

    edit (id, photoPost) {
        let currentPhotoPost = this.get(id);
            if (Validator._checkDescription(photoPost.description)) {
                currentPhotoPost.description = photoPost.description;
            }
                currentPhotoPost.hashTags = photoPost.hashTags;
        return currentPhotoPost;
    }

    remove(id) {
        let flag = false;
        let allPhotos = this._posts;
        if (Validator._checkId(id)) {
            let elementForDeletion = allPhotos.findIndex(function (item) {
                if (item.id === id) {
                   return true;
                }
            });
            allPhotos.splice(elementForDeletion,1);
            flag = true;
        }
        return flag;
    }

     addAll(posts){
        return posts.filter(item => !this.add(item));
    }

    clear(){
        this._posts = [];
    }
    static _save(post)
    {
        localStorage.setItem("lastId", JSON.stringify(Controller.lastId));
        localStorage.setItem('post ' + post.id, JSON.stringify(post));
    }

    static _restore()
    {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        Controller.lastId = JSON.parse(localStorage.getItem("lastId"));
        let size = (!!currentUser) ? localStorage.length - LAST_ID_AND_USERS_AND_CURRENT_USER
            : localStorage.length - LAST_ID_AND_USERS;
        let allPosts = new Array(size);
        let allUsers = JSON.parse(localStorage.getItem("users"));
        for(let i = 0; i<size; i++){
            let tempPost = JSON.parse(localStorage.getItem("post " + i));
            if(!tempPost.isDeleted){
                allPosts[i] = tempPost;
            }
        }
        let allStorage = {post: new PostCollection(allPosts),
            users: allUsers}
        allStorage['currentUser'] = currentUser;
        return allStorage;
    }

    getPosts(){
        return this._posts;
    }
};

postCollecton = new PostCollection([
    {
        id: '0',
        description: 'Good picture',
        createdAt: new Date('2018-02-23'),
        author: 'Ivan Ivanov',
        photoLink: '/resources/pictures/b.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Ivan Ivanov']
    },
    {
        id: '1',
        description: 'Good picture for good man',
        createdAt: new Date('2018-03-24'),
        author: 'Ivan Ivanov',
        photoLink: '/resources/pictures/c.jpg',
        hashTags: ['#up', '#love'],
        likes: ['John Snow','Miss sunshine']
    }
    ,
    {
        id: '2',
        description: 'Beautiful girl',
        createdAt: new Date('2018-03-22'),
        author: 'Ivan Ivanov',
        photoLink: '/resources/pictures/f.JPG',
        hashTags: ['#work', '#up'],
        likes: ['Ivan Ivanov','Miss sunshine']
    }
    ,
    {
        id: '3',
        description: 'Beautiful girl',
        createdAt: new Date('2018-03-10'),
        author: 'Ivan Ivanov',
        photoLink: '/resources/pictures/h.jpg',
        hashTags: ['#work', '#up', '#sun'],
        likes: ['John Snow','Miss sunshine']
    }
    ,
    {
        id: '4',
        description: 'Beautiful girl',
        createdAt: new Date('2018-03-03'),
        author: 'Ivan Ivanov',
        photoLink: '/resources/pictures/j.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Ivan Ivanov','Miss sunshine']
    }
    ,
    {
        id: '5',
        description: 'Beautiful girl',
        createdAt: new Date('2018-03-03'),
        author: 'John Snow',
        photoLink: '/resources/pictures/k.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Ivan Ivanov']}
    ,
    {
        id: '6',
        description: 'Beautiful girl',
        createdAt: new Date('2018-04-23'),
        author: 'Ivan',
        photoLink: '/resources/pictures/l.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','John Snow']
    }
    ,
    {
        id: '7',
        description: 'Beautiful girl',
        createdAt: new Date('2018-02-23'),
        author: 'Ivan Ivanov',
        photoLink: '/resources/pictures/m.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '8',
        description: 'Beautiful girl',
        createdAt: new Date('2018-01-23'),
        author: 'John Snow',
        photoLink: '/resources/pictures/n.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '9',
        description: 'Beautiful girl',
        createdAt: new Date('2018-03-28'),
        author: 'Ivan Ivanov',
        photoLink: '/resources/pictures/g.JPG',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    },
    {
        id: '10',
        description: 'Now it works!',
        createdAt: new Date('2018-02-23'),
        author: 'Ivan Ivanov',
        photoLink: '/resources/pictures/v.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    },
    {
        id: '11',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-24'),
        author: 'John Snow',
        photoLink: '/resources/pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '12',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-22'),
        author: 'John Snow',
        photoLink: '/resources/pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '13',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-10'),
        author: 'John Snow',
        photoLink: '/resources/pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','John Snow']
    }
    ,
    {
        id: '14',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-03'),
        author: 'John Snow',
        photoLink: '/resources/pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Ivan Ivanov','Miss sunshine']
    }
    ,
    {
        id: '15',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-03'),
        author: 'John Snow',
        photoLink: '/resources/pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']}
    ,
    {
        id: '16',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-04-23'),
        author: 'John Snow',
        photoLink: '/resources/pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','John Snow']
    }
    ,
    {
        id: '17',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-23'),
        author: 'John Snow',
        photoLink: '/resources/pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','John Snow']
    }
    ,
    {
        id: '18',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-01-23'),
        author: 'John Snow',
        photoLink: '/resources/pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['John Snow','Miss sunshine']
    }
    ,
    {
        id: '19',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-28'),
        author: 'John Snow',
        photoLink: '/resources/pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','John Snow']
    }

]);


