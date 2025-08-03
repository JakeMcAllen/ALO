INSERT INTO Lesson (Title, Description, Category) VALUES ("English lesson 101", "Collection of easy story for children. LEVEL: EASY", 1);
INSERT INTO Lesson (Title, Description, Category) VALUES ("English lesson 102", "English lesson", 1);
INSERT INTO Lesson (Title, Description, Category) VALUES ("English lesson 103", "English lesson", 1);
INSERT INTO Lesson (Title, Description, Category) VALUES ("Lezione in Italiano", "Lezione in italiano", 2);
INSERT INTO Lesson (Title, Description) VALUES ("New lesson" , "description");

select * from Lesson;
UPDATE Lesson SET Title = "ciao", Description = ""  WHERE idLesson = 4;