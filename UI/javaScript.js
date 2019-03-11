var I;
I = (function () {

    var photoPosts = [
        {
            id: '1',
            description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
        },
        {
            id: '2',
            description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-03-24T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz'
        }
        ,
        {
            id: '3',
            description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-03-22T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz'
        }
        ,
        {
            id: '4',
            description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-03-10T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz'
        }
        ,
        {
            id: '5',
            description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-03-03T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz'
        }
        ,
        {
            id: '6',
            description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-03-03T23:00:00'),
            author: 'John Snow',
            photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz'
        }
        ,
        {
            id: '7',
            description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-04-23T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz'
        }
        ,
        {
            id: '8',
            description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz'
        }
        ,
        {
            id: '9',
            description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-01-23T23:00:00'),
            author: 'John Snow',
            photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz'
        }
        ,
        {
            id: '10',
            description: 'Эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-03-28T23:00:00'),
            author: 'Иванов Иван',
            photoLink: 'https://yandex.by/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fstmed.net%2Fsites%2Fdefault%2Ffiles%2Fsquirrel-wallpapers-25639-2177715.jpg&pos=0&rpt=simage&stype=image&lr=157&parent-reqid=1552306820603634-533477407658204781100039-vla1-3102&source=wiz'
        }
    ];
    return {
        compareByDates: function (a, b) {
            return a.createdAt - b.createdAt;
        },
        compareByAuthor: function (a, b) {
            return a.createdAt - b.createdAt;
        },
        checkId: function (a) {
            return a && (typeof a === 'string');
        },
        isUnique: function (id) {
            var res = photoPosts;
            if (this.checkId(id)) {
                res = res.filter(function (post) {
                    return post.id === id;
                })
            };
            return res.length===0;
        },
        checkDescription: function (a) {
            return typeof a === 'string' && a.trim() !== '' && a.length < 200;
        },
        checkAuthor: function (a) {
            return typeof a === 'string' && a.trim() !== '';
        },
        checkPhotoLink: function (a) {
            return typeof a === 'string' && a.trim() !== '';
        },
        getPhotoPost: function (id) {
            if (this.checkId(id)) {
                var res = photoPosts;
                return res = res.filter(function (post) {
                        if (post.id === id) {
                            return post;
                        }
                    }
                )[0];
            }
        },
        validatePhotoPost: function (photoPost) {
            if(typeof photoPost === "undefined"){
                return false;
            }
            var empty = photoPost.id && photoPost.description &&
                photoPost.createdAt && photoPost.author &&
                photoPost.photoLink;
            if (empty) {
                return this.checkId(photoPost.id) &&
                    this.checkDescription(photoPost.description) &&
                    this.checkAuthor(photoPost.author) &&
                    this.checkPhotoLink(photoPost.photoLink);
            }
            return false;
        },
        addPhotoPost: function (a) {
            if (this.validatePhotoPost(a)) {
                if (this.isUnique(a.id)) {
                    photoPosts.unshift(a);
                    return true;
                }
            }
            return false;
        },
        editPhotoPost: function (id, photoPost) {
            var currentPhotoPost = this.getPhotoPost(id);
            var flag = false;
            if (this.validatePhotoPost(currentPhotoPost)) {
                if (this.checkDescription(photoPost.description)) {
                    currentPhotoPost.description = photoPost.description;
                    flag = true;
                }
                    if (this.checkPhotoLink(photoPost.photoLink)) {
                        currentPhotoPost.photoLink = photoPost.photoLink;
                        flag = true;
                    }
                }

            return flag;
        },
        removePhotoPost: function (id) {
            var flag = false;
            if (this.checkId(id)) {
                photoPosts.forEach(function (item, i, photoPosts) {
                    if (item.id === id) {
                        photoPosts.splice(i, 1);
                        flag = true;
                    }
                });

            }
            return flag;
        },
        getPhotoPosts: function (skip, top, filterConfig) {
            var res = photoPosts;
            skip = skip || 0;
            top = top || 10;
            filterConfig = filterConfig || 0;
            if(!filterConfig){
                return res.slice(skip, skip + top).sort(this.compareByDates);
            } else{
                filterConfig.author = filterConfig.author || 0;
                filterConfig.date = filterConfig.date || 0;
                if(filterConfig.author&&filterConfig.date){
                    res = res.filter(function(a)
                    {
                        filterConfig.date.from = filterConfig.date.from || a.createdAt;
                        filterConfig.date.to = filterConfig.date.to || 0;
                        return a.author === filterConfig.author &&
                            a.createdAt === filterConfig.date.from - filterConfig.date.to;
                    });
                }else{
                    if(!!(filterConfig.author)){
                         res = res.filter(function(a)
                        {
                            return a.author === filterConfig.author;
                        });
                    }
                    if(!!(filterConfig.date)){

                        res = res.filter(function(a)
                        {
                            filterConfig.date.from = filterConfig.date.from || a.createdAt;
                            filterConfig.date.to = filterConfig.date.to || 0;
                            return a.createdAt === filterConfig.date.from - filterConfig.date.to;
                        });

                    }
                }
return res;

            }

        },

    }
}());
console.log(I.getPhotoPost());
console.log(I.isUnique());

