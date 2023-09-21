-- migrate:up
CREATE TABLE `points` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `point` int NOT NULL,
  `user_id` int NOT NULL
);

-- migrate:down
DROP TABLE points;
