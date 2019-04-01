const MAX_SIZE_OF_DESCRIPTION = 200;
const START_POSITION_DEFAULT = 0;
const END_POSITION_DEFAULT = 10;


class FilterHelper {
        author (list, author) {
            return list.filter(function (element) {
                return element.author.toLowerCase().includes(author.toLowerCase());
            });
        }
        dateFrom(list, dateFrom) {
            let date = new Date(dateFrom);
            return list.filter(function (a) {
                return a.createdAt >= date;
            });
        }
        dateTo(list, dateTo) {
            let date = new Date(dateTo);
            return list.filter(function (a) {
                return a.createdAt <= date;
            });
        }
        hashTags(list, hashTags) {
            hashTags.forEach(function (hashTag) {
                list = list.filter(function (a) {
                    return a.hashTags.includes(hashTags[i])
                });
            });
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

    constructor(posts, user) {
        this._posts = posts || [];
        this._user = user || null;
    }
    getPage(skip, top, filterConfig = {}) {
        let filterHelper = new FilterHelper();
        skip = skip || START_POSITION_DEFAULT;
        top = top || END_POSITION_DEFAULT;
        let filteredPosts = this._posts.sort((a, b) => b.createdAt - a.createdAt);
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
        photoPost.createdAt = new Date();
        photoPost.id = String(photoPost.createdAt.getTime());
        photoPost.author = this._user;
        if (Validator._checkDescription(photoPost.description) && Validator._checkPhotoLink(photoPost.photoLink)) {
            this._posts.unshift(photoPost);
            return true;
        }
        return false;
    }

    edit (id, photoPost) {
        let currentPhotoPost = this.get(id);
        let flag = false;
        if (Validator._validate(currentPhotoPost)) {
            if (Validator._checkDescription(photoPost.description)) {
                currentPhotoPost.description = photoPost.description;
                flag = true;
            }
            if (Validator._checkPhotoLink(photoPost.photoLink)) {
                currentPhotoPost.photoLink = photoPost.photoLink;
                flag = true;
            }
        }
        return flag;
    }

    remove(id) {
        let flag = false;
        let allPhotos = this._posts;
        if (Validator._checkId(id)) {
            let elementForDeletion = allPhotos.findIndex(function (item, i, allPhotos) {
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
};

postCollecton = new PostCollection([
    {
        id: '1',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'Ivan',
        photoLink: 'pictures/b.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    },
    {
        id: '2',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-24T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/c.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '3',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-22T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/f.JPG',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '4',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-10T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/h.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '5',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-03T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/j.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '6',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-03T23:00:00'),
        author: 'John Snow',
        photoLink: 'pictures/k.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']}
    ,
    {
        id: '7',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-04-23T23:00:00'),
        author: 'Ivan',
        photoLink: 'pictures/l.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '8',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/m.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '9',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-01-23T23:00:00'),
        author: 'John Snow',
        photoLink: 'pictures/n.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '10',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-28T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/g.JPG',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    },
    {
        id: '11',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/v.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    },
    {
        id: '12',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-24T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '13',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-22T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '14',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-10T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '15',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-03T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '16',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-03T23:00:00'),
        author: 'John Snow',
        photoLink: 'pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']}
    ,
    {
        id: '17',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-04-23T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '18',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '19',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-01-23T23:00:00'),
        author: 'John Snow',
        photoLink: 'pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '20',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-28T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'pictures/x.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }

]);


