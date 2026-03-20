USE [LeaderBoard]
GO

DECLARE	@return_value int

EXEC	@return_value = [dbo].[sp_crear_usuario]
		@nombre = N'Bryan',
		@tipo_id = 1,
		@edad = 33,
		@correo = N'bryan@gmail.com',
		@numero_de_telefono = N'0999999999',
		@cedula = N'0988888888'

SELECT	'Return Value' = @return_value
GO