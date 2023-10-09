-- migrate:up
CREATE TABLE `carts` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_qty` int NOT NULL,
  `status_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `carts` ADD FOREIGN KEY (`status_id`) REFERENCES `cart_status` (`id`);
ALTER TABLE `carts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `carts` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

-- migrate:down
  DROP TABLE carts;
