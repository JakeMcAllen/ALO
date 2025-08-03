INSERT INTO user (Name, Surname, Mail, password) VALUES ("Jake", "McAllen", "giorgio@allena.it", "1234567890");
INSERT INTO user (Name, Surname, Mail, password) VALUES ("Test", "JJpops", "Test@JJpops.it", "passwordPerPop");
INSERT INTO Lesson_has_User (Lesson_idLesson, User_idUser) VALUES (1, 1);
INSERT INTO Lesson_has_User (Lesson_idLesson, User_idUser) VALUES (2, 1);


-- select 
select * from user;
select idUser, Name, Surname from user where idUser = 1 ;
select * from user where idUser = 1 ;


-- extra 
select * from Lesson;
select * from user;
select * from Lesson_has_User;


-- select MylessonID
select l.idLesson, l.Title from Lesson as l join lesson_has_user as u on ( l.idLesson = u.Lesson_idLesson )
where u.User_idUser = 1;

select * from Lesson as l join lesson_has_user as u on ( l.idLesson = u.Lesson_idLesson )
where u.User_idUser = 1;