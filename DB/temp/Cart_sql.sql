INSERT INTO cart (User_idUser, Furniture_furnitureID) VALUES (1, 1);
INSERT INTO cart (User_idUser, Furniture_furnitureID) VALUES (2, 2);
INSERT INTO cart (User_idUser, Furniture_furnitureID) VALUES (2, 3);
INSERT INTO cart (User_idUser, Furniture_furnitureID) VALUES (1, 4);


-- select 
select * from cart;
select Furniture_furnitureID, Quantity from cart where User_idUser=1;
select * from cart where User_idUser=1 and Furniture_furnitureID=1;
select Furniture_furnitureID, Quantity  from cart where User_idUser= 1 ; 

-- quantity get info
select sum(Quantity) as isPresent from cart where User_idUser=1 and Furniture_furnitureID=4;

-- Increment the quantity
select (Quantity + 1) as qnt from cart where User_idUser=1 and Furniture_furnitureID=1;
UPDATE cart SET Quantity = Quantity + 1 WHERE User_idUser = 1 AND Furniture_furnitureID = 1;


-- delete
DELETE FROM cart WHERE User_idUser = 1 AND Furniture_furnitureID = 1;


