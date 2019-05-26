SELECT DATEDIFF(NOW(), CREATION_DATE) AS DIFFERENCE
FROM photo_post WHERE CREATION_DATE = (SELECT CREATION_DATE
FROM photo_post ORDER BY CREATION_DATE LIMIT 1)
ORDER BY DIFFERENCE desc LIMIT 1;