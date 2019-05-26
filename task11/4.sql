SELECT POST_ID, DESCRIPTION, CREATION_DATE, PHOTO_LINK, user.USER_ID FROM photo_post JOIN user ON user.USER_ID = photo_post.USER_ID
WHERE user.NAME = 'Dasha' AND photo_post.DESCRIPTION like '%hello%';