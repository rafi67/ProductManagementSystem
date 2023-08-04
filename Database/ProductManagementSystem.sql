create database ProductMDb;

use ProductMDb;


create table Category (
	CategoryId bigint primary key not null identity(1,1),
	CategoryName varchar(30),
);

create table Product(
	ProductId bigint primary key not null identity(1,1),
	CategoryId bigint references Category(CategoryId),
	BrandId bigint references Brand(BrandId),
	ProductName varchar(50),
	ProductModel varchar(50),
	ProductPrice decimal(8,2),
	ProductPhoto varchar(500)
);

create table Brand(
	BrandId bigint primary key not null identity(1,1),
	CategoryId bigint references Category(CategoryId),
	BrandName varchar(50)
);

create table [User] (
	UserId bigint primary key not null identity(1,1),
	[FullName] varchar(50),
	UserName varchar(50),
	[Password] varchar(8),
	UserPhoto varchar(500),
	UserEmail varchar(50),
	IsAdmin bit,
	IsDitrubutor bit,
	IsAreaHead bit
);

insert into [User] values ('Md. Rafi Siddique', 'Admin', 'admin', 'rafi.jpg', 'rafi@gmail.com', 1, 0, 0);