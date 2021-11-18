drop database if exists reviews;

create database reviews;
use reviews;

create table reviewsSample (
  id int not null primary key auto_increment,
  recommend boolean not null,
  reported boolean not null,
  reviewer_name varchar(255) not null
);

create table reviews (
  id int not null primary key auto_increment,
  product_id int not null,
  rating int not null,
  date datetime not null,
  summary text not null,
  body text not null,
  recommend boolean not null,
  reported boolean not null,
  reviewer_name varchar(255) not null,
  reviewer_email varchar(255) not null,
  response varchar(255) null,
  helpfulness int not null
);

create table reviews_photos (
  id int not null primary key auto_increment,
  review_id int not null,
  url varchar(255) not null
);

create table characteristics (
  id int not null primary key auto_increment,
  product_id int not null,
  name varchar(255) not null
);

create table characteristics_reviews (
  id int not null primary key auto_increment,
  characteristic_id int not null,
  review_id int not null,
  value int not null
);




