CREATE DATABASE Leaderboard;
GO

USE LeaderBoard;
GO

--DDL
CREATE TABLE UsuarioTipo(
	UsuarioTipoId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Descripcion NVARCHAR(100) NOT NULL,
	CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE ModuloTipo(
	ModuloTipoId INT IDENTITY(1,1) PRIMARY KEY,
	Especialidad NVARCHAR(100) NOT NULL,
	Tecnologia NVARCHAR(100) NOT NULL,
	CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()

);
GO

CREATE TABLE Usuarios(
	UsuarioId UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	UsuarioTipoId INT NOT NULL REFERENCES UsuarioTipo(UsuarioTipoId),
	Nombre NVARCHAR(100) NOT NULL,
	Edad INT NOT NULL,
	Correo NVARCHAR(100) NOT NULL,
	NumTelefono NVARCHAR(10) NOT NULL,
	Cedula NVARCHAR(11) NOT NULL,
	CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
	
);
GO


CREATE TABLE Modulos(
	ModuloId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	ModuloTipoId INT NOT NULL REFERENCES ModuloTipo(ModuloTipoId),
	ProfesorId UNIQUEIDENTIFIER NOT NULL REFERENCES Usuarios(UsuarioId),
	--Nombre NVARCHAR(100) NOT NULL,
	CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()

);
GO

CREATE TABLE Participantes(
	ParticipacionId INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Usuario UNIQUEIDENTIFIER NOT NULL REFERENCES Usuarios(UsuarioId),
	ModuloId INT NOT NULL REFERENCES Modulos(ModuloId),
	Puntos DECIMAL NOT NULL DEFAULT 0,
	FechaParticipacion DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    
);
GO

--MDL

INSERT INTO UsuarioTipo(Descripcion) 
VALUES
('Profesor'),
('Estudiante')
GO

INSERT INTO ModuloTipo(Especialidad, Tecnologia)
VALUES
('Motor de base de datos', 'SQL Server'),
('Framework', 'Angular'),
('Framework','.NET'),
('Entorno de ejecución', 'NodeJS')
GO

DECLARE @JohnDoeUserId UNIQUEIDENTIFIER = NEWID();
DECLARE @JohnDoeSegundoUserId UNIQUEIDENTIFIER = NEWID();
DECLARE @JohnDoeTerceroUserId UNIQUEIDENTIFIER = NEWID();



INSERT INTO Usuarios(UsuarioId,UsuarioTipoId, Nombre, Edad, NumTelefono, Cedula)
VALUES
(@JohnDoeUserId, 1,'John Doe', 78, 'john@doe.com', '0123123130', '0988887888'),
(@JohnDoeSegundoUserId, 1  ,'John Doe', 78, 'john@doe.com', '0123123130', '0988888888'),
(@JohnDoeTerceroUserId, 1,'John Doe', 78, 'john@doe.com', '0123123130', '0988888889');

INSERT INTO Usuarios (UsuarioTipoId, Nombre, Edad, Correo, NumTelefono, Cedula)
VALUES
(1, 'John Doe', 78, 'john@doe.com', '0123123230090', '0123456789');




DECLARE @SQLServerModuloTipo INT = (SELECT ModuloTipoId FROM ModuloTipo WHERE Tecnologia = 'SQL SERVER');
DECLARE @AngularModuloTipo INT = (SELECT ModuloTipoId FROM ModuloTipo WHERE Tecnologia = 'Angular');
DECLARE @DotNetModuloTipo INT = (SELECT ModuloTipoId FROM ModuloTipo WHERE Tecnologia = '.NET');
DECLARE @NodeJs INT = (SELECT ModuloTipoId FROM ModuloTipo WHERE Tecnologia = 'NodeJS');


INSERT INTO Modulos (ModuloTipoId, ProfesorId)
VALUES
(@SQLServerModuloTipo, @JohnDoeUserId),
(@DotNetModuloTipo, @JohnDoeUserId),
(@AngularModuloTipo, @JohnDoeSegundoUserId),
(@NodeJs, @JohnDoeTerceroUserId);
GO

SELECT * FROM Modulos

ALTER TABLE Usuarios
ADD CONSTRAINT UQ_Usuario_CorreoElectronico UNIQUE (Correo)

ALTER TABLE Usuarios
ADD CONSTRAINT UQ_Usuario_Cedula UNIQUE (Cedula)

ALTER TABLE Usuarios
ADD CONSTRAINT UQ_Usuario_NumTelefono UNIQUE (NumTelefono)

SELECT * FROM UsuarioTipo
SELECT * FROM Usuarios
WHERE UsuarioId !='1F2690D3-C698-477D-8490-74C85F2AC89E'

UPDATE Usuarios
SET Correo = 'asda@gmail.com', Cedula ='0999988888',NumTelefono = '1234567890'
WHERE UsuarioId = '1F2690D3-C698-477D-8490-74C85F2AC89E';
GO

UPDATE Usuarios
SET	Correo = 'john2@doe.com', Cedula = '0999999999', NumTelefono = '0999999999'
WHERE UsuarioId = 'F08843FB-B302-40B9-8B02-A6F289892504'