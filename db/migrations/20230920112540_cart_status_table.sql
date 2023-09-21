-- migrate:up
CREATE TABLE `cart_status` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `status` varchar(20) NOT NULL
);

-- migrate:down
DROP TABLE cart_status;
