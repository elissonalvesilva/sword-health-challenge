CREATE DATABASE IF NOT EXISTS todo;

USE todo;

CREATE TABLE IF NOT EXISTS tasks(
  id int primary key AUTO_INCREMENT NOT NULL,
  resume text,
  user_id varchar(50),
  createdAt date,
  updatedAt date default null
);
