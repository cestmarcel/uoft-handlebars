DROP DATABASE IF EXISTS burgers;
CREATE DATABASE burgers;
USE burgers;

CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(255),
    devoured BOOLEAN,
    PRIMARY KEY (id)
);