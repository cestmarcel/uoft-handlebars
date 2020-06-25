DROP DATABASE IF EXISTS burgers;
CREATE DATABASE burgers;
USE burgers;

CREATE TABLE items (
    id INT AUTO_INCREMENT NOT NULL,
    name varchar(255),
    devoured BOOLEAN,
    PRIMARY KEY (id)
);