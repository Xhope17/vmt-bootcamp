CREATE DATABASE DiscordClone;
GO

USE DiscordClone;
GO

CREATE TABLE Roles(
	RoleId INT IDENTITY(1,1) NOT NULL,
	Code NVARCHAR(10) NOT NULL,
	ShowNamee NVARCHAR(100) NOT NULL,
	CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
)
GO


CREATE TABLE UserStatusType(
	UserStatusId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Code NVARCHAR(10) NOT NULL,
	ShowName NVARCHAR(11) NOT NULL,
	CreateAT DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
);
GO

INSERT INTO UserStatusType(Code, ShowName) 
VALUES('online','En línea'),
('not_disturb','En línea'),
('idle','Ausente'),
('ghost','Invisible');
GO

CREATE TABLE Users(
	UserId UNIQUEIDENTIFIER NOT NULL,
	UserName NVARCHAR(32) NOT NULL,
	DisplayName NVARCHAR(100) NOT NULL,
	Description NVARCHAR(255) NULL, 
	StatusType INT NOT NULL REFERENCES UserStatusType(UserStatusId),
	StatusTime INT,
	StatusContent NVARCHAR(50) NULL DEFAULT ('Hey, there!'),
	AvatarURL NVARCHAR(255) NULL,
	BannerUrl NVARCHAR(255) NULL,
	--RoleId INT NOT NULL REFERENCES Roles (RoleId),
	CreateAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
	--CONSTRAINT FK_Roles_ROlesId FOREIGN KEY (RoleId) REFERENCES Roles (RoleId)

)
GO



CREATE TABLE UsersRoles(
	UserId UNIQUEIDENTIFIER NOT NULL,
	RoleId INT NOT NULL,
	CONSTRAINT PK_UserRoles_UserId_RoleId PRIMARY KEY (UserId, RoleId),

);
GO

CREATE TABLE Collections(
	CollectionId UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
	Name NVARCHAR(50) NOT NULL,
	Description NVARCHAR(100) NOT NULL DEFAULT('This is my collection!'),	
	CreateAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
	DeleteAt DATETIME2,
);
GO

CREATE TABLE Items(
	ItemId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Name NVARCHAR(50) NOT NULL UNIQUE,
	CreateAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

INSERT INTO Items(Name)
VALUES
('Hollow Knight'),
('osu!');
GO

CREATE TABLE CollectionsItems(
	CollectionID UNIQUEIDENTIFIER NOT NULL REFERENCES Collections (CollectionId),
	ItemId INT NOT NULL REFERENCES Items (ItemId),
	CONSTRAINT PK_CollectionsItems_CollectionId_ItemId PRIMARY KEY (CollectionId, ItemId)

);
GO


INSERT INTO Collections(Name, Description)
VALUES
('Mis juegos','Juegos');

Select * from Collections
where DeleteAt is null

select * from items;

DECLARE @CollectionId UNIQUEIDENTIFIER = '75470F6E-3FD7-4B53-87A3-294BDD064851'
DECLARE @ItemHollowKnihgId Int = (SELECT ItemId FROM Items WHERE ItemID =1);
DECLARE @ItemOsuId INT = (SELECT ItemId from Items where ItemId = 2)

INSERT INTO CollectionsItems (CollectionID, ItemId)
VALUES(@CollectionId, @ItemOsuId)
GO


SELECT * FROM Items
Where Name = 'Hollow Knight' OR Name = 'osu!'

DECLARE @ItemABuscar NVARCHAR(50)