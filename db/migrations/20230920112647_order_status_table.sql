-- migrate:up
CREATE TABLE `order_status` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `status` varchar(20) NOT NULL
);

-- migrate:down
DROP TABLE order_status;
