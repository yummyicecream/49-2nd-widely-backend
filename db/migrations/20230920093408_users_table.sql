-- migrate:up
CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL UNIQUE,
  `password` varchar(200) NOT NULL,
  `name` varchar(20) NOT NULL,
  `user_point` int NULL,
  `zipcode` varchar(20) NOT NULL,
  `address1` varchar(50) NOT NULL,
  `address2` varchar(50),
  `phone_number` varchar(20) NOT NULL,
  `birthday` date,
  `terms` tinyint(1),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `users` ADD FOREIGN KEY (`user_point`) REFERENCES `points` (`id`);

-- migrate:down
    DROP TABLE users;

