GO
CREATE OR ALTER PROCEDURE sp_listar_usuarios
AS
BEGIN
	SELECT * FROM Usuarios
END 
GO

CREATE OR ALTER PROCEDURE sp_crear_usuario
@nombre NVARCHAR(100),
@tipo_id INT,
@edad INT,
@correo NVARCHAR(100),
@numero_de_telefono NVARCHAR(32),
@cedula NVARCHAR(10)
AS
BEGIN
	DECLARE @IdUsuario UNIQUEIDENTIFIER= NEWID()

	INSERT Usuarios(UsuarioId,Nombre, UsuarioTipoId,Edad, Correo, NumTelefono, Cedula)
	VALUES
	(@IdUsuario,@nombre, @tipo_id,@edad, @correo, @numero_de_telefono, @cedula);
	
	SELECT @IdUsuario
END
GO


-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE <Procedure_Name, sysname, ProcedureName> 
	-- Add the parameters for the stored procedure here
	<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT <@Param1, sysname, @p1>, <@Param2, sysname, @p2>
END
GO
