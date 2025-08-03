INSERT INTO Article (Title, Description, Content) VALUES ("The Little Bear Who Loved Blueberries", "A story for childs.", "Once upon a time, in a cozy little den nestled deep in a forest, lived a tiny bear named Barnaby. Barnaby wasn't like the other bears. While they loved honey and salmon, Barnaby's heart belonged to one thing: blueberries! Every morning, as the sun peeked through the tall trees, Barnaby would wake up with a rumble in his tummy. 'Blueberries!' he'd squeak, and off he'd go, his little paws padding softly on the forest floor. He knew all the best spots. There was the sunny patch near the whispering creek, where the berries grew plump and sweet. And the secret clearing behind the big oak tree, where they were extra juicy. One day, Barnaby found a blueberry bush he'd never seen before. It was enormous, covered in the biggest, bluest berries he could imagine! His eyes widened, and his nose twitched with delight. He started to munch, one berry after another. Pop! Pop! Pop! Each one burst with flavor. He ate so many that his little tummy grew round and blue, just like the berries! Suddenly, he heard a giggle. A tiny squirrel named Squeaky popped out from behind the bush. 'Barnaby! You're all blue!' Squeaky chattered, laughing. Barnaby looked down at his paws, then at his belly. He was indeed covered in blueberry juice! He giggled too. 'Oops!' he said, 'I guess I ate a few too many!' Squeaky shared some nuts, and Barnaby offered his last handful of berries. They sat together, two little friends, enjoying their snacks in the sunny forest. From that day on, Barnaby still loved blueberries more than anything. But he also learned that sharing with a friend made them taste even sweeter. And sometimes, getting a little messy was the most fun part of all!");
INSERT INTO Article (Title, Description, Content) VALUES ("The Curious Kitten", "A story for childs.", "In a cozy little cottage with a bright red door lived a tiny kitten named Pip. Pip had soft, white fur and the biggest, most curious blue eyes you ever did see. He loved to explore! One sunny morning, Pip saw a butterfly fluttering outside the window. It had wings like stained glass, shimmering with all the colors of the rainbow. Flutter, flutter, flutter! went the butterfly. Pip's whiskers twitched. His tail swished. He wanted to play with the beautiful butterfly! He squeezed through a tiny gap in the window and tumbled onto the soft grass outside. The butterfly danced away, leading Pip on a merry chase. They went past tall, sleepy sunflowers, over a wobbly wooden bridge, and through a patch of tickly tall grass. Pip giggled as the grass tickled his nose. Suddenly, the butterfly landed on a bright red mushroom. Pip pounced, but poof! the butterfly fluttered away, and Pip landed right on the mushroom. It was squishy! A little ladybug with shiny black spots crawled on to Pip's nose. 'Hello, curious kitten!' she whispered. 'The world is full of wonders, isn't it?' Pip blinked his big blue eyes. He looked around. He saw a busy line of ants marching with tiny crumbs, a fluffy cloud shaped like a bunny, and the sun shining warm on his fur. The world was indeed full of wonders! He thanked the ladybug and slowly padded back to his cozy cottage. He had learned that exploring was fun, but sometimes, the best adventures were the ones you found right where you were, just by looking closely. And maybe, just maybe, he'd catch that butterfly tomorrow!");
-- INSERT INTO article (Title, Description, Content) VALUES ("", "", "");



Select * from article;
Select ArticleID from article;


-- n Page
Select ROUND(count(*)/8, 0) as pags from article;
Select ROUND(count(*)/ 2 , 0) as pags from article;
Select count(*) from article;

-- Select by category name
Select * from article where CategoryID=1;
Select ArticleID from article where CategoryID=1 limit 5 offset 0;
Select ArticleID from article where CategoryID in (select idCategory from category where Name="Sedia") limit 5 offset 0;
Select ArticleID from article where CategoryID in (select idCategory from category where Name="Scrivania") limit 9 offset 0;

-- search by name
Select ArticleID, Name, Description from article where Name LIKE "%T%" OR Description LIKE "%Scrivania%" LIMIT 10;
Select ArticleID from article where Name LIKE "%sedia%" OR Description LIKE "%sedia%" LIMIT 10; 
Select ArticleID from article where Name LIKE "%Scrivania lung%" OR Description LIKE "%Scrivania lung%" LIMIT 10; 

-- Select generic
Select * from article where ArticleID = 1;
SELECT ArticleID from article;

-- Limit and offset test
SELECT ArticleID from article limit 5 offset 0;
SELECT ArticleID from article limit 10 offset 0;