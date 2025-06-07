INSERT INTO lesson_obj (LessonID, ArticleID, ObjOrder) VALUES (1, 1, 0);
INSERT INTO lesson_obj (LessonID, ArticleID, ObjOrder) VALUES (1, 2, 1);

select * from lesson_obj;

select ObjOrder, ArticleID, IMG_ID from lesson_obj where LessonID=1;



-- info from lesson 
select ObjOrder, ArticleID, IMG_ID from lesson_obj where LessonID=1;

-- all article from lesson 
select a.ArticleID, a.Title, a.Content, l.ObjOrder
from article as a LEFT JOIN lesson_obj as l on a.ArticleID = l.ArticleID
WHERE l.LessonID = 1 ORDER BY l.ObjOrder;

-- all img info from IMG
-- TODO