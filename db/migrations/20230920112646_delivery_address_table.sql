-- migrate:up
CREATE TABLE `delivery_address` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `zipcode` varchar(20) NOT NULL,
  `address1` varchar(50) NOT NULL,
  `address2` varchar(50),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `delivery_address` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);


-- migrate:down
  DROP TABLE delivery_address;
