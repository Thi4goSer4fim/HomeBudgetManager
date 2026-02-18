CREATE DATABASE HomeBudgetManager;
USE HomeBudgetManager;

CREATE TABLE Persons (
	Id int primary key auto_increment,
    `Name` varchar(200) not null,
    Age int not null
);

CREATE TABLE Category (
	Id int primary key auto_increment,
    `Description` varchar(400) not null,
    Purpose int not null
);

CREATE TABLE Transactions (
	Id int primary key auto_increment,
    `Description` varchar(400) not null,
    `Value` decimal(18, 2) not null,
    `Type` int not null,
    CategoryId int not null,
    PersonId int not null,
    
	CONSTRAINT FK_Transactions_Category
        FOREIGN KEY (CategoryId)
        REFERENCES Category(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_Transactions_Person
        FOREIGN KEY (PersonId)
        REFERENCES Persons(Id)
        ON DELETE CASCADE
);
