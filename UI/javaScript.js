const STRING_TYPE = 'string';
const EMPTY_STRING = '';
const MAX_SIZE_OF_DESCRIPTION = 200;
const UNDEFINED_TYPE = 'undefined';
const START_POSITION_DEFAULT = 0;
const END_POSITION_DEFAULT = 10;
const DELETE_COUNT_DEFAULT = 1;


class FilterHelper {
        author (list, author) {
            return list.filter(function (element) {
                return element.author === author;
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
            let findHashTag = function (list, hashTag) {
                return list.filter(function (a) {
                    return a.hashTags.includes(hashTag)
                });
            };

            for (let i = 0; i < hashTags.length; i++) {
                list = findHashTag(list, hashTags[i]);
            }
            return list;

        }
}

class Validator {
    static _checkId (a) {
        return a && (typeof a === STRING_TYPE);
    }
    static _checkDescription (a) {
        return typeof a === STRING_TYPE && a.trim() !== EMPTY_STRING && a.length < MAX_SIZE_OF_DESCRIPTION;
    }
    static _checkAuthor (a) {
        return typeof a === STRING_TYPE && a.trim() !== EMPTY_STRING;
    }
    static _checkPhotoLink(a) {
        return typeof a === STRING_TYPE && a.trim() !== EMPTY_STRING;
    }

    static _validate (photoPost) {
        if (typeof photoPost === UNDEFINED_TYPE) {
            return false;
        }
        let empty = photoPost.id && photoPost.description &&
            photoPost.createdAt && photoPost.author &&
            photoPost.photoLink;
        if (empty) {
            return this._checkId(photoPost.id) &&
                this._checkDescription(photoPost.description) &&
                this._checkAuthor(photoPost.author) &&
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
            if (Validator._checkId(id)) {
                return  this._posts.filter(function (post) {
                        if (post.id === id) {
                            return post;
                        }
                    }
                )[START_POSITION_DEFAULT];
            }
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
            allPhotos.forEach(function (item, i, allPhotos) {
                if (item.id === id) {
                    allPhotos.splice(i, DELETE_COUNT_DEFAULT);
                    flag = true;
                }
            });

        }
        return flag;
    }

     addAll(posts){
        return posts.filter(item=> !this.add(item));
    }

    clear(){
        this._posts = [];
    }
};

const postCollecton = new PostCollection([
    {
        id: '1',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    },
    {
        id: '2',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-24T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '3',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-22T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '4',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-10T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '5',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-03T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '6',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-03T23:00:00'),
        author: 'John Snow',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']}
    ,
    {
        id: '7',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-04-23T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '8',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '9',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-01-23T23:00:00'),
        author: 'John Snow',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '10',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-28T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    },
    {
        id: '11',
        description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    },
    {
        id: '12',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-24T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '13',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-22T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '14',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-10T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '15',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-03T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '16',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-03T23:00:00'),
        author: 'John Snow',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']}
    ,
    {
        id: '17',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-04-23T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '18',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '19',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-01-23T23:00:00'),
        author: 'John Snow',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }
    ,
    {
        id: '20',
        description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
        createdAt: new Date('2018-03-28T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz',
        hashTags: ['#work', '#up', '#love'],
        likes: ['Alex Gold','Miss sunshine']
    }

]);


