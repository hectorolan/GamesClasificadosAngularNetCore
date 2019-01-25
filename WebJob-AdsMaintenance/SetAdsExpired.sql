USE [gcladb]
GO

UPDATE [dbo].[Ads]
	SET [Expired] = 1
	WHERE [DatePosted] < (GETDATE()-14)
GO
