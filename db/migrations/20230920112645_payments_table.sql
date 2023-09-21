-- migrate:up
CREATE TABLE `payments` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL
);

-- migrate:down
DROP TABLE payments;
