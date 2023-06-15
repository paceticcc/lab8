CREATE SCHEMA IF NOT EXISTS blog;
USE blog;
CREATE TABLE IF NOT EXISTS post
(
    `post_ID`      INT NOT NULL AUTO_INCREMENT,
    `title`        VARCHAR(255) NOT NULL,
    `subtitle`     VARCHAR(255) NOT NULL,
    `author`       VARCHAR(255) NOT NULL,
    `author_img`   VARCHAR(255) NOT NULL,
    `publish_date` VARCHAR(255) NOT NULL,
    `image_url`    VARCHAR(255) NOT NULL,
    `featured`     TINYINT(1) DEFAULT 0 NOT NULL,
    `content` 	   TEXT NOT NULL,
    PRIMARY KEY (`post_ID`)
) ENGINE = InnoDB
CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci