SELECT POST_ID, DESCRIPTION, CREATION_DATE, NAME FROM photo_post
  JOIN user ON user.USER_ID = photo_post.USER_ID GROUP BY DESCRIPTION
HAVING LENGTH(DESCRIPTION) > 100;