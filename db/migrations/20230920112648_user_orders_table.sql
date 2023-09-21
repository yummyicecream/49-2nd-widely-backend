-- migrate:up
CREATE TABLE `user_orders` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_number` int NOT NULL,
  `order_date` timestamp NOT NULL,
  `address_id` int NOT NULL,
  `zipcode` varchar(20) NOT NULL,
  `address1` varchar(50) NOT NULL,
  `address2` varchar(50),
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment` varchar(20) NOT NULL,
  `order_status` int NOT NULL
);

ALTER TABLE `user_orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `user_orders` ADD FOREIGN KEY (`order_status`) REFERENCES `order_status` (`id`);

-- migrate:down
  DROP TABLE user_orders;
