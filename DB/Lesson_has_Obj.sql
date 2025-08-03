INSERT INTO Lesson_OBJ (LessonID, ArticleID, ObjOrder) VALUES (1, 1, 0);
INSERT INTO Lesson_OBJ (LessonID, ArticleID, ObjOrder) VALUES (1, 2, 3);

-- select
select * from Lesson_OBJ;
select * from article;
select * from exercisegroup;
select * from Lesson_OBJ where LessonID = 1;

select * from exercisegroup ;

select ObjOrder, ArticleID, IMG_ID from Lesson_OBJ where LessonID=1;

select count(*) as ExPositionNumber from exercisegroup WHERE idExerciseGroup = 0;

-- info from Lesson 
select ObjOrder, ArticleID, IMG_ID from Lesson_OBJ where LessonID=1;

-- all article from Lesson 
select a.ArticleID, a.Title, a.Content, l.ObjOrder
from article as a LEFT JOIN Lesson_OBJ as l on a.ArticleID = l.ArticleID
WHERE l.LessonID = 1 ORDER BY l.ObjOrder;

-- all img info from IMG
-- TODO