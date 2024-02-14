CREATE TABLE `category`(
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `category` ADD PRIMARY KEY(`id`);
CREATE TABLE `order`(
    `id` CHAR(36) NOT NULL,
    `uid` CHAR(36) NOT NULL,
    `startDate` DATETIME NOT NULL,
    `endDate` DATETIME NOT NULL,
    `totalPrice` DOUBLE(8, 2) NOT NULL,
    `payment` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `order` ADD PRIMARY KEY(`id`);
CREATE TABLE `infomation`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `cpu` VARCHAR(255) NOT NULL,
    `ram` VARCHAR(255) NOT NULL,
    `hardware` VARCHAR(255) NOT NULL,
    `card` VARCHAR(255) NOT NULL,
    `screen` VARCHAR(255) NOT NULL,
    `gateConnection` VARCHAR(255) NOT NULL,
    `size` VARCHAR(255) NOT NULL,
    `weight` DOUBLE(8, 2) NOT NULL,
    `battery` VARCHAR(255) NOT NULL
);
CREATE TABLE `productStatus`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `status` BIGINT NOT NULL
);
CREATE TABLE `brand`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` BIGINT NOT NULL
);
CREATE TABLE `productImg`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `img` BIGINT NOT NULL
);
CREATE TABLE `user`(
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `mail` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` INT NOT NULL,
    `accessToken` VARCHAR(255) NOT NULL,
    `refreshToken` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(255) NOT NULL,
    `role` INT NOT NULL,
    `cart` BIGINT NOT NULL,
    `isBlocked` BIGINT NOT NULL
);
ALTER TABLE
    `user` ADD PRIMARY KEY(`id`);
CREATE TABLE `product`(
    `id` CHAR(36) NOT NULL,
    `stt` INT NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `brandCode` VARCHAR(255) NOT NULL,
    `categoryCode` VARCHAR(255) NOT NULL,
    `photos` BLOB NOT NULL,
    `price` DOUBLE(8, 2) NOT NULL,
    `amount` INT NOT NULL,
    `statusCode` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `product` ADD PRIMARY KEY(`id`);
ALTER TABLE
    `product` ADD CONSTRAINT `product_statuscode_foreign` FOREIGN KEY(`statusCode`) REFERENCES `productStatus`(`id`);
ALTER TABLE
    `product` ADD CONSTRAINT `product_categorycode_foreign` FOREIGN KEY(`categoryCode`) REFERENCES `category`(`id`);
ALTER TABLE
    `product` ADD CONSTRAINT `product_brandcode_foreign` FOREIGN KEY(`brandCode`) REFERENCES `brand`(`id`);
ALTER TABLE
    `order` ADD CONSTRAINT `order_uid_foreign` FOREIGN KEY(`uid`) REFERENCES `user`(`id`);
ALTER TABLE
    `order` ADD CONSTRAINT `order_id_foreign` FOREIGN KEY(`id`) REFERENCES `product`(`id`);
ALTER TABLE
    `product` ADD CONSTRAINT `product_photos_foreign` FOREIGN KEY(`photos`) REFERENCES `productImg`(`id`);
ALTER TABLE
    `product` ADD CONSTRAINT `product_id_foreign` FOREIGN KEY(`id`) REFERENCES `infomation`(`id`);