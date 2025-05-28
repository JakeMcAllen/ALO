INSERT INTO user (Name, Surname, Mail, password) VALUES ("Jake", "McAllen", "giorgio@allena.it", "1234567890");
INSERT INTO user (Name, Surname, Mail, password) VALUES ("Test", "JJpops", "Test@JJpops.it", "passwordPerPop");

-- select 
select idUser, Name, Surname from user where idUser = 1 ;
select * from user where idUser = 1 ;

-- select users
select * from user;
select * from user where Mail="giorgio@allena.it" and password="1234567890";
select * from user where Mail="giorgio@allena.it" and password="1234567890" ;
INSERT INTO user (Name, Surname, Mail, password) VALUES ("Giorgio Allena", "null", "allenagiorgio122@gmail.com", "giorgio01All=32" );