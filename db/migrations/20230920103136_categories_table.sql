-- migrate:up
CREATE TABLE `categories` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL
);

-- migrate:down
  DROP TABLE categories;
