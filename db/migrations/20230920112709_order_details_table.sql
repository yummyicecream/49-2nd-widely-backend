-- migrate:up
CREATE TABLE `order_details` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_count` int NOT NULL,
  `product_price` int NOT NULL,
  `delivery_fee` int NOT NULL
);

ALTER TABLE `order_details` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
ALTER TABLE `order_details` ADD FOREIGN KEY (`order_id`) REFERENCES `user_orders` (`id`);

-- migrate:down
  DROP TABLE order_details;
