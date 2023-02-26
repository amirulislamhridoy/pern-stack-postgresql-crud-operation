-- normal command to postgresql change terminl command
psql -U postgres

-- database creating command
create database practise;
CREATE DATABASE practise;

-- its for table(relation) creating command
create table users (
-- CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);