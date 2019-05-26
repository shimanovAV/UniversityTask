create table user
(
	USER_ID int auto_increment
		primary key,
	NAME varchar(50) not null,
	PASSWORD varchar(50) not null
);
create table photo_post
(
	POST_ID int auto_increment
		primary key,
	DESCRIPTION varchar(1000) null,
	CREATION_DATE datetime not null,
	PHOTO_LINK varchar(1000) not null,
	USER_ID int not null,
	constraint PHOTO_POST_fk
		foreign key (USER_ID) references user (USER_ID)
			on delete cascade
);
create table tag
(
	TAG_ID int auto_increment
		primary key,
	TAG varchar(50) not null
);
create table post_tag
(
	POST_ID int not null,
	TAG_ID int not null
		primary key,
	constraint POST_TAG__fk
		foreign key (POST_ID) references photo_post (POST_ID)
			on delete cascade,
	constraint POST_TAG_tag_TAG_ID_fk
		foreign key (TAG_ID) references tag (TAG_ID)
			on delete cascade
);
create table likes
(
	ID int auto_increment,
	POST_ID int not null
		primary key,
	USER_ID int not null,
	constraint like_photo_post_POST_ID_fk
		foreign key (POST_ID) references photo_post (POST_ID)
			on delete cascade,
	constraint like_user_USER_ID_fk
		foreign key (USER_ID) references user (USER_ID)
			on delete cascade
);
INSERT INTO user(NAME, PASSWORD) VALUES ('Sasha', 'Sasha');
INSERT INTO user(NAME, PASSWORD) VALUES ('Dasha','Dasha');
INSERT INTO user(NAME, PASSWORD) VALUES ('Masha','Masha');
INSERT INTO user(NAME, PASSWORD) VALUES ('Misha','Misha');
INSERT INTO user(NAME, PASSWORD) VALUES ('Grisha','Grisha');
INSERT INTO user(NAME, PASSWORD) VALUES ('Marina','Marina');
INSERT INTO user(NAME, PASSWORD) VALUES ('Valera','Valera');
INSERT INTO user(NAME, PASSWORD) VALUES ('Irina','Irina');
INSERT INTO user(NAME, PASSWORD) VALUES ('Natasha','Natasha');
INSERT INTO user(NAME, PASSWORD) VALUES ('Yulia','Yulia');
INSERT INTO tag(TAG) VALUES ('#good');
INSERT INTO tag(TAG) VALUES ('#bad');
INSERT INTO tag(TAG) VALUES ('#day');
INSERT INTO tag(TAG) VALUES ('#sun');
INSERT INTO tag(TAG) VALUES ('#mood');
INSERT INTO tag(TAG) VALUES ('#city');
INSERT INTO tag(TAG) VALUES ('#life');
INSERT INTO tag(TAG) VALUES ('#love');
INSERT INTO tag(TAG) VALUES ('#work');
INSERT INTO tag(TAG) VALUES ('#family');
INSERT INTO photo_post(DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES ('I love you', NOW(), '/resources/pictures/b.jpg', 1);
INSERT INTO photo_post(DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES ('I hate you', NOW(), '/resources/pictures/c.jpg', 1);
INSERT INTO photo_post(DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES ('Hard day', NOW(), '/resources/pictures/f.JPG', 1);
INSERT INTO photo_post(DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES ('Good day', NOW(), '/resources/pictures/g.JPG', 1);
INSERT INTO photo_post(DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES ('Miss you', NOW(), '/resources/pictures/h.jpg', 1);
INSERT INTO photo_post(DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES ('Just us', NOW(), '/resources/pictures/j.jpg', 1);
INSERT INTO photo_post(DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES ('BFF', NOW(), '/resources/pictures/k.jpg', 1);
INSERT INTO photo_post(DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES ('Wish me luck', NOW(), '/resources/pictures/l.jpg', 1);
INSERT INTO photo_post(DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES ('Do not worry, be happy', NOW(), '/resources/pictures/m.jpg', 1);
INSERT INTO photo_post(DESCRIPTION, CREATION_DATE, PHOTO_LINK, USER_ID) VALUES ('Love is...', NOW(), '/resources/pictures/n.jpg', 1);
truncate table photo_post;
update photo_post set USER_ID=2 where POST_ID=2;
update photo_post set USER_ID=3 where POST_ID=3;
update photo_post set USER_ID=4 where POST_ID=4;
update photo_post set USER_ID=5 where POST_ID=5;
update photo_post set USER_ID=6 where POST_ID=6;
update photo_post set USER_ID=7 where POST_ID=7;
update photo_post set USER_ID=8 where POST_ID=8;
update photo_post set USER_ID=9 where POST_ID=9;
update photo_post set USER_ID=10 where POST_ID=10;
INSERT INTO post_tag(POST_ID, TAG_ID) VALUES (1,1);
INSERT INTO post_tag(POST_ID, TAG_ID) VALUES (2,3);
INSERT INTO post_tag(POST_ID, TAG_ID) VALUES (3,4);
INSERT INTO post_tag(POST_ID, TAG_ID) VALUES (4,2);
INSERT INTO post_tag(POST_ID, TAG_ID) VALUES (5,5);
INSERT INTO post_tag(POST_ID, TAG_ID) VALUES (6,6);
INSERT INTO post_tag(POST_ID, TAG_ID) VALUES (7,7);
INSERT INTO post_tag(POST_ID, TAG_ID) VALUES (8,8);
INSERT INTO post_tag(POST_ID, TAG_ID) VALUES (9,9);
INSERT INTO post_tag(POST_ID, TAG_ID) VALUES (10,10);
INSERT INTO likes(POST_ID, USER_ID) VALUES (1,1);
INSERT INTO likes(POST_ID, USER_ID) VALUES (2,3);
INSERT INTO likes(POST_ID, USER_ID) VALUES (3,4);
INSERT INTO likes(POST_ID, USER_ID) VALUES (4,2);
INSERT INTO likes(POST_ID, USER_ID) VALUES (5,5);
INSERT INTO likes(POST_ID, USER_ID) VALUES (6,6);
INSERT INTO likes(POST_ID, USER_ID) VALUES (7,7);
INSERT INTO likes(POST_ID, USER_ID) VALUES (8,8);
INSERT INTO likes(POST_ID, USER_ID) VALUES (9,9);
INSERT INTO likes(POST_ID, USER_ID) VALUES (10,10);

