-- migrate:up
CREATE TABLE `product_images` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image` varchar(200) NOT NULL,
  `is_thumbnail` tinyint(1) NOT NULL
);

ALTER TABLE `product_images` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

-- migrate:down
  DROP TABLE product_images;
